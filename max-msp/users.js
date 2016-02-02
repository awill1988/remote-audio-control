autowatch = 1;
outlets = 4;

// Create a new dictionary for users
var users = new Dict('users');
// Create a new dictionary for id/index
var ids = new Dict('id');

// Set size to zero
_size = 0;

/*	Add function */
function add() {
	// Temporary dictionary to parse arguments
	var dict = new Dict('temp');
	// Store arguments in an array
	var args = arrayfromargs(arguments);
	
	// Add arguments to the dictionary
	for(var i = 0; i < args.length/2; i++){
		dict.set(args[i*2],args[i*2+1]);
	}
	
	// Add the temporary dictionary to users by
	//	index
	if(ids.get(dict.get('socketid')) == null) {
		
		users.set(_size,dict);
		ids.set(dict.get('socketid'),_size);
		
		// Increment the size
		_size++;
	}
	
	
	outlet(0,'bang');
	// Print messages
	outlet(1,dict.get('initials') + ' added.');
	outlet(3,_size);

}

/*	Remove function */
function remove(id) {
	
	// Attempting to remove
	post('Attempting to remove: ', id,'\n');
	
	// More than one user
	if(_size > 1) {
		// All the indeces
		var keys = users.getkeys();
		// Target index
		var target;
		// Default that index is not found
		var found = false;
		// Loop control variable (LCV)
		var i = 0;
		// Search for the id
		while(!found && i < keys.length)
		{
			if(users.get(keys[i]).get('socketid') == id)
			{
				found = true;
				target = parseInt(keys[i]);
				
				if(target != keys.length-1)
				{
					// For all the remaining indeces, decement their indeces
					for(var j = target; j < keys.length-1; j++)
					{
						users.replace(j,users.get(j+1));
						ids.set(users.get(j+1).get('socketid'),j);
					}
					
				}
				
				users.remove(keys[keys.length-1]);
				ids.remove(id);
				_size--;
			}
			// Increment LCV
			i++;
		}
	}
	// Only one user
	else if(_size == 1) {
		if(users.get('0').get('socketid') == id) {
			users.remove('0');
			ids.remove(id);
			_size--;
		}
	}
	outlet(0,'bang');
	outlet(3,_size);
}

// Erases all the users
function bang() {
	outlet(0,'clear');
	_size = 0;
	outlet(3,_size);
}

// Handles a user event
function user() {
	
	// Store arguments in an array
	var messages = arrayfromargs(arguments);
	
	// Format for MGraphics
	var result = [messages[1],ids.get(messages[0]),messages[2]];
	
	if(messages.length > 3)
		for(i = 3;i<messages.length;i++)
			result.push(messages[i]);
	
	
	// DEBUG: Print raw message
	outlet(1,'user: ', messages,'\n');
	outlet(2,result)
}
