import React from "react";
import { makeStyles } from "@material-ui/core/styles";

export const ImageWidget = (props) => {
    const { widgetConfig } = props;
    const { widget_id, title, image, backgroundColor } = widgetConfig;

    const setOpacity = widgetConfig.imageOpacity || 0.1;
    
    const useStyles = makeStyles((theme) => ({
        labelWrapper: {
            height: "100%",
            display: "flex",
            flexDirection: "column",
            padding: 10,
            borderRadius:'6px',
            backgroundColor: backgroundColor || theme.palette.bg.widget,
            fontFamily: theme.root.fontFamily,
        },
        imageContainer: {
            display: "flex",
            alignItems: "center",
            flex: 1,
            height: "calc(100% - 30px)",
        },
        image: {
            height: "auto",
            width: "100%",
            maxHeight: "100%",
            opacity: setOpacity,
        },
        textContainer: {
            textAlign: "left",
            padding: 6,
        },
        value: {
            fontWeight: "bold",
        },
        title: {
            fontWeight: 400,
            fontSize: 14,
            color: widgetConfig.labelTextColor || theme.palette.textColor,
        },
    }));

    const classes = useStyles();

    return (
        <div key={widget_id} className={classes.labelWrapper}>
            {/* <div className={classes.textContainer}>
                <div className={classes.title}>{title}</div>
            </div> */}
            <div className={classes.imageContainer}>
                <img src={image} alt={title} className={classes.image} />
            </div>
        </div>
    );
};
