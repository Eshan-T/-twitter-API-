var express= require('express');
var router = express.Router();
var db = require('../db');
var path = require('path');

var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//check if logged in. then generate retweet id, and take original tweetid and retweeter id and puts in table
router.post('/', function(request, response)
{
	if (request.session.loggedin)
	{
		//response.send('Logged in already');
	} 
	else
	{
		// send appropriate response code
		// message:  User not logged in.
		response.status(404).send('Please login to view this page!');
	}
	// check if all parameters are sent.
	var retweeterID = request.body.retweeterID;
	var tweetId = request.body.tweetId;
	var RTID = randomIntInc(1, 10000);

	if (tweetId && retweeterID) 
	{

		db.query('select * from tweets where tweetId = ?', [tweetId], function(error, results, fields)
		{
			if(results.length>0)
			{
				db.query('select * from user where id = ?', [retweeterID], function(error, results, fields) 
				{

					if(results.length>0)
					{
						db.query('select * from retweets where tweetId = ? and retweeterID = ? ', [tweetId,retweeterID], function(error, results, fields) 
						{

							if(results.length==0)
							{
								db.query('insert into retweets values ( ?, ?,?)', [RTID, tweetId,retweeterID], function(error, results, fields)
								{
									if(error)
   									{
										response.status(404).send('Some SQL issue');
       									console.log(error)
  									}
									else
									{
										response.status(200).send('Success');
										console.log("done");
									}			
								});
							}
							else
							{
								response.status(203).send('User has already retweeted');
							}

						});
					}
					else
					{
						response.status(202).send('User or tweet does not exist');
					}

				});
			}
			else
			{
				response.status(202).send('User or tweet does not exist');
			}

	});


		// also check if this tweet has already been retweeted. 	
	} 
	else
	{
		// send appropriate response code
		response.status(201).send('User or tweet does not exist');
	}
});


function randomIntInc(low, high) 
{
  return Math.floor(Math.random() * (high - low + 1) + low)
}



module.exports = router;