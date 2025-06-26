from modeltranslation.translator import register, TranslationOptions
from .models import Province,District,DSDivision


@register(Province)
class ProvinceTranslationOptions(TranslationOptions):
    fields = ('name',)

@register(District)
class DistrictTranslationOptions(TranslationOptions):
    fields = ('name',)

@register(DSDivision)
class DSDivisionTranslationOptions(TranslationOptions):
    fields = ('name',)
