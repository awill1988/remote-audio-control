import tkinter as tk
from tkinter import font
from controller import Controller

import threading
from tkinter import TOP,BOTTOM,LEFT,RIGHT,W,E,N,S,BOTH,X,Y,CENTER, RAISED, SUNKEN


class Application(tk.Frame):
    def __init__(self, master=None):
        
        # Instantiate the Controller
        self.controller = Controller(self);
        
        # Create Root Frame
        tk.Frame.__init__(self, master)
        self.pack(expand=True,fill=BOTH)

        # Default values for Server Configurations
        self.host = tk.StringVar(self,value='localhost')
        self.port = tk.StringVar(self,value='3000')
        self.max_host = tk.StringVar(self,value='localhost')
        self.max_port = tk.StringVar(self,value='3333')

        self.labelFont = font.Font(family='Helvetica', size=14, weight='bold')
        
        # Status at the bottom
        self.status = tk.StringVar(self,value='')

        self.master.configure(background='#333333')
        # Create widgets
        self.createWidgets()



        # Stores object references as a list
        self.inputs = list([self.host,self.port,self.max_host,self.max_port]);
        
        self.master.protocol('WM_DELETE_WINDOW', self.controller.quit)
        self.master.title("Socket.IO Interface")
        self.master.geometry("500x250+20+50")
        self.master.resizable(0,0)
        self.master.update_idletasks()
        

        # Arrange the widgets
        self.layoutWidgets()
        self.configure(background='#333333')

        self.pack(fill=BOTH, padx=10, pady=10)
        
    def createWidgets(self):
        # Connect button
        self.CONNECT = tk.Label(self,
                        text="Connect",
                        bg="#e1e1e1",
                        font=("Helvetica", 16),
                        relief=RAISED)
        # Disconnect button
        self.DISCONNECT = tk.Label(self,
                        text="Disconnect",
                        bg="#e1e1e1",
                        font=("Helvetica", 16),
                        relief=RAISED)

        self.CONNECT.bind("<Button-1>", self.mousedown)
        self.DISCONNECT.bind("<Button-1>", self.mousedown)
        self.DISCONNECT['state'] = 'disabled'
        
        self.CONNECT.bind("<ButtonRelease-1>", self.controller.start_server)
        self.DISCONNECT.bind("<ButtonRelease-1>", self.controller.close_server)
        # IP/Port for Max client
        self.max_inputs()
        # IP/Port for External Server
        self.server_inputs()
        # Status
        self.stat()
    def mousedown(self,event):
        event.widget['relief'] = SUNKEN
    def layoutWidgets(self):
        
        self.columnconfigure(0, weight=1,pad=10)
        self.columnconfigure(1, weight=1,pad=10)
        self.rowconfigure(0, weight=1,pad=10)
        self.rowconfigure(1, weight=1,pad=10)
        self.rowconfigure(2, weight=2,pad=10)
        
        self.server_input_frame.grid(row=0,column=0,sticky=N+S+W+E,padx=5)
        self.max_input_frame.grid(row=0,column=1,sticky=N+S+W+E,padx=5)
        self.CONNECT.grid(row=1,column=0,columnspan=2,sticky=N+S+W+E,padx=15,pady=15)
        self.DISCONNECT.grid(row=1,column=0,columnspan=2,sticky=N+S+W+E,padx=15,pady=15)
        self.info_stat.grid(row=2,columnspan=2,sticky=N+S+W+E)      
        self.DISCONNECT.grid_remove()
    def stat(self):
        self.info_stat = tk.LabelFrame(self,
              text="Connection Status",
              height=40,bg='#333333',fg='white')

        self.info_text = tk.Label(self.info_stat,
              textvariable=self.status,
              fg='grey',bg='#333333')
        
        self.info_text.pack(expand=True,fill=BOTH)

    def max_inputs(self):
        self.max_input_frame = tk.LabelFrame(self,
              text='Max/MSP Client',
              labelanchor=N,
              padx=10, pady=10, font = self.labelFont,
              height=80,background="#333333",fg="white")
        # Max Server Input
        self.max_server_input = tk.Entry(self.max_input_frame, exportselection=50)
        self.max_server_input['textvariable'] = self.max_host
        # Max Port Input
        self.max_port_input = tk.Entry(self.max_input_frame, exportselection=0)
        self.max_port_input['textvariable'] = self.max_port
        
        
        
        self.max_server_input.pack(anchor=W,fill=X,expand=True,side=TOP)
        self.max_port_input.pack(anchor=W,fill=X,expand=True,side=TOP)
        
        
    def server_inputs(self):
        self.server_input_frame = tk.LabelFrame(self,
              text='Internet Server',
              labelanchor=N,
              padx=10, pady=10, font=self.labelFont,
              height=80, background="#333333",fg="white")
        # Server Input
        self.server_input = tk.Entry(self.server_input_frame, exportselection=0)
        self.server_input['textvariable'] = self.host
        # Host Input
        self.port_input = tk.Entry(self.server_input_frame, exportselection=0)
        self.port_input['textvariable'] = self.port

        self.server_input.pack(anchor=W,fill=X,expand=True,side=TOP)
        self.port_input.pack(anchor=W,fill=X,expand=True,side=TOP)

    def get_inputs(self):
        return list(map(lambda x: x.get(),self.inputs))

    def switch(self,button):
        self.DISCONNECT['relief'] = RAISED
        self.CONNECT['relief'] = RAISED
        
        if(button == self.CONNECT):
            self.CONNECT.grid_remove()
            self.DISCONNECT.grid()
            self.CONNECT['state'] = 'disabled'
            self.DISCONNECT['state'] = 'normal'
        else:
            self.DISCONNECT.grid_remove()
            self.CONNECT.grid()
            self.CONNECT['state'] = 'normal'
            self.DISCONNECT['state'] = 'disabled'

            self.status.set("Internet Server: Disconnected")
     
        self.master.update()

