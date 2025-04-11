from flask import Flask, request, jsonify
from flask_cors import CORS
from twilio.rest import Client

app = Flask(__name__)
CORS(app)  # Allow all frontend requests

# Twilio credentials (Replace these with your actual Twilio account values)
TWILIO_ACCOUNT_SID = 'AC66a18b4b12742237a672d90ca0569f3d'
TWILIO_AUTH_TOKEN = 'e95303427ed25648e1cca790681dd25b'
TWILIO_PHONE_NUMBER = '+919353484300'  # Your Twilio number

client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

@app.route('/send-notification', methods=['POST'])
def send_notification():
    data = request.json
    phone = data.get('user')
    message = data.get('message')
    
    try:
        client.messages.create(
            body=message,
            from_=TWILIO_PHONE_NUMBER,
            to=phone
        )
        return jsonify({"status": "sent"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/alert-caretaker', methods=['POST'])
def alert_caretaker():
    data = request.json
    user = data.get('user')
    caretaker = data.get('caretaker')

    try:
        alert_message = f"Alert: {user} missed their medication!"
        client.messages.create(
            body=alert_message,
            from_=TWILIO_PHONE_NUMBER,
            to=caretaker
        )
        return jsonify({"status": "alert sent"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
