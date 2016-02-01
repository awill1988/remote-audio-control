# Used to create a socket to external server (website)
from socketIO_client import SocketIO, LoggingNamespace, ConnectionError

class Server:
    def __init__(self):
        self.socketIO = None;
        self.client = None;
        self.run = False;
        
    def user(self,message):
        if(self.client):
            self.client.sendUserMessage(message);

    def add_user(self,userInfo):
        print(userInfo)
        if(self.client):
            self.client.sendNewUser(userInfo);
        
    def remove_user(self,user):
        print(user,"remove")
        if(self.client):
            self.client.send('/remove_user',user);

    def server_wait(self):
        while self.run:
            self.socketIO.wait()
        self.socketIO = None
 
    def server_close(self):
        self.run = False;
        self.socketIO.emit('close','')
    def setup_server(self,config,client):
        try:
            self.client = client
            
            # Creates a socket to website interface
            self.socketIO = SocketIO(
                config[0],
                int(config[1]),
                LoggingNamespace,
                False)
            
            self.run = True;
            
            self.socketIO.on('add_user', self.add_user)
            self.socketIO.on('remove_user', self.remove_user)
            self.socketIO.on('user',self.user)
            
        except (ConnectionError,ConnectionRefusedError):
            raise ConnectionError
