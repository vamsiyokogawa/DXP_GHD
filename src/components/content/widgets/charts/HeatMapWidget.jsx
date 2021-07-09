import React from "react";
import { useTheme } from "@material-ui/core/styles";
import Highcharts from "highcharts";
import HighchartsHeatmap from "highcharts/modules/heatmap";
import HighchartsReact from "highcharts-react-official";
import _ from "lodash";

HighchartsHeatmap(Highcharts);

export const HeatMapWidget = (props) => {
    const {
        widgetConfig: {
            widget_id,
            widget_info,
            heatMapData,
            selectedHeatXAxis,
            selectedHeatYAxis,
            backgroundColor,
        },
    } = props;
    const chartName = `${widget_id}_${widget_info.name}`;

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

    

    let values = [];
    let data = [];
    let minValue = 0;
    let maxValue = 
   
    _.forEach(heatMapData, function(c, k) {
        // minValue = (c.value < minValue) ? c.value : minValue;
        values.push(parseFloat(c.value));

        data.push({
            x: parseInt(c.row),
            y: parseInt(c.column),
            value: parseFloat(c.value),
            name: c.value,
        });
    })

    minValue = Math.min(...values);
    maxValue = Math.max(...values);

    const chartOptions = {
        chart: {
            type: "heatmap",
            style: DEFAULT_TEXT_STYLE,
            backgroundColor: backgroundColor || theme.palette.bg.widget,
            renderTo: chartName,
            marginTop: 30
        },
        credits: {
            enabled: false,
        },
        title: {
            text: undefined,
        },

        xAxis: {
            categories: selectedHeatXAxis,
            labels: {
                style: {
                    color: theme.palette.textColor,
                    fontSize: 14,
                },
            },
        },
        yAxis: {
            categories: selectedHeatYAxis,
            title: null,
            labels: {
                style: {
                    color: theme.palette.textColor,
                    fontSize: 14,
                },
            },
        },
        // colorAxis: {
        //     min: minValue,
        //     minColor: "#c0e8cc",
        //     maxColor: "#4670ff",
        //     labels: {
        //         style: {
        //             color: theme.palette.textColor,
        //         },
        //     },
        // },
        colorAxis: {
            min: minValue,
            max: maxValue,
            endOnTick: false,
            startOnTick: false,
            tickInterval: 2,
            stops: [
                [0, '#c1e1cd'], //red
                [0.7, '#5c8bff'], //white
                [1, '#004f9b'] 
            ],
            
        // formatter: function() {
        //     if(data[this.series.index].color) {
        //         return '<br/>' + this.x + ': ' + this.y + data[this.series.index].color;
        //     } else {
        //         return '<br/>' + this.x + ': ' + this.y;
        //     }
        // }
        },
        legend: {
            align: "right",
            layout: "vertical",
            margin: 0,
            verticalAlign: "top",
            y: 15
        },

        // plotOptions: {
        //     series: {
        //         dataLabels: {
        //             formatter: function () {
        //                 return this.point.value;
        //             },
        //         },
        //     },
        // },
        tooltip: {
            formatter: function () {
                return (
                    "<b>" +
                    this.series.xAxis.categories[this.point.x] +
                    "</b> sold <br><b>" +
                    this.point.value +
                    "</b> items on <br><b>" +
                    this.series.yAxis.categories[this.point.y] +
                    "</b>"
                );
            },
        },
        series: [
            {
                name: "",
                borderWidth: 0,
                data,
                dataLabels: {
                    formatter: function () {
                        return this.point.value;
                    },
                    enabled: true,
                    color: theme.palette.textColor,
                    style: {
                        fontSize: 12,
                        fontWeight: 0,
                        textOutline: null,
                    },
                },
            },
        ],
        responsive: {
            rules: [
                {
                    condition: {
                        minWidth: 900,
                    },
                    chartOptions: {
                        series: [
                            {
                                dataLabels: {
                                    formatter: function () {
                                        return this.point.value;
                                    },
                                    color: theme.palette.textColor,
                                    style: {
                                        fontSize: 16,
                                        fontWeight: 0,
                                        textOutline: null,
                                    },
                                },
                            },
                        ],
                    }
                },
                {
                    condition: {
                        minWidth: 700,
                        maxWidth: 900
                    },
                    chartOptions: {
                        series: [
                            {
                                dataLabels: {
                                    formatter: function () {
                                        return this.point.value;
                                    },
                                    color: theme.palette.textColor,
                                    style: {
                                        fontSize: 14,
                                        fontWeight: 0,
                                        textOutline: null,
                                    },
                                },
                            },
                        ],
                    }
                },
                {
                    condition: {
                        minWidth: 500,
                        maxWidth: 700
                    },
                    chartOptions: {
                        series: [
                            {
                                dataLabels: {
                                    formatter: function () {
                                        return this.point.value;
                                    },
                                    color: theme.palette.textColor,
                                    style: {
                                        fontSize: 11,
                                        fontWeight: 0,
                                        textOutline: null,
                                    },
                                },
                            },
                        ],
                    }
                },
                {
                    condition: {
                        minWidth:300,
                        maxWidth: 500
                    },
                    chartOptions: {
                        yAxis: {
                            labels: {
                                formatter: function () {
                                    return (typeof this.value == 'string') ? this.value.charAt(0) : '';
                                }
                            }
                        },
                        xAxis: {
                            labels: {
                                formatter: function () {
                                    return (typeof this.value == 'string') ? this.value.charAt(0) : '';
                                }
                            }
                        },
                        series: [
                            {
                                dataLabels: {
                                    formatter: function () {
                                        return this.point.value;
                                    },
                                    color: theme.palette.textColor,
                                    style: {
                                        fontSize: 9,
                                        fontWeight: 0,
                                        textOutline: null,
                                    },
                                },
                            },
                        ],
                    }
                },
                {
                    condition: {
                        maxWidth: 300
                    },
                    chartOptions: {
                        yAxis: {
                            labels: {
                                formatter: function () {
                                    return (typeof this.value == 'string') ? this.value.charAt(0) : '';
                                }
                            }
                        },
                        xAxis: {
                            labels: {
                                formatter: function () {
                                    return (typeof this.value == 'string') ? this.value.charAt(0) : '';
                                }
                            }
                        },
                        series: [
                            {
                                dataLabels: {
                                    formatter: function () {
                                        return '';
                                    },
                                },
                            },
                        ],
                    }
                },
                {
                    condition: {
                        minHeight:700,
                        minWidth: 700,
                    },
                    chartOptions: {
                        series: [
                            {
                                dataLabels: {
                                    formatter: function () {
                                        return this.point.value;
                                    },
                                    color: theme.palette.textColor,
                                    style: {
                                        fontSize: 20,
                                        fontWeight: 0,
                                        textOutline: null,
                                    },
                                },
                            },
                        ],
                    }
                },
            ],
        },
    };

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
            containerProps={{
                style: { width: "100%", height: "100%" },
            }}
        />
    );
};
