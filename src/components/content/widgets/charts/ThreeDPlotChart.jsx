import React, { useRef } from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Plot from 'react-plotly.js'
import { CircularProgress, useTheme } from "@material-ui/core";
import * as Utils from "../../../../constants/Utils";
import { useInterval } from "../../../../hooks/useInterval";
import { useFetchChartData } from "../../../../hooks/useFetchChartData";

export const ThreeDPlotChartWidget = (props) => {
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

    const { widgetConfig } = props;
    const { widget_id, widget_info, refreshInterval, units, backgroundColor } =
        widgetConfig;

    const chart = useRef(null);

    const type = "3dscatter";
    const chartName = `${widget_id}_${widget_info.name}`;
    console.log(widgetConfig); 
    const { data, loading } = useFetchChartData(widgetConfig);
    console.log(data);
    // Creates interval when refresh interval gets changed or given
    useInterval(requestData, refreshInterval * 1000);

    const chartCallback = (value) => {
        chart.current = value;
    };

    function randomValues(num, mul) {
        const arr = [];
        const index = [];
        for (let i = 0; i < num; i++) {
          arr.push(Math.random() * mul)
          index.push(i);
        }
        return {index, arr};
      }

    async function requestData() {
        const { series } = chart.current || {};
        if (series) {
            // refresh logic goes here
            try {
                // calling api and getting formatted data
                const newData = await Utils.getChartData(widgetConfig);

                // chart related plotting logic goes here
                const currentTime = new Date().getTime();

                series &&
                    series.forEach((record, index) => {
                        if (record.data) {
                            const { data } = newData[index];
                            
                            if(data.length > 0) {
                                data.map((singleRecord) => {
                                    return  record.addPoint(
                                        singleRecord,
                                        true,
                                        true
                                    );
                                })
                            }
                        }
                    });
            } catch (error) {
                console.error(error);
            }
        }
    }

    const chartOptions = {
        chart: {
            type,
            style: DEFAULT_TEXT_STYLE,
            backgroundColor: backgroundColor || theme.palette.bg.widget,
            zoomType: false,
            renderTo: chartName,
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
                color: theme.palette.textColor,
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
            //categories: xAxis,
            tickmarkPlacement: "off",
            title: {
                enabled: false,
            },
            gridLineWidth: 1,
            gridLineColor: theme.palette.gridLineColor,
            labels: {
                style: {
                    color: theme.palette.textColor,
                    fontSize: 13,
                },
            },
        },
        yAxis: {
            //max: y_max,
            title: {
                text: null, // `Units (${units})`,
            },
            gridLineWidth: 1,
            gridLineColor: theme.palette.gridLineColor,
            labels: {
                style: {
                    color: theme.palette.textColor,
                    fontSize: 13,
                },
            },
        },
        zAxis: {
            title: {
                text: null, // `Units (${units})`,
            },
            gridLineWidth: 1,
            gridLineColor: theme.palette.gridLineColor,
            labels: {
                style: {
                    color: theme.palette.textColor,
                    fontSize: 13,
                },
            },
        },
        tooltip: {
            split: true,
            valueSuffix: ` ${units}`,
        },
        // tooltip: {
        //     shared: false,
        //     formatter: function() {
        //         if(data[this.series.index].unitname) {
        //             return '<br/>' + this.x + ': ' + this.y + ' ' + data[this.series.index].unitname;
        //         } else {
        //             return '<br/>' + this.x + ': ' + this.y;
        //         }
        //     }
        // },
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
                        legend: {
                            align: "center",
                            verticalAlign: "bottom",
                            layout: "horizontal",
                        },
                        // yAxis: {
                        //     // labels: {
                        //     //     align: "left",
                        //     //     x: 0,
                        //     //     y: -5,
                        //     // },
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

    const traces = Array(3).fill(0).map((_, i) => {
        const {index, arr} = randomValues(20, 3);

        return {
          x: Array(20).fill(i),
          y: index,
          z: arr,
          type: 'scatter3d',
          mode: 'markers'
        }
      });
    

    return (
        <>
            {loading ? (
                <div className="loader-container">
                    <CircularProgress color="inherit" />
                </div>
            ) : (
                // <HighchartsReact
                //     highcharts={Highcharts}
                //     options={chartOptions}
                //     containerProps={{
                //         style: { width: "100%", height: "100%" },
                //     }}
                //     callback={chartCallback}
                // />
                <Plot
                    data={traces}
                    layout={{
                        autosize: true,
                    }}
                    config = {{displayModeBar: false}
                }
                />
            )}
        </>
    );
};
