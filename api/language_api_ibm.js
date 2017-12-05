const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
const ibmConfig = require('../config/ibm_config');

var toneAnalyzer = new ToneAnalyzerV3(ibmConfig);

//input type {text: }

const analyzeTweetsViaIbm = (req, res) => {

  var params = {
    // Get the text from the JSON file.
    text: req.text,
    tones: 'emotion'
  };

  toneAnalyzer.tone(params, function(err, data) {
    if (err) {
      console.log('error:', err);
    } else {
      console.log("response:", JSON.stringify(data, null, 2));
    }
  });
};

module.exports.analyzeTweetsViaIbm = analyzeTweetsViaIbm;
