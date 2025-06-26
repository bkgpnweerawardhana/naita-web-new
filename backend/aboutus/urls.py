from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import BoardMemberViewSet, QualityPolicyViewSet, ObjectiveViewSet

router = DefaultRouter()
router.register(r'board-members', BoardMemberViewSet, basename='board-member')
router.register(r'quality-policy', QualityPolicyViewSet)
router.register(r'objectives', ObjectiveViewSet)

urlpatterns = router.urls