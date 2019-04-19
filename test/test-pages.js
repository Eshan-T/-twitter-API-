//fun test stuff

var expect  = require('chai').expect;
var request = require('request');
var assert = require('assert');
var chai =  require('chai');
var should = require('chai').should();
var ch = require('chai-http');

chai.use(ch);
var Cookies ;


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
                	    		console.log(response)
                	    		Cookies = response.headers['set-cookie'].pop().split(';')[0];
                    response.should.have.status(200);
                }
       // response.should.have.status(200);
        done();
    });
});

// should fail due to insuff parameters
it('should fail due to insuff parameters', function (done) {
    chai.request('127.0.0.1:3000').post('/likeDislike')
    .set('Cookie', Cookies)
    .send({'tweetId': '3', 'id': '6644'})
     .end(function (err, res,body) {
        res.should.have.status(203);
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
        res.should.have.status(204);
        done();
      });
  });

it('should fail because its not already liked', function (done) {
    chai.request('127.0.0.1:3000').post('/likeDislike')
    .set('Cookie', Cookies)
	.send({'tweetId': '8007', 'id': '2', 'bool' : 0})
     .end(function (err, res,body) {
        res.should.have.status(205);
        done();
      });
  });


//working case
it('should pass successfully', function (done) {
    chai.request('127.0.0.1:3000').post('/likeDislike')
    .set('Cookie', Cookies)
 	.send({'tweetId': '8007', 'id': '2' , 'bool': 1})
      .end(function (err, res,body) {
        res.should.have.status(200);
        done();
      });
  });
});
