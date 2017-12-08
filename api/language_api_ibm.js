const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
const ibmConfig = require('../ibm_config_production');

var toneAnalyzer = new ToneAnalyzerV3(ibmConfig);

//input type {text: }

const analyzeTweetsViaIbm = (req, cb) => {


  let mid = Math.floor(req.text.length / 2);

  let firstHalf = req.text.substring(0, mid);
  let secondHalf = req.text.substring(mid);


  var params = {
    // Get the text from the JSON file.
    text: firstHalf,
    tones: 'emotion'
  };

  var secondParams = {
    // Get the text from the JSON file.
    text: secondHalf,
    tones: 'emotion'
  };

  toneAnalyzer.tone(params, function(err, data) {
    if (err) {
      console.log('error:', err);
    } else {
      const firstReturn = data.document_tone.tone_categories[0].tones;
      toneAnalyzer.tone(secondParams, function(error, secondData) {
        if (error) {
          console.log('error:', error);
        } else {
          let final = [];
          firstReturn.map((item, index) => {
            let secValue = secondData.document_tone.tone_categories[0].tones[index];
            if (item.tone_name === secValue.tone_name) {
              final.push({tone_name: item.tone_name, score: (item.score + secValue.score) / 2});
            }
          });
          // console.log(final);
          return cb(final);
        }
      });
      
    }
  });
};



module.exports.analyzeTweetsViaIbm = analyzeTweetsViaIbm;



