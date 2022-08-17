import React, {useEffect} from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
// import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export default function NewPieChart(props){

    useEffect(() => {
        if(props.pieChartVisualzieddata && props.pieChartVisualzieddata["Satisfication"] && props.pieChartVisualzieddata["Satisfication"]){
            let ratingArray = [];
                   Object.keys(props.pieChartVisualzieddata["Satisfication"]).map((item) => {
                             let ratingObj = {};
                             ratingObj["category"] = item;
                             ratingObj["value"] = props.pieChartVisualzieddata["Satisfication"][item];
                             ratingArray.push(ratingObj)
                   })
                       renderChart(ratingArray)
           }
        
    },[props.pieChartVisualzieddata])

    const renderChart = (ratingArray) => {
        var root = am5.Root.new(`chartdiv${props.id}`);
        root.setThemes([
            am5themes_Animated.new(root)
          ]);
          
          var chart = root.container.children.push(am5percent.PieChart.new(root, {
            layout: root.verticalLayout
          }));
          
          
          var series = chart.series.push(am5percent.PieSeries.new(root, {
            valueField: "value",
            categoryField: "category"
          }));

          series.data.setAll(ratingArray);
          
          
         
          series.appear(1000, 100);
          
    }
    let chartdiv = "chartdiv" + props.id
    return(
        <div>
            <div id={chartdiv} style={{ height: '300px', width: '100%' }} />
        </div>
    )
}