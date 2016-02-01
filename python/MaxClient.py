
# Python external library that will build and send osc messages
#   to Max patch

import argparse
import random
import time

from pythonosc import osc_bundle_builder
from pythonosc import osc_message_builder
from pythonosc import udp_client


class MaxClient:
    def __init__(self,host,port):
        parser = argparse.ArgumentParser()
        parser.add_argument("--ip", default=host,
            help="The ip of the OSC server")
        parser.add_argument("--port", type=int, default=port,
            help="The port the OSC server is listening on")
        args = parser.parse_args()

        self.client = udp_client.UDPClient(args.ip, args.port)

    def sendUserMessage(self,message):
        msg = osc_message_builder.OscMessageBuilder(address = '/user')
        msg.add_arg(message['socketid'])
        msg.add_arg(message['event'])
        if(type(message['arg']) == list):
            for arg in message['arg']:
                msg.add_arg(arg)
        elif(type(message['arg']) == dict):
            msg.add_arg(message['arg']['x'])
            msg.add_arg(message['arg']['y'])
            if(message['arg']['z']):
                msg.add_arg(message['arg']['z'])

        else:
            msg.add_arg(message['arg'])
        
        msg = msg.build()
        self.client.send(msg)

    def sendNewUser(self,obj):
        msg = osc_message_builder.OscMessageBuilder(address = '/add_user')
        msg.add_arg('socketid')
        msg.add_arg(obj['socketid'])
        msg.add_arg('initials')
        msg.add_arg(obj['initials'])
        msg = msg.build()
        self.client.send(msg)
        
    def send(self,cmd,arg):
        msg = osc_message_builder.OscMessageBuilder(address = cmd)
        msg.add_arg(arg)
        msg = msg.build()
        self.client.send(msg)
