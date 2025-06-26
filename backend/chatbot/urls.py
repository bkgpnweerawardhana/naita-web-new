from django.urls import path
from . import views

urlpatterns = [
    path('', views.chat_with_gpt, name='chatbot'),  # Changed from 'chat/'
]