# locations/admin.py
from django.contrib import admin
from .models import Province, District, DSDivision

@admin.register(Province)
class ProvinceAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_active')
    list_editable = ('is_active',)
    search_fields = ('name',)

@admin.register(District)
class DistrictAdmin(admin.ModelAdmin):
    list_display = ('name', 'province', 'is_active')
    list_filter = ('province', 'is_active')
    list_editable = ('is_active',)
    search_fields = ('name', 'province__name')

@admin.register(DSDivision)
class DSDivisionAdmin(admin.ModelAdmin):
    list_display = ('name', 'district', 'province', 'is_active')
    list_filter = ('district__province', 'district', 'is_active')
    list_editable = ('is_active',)
    search_fields = ('name', 'district__name', 'district__province__name')
    
    def province(self, obj):
        return obj.district.province.name
    province.admin_order_field = 'district__province__name'