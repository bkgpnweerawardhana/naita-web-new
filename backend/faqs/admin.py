from django.contrib import admin
from .models import FAQ

@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ('question', 'category', 'display_order', 'is_active')
    list_filter = ('is_active', 'category')
    search_fields = ('question', 'answer')
    list_editable = ('display_order', 'is_active')