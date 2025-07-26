from flask import request, jsonify, render_template
from app import app
import os
from dotenv import load_dotenv
import openai
from twilio.rest import Client

# Load environment variables from .env
load_dotenv()

@app.route('/api/leads', methods=['POST'])
def handle_lead():
    data = request.get_json()
    name = data.get('fullName')
    phone = data.get('phone')
    notes = data.get('notes')

    try:
        # Generate follow-up message via OpenAI
        openai.api_key = os.getenv('OPENAI_API_KEY')
        prompt = f"Send a friendly, professional solar follow-up text under 320 characters for {name}. Notes: {notes}"
        response = openai.ChatCompletion.create(
            model='gpt-3.5-turbo',
            messages=[{"role": "user", "content": prompt}],
            max_tokens=100
        )
        message_text = response['choices'][0]['message']['content']

        # Send SMS via Twilio
        client = Client(os.getenv('TWILIO_SID'), os.getenv('TWILIO_AUTH_TOKEN'))
        client.messages.create(
            to=phone,
            from_=os.getenv('TWILIO_PHONE'),
            body=message_text
        )

        return jsonify({'message': 'Lead processed and SMS sent.'}), 200

    except Exception as e:
        print("Error:", str(e))
        return jsonify({'error': str(e)}), 500

# Serve the frontend React app
@app.route('/')
def index():
    return render_template('index.html')
