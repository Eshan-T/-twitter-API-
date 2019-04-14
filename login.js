var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'root',
	database : 'twitterUser',
	//socketPath  : '/var/run/mysqld/mysqld.sock',

});
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

var app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/login.html'));
});

app.get('/signup', function(request, response) {
	response.sendFile(path.join(__dirname + '/signup.html'));
});

app.post('/auth', function(request, response) {
	console.log(request.body)
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM user WHERE name = ? AND password = ?', [username, password], function(error, results, fields) {
			if(error)
    {
        console.log(error)
    }
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
								response.redirect('/lol');

			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.post('/follow', function(request, response) {
	console.log(request.body)
	var followid = request.body.followid;
	var targetid = request.body.targetid;
			var id = randomIntInc(1, 10000);

	if (followid && targetid) {
		connection.query('insert into follows values(?,?,?) ', [id, followid, targetid], function(error, results, fields) {
			if(error)
    {
        console.log(error)
    }
			
			response.send('Done');
					
			response.end();
		});
	} else {
		response.send('sent wrong data');
		response.end();
	}
});

app.post('/unfollow', function(request, response) {
	console.log(request.body)
	var unfollowid = request.body.unfollowid;
	var targetid = request.body.targetid;
			//var id = randomIntInc(1, 10000);

	if (unfollowid && targetid) {
		connection.query('Select id from follows where follower = ? and target = ?', [unfollowid, targetid], function(error, results, fields) {
			if(error)
    {
        console.log(error);
    }

    if (results.length > 0) {
    	 var id = results[0].id;

    			connection.query('delete from follows where id = ?', [id], function(error, results, fields)
    			{
    				if(error)
    				{
    					console.log(error);
    				}

    				else{
    					console.log("done");
    				}

    			});

    }
			
			response.send('Done');
					
			response.end();
		});
	} else {
		response.send('sent wrong data');
		response.end();
	}
});

app.post('/postTweet',function(request,response){
	var content = request.body.content;
	var ownerID = request.body.ownerID;
	var tweetId = randomIntInc(1, 10000);

	if(ownerID && content)
	{
		connection.query('insert into tweets values(?,?,?)', [tweetId,ownerID,content], function(error, results,fields){
			if(error)
			{
				console.log(error);
			}
			console.log("Done");
			response.end();


		});
	}
	else{
		console.log("sent wrong data");
	}

}
);


app.post('/deleteTweet',function(request,response){

	var tweetId = request.body.tweetId;
	if(tweetId)
	{
		connection.query('delete from tweets where tweetId = ?', [tweetId], function(error, results,fields){
			if(error)
			{
				console.log(error);
			}
			console.log("Done");
			response.end();


		});
	}
	else{
		console.log("sent wrong data");
	}

}
);

app.get('/fetchTweets',function(request,response){

	var ownerID = request.query.ownerID;

	if(ownerID)
	{
		connection.query('select * from tweets where ownerID = ?', [ownerID], function(error, results,fields){
			if(error)
			{
				console.log(error);
			}
			console.log(results);
			response.end();


		});
	}
	else{
		console.log("sent wrong data");
	}

}
);


app.post('/likeDislike',function(request,response){

	var tweetId = request.body.tweetId;
	var id = request.body.id;
	var likeID = randomIntInc(1, 10000);
	var bool = request.body.bool;


	if(tweetId && id && bool == 1)
	{
		connection.query('insert into likes values (?,?,?)', [likeID,tweetId,id], function(error, results,fields){
			if(error)
			{
				console.log(error);
			}
			console.log("Done");
			response.end();


		});
	}
	else if(tweetId && id && bool == 0)
	{
		connection.query('delete from likes where tweetId = ? and id = ?', [tweetId,id], function(error, results,fields){
			if(error)
			{
				console.log(error);
			}
			console.log("Done");
			response.end();


		});
	}
	else{
		console.log("sent wrong data");
	}

}
);





app.post('/reg', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {

		connection.query('insert into user values ( 2, ?,?)', [username, password], function(error, results, fields) {
			if(error)
    {
        console.log(error)
    }
			if (results.length > 0) {
				//request.session.loggedin = true;
				//request.session.username = username;
				response.redirect('/home');
			} else {
				
								response.redirect('/lol');

			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});


app.post('/retweet', function(request, response) {
	var retweeterID = request.body.retweeterID;
	var tweetId = request.body.tweetId;

	var RTID = randomIntInc(1, 10000);

	if (tweetId && retweeterID) {

		connection.query('insert into retweets values ( ?, ?,?)', [RTID, tweetId,retweeterID], function(error, results, fields) {
			if(error)
    {
        console.log(error)
    }
			 else {
				
				console.log("done");

			}			
			response.end();
		});
	} else {
		response.send('wrong creds');
		response.end();
	}
});



app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

app.listen(3000);


function randomIntInc(low, high) {
  return Math.floor(Math.random() * (high - low + 1) + low)
}
