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
		//Logged in already, proceed
	} 
	else
	{
		// User not logged in.
		response.status(404).send('Please login to view this page!');
	}
	// check if all parameters are sent.
	var retweeterID = request.body.retweeterID;
	var tweetId = request.body.tweetId;
	var RTID = randomIntInc(1, 10000000);

	if (tweetId && retweeterID) 
	{

		db.query('select * from tweets where tweetId = ?', [tweetId], function(error, results, fields)
		{	//checking if tweet exists
			if(results.length>0)
			{ 
				db.query('select * from user where id = ?', [retweeterID], function(error, results, fields) 
				{
					//checking if USERID exists
					if(results.length>0)
					{
						db.query('select * from retweets where tweetId = ? and retweeterID = ? ', [tweetId,retweeterID], function(error, results, fields) 
						{
							//check if already retweeted
							if(results.length>0)
							{ // inserting into retweets table
								response.status(409).send('Error: User has already retweeted');
								
							}
							else
							{
								db.query('insert into retweets values ( ?, ?,?)', [RTID, tweetId,retweeterID], function(error, results, fields)
								{
									if(error)
   									{
										response.status(404).send('Error: Some SQL issue');
       									console.log(error)
  									}
									else
									{
										response.status(200).send('Successfully Retweeted');
									}			
								});
							}

						});
					}
					else
					{
						response.status(404).send('Error: User or tweet does not exist');
					}

				});
			}
			else
			{
				response.status(404).send('Error: User or tweet does not exist');
			}

	});


	} 
	else
	{
		response.status(400).send('Error: Missing parameters');
	}
});


function randomIntInc(low, high) 
{
  return Math.floor(Math.random() * (high - low + 1) + low)
}



module.exports = router;