

const wordCount = (wordsResponse) => {

    let words = [];

    wordsResponse.tweets.map((item, index) => {
      var regexp = new RegExp('#([^\\s]*)','g');
      words.concat(item.text.replace(/^[a-zA-Z]/, '').toLowerCase().replace(regexp,'').split(" "));
    });
    console.log("WORDS:", words);
    var obj = { };
    for (var i = 0, j = words.length; i < j; i++) {
       obj[words[i]] = (obj[words[i]] || 0) + 1;
    }

    console.log("COUNTS:", obj);

    // return;


};

export default wordCount;