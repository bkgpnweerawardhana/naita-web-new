from rest_framework import serializers
from .models import Institution, InstitutionType
from locations.serializers import DistrictSerializer, DSDivisionSerializer

class InstitutionTypeSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    class Meta:
        model = InstitutionType
        fields = '__all__'
    def get_name(self, obj):
        return obj.name if obj.name else "No Name Provided"
    
    def get_description(self, obj):
        return obj.description if obj.description else "No Description Provided"

class InstitutionSerializer(serializers.ModelSerializer):
    institution_type = InstitutionTypeSerializer(read_only=True)
    district =DistrictSerializer(read_only=True)
    ds_division = DSDivisionSerializer(read_only=True)
    image_url = serializers.SerializerMethodField()
    name = serializers.SerializerMethodField()
    
    
    class Meta:
        model = Institution
        fields = '__all__'
    
    def get_name(self, obj):
        request = self.context.get('request')
        language = request.query_params.get('language', 'en') if request else 'en'
        return getattr(obj, f'name_{language}', obj.name)
    
    def get_image_url(self, obj):
        if obj.image:
            return self.context['request'].build_absolute_uri(obj.image.url)
        return None