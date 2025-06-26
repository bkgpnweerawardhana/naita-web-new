# locations/migrations/0002_load_initial_locations.py
from django.db import migrations

def create_initial_data(apps, schema_editor):
    Province = apps.get_model('locations', 'Province')
    District = apps.get_model('locations', 'District')
    DSDivision = apps.get_model('locations', 'DSDivision')
    
    # Create provinces
    provinces_data = [
        {"name": "Central Province"},
        {"name": "Eastern Province"},
        {"name": "Northern Province"},
        {"name": "North Central Province"},
        {"name": "North Western Province"},
        {"name": "Sabaragamuwa Province"},
        {"name": "Southern Province"},
        {"name": "Uva Province"},
        {"name": "Western Province"}
    ]
    
    provinces = {}
    for data in provinces_data:
        province = Province.objects.create(**data)
        provinces[province.name] = province
    
    # Create districts and DS divisions
    sri_lanka_divisions = {
        "Central Province": {
            "Kandy District": [
                "Akurana", "Delthota", "Doluwa", "Gangawata Korale", "Ganga Ihala Korale",
                "Harispattuwa", "Hatharaliyadda", "Kundasale", "Medadumbara", "Minipe",
                "Panvila", "Pasbage Korale", "Pathadumbara", "Pathahewaheta", "Poojapitiya",
                "Thumpane", "Udadumbara", "Udapalatha", "Udunuwara", "Yatinuwara"
            ],
            "Matale District": [
                "Ambanganga Korale", "Dambulla", "Galewela", "Laggala-Pallegama", "Matale",
                "Naula", "Pallepola", "Ukuwela", "Wilgamuwa", "Yatawatta"
            ],
            "Nuwara Eliya District": [
                "Ambagamuwa", "Kotmale", "Nuwara Eliya", "Walapane"
            ]
        },
        "Eastern Province": {
            "Ampara District": [
                "Addalaichenai", "Akkaraipattu", "Ampara", "Damana", "Dehiattakandiya",
                "Eragama", "Kalmunai", "Kalmunai Muslim", "Karaitivu", "Lahugala",
                "Maha Oya", "Navithanveli", "Ninthavur", "Padiyathalawa", "Sammanthurai",
                "Thirukkovil", "Uhana"
            ],
            "Batticaloa District": [
                "Chenkalady", "Eravur Pattu", "Eravur Town", "Kattankudy", "Koralai Pattu",
                "Koralai Pattu North", "Koralai Pattu South", "Manmunai North", "Manmunai Pattu",
                "Manmunai South-West", "Manmunai West", "Paddiruppu", "Vakarai", "Valachchenai"
            ],
            "Trincomalee District": [
                "Gomarankadawala", "Kanthale", "Kinniya", "Kuchchaweli", "Muttur",
                "Padavi Sri Pura", "Seruvila", "Thambalagamuwa", "Trincomalee Town and Gravets", "Verugal"
            ]
        },
        "Northern Province": {
            "Jaffna District": ["Delft", "Islands North", "Islands South", "Jaffna", "Karainagar", "Nallur", "Thenmarachchi", "Vadamarachchi East", "Vadamarachchi North", "Vadamarachchi South-West", "Valikamam East", "Valikamam North", "Valikamam South", "Valikamam South-West", "Valikamam West"],
            "Kilinochchi District": ["Kandavalai", "Karachchi", "Pachchilaipalli", "Poonakary"],
            "Mannar District": ["Madhu", "Mannar Town", "Manthai East", "Manthai West", "Nanattan", "Musali"],
            "Mullaitivu District": ["Manthai East", "Maritimepattu", "Oddusuddan", "Puthukudiyiruppu", "Thunukkai", "Welioya"],
            "Vavuniya District": ["Vavuniya", "Vavuniya North", "Vavuniya South", "Vengalacheddikulam"]
        },
        "North Central Province": {
            "Anuradhapura District": ["Anuradhapura", "Galenbindunuwewa", "Galnewa", "Horowpothana", "Kahatagasdigiliya", "Kebithigollewa", "Kekirawa", "Mihinthale", "Nachchaduwa", "Nochchiyagama", "Nuwaragam Palatha Central", "Nuwaragam Palatha East", "Padaviya", "Palagala", "Palugaswewa", "Rajanganaya", "Rambewa", "Thalawa", "Thirappane"],
            "Polonnaruwa District": ["Dimbulagala", "Elahera", "Hingurakgoda", "Lankapura", "Medirigiriya", "Thamankaduwa", "Welikanda"]
        },
        "North Western Province": {
            "Kurunegala District": ["Alawwa", "Ambanpola", "Arachchikattuwa", "Bingiriya", "Ehetuwewa", "Galgamuwa", "Ganewatta", "Ibbagamuwa", "Katugampola", "Kobeigane", "Kuliyapitiya East", "Kuliyapitiya West", "Maho", "Mallawapitiya", "Maspatha", "Mawathagama", "Narammala", "Nikaweratiya", "Panduwasnuwara East", "Panduwasnuwara West", "Pannala", "Polgahawela", "Pothuhera", "Rasnayakapura", "Ridiyagama", "Udubaddawa", "Wariyapola", "Weerambugedara"],
            "Puttalam District": ["Anamaduwa", "Arachchikattuwa", "Chilaw", "Dankotuwa", "Kalpitiya", "Madampe", "Mahakumbukkadawala", "Mundel", "Nattandiya", "Pallama", "Puttalam", "Wennappuwa"]
        },
        "Sabaragamuwa Province": {
            "Kegalle District": ["Aranayake", "Bulathkohupitiya", "Dehiowita", "Deraniyagala", "Galigamuwa", "Kegalle", "Mawanella", "Rambukkana", "Ruwanwella", "Warakapola", "Yatiyantota"],
            "Ratnapura District": ["Ayagama", "Balangoda", "Eheliyagoda", "Elapatha", "Godakawela", "Imbulpe", "Kahawatta", "Kalawana", "Kuruwita", "Nivitigala", "Pelmadulla", "Opanayake", "Ratnapura", "Waraka", "Welipitiya"]
        },
        "Southern Province": {
            "Galle District": ["Akmeemana", "Ambalangoda", "Baddegama", "Balapitiya", "Bentota", "Bope-Poddala", "Elpitiya", "Galle Four Gravets", "Gonapinuwala", "Habaraduwa", "Hikkaduwa", "Imaduwa", "Karandeniya", "Nagoda", "Nelukdeniya", "Niyagama", "Thawalama", "Yakkalamulla"],
            "Hambantota District": ["Ambalantota", "Angunukolapelessa", "Beliatta", "Hambantota", "Katuwana", "Lunugamwehera", "Nonagama", "Okewela", "Sooriyawewa", "Tangalle", "Tissamaharama", "Walasmulla", "Weeraketiya"],
            "Matara District": ["Akuressa", "Athuraliya", "Devinuwara", "Dickwella", "Deniyaya", "Gandara", "Hakmana", "Kamburupitiya", "Kirinda Puhulwella", "Kotapola", "Malimbada", "Matara Four Gravets", "Mulatiyana", "Pasgoda", "Pitabeddara", "Thihagoda", "Weligama", "Weeraketiya"]
        },
        "Uva Province": {
            "Badulla District": ["Badulla", "Bandarawela", "Ella", "Haldummulla", "Hali-Ela", "Kandaketiya", "Lunugala", "Mahiyanganaya", "Meegahakiula", "Passara", "Rideemaliyadda", "Soranathota", "Uva Paranagama", "Welamada"],
            "Monaragala District": ["Badalkumbura", "Bibile", "Buttala", "Katharagama", "Madulla", "Medagama", "Monaragala", "Sevanagala", "Siyambalanduwa", "Thanamalwila", "Wellawaya"]
        },
        "Western Province": {
            "Colombo District": ["Colombo", "Dehiwala", "Homagama", "Kaduwela", "Kolonnawa", "Maharagama", "Moratuwa", "Padukka", "Ratmalana", "Sri Jayawardenepura Kotte", "Thimbirigasyaya"],
            "Gampaha District": ["Attanagalla", "Biyagama", "Divulapitiya", "Dompe", "Gampaha", "Ja-Ela", "Katana", "Kelaniya", "Mahara", "Minuwangoda", "Mirigama", "Negombo", "Wattala"],
            "Kalutara District": ["Agalawatta", "Bandaragama", "Beruwala", "Bulathsinhala", "Dodangoda", "Horana", "Ingiriya", "Kalutara", "Madurawala", "Matugama", "Millaniya", "Palindanuwara", "Panadura", "Walallawita"]
        }
    }
    
    for province_name, districts in sri_lanka_divisions.items():
        province = provinces.get(province_name)
        if not province:
            continue
            
        for district_name, ds_divisions in districts.items():
            district = District.objects.create(
                name=district_name,
                province=province
            )
            
            for ds_division_name in ds_divisions:
                DSDivision.objects.create(
                    name=ds_division_name,
                    district=district
                )

def reverse_migration(apps, schema_editor):
    Province = apps.get_model('locations', 'Province')
    Province.objects.all().delete()

class Migration(migrations.Migration):
    dependencies = [
        ('locations', '0001_initial'),  # This should be your initial migration
    ]
    
    operations = [
        migrations.RunPython(create_initial_data, reverse_migration),
    ]