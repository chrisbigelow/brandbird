import Chart from 'chart.js';

document.addEventListener('DOMContentLoaded', () => {

    let myChart = undefined;
    let ctx = document.getElementById("myChart").getContext('2d');

    let myDoughnutChart = undefined;
    let ctxDonut = document.getElementById("myDoughnutChart").getContext('2d');
    

    const getTweetDataFromSearch = () => {
      let result = $('#result-type').val();
      let query =  $('#search-bar').val();
      query = `#${query}`;
      return {query: query, requestType: result};
    };

    $(".mui-form--inline").submit(function(e) {
      let data = getTweetDataFromSearch();
      $.ajax({
        url: "/tweets",
        type: 'GET',
        data: data,
        error: function(err) {
          console.log(err);
        },
        success: function(res) {
          handleResponese(res);
        }
      });
    }); 

    $(".company-buttons").click(function(e) {
        let tablinks = document.getElementsByClassName("company-buttons");
        console.log(tablinks.length);
        for (let i = 0; i < tablinks.length; i++) {
          tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        e.currentTarget.className += " active";
        console.log(e.currentTarget.className);
    });


    const getTweetDataFromButton = (queryValue) => {
      let result = 'popular';
      let query =  queryValue;
      query = `#${query}`;
      return {query: query, requestType: result};
    };

    $(".company-buttons").click(function(e) {
   
      let buttonId = e.target.value;
      let data = getTweetDataFromButton(buttonId);
      $.ajax({
        url: "/tweets",
        type: 'GET',
        data: data,
        error: function(err) {
          console.log(err);
        },
        success: function(res) {
          handleResponese(res);
        }
      });
    }); 

    const handleResponese = (res) => {

      res.tweets.map((item, index) => {
        $("#menu").append('<li class="tweet-id">Tweet ID: '+item.id+'</li>');
        $("#menu").append('<li class="tweet-item">'+item.text+'</li>');
      });

      const lab = [];
      const dat = [];

      res.ibmAnalytics.map((item) => {
        lab.push(item.tone_name);
        dat.push(item.score);
      });

      console.log("CHART RENDERING>>>");

      if (myDoughnutChart) {
        myDoughnutChart.destroy();
      }

      if (myChart) {
        myChart.destroy();
      }

      myChart = new Chart(ctx, {
          type: 'horizontalBar',
          data: {
              labels: lab,
              datasets: [{
                  label: 'Tweet Tones',
                  data: dat,
                  backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)'
                  ],
                  borderColor: [
                      'rgba(255,99,132,1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)'
                  ],
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero:true
                      }
                  }]
              }
          }
      });


      const donutOptions = {

      };

      myDoughnutChart = new Chart(ctxDonut, {
        type: 'doughnut',
        data: {
          labels: lab,
          datasets: [{
              label: 'Tweet Tones',
              data: dat,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
        },
        options: donutOptions
      });

    };




});