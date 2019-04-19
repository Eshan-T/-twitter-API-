Twitter API-

How to run the project:
In the ‘models’ folder, there is a sql file called ans.sql.
This file carries the entire schema.
You will need to start your local MYSQL server, create a database called “twitterUser” and then import the ans.sql file into the local database using the following command:

$ /usr/local/mysql/bin/mysql -u root -p twitterUser < /path/to/file/ans.sql

You will also need to verify and accordingly change the db connection parameters in the db.js file in the main directory of the project.

Once this is done, launch the server.js  file with the following command:

$ Node server.js

Now the server is running on localhost:3000 and will connect to the database. You can change the port number in the server.js file.

To run the test cases:
You’’ll need to navigate to the main directory of the project and run the following command:
$npm test

After all of the 38 test cases finish running, you’ll need to reload the original schema to restore the database to it’s original state for subsequent testing. You can do so by simply using the command given above again.

*********
Functionalities implemented:

1) registration. 
POST request to /reg with parameters as: username and password.

2) login
POST request to /auth with parameters as: username and password.

3) follow
POST request to /follow with parameters as: followid ( the initiator)and targetid ( the person to be followed).

4) unfollow
POST request to /unfollow. with parameters as: followid ( the initiator)and targetid ( the person to be unfollowed).

5)create
POST Request to /postTweet. with parameters as: content and ownerID (the userid of the person posting the tweet)

6)read
GET request to /fetchTweets?ownerID=x. with x being the userID .

7)delete
POST Request to /deleteTweet. with parameters as: tweetId  (the id of the tweet to be deleted)

8) LIke/unlike 
POST request to /likeDislike with parameters as: tweetId(Id of the tweet to be liked) , id( of the user initiating the like) and bool ( 1 for liking and 0 for unliking)

9) Retweet
POST request to /retweet with parameters as: retweeterID( the user initiating the retweet) and tweetId( the id of the original tweet)

*********
Schema :
user(id INT, name varchar , password varchar)
follows(id INT, follower varchar , target varchar)
tweets(tweetId varchar, ownerId varchar , content varchar)
likes(likeID INT, tweetId INT , id INT). — here id refers to the id of the user that has liked the tweet
retweets(RTID INT , tweetId INT , retweeterID)

The first column of all the tables is a randomly generated ID.

**************

At the time of submission, all endpoint are fully functional with resilient error handling and scalable design of the schema.
There are a total of 36 test cases implemented using mocha/chai and all of them pass.
In case there’s any confusion or some module of the project doesn’t work, please reach out to me at eshanntrivedi@gmail.com or 9654169957 for clarification.

