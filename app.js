let Twitter = require('twitter');
let config = require('./config/twitter_config.js');
const { getRequestBearer } = require('./api/request_bearer_token');

let express = require('express');
let app = express();


const path = require('path');
// const fetch = require('node-fetch');
const PORT = 3000;

// let server = require('http').Server(app);
// let io = require('socket.io')(server);

// app.use('/', express.static(__dirname + '/public'));

let { analyzeTweetsViaGoogle } = require('./api/language_api_google');
let { analyzeTweetsViaIbm } = require('./api/language_api_ibm');

app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});


// let currentStream = 0;
// let twitterRequest = new Twitter(config);

// getRequestBearer((err,res) => {
//   if (err) {
//     return console.log("this is the error message:" + err);
//   } else {
//     config.bearer_token = res.access_token;
//     makeSocketConnection();

//   }
// });

// const makeSocketConnection = () => {

//     io.on('connection', function (socket) {
    
//         socket.emit('init');
    
//         socket.on('query', function(query) {
//             twitterRequest.stream('statuses/filter', {track: query}, function(stream) {
//                 if (currentStream)
//                     currentStream.destroy();
//                 stream.on('data', function(tweet) {
//                     socket.emit('tweet', tweet);
//                 });
//                 stream.on('error', function(error) {
//                     console.log(error);
//                 });
//                 currentStream = stream;
//             });
//         });
//     });
// };

app.get('/tweets', function(req, res){



    // analyzeTweetsViaIbm({ text : 'I hate this this is so dumb!'});

});

app.listen(PORT, () => {
  console.log(__dirname);
  console.log('Server listening on ${PORT}');
});







// .map((status, index) => {
//   console.log('-------------------------');
//   console.log(`Status #${index}: ` + status.text);
//   console.log('-------------------------');
// });





