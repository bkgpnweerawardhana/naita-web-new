from django.db import models
from users.models import User
from courses.models import CourseOffering
from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from institutions.models import District

class Enrollment(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
        ('completed', 'Completed'),
    )
    
    student = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'user_type': 3})
    offering = models.ForeignKey(CourseOffering, on_delete=models.CASCADE)
    district = models.ForeignKey(District,on_delete=models.SET_NULL,null=True,blank=True)
    applied_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    comments = models.TextField(blank=True)
    rejection_reason = models.TextField(blank=True)
    
    def __str__(self):
        return f"{self.student} - {self.offering}"
    
    def save(self,*args,**kwargs):
        # set Destrict based on student's district when creating 
        if not self.pk and self.student.district:
            self.district = self.student.district
        super().save(*args, **kwargs)

    
    def send_status_notification(self):
        if self.status == 'approved':
            subject = f"Your Application for {self.offering.course.title} Has Been Approved"
            template = 'emails/application_approved.html'
            context = {
                'student': self.student,
                'course': self.offering.course,
            }
        elif self.status == "rejected":
            subject = f"Your Application for {self.offering.course.title} Has Been Rejected"
            template = 'emails/application_rejected.html'
            context = {
                'student': self.student,
                'course': self.offering.course,
                'reason': self.rejection_reason,
            }
        else:
            return  # No notification for other statuses

        # Render the email content
        html_message = render_to_string(template, context)
        plain_message = strip_tags(html_message)  # Fallback for non-HTML email clients

        send_mail(
            subject,
            plain_message,
            settings.DEFAULT_FROM_EMAIL,
            [self.student.email],
            html_message=html_message,
            fail_silently=False,
        )
