var mysql = require('mysql');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'root',
	database : 'twitterUser',

});

connection.connect(function(err){
  if(err) {
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

module.exports = connection;
