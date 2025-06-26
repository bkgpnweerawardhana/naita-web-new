from rest_framework import serializers
from .models import BoardMember, Objective, QualityPolicy
class BoardMemberSerializer(serializers.ModelSerializer):
    profile_pic_url = serializers.SerializerMethodField()
    
    class Meta:
        model = BoardMember
        fields = ['id', 'name', 'position', 'role', 'department', 
                 'phone1', 'phone2', 'email', 'profile_pic_url']
    
    def get_profile_pic_url(self, obj):
        if obj.profile_pic:
            return self.context['request'].build_absolute_uri(obj.profile_pic.url)
        return None

class ObjectiveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Objective
        fields = ['id', 'description', 'display_order']

class QualityPolicySerializer(serializers.ModelSerializer):
    class Meta:
        model = QualityPolicy
        fields = ['id', 'content']