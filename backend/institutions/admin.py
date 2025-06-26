from django.contrib import admin
from .models import Institution, InstitutionType

@admin.register(InstitutionType)
class InstitutionTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name',)

@admin.register(Institution)
class InstitutionAdmin(admin.ModelAdmin):
    list_display = ('name', 'type', 'city', 'head_name', 'is_active')
    list_filter = ('type', 'is_active')
    search_fields = ('name', 'city', 'head_name')
    list_editable = ('is_active',)