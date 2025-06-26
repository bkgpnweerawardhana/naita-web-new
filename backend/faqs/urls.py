from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import FAQViewSet

router = DefaultRouter()
router.register(r'faqs', FAQViewSet, basename='faq')

urlpatterns = router.urls