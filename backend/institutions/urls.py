from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import InstitutionViewSet, InstitutionTypeViewSet

router = DefaultRouter()
router.register(r'institutions', InstitutionViewSet)
router.register(r'institution-types', InstitutionTypeViewSet)

urlpatterns = router.urls