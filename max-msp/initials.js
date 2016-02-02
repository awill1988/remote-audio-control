autowatch = 1;

var users = Dict('users');


function msg_int(num) {
	var initials = [];

	var keys = users.getkeys();
	for(var i = 0; i < num; i++)
	{
		initials.push(users.get(keys[i]).get('initials'));

	}
	if(initials.length == 0)
		outlet(0,'');
	else
		// Output all initials
		outlet(0,initials);
}