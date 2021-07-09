import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";
import Clock from "../../../../assets/clock.svg";
import * as Utils from "../../../../constants/Utils";
import { useInterval } from "../../../../hooks/useInterval";
import { ReactComponent as ArrowDown } from "../../../../assets/arrow-down.svg";
import { ReactComponent as ArrowUp } from "../../../../assets/arrow-up.svg";
import { useFetchChartData } from "../../../../hooks/useFetchChartData";

export const LabelUrlWidget = (props) => {
    const { widgetConfig } = props;
    const { widget_id, title, backgroundColor, refreshInterval, link } =
        widgetConfig;

    // const backgroundImage = (widgetConfig.image != '') ? widgetConfig.image : Clock;
    const backgroundImage = (widgetConfig.image != '') ? widgetConfig.image : '';

    const useStyles = makeStyles((theme) => ({
        labelWrapper: {
            height: "100%",
            backgroundColor: backgroundColor || theme.palette.bg.widget,
            fontFamily: theme.root.fontFamily,
            textAlign: "center",
            
        },
        image: {
            height: "30%",
            opacity: "0.3",
            margin: "auto",
            display: "block",
            marginTop: "0%",
            float:"left",
            minHeight:"40px",
        },
        textContainer: {
            position: "absolute",
            textAlign: "right",
            bottom: 15,
            width: "100%",
        },
        textContainercontent: {
            textAlign: "center",
            position: "absolute",
            top: '30%',
            width: "100%",
            padding: '8px 0px 8px 0px',
            color: widgetConfig.labelTextColor || theme.palette.textColor,           
            
        },
        value: {
            fontWeight: 500,
            fontSize: "1rem",
            justifyContent: "right",
            right: 15,
            alignItems: "right",
            "& svg": {
                fill: theme.palette.textColor,
                marginRight: 10,
            },
        },
        title: {
            fontWeight: 400,
            color: "#fff",
        },
        cursor: {
            cursor: "pointer",
        },
        labelClass: {
            textAlign: "right",
            marginRight:'10px',
            fontSize: '20px',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
        }
    }));
    const classes = useStyles();

    const prevVal = useRef(null);
    const subtract = useRef(null);
    const change = useRef(null);

    const { data, loading, setData } = useFetchChartData(widgetConfig);
    const setOpacity = widgetConfig.imageOpacity || 0.1;

    useInterval(requestData, refreshInterval * 1000);

    async function requestData() {
        // refresh logic goes here
        // calling api and getting formatted data
        try {
            const newData = await Utils.getChartData(widgetConfig);
            if (newData) {
                let newVal = Number(newData.data);
                const randomValue = Math.round(Math.random() * 100);
                newVal = subtract.current
                    ? newVal - randomValue
                    : newVal + randomValue;

                subtract.current = !subtract.current;

                if (newVal > prevVal.current) {
                    change.current = <ArrowUp />;
                } else if (newVal < prevVal.current) {
                    change.current = <ArrowDown />;
                } else {
                    change.current = null;
                }

                // chart related plotting logic goes here
                newData.data = newVal.toFixed(2);
                prevVal.current = newVal;

                setData(newData);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const openLink = () => {
        if (link) {
            window.open(link);
        }
    };

    return (
        <>
            {loading ? (
                <div className="loader-container">
                    <CircularProgress color="inherit" />
                </div>
            ) : (
                <div
                    key={widget_id}
                    className={
                        classes.labelWrapper +
                        " " +
                        (link ? classes.cursor : "")
                    }
                    
                    onClick={openLink}
                >
                    <div className={classes.textContainer}  style={
                        {
                            // background: (backgroundImage)? `url(${backgroundImage}) no-repeat`: `url(${Clock}) no-repeat`,
                            background: (backgroundImage)? `url(${backgroundImage}) center no-repeat`: ``,
                             //backgroundSize:"cover",
                            backgroundPosition:'left',
                            opacity: setOpacity,
                            height: '60%',
                            backgroundSize: 'contain',
                            margininbottom: '15px',

                        }
                    }>
                    </div>

                    <div className={classes.textContainercontent}>
                        <div className={classes.labelClass}>
                            {title}
                        </div>
                    </div>
                
                    {/* {(typeof backgroundImage != 'undefined') ? 
                        <img src={backgroundImage} alt={title} className={classes.image} />
                        : <img src={Clock} alt={title} className={classes.image} />
                    } */}
                  
                </div>
            )}
        </>
    );
};
