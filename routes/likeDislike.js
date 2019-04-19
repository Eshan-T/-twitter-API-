var express= require('express');
var router = express.Router();
var db = require('../db');

router.post('/',function(request,response){
	if (request.session.loggedin) {
		//response.send('Logged in already');
	} else {
		response.send('Please login to view this page!');
		response.end();
	}

	var tweetId = request.body.tweetId;
	var id = request.body.id;
	var likeID = randomIntInc(1, 10000000);
	var bool = request.body.bool;
	// check for presence of all parameters. 
	//check for validity of user and tweetID.


	if(tweetId && id && bool == 1)
	{	// check: must already not be liked.
		db.query('select * from likes where tweetId = ? and id = ?', [tweetId,id], function(error, results, fields) 
				{ 
					if(results.length>0)
					{
						response.status(409).send('Already liked');
					}
					else
					{
						db.query('insert into likes values (?,?,?)', [likeID,tweetId,id], function(error, results,fields)
						{
							if(error)
							{
								console.log(error);
							}
			
							response.status(200).send('Successfully liked');

						});

					}
		
				});
	}
	else if(tweetId && id && bool == 0)
	{ // check: must already be liked.
		db.query('select * from likes where tweetId = ? and id = ?', [tweetId,id], function(error, results, fields) 
				{

					if(results.length>0)
					{
						db.query('delete from likes where  tweetId = ?  and id = ? ', [tweetId,id], function(error, results,fields)
						{
							if(error)
							{
								console.log(error);
							}
			
							response.status(200).send('Successfully unliked');

						});

					}
						
					
					else
					{
						response.status(409).send('Already unliked');
		
					}
				});
	}
	else{

		response.status(400).send('Error: Imcomplete paramters');
	}

}
);

function randomIntInc(low, high) {
  return Math.floor(Math.random() * (high - low + 1) + low)
}

module.exports = router;