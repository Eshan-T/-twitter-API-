var express= require('express');
var router = express.Router();
var app = express();
var db = require('../db');
var session = require('express-session');

var bodyParser = require('body-parser');
var path = require('path');
const bcrypt = require('bcrypt');
const saltRounds = 10;
// const myPlaintextPassword = 's0/\/\P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';

// //Get Homepage
// router.get('/',ensureAuthenticated, function(req,res){
//   res.render('index');
// });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(session({
//   secret: 'secret',
//   resave: true,
//   saveUninitialized: true
// }));

router.post('/', function(request, response)
{
	console.log(request.body)
	var username = request.body.username;
	var password = request.body.password;
	//check if both parameters are being sent.
	if (username && password)
	{
		
		db.query('SELECT * FROM user WHERE name = ?', [username], function(error, results, fields)
		{
			if(error)
    		{
    			response.status(404).send('Some SQL issue');
    			return;
    		}
    		if(results.length == 0)
    		{
    			response.status(404).send('user not found');
    			return;
    		}

    		if(results[0].password == password)
    		{
          request.session.loggedin = true;

    			response.status(200).send('success');
    			return;
    		}
    		else{
    			response.status(404).send('Incorrect creds');
    		}


   //  		bcrypt.compare(password, results[0].password, function(err, res)
   //  		{
			// 	if(res)
			// 	{
   //  				response.status(200).send('Success');
   //  			}
   //  			else
   //  			{
   //  				response.status(404).send('Incorrect Username and/or Password!');

   //  			}

			// });
					
		});
	} 
	else
	{
		console.log(request)
		response.status(404).send('Please enter Username and Password!');
	}
});

module.exports = router;