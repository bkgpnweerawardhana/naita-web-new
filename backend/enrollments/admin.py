from django.contrib import admin
from .models import Enrollment
from django.http import HttpResponse
import csv

@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ('student', 'offering', 'status', 'applied_date', 'district')
    ordering = ('applied_date',)
    actions = ['export_as_csv'] # Register your action here

    def export_as_csv(self, request, queryset):
        meta = self.model._meta
        field_names = [field.name for field in meta.fields]

        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename={}.csv'.format(meta).replace('.', '_')
        writer = csv.writer(response)

        writer.writerow(field_names)
        for obj in queryset:
            writer.writerow([getattr(obj, field) for field in field_names])

        return response

    export_as_csv.short_description = "Export selected Enrollments as CSV"