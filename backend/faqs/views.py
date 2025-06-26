from rest_framework import viewsets
from .models import FAQ
from .serializers import FAQSerializer
from django.utils.translation import activate

class FAQViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = FAQSerializer
    queryset = FAQ.objects.filter(is_active=True).order_by('display_order')
    
    def get_queryset(self):
        lang = self.request.query_params.get('language','en')
        activate(lang)
        return super().get_queryset()
