from flask import Flask, request, jsonify
from datetime import datetime

app = Flask(__name__)

@app.route('/send-notification', methods=['POST'])
def send_notification():
    data = request.json
    user = data.get('user')
    message = data.get('message')
    # Simulate notification
    print(f"Notification sent to {user}: {message}")
    return jsonify({"status": "sent"})

@app.route('/alert-caretaker', methods=['POST'])
def alert_caretaker():
    data = request.json
    caretaker = data.get('caretaker')
    user = data.get('user')
    print(f"Alert: {user} did not take medication! Notifying caretaker: {caretaker}")
    return jsonify({"alert": "sent"})

if __name__ == '__main__':
    app.run(debug=True)
