from django.db import models
from users.models import User
from locations.models import District
from institutions.models import Institution

class CourseCategory(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=50, blank=True)
    
    def __str__(self):
        return self.name
    


class Course(models.Model):
    DURATION_UNITS = (
        ('weeks', 'Weeks'),
        ('months', 'Months'),
        ('years', 'Years'),
    )

    NVQ_LEVELS=(
        ('none','None-NVQ'),
        ('nvq3','NVQ Level 3'),
        ('nvq4','NVQ Level 4'),
        ('both','Both NVQ 3 & 4'),
    )

    TRAINING_TYPES =(
        ('cbt','Center Based Training'),
        ('ebt','Enterprise Based Training'),
        ('both','Both CBT & EBT'),
    )
    
    # Basic Information
    title = models.CharField(max_length=200)
    code = models.CharField(max_length=20, unique=True)
    category = models.ForeignKey(CourseCategory, on_delete=models.SET_NULL, null=True)
    description = models.TextField()

    #NVQ information
    nvq_level = models.CharField(max_length=10, choices=NVQ_LEVELS, default='none', help_text="NVQ Level of the course")
    training_type = models.CharField(max_length=10, choices=TRAINING_TYPES, default='cbt', help_text="Type of training provided")
    is_free = models.BooleanField(default=False, help_text="Indicates if the course is free of charge")

    # Durtion information
    nvq3_duration = models.PositiveIntegerField(null=True, blank=True, help_text="Duration for NVQ Level 3")
    nvq3_duration_unit = models.CharField(max_length=10, choices=DURATION_UNITS, null=True, blank=True, help_text="Unit for NVQ Level 3 duration")
    nvq4_duration = models.PositiveIntegerField(null=True, blank=True, help_text="Duration for NVQ Level 4")
    nvq4_duration_unit = models.CharField(max_length=10, choices=DURATION_UNITS, null=True, blank=True, help_text="Unit for NVQ Level 4 duration")
    non_nvq_duration = models.PositiveIntegerField(null=True, blank=True, help_text="Duration for non-NVQ courses")
    non_nvq_duration_unit = models.CharField(max_length=10, choices=DURATION_UNITS, null=True, blank=True, help_text="Unit for non-NVQ course duration")

    # Pricing Information
    fee = models.DecimalField(max_digits=10,null=True,blank=True, decimal_places=2, help_text="Fee for the course")
    registration_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0, help_text="Registration fee for the course")

   
    # Visual Elements
    thumbnail = models.ImageField(upload_to='course_thumbnails/', null=True, blank=True)
    background_image = models.ImageField(upload_to='course_backgrounds/', null=True, blank=True)
    
    # Course Details
    certification = models.CharField(max_length=100, blank=True)
    available_districts = models.ManyToManyField(District,blank=True,related_name='courses')
    features = models.JSONField(default=list, help_text="List of course features")
    
      
    # Requirements
    requirements = models.JSONField(default=list, help_text="List of entry qualifications")
    
    # Administrative
    syllabus = models.FileField(upload_to='course_syllabus/', null=True, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.code} - {self.title}"
    
    def get_duration_display(self,nvq_level=None):
        """Returns duration display for the specified NVQ level or based on course's NVQ level"""
        if nvq_level == 'nvq3' or (not nvq_level and self.nvq_level in ['nvq3', 'both'] and self.nvq3_duration):
            return f"{self.nvq3_duration} {self.get_nvq3_duration_unit_display()}"
        elif nvq_level == 'nvq4' or (not nvq_level and self.nvq_level in ['nvq4', 'both'] and self.nvq4_duration):
            return f"{self.nvq4_duration} {self.get_nvq4_duration_unit_display()}"
        elif nvq_level == 'none' or (not nvq_level and self.nvq_level == 'none' and self.non_nvq_duration):
            return f"{self.non_nvq_duration} {self.get_non_nvq_duration_unit_display()}"
        return "Duration not specified"
    
    def get_fee_display(self):
        """Returns the fee display, considering if the course is free or not"""
        if self.is_free:
            return "Free"
        return f"Rs. {self.fee:.2f}" if self.fee else "Fee not specified"
    def get_registration_fee_display(self):
        """Returns the registration fee display"""
        return f"Rs. {self.registration_fee:.2f}" if self.registration_fee else "Registration fee not specified"



class CourseModule(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='modules')
    title = models.CharField(max_length=200)
    order = models.PositiveIntegerField(default=0)
    
    class Meta:
        ordering = ['order']
        verbose_name = "Module"
        verbose_name_plural = "Modules"
    
    def __str__(self):
        return f"{self.order}. {self.title}"

class CourseTopic(models.Model):
    module = models.ForeignKey(CourseModule, on_delete=models.CASCADE, related_name='topics')
    title = models.CharField(max_length=200)
    order = models.PositiveIntegerField(default=0)
    description = models.TextField(blank=True)
    
    class Meta:
        ordering = ['order']
        verbose_name = "Topic"
        verbose_name_plural = "Topics"
    
    def __str__(self):
        return f"{self.order}. {self.title}"



class CourseOffering(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE,null=True,limit_choices_to={'type__in':['DISTRICT','NATIONAL']}) # only allow national and district office to have courses
    start_date = models.DateField()
    end_date = models.DateField()
    instructor = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, limit_choices_to={'user_type': 2})
    schedule = models.CharField(max_length=200)  # e.g., "Mon, Wed, Fri 6-9 PM"
    available_seats = models.PositiveIntegerField()
    is_active = models.BooleanField(default=True)
    
    class Meta:
        unique_together = ('course', 'institution', 'start_date', 'schedule')
    
    def __str__(self):
        return f"{self.course.title} at {self.institution.name}"



class HeroContent(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    button_text = models.CharField(max_length=50, default="Register Now")
    # background_image = models.ImageField(upload_to='hero_images/')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title  

class HeroImage(models.Model):
    hero_content = models.ForeignKey(HeroContent, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='hero_images/')
    order = models.PositiveIntegerField(default=0)  
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"Image {self.order} for {self.hero_content.title}"


# models.py
# courses/models.py


class Service(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    icon_name = models.CharField(max_length=50, blank=True)
    display_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['display_order']

    def __str__(self):
        return self.title

class DashboardStat(models.Model):
    active_learners = models.PositiveIntegerField(default=0)
    total_courses = models.PositiveIntegerField(default=0)
    proud_graduates = models.PositiveIntegerField(default=0)
    current_year = models.PositiveIntegerField()
    last_updated = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Dashboard Statistics"
        verbose_name_plural = "Dashboard Statistics"

    def __str__(self):
        return f"Stats for {self.current_year}"

class PopularCourse(models.Model):
    name = models.CharField(max_length=100)
    percentage = models.PositiveIntegerField()
    year = models.PositiveIntegerField()
    stats = models.ForeignKey(DashboardStat, on_delete=models.CASCADE, related_name='popular_courses')

    def __str__(self):
        return f"{self.name} ({self.year})"