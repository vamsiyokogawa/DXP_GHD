import React, { useRef } from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { CircularProgress, useTheme } from "@material-ui/core";
import * as Utils from "../../../../constants/Utils";
import { useInterval } from "../../../../hooks/useInterval";
import { useFetchChartData } from "../../../../hooks/useFetchChartData";
import { colors } from "../../../../constants/chart-utils";

export const BulletChartWidget = (props) => {
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

    const type = "bullet";
    const chartName = `${widget_id}_${widget_info.name}`;

    const { data, loading } = useFetchChartData(widgetConfig);
    console.log('data', data);
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

    const chartOptions = {
        chart: {
            inverted: true,
            marginLeft: 135,
            type: 'bullet'
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
            // pointFormat: "{series.name}: <b>{point.y:.2f} {point.unitname}</b>",
            pointFormat: '<b>{point.y}</b> (with target at {point.target})'
        },
        accessibility: {
            point: {
                valueSuffix: units,
            },
        },
        plotOptions: {
            series: {
                pointPadding: 0.25,
                borderWidth: 0,
                color: '#000',
                targetOptions: {
                    width: '200%'
                }
            }
        },
        legend: {
            enabled: false
        },
        series: data,
        credits: {
            enabled: false,
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
