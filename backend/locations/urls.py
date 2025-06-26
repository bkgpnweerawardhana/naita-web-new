# locations/urls.py
from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import ProvinceViewSet, DistrictViewSet, DSDivisionViewSet

router = DefaultRouter()
router.register(r'provinces', ProvinceViewSet)
router.register(r'districts', DistrictViewSet)
router.register(r'ds-divisions', DSDivisionViewSet)

urlpatterns = router.urls