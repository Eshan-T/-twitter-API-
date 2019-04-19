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
	// check if parameters are properly being sent.
	var username = request.body.username;
	var password = request.body.password;
	var id = randomIntInc(1, 10000);

	//check if username already exists.
	// also store hashed password using that library.
	if (username && password)
	{ 
		db.query('select * from user where name = ?', [username], function(error, results, fields) 
		{
			if(results.length > 0)
			{
				response.status(404).send('User already exists');
				return;

			}
			else
			{
				bcrypt.hash(password, saltRounds, function(err, hash)
				{
  					db.query('insert into user values ( ?, ?,?)', [id,username, hash], function(error, results, fields)
  					{
						if(error)
 						{ 
    			   			response.status(404).send('Some SQL issue');
   						}
						else
						{
							response.status(200).send('success');
						}
							
					});
				});

			}

		});
		
		
	}
	else
	{
		response.status(404).send('Please enter Username and Password!');
	}
});


module.exports = router;

function randomIntInc(low, high)
{
  return Math.floor(Math.random() * (high - low + 1) + low)
}
