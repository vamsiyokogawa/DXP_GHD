import React, { useRef } from "react";
import { useSelector } from "react-redux";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { CircularProgress, useTheme } from "@material-ui/core";
import * as Utils from "../../../../constants/Utils";
import { useInterval } from "../../../../hooks/useInterval";
import { useFetchChartData } from "../../../../hooks/useFetchChartData";

export const LineScatterChartWidget = (props) => {
    const theme = useTheme();
    const DEFAULT_TEXT_STYLE = {
        fontFamily: theme.root.fontFamily,
        fontStyle: "normal",
        fontVariant: "normal",
        fontWeight: "normal",
        fontStretch: "normal",
        fontSize: "14px",
        lineHeight: "normal",
        // color: theme.palette.textColor,
        // color: theme.palette.tableCellColor,
    };

    const { widgetConfig } = props;
    
    const {
        widget_id,
        widget_info,
        refreshInterval,
        units,
        backgroundColor,
        tables,
    } = widgetConfig;

    const chart = useRef(null);

    const chartName = `${widget_id}_${widget_info.name}`;

    let yAxisData = {
        //max: y_max,
        title: {
            text: null, // `Units (${units})`,
        },
        gridLineWidth: widgetConfig.isShowTableGrid ? 1 : 0,
        gridLineColor:' theme.palette.gridLineColor',
        labels: {
            style: {
                // color: theme.palette.textColor,
                color: theme.palette.color.chartLabelColor,
                fontSize: 13,
                padding: 2
            },
        },
    };
 

    const { data, loading } = useFetchChartData(widgetConfig);
    // Creates interval when refresh interval gets changed or given
    useInterval(requestData, refreshInterval * 1000);

    const chartCallback = (value) => {
        chart.current = value;
    };

    async function requestData() {
       
    }

    const chartptions = {
        chart: {
            style: DEFAULT_TEXT_STYLE,
            backgroundColor: backgroundColor || theme.palette.widgetBgColor,
            zoomType: 'x',
            renderTo: chartName, 
        },
        plotOptions: {
            scatter: {
              events: {
                legendItemClick: function() {
                  var seriesIndex = this.name;
                  var series = this.chart.series;
                  
                  if (this.visible) {
                    for (var i = 0; i < series.length; i++) {
                      if (series[i].name != seriesIndex) {
                        series[i].hide();
                      } else {
                        series[i].show();
                      }
                    }
                  } else {
                    for (var i = 0; i < series.length; i++) {
                        if (series[i].name != seriesIndex) {
                            series[i].hide();
                          } else {
                            series[i].show();
                          }
                    }
                  }
                  return false;
                }
              },
              showInLegend: true
            }
          },
        title: {
            text: "", //title,
            style: {
                ...DEFAULT_TEXT_STYLE,
                fontWeight: "bold",
                letterSpacing: "-0.015em",
                "line-height": "1.25em",
            },
            useHtml: true,
            align: "left",
        },
        legend: {
            itemStyle: {
                ...DEFAULT_TEXT_STYLE,
                color: theme.palette.color.chartLabelColor,
            },
            itemHoverStyle: {
                color: theme.palette.textColor,
            },
            itemHiddenStyle: {
                color: theme.palette.hiddenColor,
            },
        },
        credits: {
            enabled: false,
        },
        lang: {
            noData: "No data to display",
        },
        noData: {
            style: {
                ...DEFAULT_TEXT_STYLE,
            },
        },
        xAxis: [
            {
                // crosshair: true,
                // tickInterval:1,
                // tickPositions: [1, 2, 5, 10, 30, 60, 120, 300, 600].map((v) => Math.log10(v)),
                // min:20,
                // max:400,
                // endOnTick: false,
                maxPadding:0.1,
                // type: "logarithmic",
                type: "linear",
                gridLineWidth: widgetConfig.isShowTableGrid ? 1 : 0,
                gridLineColor: theme.palette.gridLineColor,
                labels: {
                    style: {
                        // color: theme.palette.textColor,
                        color: theme.palette.color.chartLabelColor,
                        fontSize: 14,
                    },
                },
            },
        ],
        yAxis: [
            {
                ...yAxisData,
                labels: {
                    style: {
                        color: theme.palette.color.chartLabelColor,
                        fontSize: 14,
                    },
                },
            }
        ],
        tooltip: {
            shared: false,
            formatter: function() {
                if(data[this.series.index].unitname) {
                    return '<br/>' + this.x + ': ' + this.y + data[this.series.index].unitname;
                } else {
                    return '<br/>' + this.x + ': ' + this.y;
                }
                
            }
        },       
        series: data,
        responsive: {
            rules: [
                {
                    condition: {
                        maxWidth: 500,
                    },
                    chartOptions: {
                        legend: {
                            floating: false,
                            layout: "horizontal",
                            align: "center",
                            verticalAlign: "bottom",
                            x: 0,
                            y: 0,
                        },
                        yAxis: [
                            // {
                            //     labels: {
                            //         align: "right",
                            //         x: 0,
                            //         y: -6,
                            //     },
                            //     showLastLabel: false,
                            // },
                            // {
                            //     labels: {
                            //         align: "left",
                            //         x: 0,
                            //         y: -6,
                            //     },
                            //     showLastLabel: false,
                            // },
                            {
                                visible: true,
                            },
                        ],
                    },
                },
            ],
        },
    };

    return (
        <>
            {loading ? (
                <div className="loader-container">
                    <CircularProgress color="inherit" />
                </div>
            ) : (
                <HighchartsReact
                    highcharts={Highcharts}
                    options={chartptions}
                    containerProps={{
                        style: { width: "100%", height: "100%" },
                    }}
                    callback={chartCallback}
                />
            )}
        </>
    );
};
