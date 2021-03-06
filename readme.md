﻿Steps to Run:

1. Open max-msp/Main

2. npm start inside of web-app/

3. Open and run script.py

4. Change server port to 51234 and click "Connect"

5. Inside of Max, use the broswer to test

-- Description of Deployment --

![alt tag](https://github.com/awill1988/remote-audio-control/blob/master/RemoteAudioDiagram-AW.jpg)


Server Side:
- NodeJS
  - Deployed on localhost or an external server
- socket.io
  - Broadcasts messages from connected clients
  - Broadcasts messages passed along from UDP Server
  - Receives messages from connected clients
- dgram 
  - Creates UDP server
  - Receives UDP packets
  - Invokes node-osc library to parse incoming messages
  - Invokes socket.io to broadcast
- node-osc
  - parses binary packets into OSC messages
- expressjs
  - provides the framework for routing
  - receives HTTP requests
  - responds with HTTP or invokes a rendering engine

Client Side:
- AngularJS 1.5
  - Controls the view without breaking the socket connection to the server
- socket.io
  - receives messages broadcasted from the server
  - emits messages to the server on events
  
Controller:
- Python 3.4
  - python-osc
    • Library that builds OSC messages
    • Implements a UDP client to send osc messages on the localhost
  - socket.io
    • Receives data from the NodeJS server
    • Invokes the UDP client to send messages
- Max/MSP 7
  - udpreceive object receives OSC messages and routes them accordingly
    • Can retrieve information on each connected client using socket ids
  - udpsend object sends OSC messages to the NodeJS server
    • Can have direct control over the experience on the client-side
