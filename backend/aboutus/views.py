from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.decorators import action  
from .models import BoardMember, Objective, QualityPolicy
from .serializers import BoardMemberSerializer, ObjectiveSerializer, QualityPolicySerializer
from rest_framework.response import Response
from rest_framework import status
# Create your views here.
class BoardMemberViewSet(viewsets.ModelViewSet):
    queryset = BoardMember.objects.filter(is_active=True)
    serializer_class = BoardMemberSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        position = self.request.query_params.get('position', None)
        if position:
            queryset = queryset.filter(position=position)
        return queryset.order_by('display_order')

class QualityPolicyViewSet(viewsets.ModelViewSet):
    queryset = QualityPolicy.objects.filter(is_active=True)
    serializer_class = QualityPolicySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    http_method_names = ['get']  # Read-only

    @action(detail=False)
    def active(self, request):
        policy = self.queryset.first()
        serializer = self.get_serializer(policy)
        return Response(serializer.data)

class ObjectiveViewSet(viewsets.ModelViewSet):
    queryset = Objective.objects.filter(is_active=True)
    serializer_class = ObjectiveSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    http_method_names = ['get']  # Read-only