$(document).ready(function () {
  $.get("/stocks?type=scatter",function(data){
    var chart = new CanvasJS.Chart("chartContainer",
    {
      title:{
        text: "1st Day Performance of Initial Public Offering (IPO) of HK stocks",      
        fontFamily: "arial black",
        fontColor: "DarkSlateGrey",
        fontSize: 30
      },
      animationEnabled: true,
      axisX: {
        title: "Oversubscription Rate",
        titleFontFamily: "arial",
        titleFontSize: 20
      },
      axisY:{
        title: "1st Day Changed",
        titleFontFamily: "arial",
        //valueFormatString:"0 USD",
        titleFontSize: 20
      },
      data: [
      {        
        type: "scatter",  
        toolTipContent: "<span style='\"'color: {color};'\"'><strong>{name}</strong></span> <br/> <strong>1st Day Changed</strong> {y}<br/> <strong>Oversubscription Rate</strong> {x} ",
        dataPoints: data
      }
      ]
    });
    chart.render();
  });
});
