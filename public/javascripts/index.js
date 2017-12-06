document.addEventListener('DOMContentLoaded', () => {

    const getTweetData = () => {
      let result = $('#result-type').val();
      let query =  $('#search-bar').val();
      query = `#${query}`;
      return {query: query, requestType: result};
    };

    $("#show-tweets").click(function(e) {
      let data = getTweetData();
      $.ajax({
        url: "/tweets",
        type: 'GET',
        data: data,
        error: function(err) {
          console.log(err);
        },
        success: function(res) {
          res.map((item, index) => {
            $("#menu").append('<li class="tweet-id">Tweet ID: '+item.id+'</li>');
            $("#menu").append('<li class="tweet-item">'+item.text+'</li>');
          });
        }
      });
    }); 


});