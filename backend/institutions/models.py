from urllib.parse import parse_qs, urlparse
from django.db import models
from locations.models import District, DSDivision

class InstitutionType(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    
    def __str__(self):
        return self.name

class Institution(models.Model):
    TYPE_CHOICES = [
        ('HEAD', 'Head Office'),
        ('NATIONAL', 'National Institution'), 
        ('DISTRICT', 'District Office'),
    ]
    
    name = models.CharField(max_length=200)
    institution_type = models.ForeignKey(InstitutionType, on_delete=models.SET_NULL, null=True)
    description = models.CharField(max_length=500, blank=True)
    type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    district = models.ForeignKey(District,on_delete=models.SET_NULL,null=True,related_name='institutions')
    ds_division = models.ForeignKey( DSDivision, on_delete=models.SET_NULL, null=True, blank=True, related_name='institutions' )  
    city = models.CharField(max_length=100)
    address = models.TextField()
    email = models.EmailField()
    website = models.URLField(blank=True)
    phone1 = models.CharField(max_length=15)
    phone2 = models.CharField(max_length=15, blank=True)
    google_map_link = models.URLField( max_length=500 )
    head_name = models.CharField(max_length=100)
    head_position = models.CharField(max_length=100)
    image = models.ImageField(upload_to='institutions/', null=True, blank=True)
    is_active = models.BooleanField(default=True)
    display_order = models.PositiveIntegerField(default=0)
    
    class Meta:
        ordering = ['display_order']
        
    def __str__(self):
        return f"{self.name} ({self.get_type_display()})"
    
    def save(self, *args, **kwargs):
        # Convert regular Google Maps URL to embed format when saving
        if self.google_map_link:
            parsed = urlparse(self.google_map_link)
            
            # If it's already an embed URL, keep it
            if 'embed' in parsed.path:
                pass
            # Convert regular maps URL to embed format
            elif 'google.com/maps' in parsed.netloc:
                query = parse_qs(parsed.query)
                if 'q' in query:  # Coordinate-based link
                    coords = query['q'][0]
                    self.google_map_link = f'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15000!2d{coords.split(",")[1]}!3d{coords.split(",")[0]}'
                elif '/place/' in parsed.path:  # Place-based link
                    place_id = parsed.path.split('/place/')[1].split('/')[0]
                    self.google_map_link = f'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.9237755155727!2d79.8656!3d6.8406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTAnMjYuMSJOIDc5wrA1MSc1Ni4xIkU!5e0!3m2!1sen!2slk!4v1620000000000!5m2!1sen!2slk'
            
        super().save(*args, **kwargs)