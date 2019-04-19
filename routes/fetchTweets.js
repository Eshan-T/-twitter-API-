var express= require('express');
var router = express.Router();
var app = express();
var db = require('../db');
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.get('/',function(request,response)
{
	if (request.session.loggedin)
	{
		//Logged in , Proceed
	}
	else 
	{
		// send appropriate response code
		response.status(404).send('Please login to view this page!');
		return;
	}

	var ownerID = request.query.ownerID;

	if(ownerID)
	{
		db.query('select * from user where id = ?', [ownerID], function(error, results, fields) 
		{ //checking if user exists
			if(results.length>0)
			{
				db.query('select * from tweets where ownerID = ?', [ownerID], function(error, results,fields)
				{ //fetching users tweets
					if(error)
					{
						response.status(404)
						console.log(error);
					}
					else
					{
						if (results.length > 0)
						{
							
							// send all tweets for that user
							response.status(200).send(results)
						} 
						else
						{
							response.status(200).send('No tweeets by user');
							//Incase no tweets exist
						}			
		
					}


				}); 
			}
			else
			{	// when user does not exists
				response.status(409).send('Error: User does not exist');
			}
		});
		
	}
	else
	{ // Invalid parameters
		response.status(400).send('Error: Incorrect parameters');
	}

}
);

function randomIntInc(low, high)
{
  return Math.floor(Math.random() * (high - low + 1) + low)
}


module.exports = router;