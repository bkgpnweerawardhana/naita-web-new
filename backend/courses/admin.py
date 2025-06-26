from django.contrib import admin
from django import forms
from django_json_widget.widgets import JSONEditorWidget
from .models import Course, CourseCategory, CourseOffering, HeroContent, HeroImage, Service, DashboardStat, PopularCourse, CourseModule, CourseTopic
from django.urls import reverse
from django.utils.html import format_html

class TopicInline(admin.StackedInline):
    model = CourseTopic
    extra = 1
    ordering = ('order',)
    fields = ('order', 'title', 'description')
    classes = ['collapse']  # Makes them collapsible

@admin.register(CourseModule)
class ModuleAdmin(admin.ModelAdmin):
    list_display = ('title', 'course_link', 'order')
    list_editable = ('order',)
    inlines = [TopicInline]
    list_filter = ('course',)
    
    def course_link(self, obj):
        url = reverse('admin:courses_course_change', args=[obj.course.id])
        return format_html('<a href="{}">{}</a>', url, obj.course.title)
    course_link.short_description = 'Course'


class CourseAdminForm(forms.ModelForm):
    class Meta:
        model = Course
        fields = '__all__'
        widgets = {
            'features': JSONEditorWidget,
            'requirements': JSONEditorWidget,
        
        }

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    form = CourseAdminForm
    list_display = ('code', 'title', 'category', 'nvq_level', 'training_type','is_free', 'is_active')
    list_filter = ('category', 'is_active','nvq_level', 'training_type', 'is_free')
    filter_horizontal = ('available_districts',)
    search_fields = ('title', 'code', 'description')
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'code', 'category', 'description')
        }),
        ('NVQ Information', {
            'fields': ('nvq_level', 'training_type', 'is_free')
        }),
        ('Duration Information', {
            'fields': (
                ('nvq3_duration', 'nvq3_duration_unit'),
                ('nvq4_duration', 'nvq4_duration_unit'),
                ('non_nvq_duration', 'non_nvq_duration_unit'),
            )
        }),
        ('Pricing Information', {
            'fields': ('fee', 'registration_fee')
        }),
        ('Visual Elements', {
            'fields': ('thumbnail', 'background_image')
        }),
        ('Course Details', {
            'fields': ('certification', 'available_districts', 'features', 'requirements')
        }),
        ('Administrative', {
            'fields': ('syllabus', 'is_active')
        }),
    )

    def get_queryset(self, request):
        return super().get_queryset(request).prefetch_related('available_districts')

# Keep rest as is
admin.site.register(CourseCategory)
# admin.site.register(TrainingCenter)
@admin.register(CourseOffering)
class CourseOffering(admin.ModelAdmin):
    list_display = ('course', 'institution', 'start_date', 'end_date', 'is_active')
    list_filter = ('course', 'institution', 'is_active')
    search_fields = ('course__title', 'institution__name')


class HeroImageInline(admin.TabularInline):
    model = HeroImage
    extra = 1

@admin.register(HeroContent)
class HeroContentAdmin(admin.ModelAdmin):
    inlines= [HeroImageInline]
    list_display = ('title','is_active')

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'display_order', 'is_active')
    list_editable = ('display_order', 'is_active')
    list_filter = ('is_active',)
    search_fields = ('title', 'description')

class PopularCourseInline(admin.TabularInline):
    model = PopularCourse
    extra = 1

@admin.register(DashboardStat)
class DashboardStatAdmin(admin.ModelAdmin):
    list_display = ('current_year', 'last_updated', 'is_active')
    list_editable = ('is_active',)
    inlines = [PopularCourseInline]
