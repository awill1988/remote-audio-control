var io = require('socket.io')();
var udp = require('./udp_osc');
var osc = require('osc');

var currentEvent = {
	address: '/event',
	args: [0]
};

var announcement = {
	show: false,
	msg: ''
};

udp.on('message', (msg, rinfo) => {
	processMessage(msg);
});


var processMessage = function(msg) {
	try {
	    msg = osc.readPacket(msg,withMetadata=false);
	    currentEvent = msg;
	    io.emit('current_state',msg);
	}
	catch (error) {
	    console.log("An error occurred: ", error.message);
	}
}

// Define what happens when a user connects
io.on('connection', function (socket) {
	//console.log('new user: ' + socket.id);
	// Tell Max/MSP to add a user
	//console.log(socket);
	//socket.broadcast.emit('add_user',socket.id);
	
	// Emit the current event state
	socket.emit('current_state',currentEvent);

/***************************************************************
					User Connection Events
 ***************************************************************/	
	socket.on('add_user',function(data) {
		socket.broadcast.emit('add_user',data);
	});

	// Happens when the socket it broken
	socket.on('disconnect', function () {
	    //console.log('user: ' + socket.id + ' disconnected.');
	    // Tell Max/MSP to add a user
	    console.log(socket.id);
		socket.broadcast.emit('remove_user',socket.id);
	  });
/***************************************************************
					User interface Events
 ***************************************************************/
	socket.on('user',function(data) {
		socket.broadcast.emit('user',data);
		console.log('user',data);
		//console.log('delayOn',[socket.id, data]);
	});

	

	// The python script wants to end its connection
	socket.on('close', function(){
		socket.disconnect();
	});
});




module.exports = io;