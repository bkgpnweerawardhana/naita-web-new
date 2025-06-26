
from modeltranslation.translator import register, TranslationOptions
from .models import NewsCategory, NewsPost


@register(NewsCategory)
class NewsCategoryTranslationOptions(TranslationOptions):
   fields = ('name',)

@register(NewsPost)
class NewsPostTranslationOptions(TranslationOptions):
   fields = ('title','description','content',)