import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import MapContainer from "../../../common/MapContainer";

export const GoogleMapsWidget = (props) => {
    const {
        widgetConfig: { widget_id, googleLatLong, backgroundColor },
    } = props;

    const darkMode = useSelector((state) => state.commonReducer.darkMode);

    const useStyles = makeStyles((theme) => ({
        labelWrapper: {
            height: "100%",
            backgroundColor: backgroundColor || theme.palette.bg.widget,
            "&>div>div": {
                top: "0 !important",
            },
            "&>div>div>div>div": {
                borderRadius: 5,
            },
        },
    }));

    const classes = useStyles();

    return (
        <div key={widget_id} className={classes.labelWrapper}>
            <MapContainer latLong={googleLatLong} darkMode={darkMode} />
        </div>
    );
};
