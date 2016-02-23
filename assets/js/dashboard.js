$(document).ready(function(){
  
    var generateChart = {
    gender: function(data){
      
      //Calculate chart data (number of males and females)
      var m = 0;
      var f = 0;

      for(var i=0; i < data.length; i++){
        if (data[i].person.gender === "M"){
          m++;
        } else {
          f++;
        }
      }

      var chartData = [
        {
          value: m,
          color: "rgb(0,127,255)",
          highlight: "rgba(0,127,255,0.5)",
          label: "Male"
        },
        {
          value: f,
          color: "rgb(255,67,101)",
          highlight: "rgba(255,67,101,0.5)",
          label: "Female"
        }
      ];

      //Generate chart
      genderContext = $(".gender canvas").get(0).getContext("2d");
      new Chart(genderContext).Pie(chartData);

    },
    orderTotal: function(data){

      var ranges = {
        '0-14': 0,
        '15-49': 0,
        '50-99': 0,
        '100-199': 0,
        '200-299': 0
      };

      //Calculate the number of orders in each price range
      for(var i=0; i < data.length; i++){
        if (data[i].order.total < 14.50){
          ranges['0-14']++;
          } else if (data[i].order.total >= 15 && data[i].order.total <49.50) {
            ranges['15-49']++;
          } else if (data[i].order.total >= 50 && data[i].order.total <99.50) {
            ranges['50-99']++;
          }
          else if (data[i].order.total >= 100 && data[i].order.total <199.50) {
            ranges['100-199']++;
          }
          else {
            ranges['200-299']++;
          }
        
        }

      var chartData = {
        labels: ['0-14','15-49','50-99','100-199','200-299'],
        datasets: [
          {
            fillColor: "rgba(0,127,255,0.4)",
            strokeColor: "rgba(0,127,255,0.8)",
            highlightFill: "rgba(0,127,255,0.8)",
            highlightStroke: "rgba(0,127,255,0.4)",
            data: [ranges['0-14'],ranges['15-49'],ranges['50-99'],ranges['100-199'],ranges['200-299']]
          }
        ]
      };
      //Generate chart
      orderContext = $(".order-total canvas").get(0).getContext("2d");
      new Chart(orderContext).Bar(chartData);

    },
    orderCategory: function(data){

      var categories = {
        belt: {
          value: 0,
          color: 'rgb(0,127,255)',
          highlight: 'rgba(0,127,255,0.5)',
          label: 'Belt'
        },
        shirt: {
          value: 0,
          color: 'rgb(177,143,207)',
          highlight: 'rgba(177,143,207,0.5)',
          label: 'Shirt'
        },
        pant: {
          value: 0,
          color: 'rgb(255,210,63)',
          highlight: 'rgba(255,210,63,0.5)',
          label: 'Pant'
        },
        footwear: {
          value: 0,
          color: 'rgb(255,67,101)',
          highlight: 'rgba(255,67,101,0.5)',
          label: 'Footwear'
        },
        jewelry: {
          value: 0,
          color: 'rgb(221,96,49)',
          highlight: 'rgba(221,96,49,0.5)',
          label: 'Jewelry'
        },
        jacket: {
          value: 0,
          color: 'rgb(44,246,179)',
          highlight: 'rgba(44,246,179,0.5)',
          label: 'Jacket'
        }
      };

      //Calculate the number of orders in each category
      for(var i=0; i < data.length; i++){
        if (data[i].order.category === "belt"){
          categories.belt.value++;
        } else if(data[i].order.category === "shirt"){
          categories.shirt.value++;
        } else if(data[i].order.category === "pant"){
          categories.pant.value++;
        } else if(data[i].order.category === "footwear"){
          categories.footwear.value++;
        } else if(data[i].order.category === "jewelry"){
          categories.jewelry.value++;
        } else {
          categories.jacket.value++;
        }
      }
      var chartData = [categories.belt,categories.shirt,categories.pant,categories.footwear,categories.jewelry,categories.jacket];
      //Generate chart
      categoryContext = $(".order-category canvas").get(0).getContext("2d");
      new Chart(categoryContext).Pie(chartData);

    },
    orderTimeline: function(data){

      //Calculate the the total orders in each quarter last year
      var quarters = [0,0,0,0];

      for(var i=0; i < data.length; i++){
        if (data[i].order.date <= "3/31/2015"){
          quarters[0]++; 
        } else if (data[i].order.date <= "6/30/2015"){
          quarters[1]++;
        } else if (data[i].order.date <= "9/30/2015"){
          quarters[2]++;
        } else {
          quarters[3]++;
        };
        console.log(quarters[0],quarters[1],quarters[2],quarters[3]);
      }

      var chartData = {
        labels: ["Q1","Q2","Q3","Q4"],
        datasets: [
          {
            fillColor: "rgba(0,127,255,0.2)",
            strokeColor: "rgba(0,127,255,1)",
            pointColor: "rgba(0,127,255,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(0,127,255,1)",
            data: [quarters[0],quarters[1],quarters[2],quarters[3]]
          }
        ]
      };
      timeContext = $(".order-timeline canvas").get(0).getContext("2d");
      new Chart(timeContext).Line(chartData);
    }
  };

  $.get('https://www.batchacademy.com/api/wdfne/dummy/intellidash', function(response){
    generateChart.gender(response);
    generateChart.orderTotal(response);
    generateChart.orderCategory(response);
    generateChart.orderTimeline(response);    

  });
   
});
