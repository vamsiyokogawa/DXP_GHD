import React, { useRef } from "react";
import { useSelector } from "react-redux";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { CircularProgress, useTheme } from "@material-ui/core";
import * as Utils from "../../../../constants/Utils";
import { useInterval } from "../../../../hooks/useInterval";
import { useFetchChartData } from "../../../../hooks/useFetchChartData";

export const LineChartWidget = (props) => {

    const theme = useTheme();
    const DEFAULT_TEXT_STYLE = {
        fontFamily: theme.root.fontFamily,
        fontStyle: "normal",
        fontVariant: "normal",
        fontWeight: "normal",
        fontStretch: "normal",
        fontSize: "14px",
        lineHeight: "normal",
        color: theme.palette.textColor,
    };

    const { widgetConfig, legendObject } = props;
    const { widget_id, widget_info, refreshInterval, units, backgroundColor } =
        widgetConfig;
    const chart = useRef(null);

    // const type = "spline";
    const type = widgetConfig.lineChartType || "spline";

    const tableName = widgetConfig.tables;
    
    const chartName = `${widget_id}_${widget_info.name}`;

    const { data, loading,setData } = useFetchChartData(widgetConfig);   
    const legendData = (typeof widgetConfig.legentSelection != 'undefined') ? widgetConfig.legentSelection : '';
    let legendObj = legendObject['BOTTOM_CENTER'];

    if(legendData != null) {
        legendObj = legendObject[legendData]
    }

    useInterval(requestData, refreshInterval * 1000);

    const chartCallback = (value) => {
        chart.current = value;
    };

    async function requestData() {
        const { series } = chart.current || {};
        if (series) {
            // refresh logic goes here
            // calling api and getting formatted data
            try {
                const newData = await Utils.getChartData(widgetConfig);
                if (newData && newData.length) {
                    // chart related plotting logic goes here
                    const currentTime = new Date().getTime();
                    series &&
                        series.forEach((record, index) => {
                            const { data } = newData[index];
                            series[index].update({
                                data: data
                              }, false);
                        });
                        chart.current.redraw();
                    // series &&
                    //     series.forEach((record, index) => {
                    //         if (record.data) {
                    //             const { data } = newData[index];
                                
                    //             if(data.length > 0) {
                    //                 data.map((singleRecord) => {
                    //                     return  record.addPoint(
                    //                         singleRecord,
                    //                         true,
                    //                         false
                    //                     );
                    //                 })
                    //             }

                    //             // const recentData =
                    //             //     data[data.length - 1][1] +
                    //             //     Math.round(Math.random() * 10);

                    //             // series.addPoint(
                    //             //     [currentTime, recentData],
                    //             //     true,
                    //             //     true
                    //             // );
                    //         }
                    //     });
                }
            } catch (error) {
                console.error(error);
            }
        }
        
    }

    const chartOptions = {
        rangeSelector: {
            selected: 1
        },
        chart: {
            type,
            style: DEFAULT_TEXT_STYLE,
            backgroundColor: backgroundColor || theme.palette.bg.widget,
            renderTo: chartName,
            zoomType: "x",
        },
        title: {
            text: "", //title,
            style: {
                ...DEFAULT_TEXT_STYLE,
                color: theme.palette.textColor,
                fontWeight: "bold",
                letterSpacing: "-0.015em",
                "line-height": "1.25em",
            },
            useHtml: true,
            align: "left",
        },
       
        legend: {
            
            // width: 110,
            // maxHeight: 210,
            // padding: 10,
            // position: 'absolute',
            // overflow: 'scroll',
            // right: 10,
            // top: 40,
            // marginLeft: 20,

            // useHTML: true,
            // labelFormatter: function () {
            //     console.log('here');
            //     return '<span title="' + this.name + '">Here</span>';
            // },
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
        xAxis: {
            type: 'datetime',
            gridLineWidth: widgetConfig.isShowTableGrid ? 1 : 0 ,
            gridLineColor: theme.palette.gridLineColor,
            //categories: xAxis,
            tickmarkPlacement: "off",
            title: {
                enabled: false,
            },
            labels: {
                style: {
                    color: theme.palette.color.chartLabelColor,
                    fontSize: 14,
                },
            },
        },
        yAxis: {
            //max: y_max,
            gridLineWidth: widgetConfig.isShowTableGrid ? 1 : 0,
            gridLineColor: theme.palette.gridLineColor,
            title: {
                text: null, // `Units (${units})`,
            },
            labels: {
                style: {
                    color: theme.palette.color.chartLabelColor,
                    fontSize: 14,
                },
            },
        },
        tooltip: {
            shared: false,
            formatter: function() {
                if(data[this.series.index].unitname) {
                    return '<br/>' + this.x + ': ' + this.y + ' ' + data[this.series.index].unitname;
                } else {
                    return '<br/>' + this.x + ': ' + this.y;
                }
                
            }
        },
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false,
                },
                connectNulls: true,
            },
        },
        series: data,
        responsive: {
            rules: [
                {
                    condition: {
                        //maxWidth: 500
                    },
                    chartOptions: {
                        // legend: {
                        //     align: "center",
                        //     verticalAlign: "bottom",
                        //     layout: "horizontal",
                        // },
                   
                        legend: legendObj,
                        
                        // yAxis: {
                        //     labels: {
                        //         align: "left",
                        //         x: 0,
                        //         y: -5,
                        //     },
                        //     title: {
                        //         text: null,
                        //     },
                        // },
                        subtitle: {
                            text: null,
                        },
                        credits: {
                            enabled: false,
                        },
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
                <>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={chartOptions}
                    containerProps={{
                        style: { width: "100%", height: "100%" },
                    }}
                    callback={chartCallback}
                />
                </>
            )}
        </>
    );
};
