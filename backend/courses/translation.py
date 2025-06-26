from modeltranslation.translator import register, TranslationOptions
from .models import (
  Course, 
  CourseCategory, 
  DashboardStat, 
  Service,
  HeroContent,
  PopularCourse,
  CourseModule,
  CourseTopic,
)


@register(Course)
class CourseTranslationOptions(TranslationOptions):
    fields = ('title', 'description', 'certification','features','requirements',)

@register(CourseCategory)
class CourseCategoryTranslationOptions(TranslationOptions):
    fields = ('name', 'description',)

@register(CourseModule)
class CourseModuleTranslationOptions(TranslationOptions):
    fields = ('title',)

@register(CourseTopic)
class CourseTopicTranslationOptions(TranslationOptions):
    fields = ('title', 'description',)

@register(HeroContent)
class HeroContentTranslationOptions(TranslationOptions):
    fields = ('title', 'description', 'button_text',)

@register(DashboardStat)
class DashboardStatTranslationOptions(TranslationOptions):
    fields = ('active_learners', 'total_courses', 'proud_graduates',)

@register(PopularCourse)
class PopularCourseTranslationOptions(TranslationOptions):
    fields = ('name',)


@register(Service)
class ServiceTranslationOptions(TranslationOptions):
    fields = ('title', 'description',)