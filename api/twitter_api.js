let Twitter = require('twitter');
let config = require('../twitter_config_production');
const { getRequestBearer } = require('./request_bearer_token');
var Promise = require('es6-promise').Promise;

const makeTwitterRequest = (query, resultType, cb) => {
  // return new Promise(function(res, rej) {
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

        // process.env['BEARER_TOKEN'] = resp.access_token;
        config.bearer_token = resp.access_token;
        let twitterRequest = new Twitter(config);

        let tweetText = [];
        let maxId = undefined;

        const requestTweets = () => {
          return new Promise(function(resolve, reject) {
          
            twitterRequest.get('search/tweets', searchParams, function(error, data, response) {
              if(!error) {
                data.statuses.map((val, index) => {
                  tweetText.push({id: val.id, text: val.text});
                  if (index === (data.statuses.length -1)) {
                    searchParams.max_id = val.id;
                  }
                });
                resolve(tweetText);
              } else {
                reject("Twitter Request error: ", error);
              }
            });
          });
        };

        requestTweets()
        .then(() => requestTweets())
        .then(() => requestTweets())
        .then(() => requestTweets())
        .then(() => requestTweets())
        .then(() => requestTweets())
        .then(() => requestTweets())
        .then(() => requestTweets())
        .then(() => requestTweets())
        .then(() => requestTweets())
        .then(() => {
          // console.log(tweetText);
          return cb(tweetText);
        });

      }

  });
// });
 
};

module.exports.makeTwitterRequest = makeTwitterRequest;









  