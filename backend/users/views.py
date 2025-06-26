# Backend/users/views.py
from rest_framework import viewsets, generics, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import action, api_view, permission_classes
from django.views.decorators.csrf import ensure_csrf_cookie
from django.middleware.csrf import get_token
from django.contrib.auth import login, logout
from django.contrib.auth.password_validation import validate_password
from .models import User
from .serializers import UserSerializer, LoginSerializer, RegisterSerializer

# For account activation
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.template.loader import render_to_string
from django.core.mail import send_mail
from django.contrib.sites.shortcuts import get_current_site
from .tokens import account_activation_token, password_reset_token
from django.conf import settings
from django.core.exceptions import ValidationError

import openai
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    @action(detail=False, methods=['get'])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

    def get_queryset(self):
        if self.action == 'me':
            return User.objects.filter(id=self.request.user.id)
        return super().get_queryset()
    
    def get_permissions(self):
        if self.action == 'me':
            return [permissions.IsAuthenticated()]
        return super().get_permissions()

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [permissions.AllowAny]
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        
        login(request._request, user)  # Use the original HttpRequest
        refresh = RefreshToken.for_user(user)
        
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        })

class LogoutView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request, *args, **kwargs):
        logout(request)
        return Response({"detail": "Successfully logged out."})

class RegisterView(generics.GenericAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save(is_active=False, is_verified=False)  # User inactive until verified
        
        # Send activation email
        self.send_activation_email(request._request, user)
        
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "detail": "Registration successful! Please check your email to activate your account."
        }, status=status.HTTP_201_CREATED)
    
    def send_activation_email(self, request, user):
        current_site = get_current_site(request)
        mail_subject = render_to_string('registration/activation_email_subject.txt').strip()
        message = render_to_string('registration/activation_email.html', {
            'user': user,
            'domain': current_site.domain,
            'uid': urlsafe_base64_encode(force_bytes(user.pk)),
            'token': account_activation_token.make_token(user),
            'protocol': 'https' if request.is_secure() else 'http',
        })
        
        send_mail(
            mail_subject,
            message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user.email],
            html_message=message,
            fail_silently=False,
        )


@api_view(['GET'])
def activate_account(request, uidb64, token):
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    
    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.is_verified = True
        user.save()
        refresh = RefreshToken.for_user(user)
        return Response({
        "detail": "Account activated successfully!", 
        "refresh": str(refresh), 
        "access": str(refresh.access_token),
        "user": UserSerializer(user).data

        })
    else:
        return Response({"detail": "Activation link is invalid!"}, status=status.HTTP_400_BAD_REQUEST)

# Password Reset Views
@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def password_reset_request(request):
    email = request.data.get('email')
    if not email:
        return Response({"email": "This field is required."}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({"detail": "if this email exists, a reset link has been sent."}, status=status.HTTP_200_OK)
    
    current_site = get_current_site(request._request)  # Use _request for HttpRequest
    mail_subject = render_to_string('registration/password_reset_subject.txt').strip()
    message = render_to_string('registration/password_reset_email.html', {
        'user': user,
        'domain': current_site.domain,
        'uid': urlsafe_base64_encode(force_bytes(user.pk)),
        'token': password_reset_token.make_token(user),
        'protocol': 'https' if request.is_secure() else 'http',
    })
    
    send_mail(
        mail_subject,
        message,
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[user.email],
        html_message=message,
    )
    
    return Response({"detail": "If this email exists, a reset link has been sent."},
    status=status.HTTP_200_OK                    )

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def password_reset_confirm(request, uidb64, token):
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    
    if user is None or not password_reset_token.check_token(user, token):
        return Response({"detail": "Reset link is invalid!"}, status=status.HTTP_400_BAD_REQUEST)
    
    password = request.data.get('password')
    if not password:
        return Response({"password": "This field is required."}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        # Validate password complexity
        validate_password(password, user)
        user.set_password(password)
        user.save()
        
        # Return tokens for automatic login if desired
        refresh = RefreshToken.for_user(user)
        return Response({
            "detail": "Password has been reset successfully!",
            "refresh": str(refresh),
            "access": str(refresh.access_token)
        })
    except ValidationError as e :
        return Response(
            {'password': e.messages},
            status= status.HTTP_400_BAD_REQUEST
        )

@api_view(['GET'])
@ensure_csrf_cookie
def get_csrf_token(request):
    return Response({'csrfToken': get_token(request._request)})  # Use _request for HttpRequest


