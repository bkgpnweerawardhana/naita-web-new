

# Create your models here.
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from locations.models import District

class User(AbstractUser):
    USER_TYPE_CHOICES = (
        (1, 'Admin'),
        (2, 'Approver'),
        (3, 'Student'),
    )
   

    user_type = models.PositiveSmallIntegerField(choices=USER_TYPE_CHOICES, default=3)
    nic_number = models.CharField(max_length=12, unique=True, null=True, blank=True)
    phone = models.CharField(max_length=15)
    address = models.TextField(null=True, blank=True)
    # district = models.CharField(max_length=100, blank=True, null=True)
    district = models.ForeignKey(District,on_delete=models.SET_NULL, null=True, blank=True, related_name='users' ) # i updated the district field after the institution app created
    date_of_birth = models.DateField(null=True, blank=True)
    profile_picture = models.ImageField(upload_to='profile_pics/', null=True, blank=True)
    is_verified = models.BooleanField(default=False)
    # email = models.EmailField(unique=False) # from now on the email is unique

    # Student-specific fields
    education_qualifications = models.JSONField(default=list, blank=True)
    work_experience = models.JSONField(default=list, blank=True)
    
    def __str__(self):
        return self.get_full_name() or self.username