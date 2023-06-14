
      // Load the Visualization API and the corechart package.
 google.charts.load('current', {'packages':['corechart','line']});

      // Set a callback to run when the Google Visualization API is loaded.
 google.charts.setOnLoadCallback(drawChart);

      // Callback that creates and populates a data table,
      // instantiates the pie chart, passes in the data and
      // draws it.
 function drawChart() {
        // Create the data table.
 var data = new google.visualization.DataTable();
 data.addColumn('string', 'Number');
 data.addColumn('number', 'Participants');
data.addRows([
  ['2015',250],
  ['2016', 400],
  ['2017', 750],
  ['2018', 1000],
 
]);
    // Set chart options
var options = {'title':'How Many People Participated In Galactrix Over the years',
               'width':700,
               'height':400,
              'backgroundColor':"black",
              
               'animation.duration':10000
              };
        // Instantiate and draw our chart, passing in some options.
var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}