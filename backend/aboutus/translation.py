from modeltranslation.translator import register, TranslationOptions
from .models import  BoardMember, QualityPolicy, Objective



@register(BoardMember)
class BoardMemberTranslationOptions(TranslationOptions):
    fields = ('name', 'position', 'role','department')

@register(QualityPolicy)
class QualityPolicyTranslationOptions(TranslationOptions):
    fields = ('content',)

@register(Objective)
class ObjectiveTranslationOptions(TranslationOptions):
    fields = ( 'description',)
