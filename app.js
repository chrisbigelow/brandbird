let express = require('express');
let app = express();


const path = require('path');
const PORT = process.env.PORT || 5000;

require('dotenv').config();

let { analyzeTweetsViaGoogle } = require('./api/language_api_google');
let { analyzeTweetsViaIbm } = require('./api/language_api_ibm');
let { makeTwitterRequest } = require('./api/twitter_api');

app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});


app.get('/tweets', function(req, res){
  let query = req.query.query;
  let type = req.query.requestType;
  let tweets = undefined;
  makeTwitterRequest(query, type, (result) => {
    tweets = result;
    let stringTweets = "";
    tweets.map((item, index) => {
      stringTweets += item.text;
    });
    analyzeTweetsViaIbm({text: stringTweets}, (ibmRes) => {
      res.send({ibmAnalytics: ibmRes, tweets: tweets});
    });
  });

});


app.listen(PORT, () => {
  console.log(__dirname);
  console.log(`Server listening on ${PORT}`);
});




