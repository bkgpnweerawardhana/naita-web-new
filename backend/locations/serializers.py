# locations/serializers.py
from rest_framework import serializers
from .models import Province, District, DSDivision
from modeltranslation.utils import get_translation_fields

class DSDivisionSerializer(serializers.ModelSerializer):
    class Meta:
        model = DSDivision
        fields = ['id', 'name']
    
    def get_name(self, obj):
        request = self.context.get('request')
        language = request.query_params.get('language', 'en') if request else 'en'
        return getattr(obj, f'name_{language}', obj.name)

class DistrictSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    ds_divisions = DSDivisionSerializer(many=True, read_only=True)
    class Meta:
        model = District
        fields = ['id', 'name', 'ds_divisions']

    def get_name(self, obj):
        request = self.context.get('request')
        language = request.query_params.get('language', 'en') if request else 'en'
        return getattr(obj, f'name_{language}', obj.name)

class ProvinceSerializer(serializers.ModelSerializer):
    districts = DistrictSerializer(many=True, read_only=True)
    
    class Meta:
        model = Province
        fields = ['id', 'name', 'districts']
    
    def get_name(self, obj):
        request = self.context.get('request')
        language = request.query_params.get('language', 'en') if request else 'en'
        return getattr(obj, f'name_{language}', obj.name)