var express= require('express');
var router = express.Router();
var app = express();
var db = require('../db');
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.get('/',function(request,response)
{
		console.log(request.session)


	if (request.session.loggedin)
	{
		// chill
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
		{ 
			if(results.length>0)
			{
				db.query('select * from tweets where ownerID = ?', [ownerID], function(error, results,fields)
				{
					if(error)
					{
						response.status(404)
						console.log(error);
					}
					else
					{
						if (results.length > 0)
						{
							// send response 200
							// send all tweets for that user
							response.status(200).send('done')
						} 
						else
						{
							response.status(200).send('no tweeets by user');
							//send response 400
							//send a message saying " User not found."
						}			
		
					}


				}); 
			}
			else
			{
				response.status(201).send('User does not exist');
			}
		});
		
	}
	else
	{
		console.log("sent wrong data");
	}

}
);

function randomIntInc(low, high)
{
  return Math.floor(Math.random() * (high - low + 1) + low)
}


module.exports = router;