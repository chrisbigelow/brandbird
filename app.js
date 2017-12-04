let Twitter = require('twitter');
let config = require('./config.js');
const { getRequestBearer } = require('./request_bearer_token');

let express = require('express');
let app = express();

let server = require('http').Server(app);
let io = require('socket.io')(server);

// app.use('/', express.static(__dirname + '/public'));

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

app.get('/', function(req, res){


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
          res.send(data.statuses);
        } else {
          console.log(err);
        }
      });

    };

    getRequestBearer((err,resp) => {
      if (err) {
        return console.log("this is the error message:" + err);
      } else {
        config.bearer_token = resp.access_token;
        makeTwitterRequest();

      }
    });

});

server.listen(3000);


// .map((status, index) => {
//   console.log('-------------------------');
//   console.log(`Status #${index}: ` + status.text);
//   console.log('-------------------------');
// });





