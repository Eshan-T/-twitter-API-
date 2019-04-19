var express= require('express');
var router = express.Router();
var app = express();
var db = require('../db');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.post('/',function(request,response)
{

	if (request.session.loggedin)
	{
		//response.send('Logged in already');
	}
	else
	{
		response.status(404).send('Please login to view this page!');
		return;
	}

	var tweetId = request.body.tweetId;
	if(tweetId)
	{

			// check tweet must exists

		db.query('select * from tweets where tweetId = ?', [tweetId], function(error, results, fields)
		{
			if(results.length>0)
			{
				db.query('delete from tweets where tweetId = ?', [tweetId], function(error, results,fields)
				{
					if(error)
					{
						response.status(404).send('Some SQL issue');
						return
					}
					response.status(204).send('success');


				});
			}
			else
			{
				response.status(203).send('Tweet does not exists');
			}

		});


			
	}
	else
	{
		response.status(202).send('Incorrect parameters');
		// send message and response code for wrong param.
	}

});


module.exports = router;