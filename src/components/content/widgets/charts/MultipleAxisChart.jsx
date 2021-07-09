import React, { useRef } from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { CircularProgress, useTheme } from "@material-ui/core";
import * as Utils from "../../../../constants/Utils";
import { useInterval } from "../../../../hooks/useInterval";
import { useFetchChartData } from "../../../../hooks/useFetchChartData";

export const MultipleAxisChartWidget = (props) => {
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

    let yAxisData = [];

    if (tables != null) {
        tables
            .sort((a, b) => {
                if(a.multipleYaxisPlotType) {
                    a.multipleYaxisPlotType.localeCompare(b.multipleYaxisPlotType)
                }
            })
            .forEach((item) => {
                let yAxis = {
                    labels: {
                        format: "{value} "+(item.unitName || ''),
                        style: {
                            color: item.color || theme.palette.color.chartLabelColor,
                            fontSize: 14,
                        },
                    },
                    title: {
                        text: null,
                    },
                    opposite: item.multipleYaxisPlotType === "right",
                    gridLineWidth: widgetConfig.isShowTableGrid ? 1 : 0,
                    gridLineColor: theme.palette.gridLineColor,
                };
                yAxisData.push(yAxis);
            });
    }

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
                const configData = await Utils.getChartData(widgetConfig);

                // chart related plotting logic goes here
                const currentTime = new Date().getTime();
                
                series && series.forEach((record, index) => {
                    if (record.data) {
                        const { data } = configData[index];
                        
                        if(data.length > 0) {
                            data.map((singleRecord) => {
                                return  record.addPoint(
                                    singleRecord,
                                    true,
                                    false
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

    const chartptions = {
        chart: {
            style: DEFAULT_TEXT_STYLE,
            backgroundColor: backgroundColor || theme.palette.bg.widget,
            zoomType: 'x',
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
                crosshair: true,
                type: "datetime",
                gridLineWidth: widgetConfig.isShowTableGrid ? 1 : 0,
                gridLineColor: theme.palette.gridLineColor,
                labels: {
                    style: {
                        color: theme.palette.color.chartLabelColor,
                        fontSize: 14,
                    },
                },
            },
        ],
        yAxis: yAxisData,
        // tooltip: {
        //     split: true,
        //     valueSuffix: ` ${units}`,
        // },
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
                    }
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
