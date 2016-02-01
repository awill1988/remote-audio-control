autowatch = 1;
outlets = 3;

// Create a new dictionary for users
var users = new Dict('users');
// Create a new dictionary for id/index
var ids = new Dict('id');

// Set size to zero
var size = 0;

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
		
		users.set(size,dict);
		ids.set(dict.get('socketid'),size);
		
		// Increment the size
		size++;
	}
	
	
	outlet(0,'bang');
	// Print messages
	outlet(1,dict.get('initials') + ' added.');
	

}

/*	Remove function */
function remove(id) {
	
	// Attempting to remove
	post('Attempting to remove: ', id,'\n');
	
	// More than one user
	if(size > 1) {
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
				// If it is not the last index
				if(target < size-1) {	
					// For all the remaining indeces, decement their indeces
					for(var j = target; j < keys.length-1; j++)
					{
						users.replace(j,users.get(j+1));
						ids.set(users.get(j+1).get('socketid'),j);
					}
					// Remove the trailing entry (decrement the size)
					users.remove(keys[keys.length-1]);
					
				}
				
				// It is the last index
				else
				{
					users.remove(keys[i]);
				}
				
				
				
			}
			// Increment LCV
			i++;
		}
	}
	// Only one user
	else if(size > 0) {
		if(users.get('0').get('socketid') == id) {
			users.remove('0');	
		}
	}
	
	outlet(0,'bang');
	ids.remove(id);
	if(size > 0)
		size--;
}

// Erases all the users
function bang() {
	outlet(0,'clear');
	size = 0;
}

// Handles a user event
function user() {
	
	// Store arguments in an array
	var messages = arrayfromargs(arguments);
	
	// Format for MGraphics
	var result = [messages[1],ids.get(messages[0]),messages[2]];
	
	if(messages.length > 3)
		result.push(messages[3]);
	
	// DEBUG: Print raw message
	outlet(1,'user: ', messages,'\n');
	outlet(2,result)
}
