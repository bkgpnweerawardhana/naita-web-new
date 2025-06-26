from rest_framework import serializers
from .models import FAQ

class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = ['id', 'question', 'answer', 'category']
    
    def get_question(self,obj):
        return obj.question if obj.question else 'no question provided'
    
    
    def get_answer(self,obj):
        return obj.answer if obj.answer else 'no answer provided'
    