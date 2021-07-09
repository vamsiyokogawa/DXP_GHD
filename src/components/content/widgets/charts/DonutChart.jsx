import React, { useRef } from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { CircularProgress, useTheme } from "@material-ui/core";
import * as Utils from "../../../../constants/Utils";
import { useInterval } from "../../../../hooks/useInterval";
import { useFetchChartData } from "../../../../hooks/useFetchChartData";
import { colors } from "../../../../constants/chart-utils";

export const DonutChartWidget = (props) => {
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
    const { widget_id, widget_info, units, backgroundColor, refreshInterval } =
        widgetConfig;

    const chart = useRef(null);

    const type = "pie";
    const chartName = `${widget_id}_${widget_info.name}`;

    const { data, loading } = useFetchChartData(widgetConfig);
    const legendData = (typeof widgetConfig.legentSelection != 'undefined') ? widgetConfig.legentSelection : '';

    let legendObj = legendObject['BOTTOM_CENTER'];
    if(legendData != null) {
        legendObj = legendObject[legendData]
    }

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

                // chart related plotting logic goes here
                series.length &&
                    series[0] &&
                    series[0].updateData(newData, true);
            } catch (error) {
                console.error(error);
            }
        }
    }

    const setResponsiveRulesDonutChart = (size, isShow = true) => {
        return {
            plotOptions: {
                pie: {
                    dataLabels: {
                        format: isShow ? "<b>{point.percentage:.1f}%</b>" : '',
                        style: {
                            textOutline: null,
                            fontSize:size
                        },
                    },
                },
            },
            subtitle: {
                text: null,
            },
        };
    }

    const chartOptions = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: type,
            style: DEFAULT_TEXT_STYLE,
            backgroundColor: backgroundColor || theme.palette.bg.widget,
            zoomType: false,
            renderTo: chartName,
        },
        colors: colors,
        title: null,
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
        tooltip: {
            pointFormat: "{series.name}: <b>{point.y:.2f} {point.unitname}</b>",
        },
        accessibility: {
            point: {
                valueSuffix: units,
            },
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: "pointer",
                dataLabels: {
                    color: theme.palette.textColor,
                    distance: "-25%",
                    format: "<b>{point.percentage:.1f}%</b>",
                    style: {
                        textOutline: null,
                        fontSize:16
                    },
                },
                showInLegend: true,
                borderWidth: 0
            },
        },
        legend: {
            ...legendObj,
            lineHeight: 120,
            labelFormatter: function() {
                return "<p style='color:"+theme.palette.color.chartLabelColor+";font-weight:800'>"
                +this.options.name+": <span style='color:"+theme.palette.color.chartLabelColor+"'>"
                +this.options.y+this.options.unitname+"</span></p>";
            }
        },
        series: data,
        credits: {
            enabled: false,
        },
        responsive: {
            rules: [
                {
                    condition: {
                        minHeight: 800
                    },
                    chartOptions: setResponsiveRulesDonutChart(40)
                },
                {
                    condition: {
                        minHeight: 650,
                        maxHeight: 800,
                    },
                    chartOptions: setResponsiveRulesDonutChart(32)
                },
                {
                    condition: {
                        minHeight: 450,
                        maxHeight: 600,
                    },
                    chartOptions: setResponsiveRulesDonutChart(24)
                },
                {
                    condition: {
                        minHeight: 300,
                        maxHeight: 450,
                    },
                    chartOptions: setResponsiveRulesDonutChart(18)
                },
                {
                    condition: {
                        minHeight: 150,
                        maxHeight: 300
                    },
                    chartOptions: setResponsiveRulesDonutChart(10)
                },
                {
                    condition: {
                        minWidth: 0,
                        maxWidth: 150,
                    },
                    chartOptions: setResponsiveRulesDonutChart(8)
                },
                {
                    condition: {
                        minWidth: 0,
                        maxWidth: 150,
                        minHeight: 0,
                        maxHeight: 150
                    },
                    chartOptions: setResponsiveRulesDonutChart(0, false)
                },
                {
                    condition: {
                        minWidth: 150,
                        maxWidth: 300
                    },
                    chartOptions: setResponsiveRulesDonutChart(12)
                },
                {
                    condition: {
                        minWidth: 300,
                        maxWidth: 500
                    },
                    chartOptions: setResponsiveRulesDonutChart(18)
                },
                {
                    condition: {
                        minWidth: 500,
                        maxWidth: 700,
                        minHeight:500,
                        maxHeight: 700
                    },
                    chartOptions: setResponsiveRulesDonutChart(24)
                },

            ],
        },
        // responsive: {
        //     rules: [
        //         {
        //             condition: {
        //                 minWidth: 700,
        //             },
        //             chartOptions: {
        //                 plotOptions: {
        //                     pie: {
        //                         dataLabels: {
        //                             distance: "-22%",
        //                             style: {
        //                                 textOutline: null,
        //                                 fontSize:22
        //                             },
        //                         },
        //                     },
        //                 },
        //                 subtitle: {
        //                     text: null,
        //                 },
        //             },
        //         },
        //         {
        //             condition: {
        //                 minWidth: 300,
        //                 maxWidth: 500
        //             },
        //             chartOptions: {
        //                 plotOptions: {
        //                     pie: {
        //                         dataLabels: {
        //                             style: {
        //                                 textOutline: null,
        //                                 fontSize:12
        //                             },
        //                         },
        //                     },
        //                 },
        //                 subtitle: {
        //                     text: null,
        //                 },
        //             },
        //         },
        //         {
        //             condition: {
        //                 maxWidth: 300
        //             },
        //             chartOptions: {
        //                 plotOptions: {
        //                     pie: {
        //                         dataLabels: {
        //                             style: {
        //                                 textOutline: null,
        //                                 fontSize:10
        //                             },
        //                         },
        //                     },
        //                 },
        //                 subtitle: {
        //                     text: null,
        //                 },
        //             },
        //         },
        //     ],
        // },
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
