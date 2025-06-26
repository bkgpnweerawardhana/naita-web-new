from modeltranslation.translator import register, TranslationOptions
from .models import Institution, InstitutionType


@register(Institution)
class InstitutionTranslationOptions(TranslationOptions):
  fields =('name','address','city','head_name','head_position','description',)

@register(InstitutionType)
class InstitutionTypeTranslationOptions(TranslationOptions):
  fields = ('name','description',)



