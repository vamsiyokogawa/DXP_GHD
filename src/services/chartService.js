import axios from "axios";

const chartService = (params, cancelToken) => {
    /* let data = JSON.stringify({"info":{"deviceName":"","deviceId":1,"dataPath":"usp_GetDetailSplineChartData","desc":"desc","source": "timeseries"},
    "config":{"type":"linechart","widgetsetup":`${params.isWidgetSetup}`,
    "metrics":[{"metric":"cost","aggregrate":"none","start":"1617624000","end":"1617624000"},
    {"metric":"consumption","aggregrate":"none","start":"1617624000","end":"1617624000"}]}});*/
    let data = JSON.stringify(params.request);
    const url = params.url
    // .replace(
    //     "https://sushidatainputapi.azurewebsites.net/ReactDashboardAPI",
    //     "https://reactdashboardapi.azurewebsites.net"
    // );
    let config = {
        method: "post",
        url: url, //'http://wsstg01.devtpit.com/YokagowaEnergy/api/Energy/GetlineChartData',
        headers: {
            "Cache-Control": "no-cache, no-store",
            "Content-Type": "application/json",
        },
        data: data,
        cancelToken,
    };
    return axios(config).catch((error) => {
        if (axios.isCancel(error)) {
            console.error(error);
        } else {
            throw error;
        }
    });
};

export default chartService;
