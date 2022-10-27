from flask import Flask
from flask_socketio import SocketIO, send

app = Flask(__name__)
app.config['SECRET_KEY'] = 'mysecret' # secret key needed because the messages are encrypted
socketio = SocketIO(app, cors_allowed_origins='*') # instantiate socketio

@socketio.on('message') # listen for the particular event specified
def handleMessage(msg):
    print('Message: ' + msg)
    send(msg, broadcast = True)

if __name__ == '__main__':
    socketio.run(app)