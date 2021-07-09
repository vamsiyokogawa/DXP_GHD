import React, { useRef } from "react";
import { useSelector } from "react-redux";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more.js";
import solidGauge from "highcharts/modules/xrange.js";
import { CircularProgress, useTheme } from "@material-ui/core";
import * as Utils from "../../../../constants/Utils";
import { useInterval } from "../../../../hooks/useInterval";
import { useFetchChartData } from "../../../../hooks/useFetchChartData";

highchartsMore(Highcharts);
solidGauge(Highcharts);

export const RunningChartWidget = (props) => {

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

    const type = 'xrange';

    const tableName = widgetConfig.tables;
    
    const chartName = `${widget_id}_${widget_info.name}`;

    const { data, loading } = useFetchChartData(widgetConfig);   
    
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
                            if (record.data) {
                                const { data } = newData[index];
                                
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
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    const chartSettings = {
        chart: {
            type,
            style: DEFAULT_TEXT_STYLE,
            backgroundColor: backgroundColor || theme.palette.bg.widget,
            renderTo: chartName,
            zoomType: "x",
            borderColor: 'red',
        },
        title: {
            text: "",
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
            ...legendObj,
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
        xAxis: {
            type: 'datetime',
        },
        yAxis: {
            title: {
                text: ''
            },
            reversed: true
        },
        plotOptions: {
            xrange: {
                pointWidth:40,
            },
            dataLabels: {
                enabled: true,
            }
        },
        series: data,
        credits: {
            enabled: false,
        },
        tooltip: {
            formatter: function () {
                return '<b>' + Highcharts.dateFormat('%A, %b %d, %Y', this.point.x) + ' - ' + Highcharts.dateFormat('%A, %b %d, %Y', this.point.x2) + '<br><b>' + this.series.name + '</b>';
            }
        },
        // responsive: {
        //     rules: [
        //         {
        //             chartOptions: {
        //                 legend: legendObj,
        //             },
        //         },
        //     ],
        // },
    }

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
                    options={chartSettings}
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
