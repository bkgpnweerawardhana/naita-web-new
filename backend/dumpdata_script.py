# dump_script.py
import os
import django
from django.core.management import call_command
import sys

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings') # Replace 'backend.settings' with your actual settings path
django.setup()

# Define the output file name
output_filename = 'datadump.json'

# Define the apps/models to exclude
# These are typically system/meta data that Django's migrate already handles
exclude_list = [
    'auth.permission',
    'contenttypes',
    'auth.group',
    'admin.logentry',
    'sessions.session',
    # 'auth.user', # Exclude auth.user unless you specifically need to migrate existing user data
                 # and are prepared for potential complexities.
                 # If excluded, you'll create a new superuser on Postgres later.
]

try:
    # Open the file for writing with UTF-8 encoding
    with open(output_filename, 'w', encoding='utf-8') as f:
        # Prepare exclude arguments
        exclude_args = []
        for item in exclude_list:
            exclude_args.extend(['--exclude', item])
            
        # Call the dumpdata command
        call_command(
            'dumpdata',
            *exclude_args,  # Pass the properly formatted exclude arguments
            indent=2,
            stdout=f,       # Direct output to the file
            # If you want to dump data from a specific database (e.g., 'default' is usually correct)
            # using='default'
        )
    print(f"Data dumped successfully to {output_filename}")
except Exception as e:
    print(f"An error occurred: {e}")
    sys.exit(1) # Exit with an error code