

# class Course(models.Model):
#     DURATION_UNITS = (
#         ('weeks', 'Weeks'),
#         ('months', 'Months'),
#         ('years', 'Years'),
#     )
    
#     # Basic Information
#     title = models.CharField(max_length=200)
#     code = models.CharField(max_length=20, unique=True)
#     category = models.ForeignKey(CourseCategory, on_delete=models.SET_NULL, null=True)
#     description = models.TextField()
    
#     # Duration and Pricing
#     duration = models.PositiveIntegerField()
#     duration_unit = models.CharField(max_length=10, choices=DURATION_UNITS)
#     fee = models.DecimalField(max_digits=10, decimal_places=2)
#     registration_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    
#     # Visual Elements
#     thumbnail = models.ImageField(upload_to='course_thumbnails/', null=True, blank=True)
#     background_image = models.ImageField(upload_to='course_backgrounds/', null=True, blank=True)
    
#     # Course Details
#     certification = models.CharField(max_length=100, blank=True)
#     # districts = models.JSONField(default=list, help_text="List of available districts for this course")
#     available_districts = models.ManyToManyField(District,blank=True,related_name='courses')
#     features = models.JSONField(default=list, help_text="List of course features")
    
#     # Course Content Structure
#     content = models.JSONField(
#         default=list,
#         help_text="Structured content in format [{'title': 'Module 1', 'topics': ['Topic 1', 'Topic 2']}]"
#     )
    
#     # Requirements
#     requirements = models.JSONField(default=list, help_text="List of entry qualifications")
    
#     # Administrative
#     syllabus = models.FileField(upload_to='course_syllabus/', null=True, blank=True)
#     is_active = models.BooleanField(default=True)
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)
    
#     def __str__(self):
#         return f"{self.code} - {self.title}"
    
#     def get_duration_display(self):
#         return f"{self.duration} {self.get_duration_unit_display()}"

