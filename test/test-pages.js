var expect  = require('chai').expect;
var request = require('request');
var assert = require('assert');
var chai =  require('chai');
var should = require('chai').should();
var ch = require('chai-http');

chai.use(ch);
var Cookies ;

// FETCH TWEETS

describe('Functional Test for tweet fetching:', function () {
it('should allow successful login', function(done) {
    chai.request('127.0.0.1:3000')
    .post('/auth')
    .send({'username': 'bob', 'password': 'cisco'})
    .end(function(error, response, body) {
        if (error) {
            console.log(error)
                    done(error);
                } else {
                                Cookies = response.headers['set-cookie'].pop().split(';')[0];
                    response.should.have.status(200);
                }
       // response.should.have.status(200);
        done();
    });
});

// correctly fetch tweets
it('should get tweets for current user', function (done) {
    chai.request('127.0.0.1:3000').get('/fetchTweets?ownerID=2')
    .set('Cookie', Cookies)
    .end(function (err, res,body) {
        res.should.have.status(200);
        done();
      });
  });
// dont fetch tweets because user doesnt exists
it('should not get tweets for non-existent user', function (done) {
    chai.request('127.0.0.1:3000').get('/fetchTweets?ownerID=7')
    .set('Cookie', Cookies)
     .end(function (err, res,body) {
        res.should.have.status(409);
        done();
      });
  });
});

//********************************************************************************

// RETWEETS 

describe('Functional Test for retweeting:', function () {
it('should allow successful login', function(done) {
    chai.request('127.0.0.1:3000')
    .post('/auth')
    .send({'username': 'bob', 'password': 'cisco'})
    .end(function(error, response, body) {
        if (error) {
            console.log(error)
                    done(error);
                } else {
                                Cookies = response.headers['set-cookie'].pop().split(';')[0];
                    response.should.have.status(200);
                }
       // response.should.have.status(200);
        done();
    });
});

// should fail due to insuff parameters
it('should fail due to insuff parameters', function (done) {
    chai.request('127.0.0.1:3000').post('/retweet')
    .set('Cookie', Cookies)
    .send({'retweeterID': '3'})
     .end(function (err, res,body) {
        res.should.have.status(400);
        done();
      });
  });
// should fail due to wrong tweet id 

it('should fail due to wrong tweet id', function (done) {
    chai.request('127.0.0.1:3000').post('/retweet')
    .set('Cookie', Cookies)
    .send({'retweeterID': '3', 'tweetId': '6644'})
     .end(function (err, res,body) {
        res.should.have.status(404);
        done();
      });
  });
//should fail because it is already retweeted by the user.
it('should fail because it is already retweeted by the user.', function (done) {
    chai.request('127.0.0.1:3000').post('/retweet')
    .set('Cookie', Cookies)
    .send({'retweeterID': '3', 'tweetId': '6654'})
     .end(function (err, res,body) {
        res.should.have.status(409);
        done();
      });
  });

//working case
it('should pass successfully', function (done) {
    chai.request('127.0.0.1:3000').post('/retweet')
    .set('Cookie', Cookies)
    .send({'retweeterID': '2', 'tweetId': '6654'})
      .end(function (err, res,body) {
        res.should.have.status(200);
        done();
      });
  });
});


//********************************************************************************
// auth process - done

describe('Functional Test for auth process:', function () {

it('should fail due to insuff param', function(done) {
    chai.request('127.0.0.1:3000')
    .post('/auth')
    .send({'username': 'bob'})
    .end(function(error, response, body)
    {
        if (error)
        {
            console.log(error)
            done(error);
        } 
       
       response.should.have.status(404);
        done();
    });
});

it('should fail due to user not existing.', function(done) {
    chai.request('127.0.0.1:3000')
    .post('/auth')
    .send({'username': 'boby', 'password': 'cisco'})
    .end(function(error, response, body) 
    {
        if (error)
        {
            console.log(error)
            done(error);
        } 
        else
        {
                      
        }
       response.should.have.status(404);
        done()
    });
});

it('should fail due to wrong password.', function(done) {
    chai.request('127.0.0.1:3000')
    .post('/auth')
    .send({'username': 'bob', 'password': 'ddcisco'})
    .end(function(error, response, body) 
    {
        if (error)
        {
            console.log(error)
            done(error);
        } 
        else
        {
                      
        }
       response.should.have.status(403);
        done()
    });
});

it('should login successsfully', function(done) {
    chai.request('127.0.0.1:3000')
    .post('/auth')
    .send({'username': 'bob', 'password': 'cisco'})
    .end(function(error, response, body)
    {
        
        if (error)
        {
            console.log(error)
            done(error);
        } 
        else
        {
                      
        }
       response.should.have.status(200);
        done()
    });
});

});




//********************************************************************************

//reg process - done

describe('Functional Test for reg process:', function () {

it('should fail due to insufficient param', function(done) {
    chai.request('127.0.0.1:3000')
    .post('/reg')
    .send({'username': 'bob'})
    .end(function(error, response, body) 
    {
        if (error)
        {
            console.log(error)
            done(error);
        } 
        else
        {
                      
        }
       response.should.have.status(404);
        done();
    });
});

it('should fail due to userID already existing in the database', function(done) {
    chai.request('127.0.0.1:3000')
    .post('/reg')
    .send({'username': 'bob', 'password': 'cisco'})
    .end(function(error, response, body) 
    {
        if (error)
        {
            console.log(error)
            done(error);
        } 
        else
        {
                      
        }
       response.should.have.status(409);
        done();
    });
});


it('should reg successsfully', function(done) {
    chai.request('127.0.0.1:3000')
    .post('/reg')
   .send({'username': 'boaadbby', 'password': 'cisco'})
    .end(function(error, response, body) 
        {
        if (error)
        {
            console.log(error)
            done(error);
        } 
        else
        {
                      
        }
       response.should.have.status(200);
        done();
    });
});

});

//********************************************************************************

//delete tweet


describe('Functional Test for tweet posting:', function () {
it('should allow successful login', function(done) {
    chai.request('127.0.0.1:3000')
    .post('/auth')
    .send({'username': 'bob', 'password': 'cisco'})
    .end(function(error, response, body) {
        if (error) {
            console.log(error)
                    done(error);
                } else {
                                Cookies = response.headers['set-cookie'].pop().split(';')[0];
                    response.should.have.status(200);
                }
        done();
    });
});

it('should fail due to insuff or wrong param', function(done) {
    chai.request('127.0.0.1:3000')
    .post('/deleteTweet')
    .set('Cookie', Cookies)
    .send({'ownerID': 3})
    .end(function (err, res,body) {
        res.should.have.status(400);
        done();
      });
});

it('should fail due to tweet not existing ', function(done) {
    chai.request('127.0.0.1:3000')
    .post('/deleteTweet')
    .set('Cookie', Cookies)
    .send({'tweetId': 1728})
    .end(function (err, res,body) {
        res.should.have.status(404);
        done();
      });
});


it('should successfully delete ', function(done) {
    chai.request('127.0.0.1:3000')
    .post('/deleteTweet')
    .set('Cookie', Cookies)
    .send({'tweetId': 8007})
    .end(function (err, res,body) {
        res.should.have.status(200);
        done();
      });
});

});


//********************************************************************************

//post tweet

describe('Functional Test for tweet posting:', function () {
it('should allow successful login', function(done) {
    chai.request('127.0.0.1:3000')
    .post('/auth')
    .send({'username': 'bob', 'password': 'cisco'})
    .end(function(error, response, body) {
        if (error) {
            console.log(error)
                    done(error);
                } else {
                                Cookies = response.headers['set-cookie'].pop().split(';')[0];
                    response.should.have.status(200);
                }
       // response.should.have.status(200);
        done();
    });
});

it('should fail due to insuff param', function(done) {
    chai.request('127.0.0.1:3000')
    .post('/postTweet')
    .set('Cookie', Cookies)
    .send({'ownerID': 3})
    .end(function (err, res,body) {
        res.should.have.status(400);
        done();
      });
});

it('should fail due to user not existing ', function(done) {
    chai.request('127.0.0.1:3000')
    .post('/postTweet')
    .set('Cookie', Cookies)
    .send({'ownerID': 7, 'content': 'hello this is my tweet lol'})
    .end(function (err, res,body) {
        res.should.have.status(409);
        done();
      });
});


it('should successfully post ', function(done) {
    chai.request('127.0.0.1:3000')
    .post('/postTweet')
    .set('Cookie', Cookies)
    .send({'ownerID': 3, 'content': 'hello this is my tweet lol'})
    .end(function (err, res,body) {
        res.should.have.status(200);
        done();
      });
});

});

//********************************************************************************
// follow

describe('Functional Test for follow :', function () {
it('should allow successful login', function(done) {
    chai.request('127.0.0.1:3000')
    .post('/auth')
    .send({'username': 'bob', 'password': 'cisco'})
    .end(function(error, response, body) {
        if (error) {
            console.log(error)
                    done(error);
                } else {
                                Cookies = response.headers['set-cookie'].pop().split(';')[0];
                    response.should.have.status(200);
                }
       // response.should.have.status(200);
        done();
    });
});

it('should fail due to insuff parameters', function (done) {
    chai.request('127.0.0.1:3000').post('/follow')
    .set('Cookie', Cookies)
    .send({'followid': 2})
     .end(function (err, res,body) {
        res.should.have.status(400);
        done();
      });
  });

it('should fail due to user not existing', function (done) {
    chai.request('127.0.0.1:3000').post('/follow')
    .set('Cookie', Cookies)
    .send({'followid': 55 , 'targetid' : 33})
     .end(function (err, res,body) {
        res.should.have.status(404);
        done();
      });
  });

it('should fail due to already following', function (done) {
    chai.request('127.0.0.1:3000').post('/follow')
    .set('Cookie', Cookies)
    .send({'followid': 3 , 'targetid' : 4})
     .end(function (err, res,body) {
        res.should.have.status(409);
        done();
      });
  });



it('should successfully follow', function(done) {
    chai.request('127.0.0.1:3000')
    .post('/follow')
    .set('Cookie', Cookies)
    .send({'followid': 2 , 'targetid' : 4})
    .end(function (err, res,body) {
        res.should.have.status(200);
        done();
      });
});

});


//********************************************************************************
// unfollow

describe('Functional Test for unfollow :', function () {
it('should allow successful login', function(done) {
    chai.request('127.0.0.1:3000')
    .post('/auth')
    .send({'username': 'bob', 'password': 'cisco'})
    .end(function(error, response, body) {
        if (error) {
            console.log(error)
                    done(error);
                } else {
                                Cookies = response.headers['set-cookie'].pop().split(';')[0];
                    response.should.have.status(200);
                }
       // response.should.have.status(200);
        done();
    });
});

it('should fail due to insuff parameters', function (done) {
    chai.request('127.0.0.1:3000').post('/unfollow')
    .set('Cookie', Cookies)
    .send({'unfollowid': 2})
     .end(function (err, res,body) {
        res.should.have.status(400);
        done();
      });
  });

it('should fail due to user not existing', function (done) {
    chai.request('127.0.0.1:3000').post('/unfollow')
    .set('Cookie', Cookies)
    .send({'unfollowid': 55 , 'targetid' : 33})
     .end(function (err, res,body) {
        res.should.have.status(404);
        done();
      });
  });

it('should fail due to already not following', function (done) {
    chai.request('127.0.0.1:3000').post('/unfollow')
    .set('Cookie', Cookies)
    .send({'unfollowid': 4 , 'targetid' : 2})
     .end(function (err, res,body) {
        res.should.have.status(409);
        done();
      });
  });



it('should successfully unfollow', function(done) {
    chai.request('127.0.0.1:3000')
    .post('/unfollow')
    .set('Cookie', Cookies)
    .send({'unfollowid': 3 , 'targetid' : 4})
    .end(function (err, res,body) {
        res.should.have.status(200);
        done();
      });
});

});

//********************************************************************************
// LIKEDISLIKE



describe('Functional Test for LIKEdiSLIKE:', function () {
it('should allow successful login', function(done) {
    chai.request('127.0.0.1:3000')
    .post('/auth')
    .send({'username': 'bob', 'password': 'cisco'})
    .end(function(error, response, body) {
        if (error) {
            console.log(error)
                    done(error);
                } else {
                                Cookies = response.headers['set-cookie'].pop().split(';')[0];
                    response.should.have.status(200);
                }
       // response.should.have.status(200);
        done();
    });
});

// should fail due to missing parameters
it('should fail due to missing parameters', function (done) {
    chai.request('127.0.0.1:3000').post('/likeDislike')
    .set('Cookie', Cookies)
    .send({'tweetId': '3', 'id': '6644'})
     .end(function (err, res,body) {
        res.should.have.status(400);
        done();
      });
  });
// should fail due to wrong tweet id 


//should fail because it is already liked by the user.
it('should fail because it is already liked.', function (done) {
    chai.request('127.0.0.1:3000').post('/likeDislike')
    .set('Cookie', Cookies)
    .send({'tweetId': '6654', 'id': '2', 'bool': 1})
     .end(function (err, res,body) {
        res.should.have.status(409);
        done();
      });
  });

it('should fail because its not already liked', function (done) {
    chai.request('127.0.0.1:3000').post('/likeDislike')
    .set('Cookie', Cookies)
    .send({'tweetId': '9954', 'id': '2', 'bool' : 0})
     .end(function (err, res,body) {
        res.should.have.status(409);
        done();
      });
  });


//working case
it('should pass successfully', function (done) {
    chai.request('127.0.0.1:3000').post('/likeDislike')
    .set('Cookie', Cookies)
    .send({'tweetId': '8007', 'id': '3' , 'bool': 1})
      .end(function (err, res,body) {
        res.should.have.status(200);
        done();
      });
  });
});
