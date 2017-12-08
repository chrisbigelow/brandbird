let Request = require('request');
let config = require('../twitter_config_production');

let key = config.consumer_key;
let secret = config.consumer_secret;

//add a colon
//URL encode the consumer key and the consumer secret according to RFC 1738
let joinedCreds = key + ':' + secret;

// console.log(joinedCreds);

let creds = new Buffer(joinedCreds).toString('base64'); //encode
let url = 'https://api.twitter.com/oauth2/token';

function getRequestBearer(cb) {
  Request({
  url: url,
  method:'POST',
  headers: {
    "Authorization": "Basic " + creds,
    "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8" },
  body: "grant_type=client_credentials"
    
}, function(err, resp, body) {
    if(err) {
      return cb(err);
    }
    if (resp.statusCode !== 200) {
      return cb(new Error('Request failed with code ' + resp.statusCode));
    }
    let json = JSON.parse(body);
    return cb(null, json);
    
});

}

module.exports.getRequestBearer = getRequestBearer;


