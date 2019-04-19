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

});

var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));




app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/login.html'));
});


var auth  = require('./routes/auth');
var follow  = require('./routes/follow');
var unfollow  = require('./routes/unfollow');
var postTweet  = require('./routes/postTweet');
var deleteTweet  = require('./routes/deleteTweet');
var fetchTweets  = require('./routes/fetchTweets');
var likeDislike  = require('./routes/likeDislike');
var reg  = require('./routes/reg');
var retweet  = require('./routes/retweet');
var home  = require('./routes/home');


app.use('/auth' , auth);
app.use('/follow' , follow);
app.use('/unfollow' , unfollow);
app.use('/postTweet' , postTweet);
app.use('/deleteTweet' , deleteTweet);
app.use('/fetchTweets' , fetchTweets);
app.use('/likeDislike' , likeDislike);
app.use('/reg' , reg);
app.use('/retweet' , retweet);
app.use('/home' , home);



function randomIntInc(low, high) {
  return Math.floor(Math.random() * (high - low + 1) + low)
}

app.listen(3000);
module.export = app;