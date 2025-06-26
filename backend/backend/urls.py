from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from .views import test_smtp_view
from drf_yasg.views import get_schema_view
from drf_yasg import openapi


schema_view = get_schema_view(
   openapi.Info(
      title="NAITA API",
      default_version='v1',
      description="National Apprentice and Industrial Training Authority API",
   ),
   public=True,
)

urlpatterns = [
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
   #  path('grappelli/', include('grappelli.urls')),
    path('admin/', admin.site.urls),
    path('api/courses/', include('courses.urls')),
    path('api/users/', include('users.urls')),
    path('api/enrollments/', include('enrollments.urls')),
    path('api/news/', include('news.urls')),
    path('api/testimonials/', include('testimonials.urls')),
    path('api/faqs/', include('faqs.urls')),
    path('api/about-us/', include('aboutus.urls')),
    path('api/institutions/',include('institutions.urls')),
    path('api/locations/',include('locations.urls')),
    path('test-smtp/', test_smtp_view, name='test_smtp_view'),
    path('api/chat/', include('chatbot.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)




