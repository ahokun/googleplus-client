var gplus = require('gplus');

// Login Callback Function
function onLogin()
{
	doPost();
	doNotification();
}

function doNotification()
{
	gplus.getNotification(function(res){
		for(var i = 0;i<res.length;i++)
		{
			if(res[i].unread===0){
				if(res[i].id.match(/^z/)){
					gplus.getNotifyDetail(res[i].id,function(activity){
						console.log(activity);
					});
				}
			}
		}
		setTimeout(doNotification,60000);
	});
}

function doPost()
{
	//POST by User account 
	gplus.post({message:'Hello World!'},
		function(){
			setTimeout(doPost,600000);
		});
	//POST by Page account
	gplus.post({message:'Hello World!' ,pageid:"999999999999999999999"},
		function(){
			setTimeout(doPost,600000);
		});
}

gplus.login('USERNAME','PASSWORD',onLogin);
