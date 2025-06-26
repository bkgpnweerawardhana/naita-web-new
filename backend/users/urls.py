
from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import ( UserViewSet, 
                    LoginView, 
                    RegisterView, 
                    LogoutView,
                    activate_account,
                    password_reset_request,
                    password_reset_confirm,
                )
from . import views
router = DefaultRouter()
router.register(r'', UserViewSet)

urlpatterns = [
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/activate/<uidb64>/<token>/',activate_account,name='activate_account'),
    path('auth/password/reset/',password_reset_request,name="password_reset"),
    path('auth/password/reset/confirm/<uidb64>/<token>/',password_reset_confirm,name="password_reset_confirm"),
    path('auth/login/', LoginView.as_view(), name='login'),
    path('auth/logout/', LogoutView.as_view(), name='logout'),
     path('csrf/', views.get_csrf_token, name='get_csrf_token'),
] + router.urls