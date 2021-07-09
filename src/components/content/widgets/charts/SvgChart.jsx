import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";


export const SvgChart = (props) => {
   
    const url = window.location.origin;

    const { widgetConfig } = props;
    const { widget_id, title, image, backgroundColor } = widgetConfig;

    const setOpacity = 1;

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
        svgImage: {
            width: '100%',
            height: '100%',
            '& div': {
                width:'100%',
                height:'100%'
            },
            '& svg': {
                width:'100%',
                height:'100%',
                transform: 'scale(1) !important'
            }
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

    useEffect(() => {
        if(typeof widgetConfig.image != 'undefined' && typeof widgetConfig.svgToken != 'undefined'
            && widgetConfig.image != null && widgetConfig.svgToken != null
        ) {

            window.SVGUrl = image;
            window.SVGToken = widgetConfig.svgToken;

            let threeJsScript = document.createElement("script");
            let orbitJsScript = document.createElement("script");
            let guiJsScript = document.createElement("script");
            let svgRender = document.createElement("script");
        
            // Hook Sources.
            threeJsScript.src = `${window.location.origin}/library/svg.js`;
            orbitJsScript.src = `${window.location.origin}/library/printf.min.js`;
            guiJsScript.src = `${window.location.origin}/library/crypto-js.js`;
            svgRender.src = `${window.location.origin}/library/svg-render.js`;
        
            svgRender.onload = () => scriptLoaded();
            // Persist order of Loading.
            threeJsScript.async = false;
            orbitJsScript.async = false;
            guiJsScript.async = false;
            svgRender.async = false;

            // Append to index.html
            document.body.appendChild(threeJsScript);
            document.body.appendChild(orbitJsScript);
            document.body.appendChild(guiJsScript);
            document.body.appendChild(svgRender);
            
            // Do Clean ups
            return () => {
            document.body.removeChild(threeJsScript);
            document.body.removeChild(orbitJsScript);
            document.body.removeChild(guiJsScript);
            document.body.removeChild(svgRender);
            };
        }
    }, []);

    const scriptLoaded = () => {
        let jsonData;
        console.log('In Data', window.svg);
        window.svg.on('ready', () => {
            setInterval(function () {
                jsonData = {
                    "A1": Math.random() * 100,
                    "A2": Math.random() * 100,
                    "A3": Math.random() * 100,
                    "A4": Math.random() * 100,
                    "A5": Math.random() * 100,
                    "A6": Math.random() * 100,
                    "A7": Math.random() * 100,
                    "A8": Math.random() * 100,
                    "A9": Math.random() * 100,
                    "A10": Math.random() * 100,
                }
                
                window.svg.setJson(jsonData)
            }, 1000) 
        })
    }

    const eventCallHandler = () => {
        console.log('In');
    }
   
    async function requestData() {
        // const { series } = chart.current || {};
        // if (series) {
        //     // refresh logic goes here
        //     // calling api and getting formatted data
        //     try {
        //         const newData = await Utils.getChartData(widgetConfig);

        //         if (newData && newData.length) {
        //             // chart related plotting logic goes here
        //             const currentTime = new Date().getTime();
                    
        //             series &&
        //                 series.forEach((record, index) => {
        //                     if (record.data) {
        //                         const { data } = newData[index];
                                
        //                         if(data.length > 0) {
        //                             data.map((singleRecord) => {
        //                                 return  record.addPoint(
        //                                     singleRecord,
        //                                     true,
        //                                     false
        //                                 );
        //                             })
        //                         }
        //                     }
        //                 });
        //         }
        //     } catch (error) {
        //         console.error(error);
        //     }
        // }
    }

    return (
        <>
            <div key={widget_id} className={classes.labelWrapper} >
                <div className={classes.imageContainer}>
                    <div id="divsvg" className={classes.svgImage}></div>
                </div>
            </div>
        </>
    );
};
