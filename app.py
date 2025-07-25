from flask import Flask, request, jsonify
from twilio.rest import Client
from dotenv import load_dotenv
import os

# Load credentials from .env
load_dotenv()
app = Flask(__name__)

# Twilio setup
client = Client(os.getenv("TWILIO_ACCOUNT_SID"), os.getenv("TWILIO_AUTH_TOKEN"))
TWILIO_NUMBER = os.getenv("TWILIO_PHONE_NUMBER")

@app.route('/send-sms', methods=['POST'])
def send_sms():
    data = request.get_json()
    phone = data.get("phone")
    message = data.get("message")

    if not phone or not message:
        return jsonify({"error": "Phone and message required"}), 400

    try:
        msg = client.messages.create(
            to=phone,
            from_=TWILIO_NUMBER,
            body=message
        )
        return jsonify({"status": "sent", "sid": msg.sid}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
