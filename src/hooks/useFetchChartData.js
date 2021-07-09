import axios from "axios";
import { useEffect, useState } from "react";
import * as Utils from "../constants/Utils";

export function useFetchChartData(widgetConfig) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let source = axios.CancelToken.source();
        // getting chart data in formatted structure from backend
        Utils.getChartData(widgetConfig, source.token)
            .then((data) => {
        console.log('utils', data);

                if (data) {
                    setData(data);
                    setLoading(false);
                }
            })
            .catch(() => {
                setLoading(false);
            });

        return () => source.cancel();
    }, [widgetConfig]);

    return { data, loading, setData };
}
