var express= require('express');
var router = express.Router();
var app = express();
var db = require('../db');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
const bcrypt = require('bcrypt');
const saltRounds = 10;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


router.post('/', function(request, response)
{
	console.log(request.body)
	var username = request.body.username;
	var password = request.body.password;
	//check for missing parameters.
	if (username && password)
	{
		
		db.query('SELECT * FROM user WHERE name = ?', [username], function(error, results, fields)
		{
			if(error)
    		{ 
        //when SQL query fails
    			response.status(400).send('Error: Database error has occured');
    			return;
    		}
    		if(results.length == 0)
    		{
        // user does not exist
    			response.status(404).send('Error: User not found');
    			return;
    		}

    		if(results[0].password == password)
    		{
        // successful login
          request.session.loggedin = true;
    			response.status(200).send('Successful Login');
    			return;
    		}
    		else{
        // Incorrect Credentials
    			response.status(403).send('Error: Incorrect credentials');
    		}
					
		});
	} 
	else
	{
		// Missing paramters
		response.status(404).send('Error: Username or Password missing');
	}
});

module.exports = router;