from flask import Flask
from flask_socketio import SocketIO, send
import time
import random
import json
import numpy as np

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins='*') # instantiate socketio

@socketio.on('message') # listen for the particular event specified
def sendFeed(num):
    S0 = 20
    S_feed = [S0]
    while True:
        T = 2
        mu = 0.001
        sigma = 0.1
        dt = 0.01
        N = round(T/dt)
        t = np.linspace(0, T, N)
        W = np.random.standard_normal(size = N) 
        W = np.cumsum(W)*np.sqrt(dt) ### standard brownian motion ###
        X = (mu-0.5*sigma**2)*t + sigma*W 
        S = S_feed[-1]*np.exp(X) ### geometric brownian motion ###
        S_feed.append(S[0])

        value = json.dumps(random.random()).encode('utf8')
        contract_price = json.dumps(100 * random.random()).encode('utf8')
        # value = random.random()
        # contract_price = 100 * random.random()
        time.sleep(1)
        send(S_feed[-1], broadcast = True)
        # send(contract_price, broadcast = True)

if __name__ == '__main__':
    socketio.run(app)