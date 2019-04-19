var express= require('express');
var router = express.Router();
var db = require('../db');
var session = require('express-session');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

// check if my approach to the follow thing is optimal.

router.post('/', function(request, response) {
	
	if (request.session.loggedin)
	{
		//response.send('Logged in already');
	}
	else
	{
		response.status(233).send('Please login to view this page!');
		return;
	}
	var followid = request.body.followid;
	var targetid = request.body.targetid;
	var id = randomIntInc(1, 10000000);

	if (followid && targetid)
	{
		db.query('select * from user where id = ?', [followid], function(error, results, fields) 
		{
			//check if follower exists
			if(results.length>0)
			{
				db.query('select * from user where id = ?', [targetid], function(error, results, fields) 
				{
					// check if followee exists
					if(results.length>0)
					{
						db.query('select * from follows where follower = ? and target = ?', [followid,targetid], function(error, results, fields) 
						{
							// check if they already follow each other
							if(results.length>0)
							{
								response.status(409).send('Error : Already following');
							
							}
							else
							{
								db.query('insert into follows values(?,?,?) ', [id, followid, targetid], function(error, results, fields) 
								{
									if(error)
   									{
										response.status(404).send('Error : SQL issue');
    								}
			
									response.status(200).send('Successfully Followed');
					
								});

							}

						});
					}
					else
					{
						response.status(404).send('Error: User does not exist');

					}

				});
			}
			else
			{
				response.status(404).send('Error: User does not exist');
			}
		
		});

		
		
	} 
	else 
	{
		response.status(400).send('404: Missing parameters');



	}
});



function randomIntInc(low, high) {
  return Math.floor(Math.random() * (high - low + 1) + low)
}

module.exports = router;