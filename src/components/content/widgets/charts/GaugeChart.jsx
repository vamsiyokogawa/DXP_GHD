import React, { useRef } from "react";
import Highcharts from "highcharts/highcharts.js";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more.js";
import solidGauge from "highcharts/modules/solid-gauge.js";
import { CircularProgress, useTheme } from "@material-ui/core";
import * as Utils from "../../../../constants/Utils";
import { useInterval } from "../../../../hooks/useInterval";
import { useFetchChartData } from "../../../../hooks/useFetchChartData";

highchartsMore(Highcharts);
solidGauge(Highcharts);

const getPlotBands = (data) => {
    if (!data) return [];

    return [
        {
            from: data.l,
            to: data.ll,
            color: "#70cc88", // Outerline green
            outerRadius: "110%",
        },
        {
            from: data.mm,
            to: data.hh,
            color: "#f2495c", // Outerline red
            outerRadius: "110%",
        },
    ];
};

export const GaugeChartWidget = (props) => {
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
    const { widget_id, widget_info, units, backgroundColor, refreshInterval } =
        widgetConfig;
    // const type = "solidgauge";
    const type = widgetConfig.gaugeChartType || "gauge";

    const chartName = `${widget_id}_${widget_info.name}`;

    const chart = useRef(null);

    const { data, loading } = useFetchChartData(widgetConfig);

    // Creates interval when refresh interval gets changed or given
    useInterval(requestData, refreshInterval * 1000);

    const chartCallback = (value) => {
        chart.current = value;
    };

    async function requestData() {
        const { series } = chart.current || {};
        if (series) {
            // refresh logic goes here
            try {
                // calling api and getting formatted data
                const newData = await Utils.getChartData(widgetConfig);
                // const newVal = newData.data[0];
                // chart related plotting logic goes here
                // temparory solution
                // adding/subtracting random number to current value
                const point = series.length && series[0] && series[0].points[0];
                const inc = Math.round((Math.random() - 0.5) * 100);

                let newVal = point.y + inc;
                if (newVal < 0 || newVal > data.hh) {
                    newVal = point.y - inc;
                }

                if (point) {
                    point.update(Number(newVal).toFixed(2));
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    if(type === 'gauge') {
        var gaugePlot = {
            solidgauge: {
                dataLabels: {
                    y: 5,
                    borderWidth: 0,
                    useHTML: true,
                },
            },
        }

        var gaugePane = {
            startAngle: -90,
            endAngle: 90,
            background: {
                backgroundColor: "#22252b",
                innerRadius: "60%",
                outerRadius: "100%",
                shape: "arc",
                strokeWidth: 0,
            },
        }

        var gaugeYAxis = {
            min: 1,
            max: data ? data.hh : 0,
            stops: [
                [0, "#4eaef3"], // blue
            ],
            lineWidth: 0,
            tickWidth: 0,
            minorTickInterval: null,
            tickAmount: 2,
            labels: {
                step: 2,
                y: 16,
                style: {
                    color: theme.palette.textColor,
                    fontSize: 13,
                },
            },
            title: {
                y: -70,
                text: null, // "km/h",
            },
            plotBands: getPlotBands(data),
        }

        var gaugeSeries =  {
            name: data ? data.name : "",
            data: data ? data.data : [],
            dataLabels: {
                format:
                    '<div style="text-align:center">' +
                    '<span style="font-size:20px;">{y}</span><br/>' +
                    '<span style="font-size:12px;opacity:0.4">'+units+'</span>' +
                    "</div>",
                borderWidth: 0,
                style: {
                    textOutline: null,
                    color: theme.palette.textColor,
                },
            },
            tooltip: {
                valueSuffix: units,
            },
        }
    }

    if(type === 'solidgauge') {
        var gaugePlot = {
            solidgauge: {
                dataLabels: {
                  enabled: true,
                  verticalAlign: "middle"
                },
                rounded: true,
                visible: true
              }
        }

        var gaugePane = {
            startAngle: 0,
            endAngle: 360,
            background: [
                {
                backgroundColor: "rgba(0,0,0,0)",
                outerRadius: "112%",
                innerRadius: "100%",
                borderWidth: 0
                //   strokeWidth: 0
                }
            ]
        }

        var gaugeYAxis = {
            min: 0,
            max: data ? data.hh : 0,
            // stops: [
            //     [0, "#4eaef3"], // blue
            // ],
            lineWidth: 0,
            tickWidth: 0,
            minorTickInterval: null,
            // tickAmount: 0,
            tickAmount: 2,
            showFirstLabel: false,
            showLastLabel: false
            // labels: {
            //     step: 2,
            //     y: 16,
            //     style: {
            //         color: theme.palette.textColor,
            //         fontSize: 13,
            //     },
            // },
            // title: {
            //     y: -70,
            //     text: null, // "km/h",
            // },
            // plotBands: getPlotBands(data),
        }

        var gaugeSeries =  {
            name: data ? data.name : "",
            data: data ? data.data : [],
            radius: "112%",
            innerRadius: "100%",
            dataLabels: {
                format:
                    '<div style="text-align:center">' +
                    '<span style="font-size:20px;">{y}</span><br/>' +
                    '<span style="font-size:12px;opacity:0.4">'+units+'</span>' +
                    "</div>",
                borderWidth: 0,
                y: 40,
                style: {
                    textOutline: null,
                    color: theme.palette.textColor,
                },
            },
            tooltip: {
                valueSuffix: units,
            },
        }
    }

    const setGaugeResponsive = (fontsize, yParam, countShow = true) => {
        
        return {
            series: [
                {
                    dataLabels: {
                        format:
                            countShow ? '<div style="text-align:center">' +
                            '<span style="font-size:'+fontsize+'px;">{y}</span><br/>' +
                            '<span style="font-size:'+(fontsize - 5)+'px;opacity:0.5">'+units+'</span>' +
                            "</div>": "",
                        borderWidth: 0,
                        y: yParam,
                        style: {
                            textOutline: null,
                            color: theme.palette.textColor,
                        },
                    },
                },
            ],
        }
    }

    const chartOptions = {
        chart: {
            type: type,
            style: DEFAULT_TEXT_STYLE,
            backgroundColor: backgroundColor || theme.palette.bg.widget,
            zoomType: false,
            renderTo: chartName,
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false,
        },
        plotOptions: gaugePlot,
        title: null,
        tooltip: {
            enabled: true,
        },
        pane: gaugePane,

        // the value axis
        // the value axis
        yAxis: gaugeYAxis,
        credits: {
            enabled: false,
        },
        series: [
            gaugeSeries,
        ],
        responsive: {
            rules: [
                {
                    condition: {
                        minHeight:100,
                        maxHeight: 150,
                    },
                    chartOptions: setGaugeResponsive(12, 1)
                },
                {
                    condition: {
                        minHeight:150,
                        maxHeight: 200,
                    },
                    chartOptions: setGaugeResponsive(20, 10)
                },
                {
                    condition: {
                        minHeight:200,
                        maxHeight: 250,
                    },
                    chartOptions: setGaugeResponsive(30, 20)
                },
                {
                    condition: {
                        minHeight:250,
                        maxHeight: 300,
                    },
                    chartOptions: setGaugeResponsive(38, 20)
                },
                {
                    condition: {
                        minHeight:300,
                        maxHeight: 350,
                    },
                    chartOptions: setGaugeResponsive(41, 30)
                },
                {
                    condition: {
                        minHeight:350,
                        maxHeight: 400,
                    },
                    chartOptions: setGaugeResponsive(43, 30)
                },
                {
                    condition: {
                        minHeight:400,
                        maxHeight: 450,
                    },
                    chartOptions: setGaugeResponsive(45, 40)
                },
                {
                    condition: {
                        minHeight:450,
                        maxHeight: 500,
                    },
                    chartOptions: setGaugeResponsive(50, 40)
                },
                {
                    condition: {
                        minHeight:500,
                        maxHeight: 550,
                    },
                    chartOptions: setGaugeResponsive(55, 45)
                },
                {
                    condition: {
                        minHeight:550,
                        maxHeight: 600,
                    },
                    chartOptions: setGaugeResponsive(60, 48)
                },
                {
                    condition: {
                        minHeight:600,
                        maxHeight: 650,
                    },
                    chartOptions: setGaugeResponsive(62, 55)
                },
                {
                    condition: {
                        minHeight:650,
                        maxHeight: 700,
                    },
                    chartOptions: setGaugeResponsive(65, 65)
                },
                {
                    condition: {
                        minHeight:700,
                        maxHeight: 900,
                    },
                    chartOptions: setGaugeResponsive(68, 70)
                },
                {
                    condition: {
                        minHeight:900,
                    },
                    chartOptions: setGaugeResponsive(68, 70)
                },
                
                {
                    condition: {
                        minWidth:50,
                        maxWidth: 100,
                    },
                    chartOptions: setGaugeResponsive(12, 1)
                },
                {
                    condition: {
                        minWidth:100,
                        maxWidth: 200,
                    },
                    chartOptions: setGaugeResponsive(14, 8)
                },
                {
                    condition: {
                        minWidth:200,
                        maxWidth: 250,
                    },
                    chartOptions: setGaugeResponsive(16, 10)
                },
                {
                    condition: {
                        minHeight:0,
                        maxHeight: 100,
                    },
                    chartOptions: setGaugeResponsive(4, 35, false)
                },
                {
                    condition: {
                        minWidth:0,
                        maxWidth: 50,
                    },
                    chartOptions: setGaugeResponsive(4, 35, false)
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
                    options={chartOptions}
                    containerProps={{
                        style: { width: "100%", height: "100%" },
                    }}
                    callback={chartCallback}
                />
            )}
        </>
    );
};
