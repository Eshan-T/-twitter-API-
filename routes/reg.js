var express= require('express');
var router = express.Router();
var db = require('../db');
var app = express();
var bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.post('/', function(request, response)
{
	
	var username = request.body.username;
	var password = request.body.password;
	var id = randomIntInc(1, 10000000);

	// check if both paramters are present in the POST request
	if (username && password)
	{ 
		db.query('select * from user where name = ?', [username], function(error, results, fields) 
		{
			if(results.length > 0)
			{	//UserID already exists in the DB
				response.status(409).send('Error: User already exists');
				return;

			}
			else
			{
				
  					db.query('insert into user values ( ?, ?,?)', [id,username, password], function(error, results, fields)
  					{ 
						if(error)
 						{ 
    			   			response.status(500).send('Error: Database error');
   						}
						else
						{
							// Successful Regiatration
							response.status(200).send('Registration Successful');
						}
							
					});
			}

		});
		
		
	}
	else
	{
		response.status(404).send('Bad request: Missing Parameters');
	}
});


module.exports = router;

function randomIntInc(low, high)
{
  return Math.floor(Math.random() * (high - low + 1) + low)
}
