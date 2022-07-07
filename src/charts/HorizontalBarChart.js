import React, {useState, useEffect, Fragment} from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export default function HorizontalBarChart(props){

    // var data = [{
    //     year: "2017",
    //     income: 23.5,
    //     expenses: 18.1
    //   }, {
    //     year: "2018",
    //     income: 26.2,
    //     expenses: 22.8
    //   }, {
    //     year: "2019",
    //     income: 30.1,
    //     expenses: 23.9
    //   }, {
    //     year: "2020",
    //     income: 29.5,
    //     expenses: 25.1
    //   }, {
    //     year: "2021",
    //     income: 24.6,
    //     expenses: 25
    //   }];
    useEffect(() => {
      // console.log(props.horizontalbarVisualzieddata)
     
         if(props.horizontalbarVisualzieddata["rating"]){
          let ratingArray = [];
                 Object.keys(props.horizontalbarVisualzieddata["rating"]).map((item) => {
                          //  console.log(props.horizontalbarVisualzieddata["rating"][item])
                           let ratingObj = {};
                           ratingObj["ratingPoint"] = item;
                           ratingObj["number of Users"] = props.horizontalbarVisualzieddata["rating"][item];
                           ratingArray.push(ratingObj)

                 })
                //  console.log(ratingArray)
                     renderChart(ratingArray)
         }
      
    },[props.horizontalbarVisualzieddata])

    const renderChart = (data) => {
      // console.log(data)
        var root = am5.Root.new("chartdiv" + props.id);
        root.setThemes([
            am5themes_Animated.new(root)
          ]);
          var chart = root.container.children.push(am5xy.XYChart.new(root, {
            panX: false,
            panY: false,
            wheelX: "panX",
            wheelY: "zoomX",
            layout: root.verticalLayout
          }));
          // var legend = chart.children.push(am5.Legend.new(root, {
          //   centerX: am5.p50,
          //   x: am5.p50
          // }))
          var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
            categoryField: "ratingPoint",
            renderer: am5xy.AxisRendererY.new(root, {
              inversed: true,
              cellStartLocation: 0.1,
              cellEndLocation: 0.9
            })
          }));
          
          yAxis.data.setAll(data);
          
          var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
            renderer: am5xy.AxisRendererX.new(root, {}),
            min: 0
          }));
          
          function createSeries(field, name) {
            var series = chart.series.push(am5xy.ColumnSeries.new(root, {
              name: name,
              xAxis: xAxis,
              yAxis: yAxis,
              valueXField: field,
              categoryYField: "ratingPoint",
              sequencedInterpolation: true,
              tooltip: am5.Tooltip.new(root, {
                pointerOrientation: "horizontal",
                labelText: "[bold]{name}[/]\n{categoryY}: {valueX}"
              })
            }));
            series.set("fill", am5.color('#4158D0'));
            series.columns.template.setAll({
              height: am5.p100
            });
          
          
            series.bullets.push(function() {
              return am5.Bullet.new(root, {
                locationX: 1,
                locationY: 0.5,
                sprite: am5.Label.new(root, {
                  centerY: am5.p50,
                  text: "{valueX}",
                  populateText: true
                })
              });
            });
          
            series.bullets.push(function() {
              return am5.Bullet.new(root, {
                locationX: 1,
                locationY: 0.5,
                sprite: am5.Label.new(root, {
                  centerX: am5.p100,
                  centerY: am5.p50,
                  text: "{name}",
                  fill: am5.color(0xffffff),
                  populateText: true
                })
              });
            });
          
            series.data.setAll(data);
            series.appear();
          
            return series;
          }
          createSeries("number of Users", "Number of Users"); 
          var legend = chart.children.push(am5.Legend.new(root, {
            centerX: am5.p50,
            x: am5.p50
          }));
          
          legend.data.setAll(chart.series.values);                   
    }

    let chartdiv = "chartdiv" + props.id
    return(
        <div>
            <div id={chartdiv} style={{ height: '300px', width: '100%' }} />
        </div>
    )
}