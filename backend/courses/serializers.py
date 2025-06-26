from rest_framework import serializers
from .models import (
    CourseCategory, 
    Course, 
    CourseOffering, 
    HeroContent,
    HeroImage,
    Service, 
    PopularCourse,
    DashboardStat,
    CourseModule,
    CourseTopic,
    )
from institutions.serializers import InstitutionSerializer
from institutions.models import District


class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseTopic
        fields = ['id', 'title', 'order', 'description']

class ModuleSerializer(serializers.ModelSerializer):
    topics = TopicSerializer(many=True, read_only=True)
    
    class Meta:
        model = CourseModule
        fields = ['id', 'title', 'order', 'topics']


class CourseCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseCategory
        fields = '__all__'


class CourseSerializer(serializers.ModelSerializer):
    category = CourseCategorySerializer(read_only=True)
    duration_display = serializers.SerializerMethodField()
    fee_display = serializers.SerializerMethodField()
    registration_fee_display = serializers.SerializerMethodField()
    available_districts = serializers.SlugRelatedField(
        many=True,
        queryset=District.objects.filter(is_active=True),
        required=False,
        slug_field = 'name',

    )
    
    class Meta:
        model = Course
        fields = '__all__'
        extra_kwargs = {
            'nvq3_duration': {'required': False},
            'nvq3_duration_unit': {'required': False},
            'nvq4_duration': {'required': False},
            'nvq4_duration_unit': {'required': False},
            'non_nvq_duration': {'required': False},
            'non_nvq_duration_unit': {'required': False},
            'fee': {'required': False},
        }

    
    
    def get_duration_display(self, obj):
        return obj.get_duration_display()

    def get_fee_display(self, obj):
        return obj.get_fee_display()
    
    def get_registration_fee_display(self, obj):
        return obj.get_registration_fee_display()
    
    def validate(self, data):
        '''Validate that the correct duration fields are provided based on the NVQ level.'''
        nvq_level = data.get('nvq_level', self.instance.nvq_level if self.instance else None)
        
        if nvq_level in ['nvq3', 'both']:
            if not data.get('nvq3_duration') or not data.get('nvq3_duration_unit'):
                raise serializers.ValidationError("NVQ Level 3 duration information is required")
        
        if nvq_level in ['nvq4', 'both']:
            if not data.get('nvq4_duration') or not data.get('nvq4_duration_unit'):
                raise serializers.ValidationError("NVQ Level 4 duration information is required")
        
        if nvq_level == 'none':
            if not data.get('non_nvq_duration') or not data.get('non_nvq_duration_unit'):
                raise serializers.ValidationError("Non-NVQ duration information is required")
        
        if not data.get('is_free', False) and not data.get('fee'):
            raise serializers.ValidationError("Fee is required for non-free courses")
        
        return data

class CourseOfferingSerializer(serializers.ModelSerializer):
    course = CourseSerializer(read_only=True)
    center = InstitutionSerializer(read_only=True)
    
    class Meta:
        model = CourseOffering
        fields = '__all__'

class HeroImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    def get_image(self,obj):
        if obj.image:
            return self.context['request'].build_absolute_uri(obj.image.url)
        return None
    
    class Meta:
        model = HeroImage
        fields = ['image','order']

class HeroContentSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField()

    def get_images(self, obj):
        # Get active images ordered by their 'order' field
        images = obj.images.filter(is_active=True).order_by('order')
        # Use the HeroImageSerializer to serialize each image
        return HeroImageSerializer(images, many=True, context=self.context).data

   

    class Meta:
        model = HeroContent
        fields = '__all__'

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'title', 'description', 'icon_name', 'display_order']

class PopularCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = PopularCourse
        fields = ['name', 'percentage']

class DashboardStatSerializer(serializers.ModelSerializer):
    popular_courses = PopularCourseSerializer(many=True)
    
    class Meta:
        model = DashboardStat
        fields = ['active_learners', 'total_courses', 'proud_graduates', 'current_year', 'popular_courses']
    
    def get_popular_courses(self,obj):
        return obj.popular_courses if obj.popular_courses else 'no popular courses provided'
