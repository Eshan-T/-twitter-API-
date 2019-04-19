var express= require('express');
var router = express.Router();
var db = require('../db');
var path = require('path');
var app = express();
var session = require('express-session');

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

router.post('/',function(request,response)
{

	if (request.session.loggedin)
	{
		//'Logged in already, proceed
	}
	else
	{
		response.status(233).send('Please login to view this page!');
		return;
	}

	var content = request.body.content;
	var ownerID = request.body.ownerID;
	// check if owner exists
	var tweetId = randomIntInc(1, 10000000);

	if(ownerID && content)
	{
		db.query('select * from user where id = ?', [ownerID], function(error, results, fields) 
		{
			// check if user exists
			if(results.length>0)
			{	//writing into the DB
				db.query('insert into tweets values(?,?,?)', [tweetId,ownerID,content], function(error, results,fields)
				{
					if(error)
					{
						response.status(205).send('Error: Database issue');
					}
				
					response.status(200).send('Successfully Posted');


				});
			}
			else
			{
				response.status(409).send('Error: User does not exist');

			}

		});

		
		
	}
	else
	{
		
		response.status(400).send('Error: Parameters Missing');

	}

}
);



function randomIntInc(low, high) {
  return Math.floor(Math.random() * (high - low + 1) + low)
}

module.exports = router;