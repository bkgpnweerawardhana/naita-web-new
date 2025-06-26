from openai import OpenAI

client = OpenAI(
  api_key="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"
)

completion = client.chat.completions.create(
  model="gpt-4o-mini",
  store=True,
  messages=[
    {"role": "user", "content": "write a haiku about ai"}
  ]
)

print(completion.choices[0].message.content);
