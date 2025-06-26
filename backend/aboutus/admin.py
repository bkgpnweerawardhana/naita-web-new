from django.contrib import admin
from .models import BoardMember, Objective, QualityPolicy
# Register your models here.
@admin.register(BoardMember)
class BoardMemberAdmin(admin.ModelAdmin):
    list_display = ('name', 'position', 'role', 'display_order', 'is_active')
    list_editable = ('display_order', 'is_active')
    list_filter = ('position', 'is_active')
    search_fields = ('name', 'role')

@admin.register(Objective)
class ObjectiveAdmin(admin.ModelAdmin):
    list_display = ('description', 'display_order', 'is_active')
    list_editable = ('display_order', 'is_active')
    search_fields = ('description',)
    ordering = ('display_order',)

@admin.register(QualityPolicy)
class QualityPolicyAdmin(admin.ModelAdmin):
    list_display = ('content', 'is_active', 'last_updated')
    list_editable = ('is_active',)
    search_fields = ('content',)
    readonly_fields = ('last_updated',)
    