# locations/views.py
from rest_framework import viewsets
from rest_framework import filters
from .models import Province, District, DSDivision
from .serializers import ProvinceSerializer, DistrictSerializer, DSDivisionSerializer
from django.utils.translation import activate


class ProvinceViewSet(viewsets.ModelViewSet):
    queryset = Province.objects.filter(is_active=True)
    serializer_class = ProvinceSerializer
    lookup_field = 'name'
    search_fields = ['name']

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

class DistrictViewSet(viewsets.ModelViewSet):
    queryset = District.objects.filter(is_active=True)
    serializer_class = DistrictSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'province__name']

    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context
    
    def get_queryset(self):
        lang = self.request.query_params.get('language', 'en')
        activate(lang)
        queryset = super().get_queryset()
        province_id = self.request.query_params.get('province')
        # if province:
        #     queryset = queryset.filter(province__name=province)
        # return queryset
        if province_id:
          try:
              # Convert to integer and filter by province__id
              queryset = queryset.filter(province__id=int(province_id)) 
          except ValueError:
              # Handle cases where province_id might not be a valid integer
              queryset = queryset.none() 
        return queryset

    def get_object(self):
        lang = self.request.query_params.get('language', 'en')
        activate(lang)


class DSDivisionViewSet(viewsets.ModelViewSet):
    queryset = DSDivision.objects.filter(is_active=True)
    serializer_class = DSDivisionSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'district__name', 'district__province__name']

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context
    
    def get_queryset(self):
        queryset = super().get_queryset()
        district_id = self.request.query_params.get('district')
        # if district:
        #     queryset = queryset.filter(district__name=district)
        # return queryset

        if district_id:
          try:
              # Convert to integer and filter by province__id
              queryset = queryset.filter(district__id=int(district_id)) 
          except ValueError:
              # Handle cases where district_id might not be a valid integer
              queryset = queryset.none() 
        return queryset
