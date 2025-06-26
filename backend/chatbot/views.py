from openai import OpenAI
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json


@csrf_exempt
def chat_with_gpt(request):
    if request.method == "POST":
        try:
            # Properly decode request body
            data = json.loads(request.body.decode("utf-8"))
            user_message = data.get("message", "")

            if not user_message:
                return JsonResponse({"error": "Empty message"}, status=400)

            # Initialize OpenAI client
            client = OpenAI(api_key=settings.OPENAI_API_KEY)

            completion = client.chat.completions.create(
                model="gpt-4o-mini",
                store=True,
                messages=[{"role": "user", "content": user_message}],
            )

            return JsonResponse({"response": completion.choices[0].message.content})

        except Exception as e:
            return JsonResponse({"error": str(e), "type": type(e).__name__}, status=500)

    return JsonResponse({"error": "Method not allowed"}, status=405)
