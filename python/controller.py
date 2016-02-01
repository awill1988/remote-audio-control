# Dependencies: Python 3.5, socketIO_client, pythonosc

import argparse
import math
import sys, traceback
import time
import threading
import urllib
import json

from socketIO_client import ConnectionError
from MaxClient import MaxClient
from Server import Server

class Controller:
    def __init__(self,view):
        self.view = view;
        self.server = Server();
        self.client = None;
        self.server_thread = None;
        self.tk_thread = None;      
        
    def start_server(self,event):
        # Get all inputs' current values
        config = self.view.get_inputs();
        # Set up the server
        try:
            self.client = MaxClient(config[2], int(config[3]))
            self.server.setup_server(config,self.client);
            self.view.info_text['fg'] = 'green'
            self.view.server_input['state'] = "disabled";
            self.view.port_input['state'] = "disabled";
            self.view.max_server_input['state'] = "disabled";
            self.view.max_port_input['state'] = "disabled";

            self.view.switch(self.view.CONNECT)
 
            
            
            self.view.status.set("Internet Server: Connected")


            self.server_thread = threading.Thread(name='server',target=self.server.server_wait)
            self.server_thread.setDaemon(True)
            self.server_thread.start()

            

            
        except ConnectionError:
            self.view.status.set("Internet Server: Error")
            self.view.info_text['fg'] = 'red'
            self.view.switch(self.view.DISCONNECT)

 

    # Tell the server the application intends to close the socket
    def close_server(self,event):
        self.view.switch(self.view.DISCONNECT)
        self.view.server_input['state'] = "normal";
        self.view.port_input['state'] = "normal";
        self.view.max_server_input['state'] = "normal";
        self.view.max_port_input['state'] = "normal";
        
        self.view.info_text['fg'] = 'grey'
        
        
        if(self.server.socketIO):
            self.server.server_close()
            
    # Quit the application
    def quit(self):
        if(self.server_thread):
            self.close_server();
            self.server.run = False;
            self.server_thread.join();
        self.view.master.destroy();
        
