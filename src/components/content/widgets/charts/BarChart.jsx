import React, { useRef } from "react";
import { useSelector } from "react-redux";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { CircularProgress, useTheme } from "@material-ui/core";
import * as Utils from "../../../../constants/Utils";
import { useInterval } from "../../../../hooks/useInterval";
import { useFetchChartData } from "../../../../hooks/useFetchChartData";
import _ from "lodash";

export const BarChartWidget = (props) => {
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
    const {
        widget_id,
        widget_info,
        refreshInterval,
        backgroundColor,
        graphPlotType,
        tables
    } = widgetConfig;

    const chart = useRef(null);

    let type = "bar";
    const chartName = `${widget_id}_${widget_info.name}`;

    type =
        graphPlotType !== "" && graphPlotType === "Vertical" ? "column" : "bar";

    let yAxisData = [];
    let addedAxis = [];
    
    if (tables != null) {
            tables.forEach((item) => {
                let yAxis = {
                    labels: {
                        format: (item.unitName != '' && item.unitName == '$') ? '${value}' : '{value}'+item.unitName,
                        style: {
                            // color: item.color || theme.palette.color.chartLabelColor,
                            color: theme.palette.color.chartLabelColor,
                            fontSize: 12,
                        },
                    },
                    title: {
                        text: null,
                    },
                    gridLineWidth: widgetConfig.isShowTableGrid ? 1 : 0,
                    gridLineColor: theme.palette.gridLineColor,
                    axisPosition: item.axisPosition
                };

                if(item.axisPosition == 'top') {
                    yAxis['opposite'] = true;
                }

                if(_.indexOf(addedAxis, item.axisPosition) < 0) {
                    yAxisData.push(yAxis);
                }
                addedAxis.push(item.axisPosition);
        });

        yAxisData = _.orderBy(yAxisData, ['axisPosition'], ['asc']);
    }

    addedAxis = undefined;

    const { data, loading } = useFetchChartData(widgetConfig);
    // Creates interval when refresh interval gets changed or given
    useInterval(requestData, refreshInterval * 1000);

    const categories = (data && data.categories) ? data.categories : [];
    const record = (data && data.data) ? data.data : [];

    const legendData = (typeof widgetConfig.legentSelection != 'undefined') ? widgetConfig.legentSelection : '';
    let legendObj = legendObject['BOTTOM_CENTER'];
    if(legendData != null) {
        legendObj = legendObject[legendData]
    }

    const chartCallback = (value) => {
        chart.current = value;
    };

    async function requestData() {
        const { series } = chart.current || {};
        if (series) {
            // refresh logic goes here
            try {
                // calling api and getting formatted data
                const configData = await Utils.getChartData(widgetConfig);

                
                if (configData && configData['data'].length) {
                    // chart related plotting logic goes here
                    const currentTime = new Date().getTime();

                    series &&
                        series.forEach((series, index) => {
                            if (series.data) {
                                const { data } = configData['data'][index];
                                let addData = [];

                                _.forEach(categories, function(v, i) {
                                    addData.push([v, data[i]]);
                                })

                                series.setData(addData);
                            }
                        });
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    if(data && data['data']) {
        yAxisData.map((singleData) => {
            singleData.title.text = data['axisTitle'][singleData.axisPosition];
            singleData.title['style'] = {color: theme.palette.color.chartLabelColor};
        })   
    }

    const setBarChartResponsive = (size, isShowData = true) => {
        let setting = {
            plotOptions: {
                bar: {
                    dataLabels: {
                        style: {
                            fontSize: size,
                            fontWeight: 0,
                            textOutline: null,
                        },
                    },
                },
            },
            subtitle: {
                text: null,
            },
        };

        if(!isShowData) {
            setting.plotOptions.bar.dataLabels = 
            {   
                formatter: function () {
                    return '';
                },
            }
        }   


        return setting;
    }

    const chartptions ={
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
     
        lang: {
            noData: "No data to display",
        },
        noData: {
            style: {
                ...DEFAULT_TEXT_STYLE,
            },
        },
        xAxis: {
              // type: "datetime",
            gridLineWidth: widgetConfig.isShowTableGrid ? 1 : 0,
            gridLineColor: theme.palette.gridLineColor,
            categories: categories,
            tickmarkPlacement: "off",
            title: {
                enabled: false,
            },
            labels: {
                style: {
                    // color: theme.palette.textColor,
                    color: theme.palette.color.chartLabelColor,
                    fontSize: 14,
                },
            },
        },
        yAxis: [
            ...yAxisData     
        ],
        tooltip: {
            valueSuffix: ' millions'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true,
                    color: theme.palette.color.chartLabelColor,
                    rotation: 0,
                    borderWidth: '1',
                    x: 0,
                    y:0,
                    style: {
                        textOutline: 'none',
                        fontSize: 12
                    },
                    formatter: function() {
                        if(record[this.series.index].unitname) {
                            let text = (record[this.series.index].unitname == '$') ? '$'+this.y : this.y + record[this.series.index].unitname;
                            return '<br/>' + text;
                        } else {
                            return '<br/>' + this.y;
                        }
                    }
                }
            }
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
            enabled: false
        },
        tooltip: {
            shared: false,
            formatter: function() {
                if(record[this.series.index].unitname) {
                    return '<br/>' + this.x + ': ' + this.y + record[this.series.index].unitname;
                } else {
                    return '<br/>' + this.x + ': ' + this.y;
                }
            }
        },
        legend: legendObj,
        series: record,
        responsive: {
            rules: [
                {
                    condition: {
                        minWidth: 0,
                        maxWidth: 300
                    },
                    chartOptions: setBarChartResponsive(0, false)
                },
                {
                    condition: {
                        minHeight: 0,
                        maxHeight:300
                    },
                    chartOptions: setBarChartResponsive(12, false)
                },
                {
                    condition: {
                        minHeight: 300,
                        maxHeight:400
                    },
                    chartOptions: setBarChartResponsive(12)
                },
                {
                    condition: {
                        minHeight: 400,
                        maxHeight:500
                    },
                    chartOptions: setBarChartResponsive(14)
                },
                {
                    condition: {
                        minHeight: 500,
                        maxHeight:600
                    },
                    chartOptions: setBarChartResponsive(16)
                },
                {
                    condition: {
                        minHeight: 600,
                        maxHeight:700
                    },
                    chartOptions: setBarChartResponsive(18)
                },
                {
                    condition: {
                        minHeight: 700,
                        maxHeight:900
                    },
                    chartOptions: setBarChartResponsive(20)
                },
                {
                    condition: {
                        minHeight: 900,
                    },
                    chartOptions: setBarChartResponsive(22)
                },
               
            ],
        },
    }

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
