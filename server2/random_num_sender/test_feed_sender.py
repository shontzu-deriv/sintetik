from flask import Flask
from flask_socketio import SocketIO, send
import time
import random
import json
import numpy as np
from datetime import datetime

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins='*') # instantiate socketio

@socketio.on('message') # listen for the particular event specified


def sendFeed(num):
    T = 2 
    mu = 0.001 
    sigma = 0.1 
    dt = 0.01
    S0 = 20
    S_feed = [S0]
    while True:
        N = round(T/dt)
        t = np.linspace(0, T, N)
        W = np.random.standard_normal(size = N) 
        W = np.cumsum(W)*np.sqrt(dt) ### standard brownian motion ###
        X = (mu-0.5*sigma**2)*t + sigma*W 
        S = S_feed[-1]*np.exp(X) ### geometric brownian motion ###
        S_feed.append(round((S[0]),2))
        S_feed.pop(0)
        print("length of array: " + str(len(S_feed)))
        final_S = S_feed[-1]

        time.sleep(1)
        date_time = datetime.now()
        current_time = date_time.strftime("%m/%d/%Y, %H:%M:%S")
        feed = {
            'price': final_S,
            'timestamp': current_time
        }
        feed_json = json.dumps(feed)
        send(feed_json, broadcast = True)

# sendFeed(T = 2, mu = 0.001, sigma = 0.1, dt = 0.01, S0 = 20)

if __name__ == '__main__':
    socketio.run(app)




