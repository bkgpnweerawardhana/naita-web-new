import re
from urllib import request
from rest_framework import serializers
from .models import NewsCategory, NewsPost
from users.serializers import UserSerializer

class NewsCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsCategory
        fields = ['id', 'name', 'slug']

    def get_name(self, obj):
        return obj.name if obj.name else "No Name Provided"
    def get_slug(self, obj):
        return obj.slug if obj.slug else "No Slug Provided"
    

class NewsPostSerializer(serializers.ModelSerializer):
    category = NewsCategorySerializer(read_only=True)
    author = UserSerializer(read_only=True)
    image_url = serializers.SerializerMethodField()
    content = serializers.SerializerMethodField()
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    
    class Meta:
        model = NewsPost
        fields = [
            'id', 'title', 'slug', 'description', 'content', 
            'image_url', 'category', 'post_type', 'author',
            'created_at', 'updated_at'
        ]
    
    def get_image_url(self, obj):
        if obj.image:
            return self.context['request'].build_absolute_uri(obj.image.url)
        return None
    
    def get_title(self,obj):
        request = self.context.get('request')
        language = request.query_params.get('language', 'en') if request else 'en'
        return getattr(obj, f'title_{language}', obj.title)

    def get_description(self, obj):
        request = self.context.get('request')
        language = request.query_params.get('language', 'en') if request else 'en'
        return getattr(obj, f'description_{language}', obj.description)
    
    def get_content(self, obj):
        request = self.context.get('request')
        language = request.query_params.get('language', 'en') if request else 'en'
        return getattr(obj, f'content_{language}', obj.content)
    
    def get_slug(self, obj):
        return obj.slug if obj.slug else "No Slug Provided"
