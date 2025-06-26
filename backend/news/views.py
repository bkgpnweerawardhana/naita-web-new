from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import NewsCategory, NewsPost
from .serializers import NewsCategorySerializer, NewsPostSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny
from django.utils.translation import activate
from rest_framework.decorators import action
from rest_framework.response import Response

class NewsCategoryViewSet(viewsets.ModelViewSet):
    queryset = NewsCategory.objects.filter(is_active=True)
    serializer_class = NewsCategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = 'slug'

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

class NewsPostViewSet(viewsets.ModelViewSet):
    queryset = NewsPost.objects.filter(is_active=True).select_related('category', 'author')
    serializer_class = NewsPostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'post_type']
    search_fields = ['title', 'description', 'content']
    ordering_fields = ['created_at', 'updated_at']
    ordering = ['-created_at']
    lookup_field = 'slug'

    @action(detail=True, methods=['post'],permission_classes=[AllowAny])
    def increment_views(self, request, slug=None):
        post = self.get_object()
        post.views = models.F('views') + 1
        post.save(update_fields=['views'])
        return Response({'status': 'success'})
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context
