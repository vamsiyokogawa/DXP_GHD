import React, { useRef } from "react";
import { useSelector } from "react-redux";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { CircularProgress, useTheme } from "@material-ui/core";
import * as Utils from "../../../../constants/Utils";
import { useInterval } from "../../../../hooks/useInterval";
import { useFetchChartData } from "../../../../hooks/useFetchChartData";

export const SparkLineChartWidget = (props) => {
    const chart = useRef(null);
    const type = "area";
    const chartName = `spark`;
    let chartDetails = [];
   
    try {   

      if(props.sparkLineData.SparkLine) {
        chartDetails = props.sparkLineData.SparkLine.map(a => a.Value);;
      }
      // Creates interval when refresh interval gets changed or given
      // useInterval(requestData, refreshInterval * 1000);
      
    } catch (err) {
      chartDetails = [];
    }

    const chartCallback = (value) => {
      chart.current = value;
    };

    // console.log(props)
    const defaultOptions = {
        chart: {
          backgroundColor: null,
          borderWidth: 0,
          type: 'area',
          margin: [2, 0, 2, 2],
          width: 120,
          height: 13,
          style: {
            overflow: 'visible'
          },
      
          // small optimalization, saves 1-2 ms each sparkline
          // skipClone: true
        },
        title: {
          text: ''
        },
        credits: {
          enabled: false
        },
        xAxis: {
          lineWidth: 0,
          tickWidth: 0,
          labels: {
            enabled: false
          },
          title: {
            text: null
          },
          startOnTick: false,
          endOnTick: false,
          tickPositions: []
        },
        yAxis: {
          gridLineWidth: 0,
          endOnTick: false,
          startOnTick: false,
          labels: {
            enabled: false
          },
          title: {
            text: null
          },
          tickPositions: [0]
        },
        legend: {
          enabled: false
        },
        tooltip: {
          enabled:false
        },
        plotOptions: {
          series: {
            color: props.chart.chartBackgroundColor,
            animation: false,
            lineWidth: 0,
            shadow: false,
            states: {
              hover: {
                lineWidth: 0,
                enabled: false

              }
            },
            marker: {
              enabled:false,
              radius: 0,
              states: {
                hover: {
                  radius: 0,
                  enabled: false
                }
              }
            },
            fillOpacity: 0.5
          },
          column: {
            negativeColor: '##63c6fc',
            borderColor: '#910000'
          }
        },
      
        series: [{
          data: chartDetails
        }]
      };    
      
      return (
        <>  
              {chartDetails && chartDetails.length > 0 ? (
                <HighchartsReact
                    highcharts={Highcharts}
                    options={defaultOptions}
                    containerProps={{
                        style: { width:"100%", height: "100%" },
                    }}
                    callback={chartCallback}
                />
              ) : ''}
        </>
    );
};
