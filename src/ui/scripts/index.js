const Chart = require('chart.js')
const axios = require('axios')
const randomColor = require('randomcolor')
require('../styles/style.css')
const URL = 'https://h4t8cqibcj.execute-api.us-east-1.amazonaws.com/prod/demoresource'

var ctx = document.getElementById("myChart").getContext('2d');
const initialData = {
      labels: [],
      datasets: [{
          label: 'Count',
          data: [10,12],
          backgroundColor: [],
          borderColor: [],
          borderWidth: 1
      }]
}
const chartOptions = {
  responsive: true,
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
    }
}
const chartObject = {
  type: 'bar',
  data: initialData,
  options: chartOptions,
}
var myChart = new Chart(ctx, chartObject);
var renderChart = function renderChart(data) {
  return data.reduce(function (accum, currentElem) {
    return {
      labels: accum.labels.concat(currentElem.type),
      data: accum.data.concat(currentElem.count),
      backgroundColor: accum.backgroundColor.concat(randomColor())
    };
  }, {
    labels: [],
    data: [],
    backgroundColor: []
  });
};


function callService(){
    return function(){
      return axios.get(URL).then(function (response) {
        return response.data;
      }).then(renderChart).then(function (data) {
        console.log(data, 'Final')
        myChart.data.labels = data.labels;
        myChart.data.datasets[0].data = data.data;
        myChart.data.datasets[0].backgroundColor = data.backgroundColor;
        console.log(myChart.data, 'data')
        myChart.update();
      });

    }
}
setInterval(callService(), 3000)
