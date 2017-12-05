let Twitter = require('twitter');
let config = require('../config/twitter_config.js');
const { getRequestBearer } = require('./api/request_bearer_token');

const makeTwitterRequest = (query, resultType) => {
  
  let twitterRequest = new Twitter(config);
  
  let searchParams = {
    q: query,
    count: 100,
    result_type: resultType,
    lang: 'en'
  };

  getRequestBearer((err,resp) => {
    if (err) {
      return console.log("Request Bearer error message:" + err);
    } else {

      config.bearer_token = resp.access_token;

      twitterRequest.get('search/tweets', searchParams, function(error, data, response) {
        if(!err) {
          return (data.statuses);
        } else {
          return console.log("Twiiter Request error: ", error);
        }
      });
  
    }

  });
  
};

module.exports.makeTwitterRequest = makeTwitterRequest;








  