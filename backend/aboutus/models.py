from django.db import models

# Create your models here.
class BoardMember(models.Model):
    POSITION_CHOICES = [
        ('minister', 'Minister of Education'),
        ('deputy', 'Deputy Minister'),
        ('director', 'Director General'),
        ('management', 'Top Management'),
    ]
    
    name = models.CharField(max_length=200)
    position = models.CharField(max_length=50, choices=POSITION_CHOICES)
    role = models.CharField(max_length=100)
    department = models.CharField(max_length=100, blank=True)
    phone1 = models.CharField(max_length=15)
    phone2 = models.CharField(max_length=15, blank=True)
    email = models.EmailField()
    profile_pic = models.ImageField(upload_to='board_members/')
    display_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['display_order']
        
    def __str__(self):
        return f"{self.name} - {self.get_position_display()}"
    

  

class QualityPolicy(models.Model):
    content = models.TextField()
    is_active = models.BooleanField(default=True)
    last_updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Quality Policy"
        
    def __str__(self):
        return "Quality Policy"

class Objective(models.Model):
    description = models.TextField()
    display_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['display_order']
        
    def __str__(self):
        return f"Objective {self.display_order}: {self.description[:50]}..."

# in aboutus/models.py (or wherever HeroContent is)

class HeroContent(models.Model):
    ...
    background_image = models.ImageField(upload_to='hero/', null=True, blank=True)

# Keep your existing BoardMember model