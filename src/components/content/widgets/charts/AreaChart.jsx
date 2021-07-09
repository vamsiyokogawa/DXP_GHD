import React, { useRef } from "react";
import { useSelector } from "react-redux";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { CircularProgress, useTheme } from "@material-ui/core";
import * as Utils from "../../../../constants/Utils";
import { useInterval } from "../../../../hooks/useInterval";
import { useFetchChartData } from "../../../../hooks/useFetchChartData";

export const AreaChartWidget = (props) => {
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

    const type = "area";
    const chartName = `${widget_id}_${widget_info.name}`;

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
            // calling api and getting formatted data
            try {
                const configData = await Utils.getChartData(widgetConfig);

                // chart related plotting logic goes here
                const currentTime = new Date().getTime();
                series &&
                    series.forEach((series, index) => {
                        if (series.data) {
                            const { data } = configData[index];
                            const recentData =
                                data[data.length - 1][1] +
                                Math.round(Math.random() * 10);
                            series.addPoint(
                                [currentTime, recentData],
                                true,
                                true
                            );
                        }
                    });
            } catch (error) {
                console.error(error);
            }
        }
    }

    const chartptions = {
        chart: {
            type,
            style: DEFAULT_TEXT_STYLE,
            backgroundColor: backgroundColor || theme.palette.bg.widget,
            // zoomType: false,
            renderTo: chartName,
            // zoomType: "x",
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
            type: "datetime",
            gridLineWidth: 1,
            gridLineColor: theme.palette.gridLineColor,
            //categories: xAxis,
            tickmarkPlacement: "off",
            title: {
                enabled: false,
            },
            labels: {
                style: {
                    color: theme.palette.textColor,
                    fontSize: 13,
                },
            },
        },
        yAxis: {
            //max: y_max,
            gridLineWidth: 1,
            gridLineColor: theme.palette.gridLineColor,
            title: {
                text: null, // `Units (${units})`,
            },
            labels: {
                style: {
                    color: theme.palette.textColor,
                    fontSize: 13,
                },
            },
        },
        tooltip: {
            split: true,
            // valueSuffix: ` ${units}`,
        },
        plotOptions: {
            area: {
                fillOpacity: 0.1,
            },
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
