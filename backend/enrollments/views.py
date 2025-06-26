from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.utils import timezone
from django.template.loader import render_to_string
from .models import Enrollment
from .serializers import EnrollmentSerializer,EnrollmentCreateSerializer
from users.models import User
from courses.models import CourseOffering
from django.core.mail import send_mail
from django.conf import settings


class EnrollmentViewSet(viewsets.ModelViewSet):
    serializer_class = EnrollmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.user_type == 3:  # Student
            return Enrollment.objects.filter(student=user)
        elif user.user_type == 2:  # Instructor
            return Enrollment.objects.filter(district=user.district)
        return Enrollment.objects.all()  # Admin
     
    def get_serializer_class(self):
        if self.action == 'create':
            return EnrollmentCreateSerializer
        return super().get_serializer_class()

    def perform_create(self, serializer):
        if self.request.user.user_type != 3:
            raise permissions.PermissionDenied("Only students can create enrollments")
        serializer.save(student=self.request.user)

    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        enrollment = self.get_object()
        if request.user.user_type not in [1, 2]:  # Only admin/instructor
            raise permissions.PermissionDenied()
        
        enrollment.status = 'approved'
        enrollment.save()

        #send approval Email
        enrollment.send_status_notification()

        return Response({'status': 'enrollment approved'})

    @action(detail=True, methods=['post'])
    def reject(self, request, pk=None):
        enrollment = self.get_object()
        if request.user.user_type not in [1, 2]:  # Only admin/instructor
            raise permissions.PermissionDenied()
        
        rejection_reason = request.data.get('rejection_reason', '')
        enrollment.status = 'rejected'
        enrollment.rejection_reason = rejection_reason
        enrollment.save()

        #send rejection email
        enrollment.send_status_notification()

        return Response({'status': 'enrollment rejected'})
    
    def _send_approval_email(self,enrollment):
        subject = "Your Course Application Has Been Approved"
        message = render_to_string('emails/application_approved.html',{
            'student':enrollment.student,
            'course':enrollment.offering.course,
        })

        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [enrollment.student.email],
            fail_silently=False,
        )

    def _send_rejecton_email(self,enrollment):
        subject = "Your Course Application Has Been Rejected"
        message = render_to_string('emails/application_rejected.html', {
            'student': enrollment.student,
            'course': enrollment.offering.course,
            'reason': enrollment.rejection_reason,
        })
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [enrollment.student.email],
            fail_silently=False,
        )