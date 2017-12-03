let Twitter = require('twitter');
const { getRequestBearer } = require('./request_bearer_token');


let config = require('./config.js');

const makeTwitterRequest = () => {

  let twitterRequest = new Twitter(config);

  let searchParams = {
    q: '#trump',
    count: 100,
    result_type: 'recent',
    lang: 'en'
  };

  twitterRequest.get('search/tweets', searchParams, function(err, data, response) {
    if(!err) {
      data.statuses.map((status, index) => {
        console.log('-------------------------');
        console.log(`Status #${index}: ` + status.text);
        console.log('-------------------------');
      });
    } else {
      console.log(err);
    }
  });

};

getRequestBearer((err,res) => {
  if (err) {
    return console.log("this is the error message:" + err);
  } else {
    config.bearer_token = res.access_token;
    makeTwitterRequest();

  }
});





