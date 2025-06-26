from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Institution, InstitutionType
from .serializers import InstitutionSerializer, InstitutionTypeSerializer
from django_filters.rest_framework import DjangoFilterBackend
from django.utils.translation import activate

class InstitutionTypeViewSet(viewsets.ModelViewSet):
    queryset = InstitutionType.objects.all()
    serializer_class = InstitutionTypeSerializer
    
    def get_queryset(self):
        lang = self.request.query_params.get('language', 'en')
        activate(lang)
        return super().get_queryset()

class InstitutionViewSet(viewsets.ModelViewSet):
    queryset = Institution.objects.filter(is_active=True)
    serializer_class = InstitutionSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['type', 'institution_type']


    def get_queryset(self):
        lang = self.request.query_params.get('language', 'en')
        activate(lang)
        return super().get_queryset().order_by('name')

    # def get_object(self):
    #     lang = self.request.query_params.get('language', 'en')
    #     activate(lang)
    #     return super().get_object()