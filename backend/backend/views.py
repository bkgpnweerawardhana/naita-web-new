from django.core.mail import send_mail
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt  # Temporarily disable CSRF for testing
def test_smtp_view(request):
    if request.method == 'POST':
        try:
            # Parse JSON data from request
            data = json.loads(request.body)
            recipient_email = data.get('email', 'damithdarshana.lap@gmail.com')
            
            send_mail(
                'SMTP Configuration Test',
                'Congratulations! Your Django email configuration is working!',
                'rngndslv.hr@gmail.com',  # From email (use your Gmail)
                [recipient_email],  # To email
                fail_silently=False,
            )
            return JsonResponse({'status': 'success', 'message': 'Email sent successfully!'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
    return JsonResponse({'status': 'error', 'message': 'Only POST requests are allowed'}, status=400)