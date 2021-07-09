import React, { useRef, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { CircularProgress } from "@material-ui/core";
import Clock from "../../../../assets/clock.svg";
import * as Utils from "../../../../constants/Utils";
import { useInterval } from "../../../../hooks/useInterval";
import { ReactComponent as ArrowDown } from "../../../../assets/arrow-down.svg";
import { ReactComponent as ArrowUp } from "../../../../assets/arrow-up.svg";
import { useFetchChartData } from "../../../../hooks/useFetchChartData";
import { red } from "@material-ui/core/colors";
import _, { conforms } from "lodash";
import ReactFitText from "react-fittext";
import { SparkLineChartWidget } from "../../../../components/content/widgets/charts/SparkLineChart";
import Grid from "@material-ui/core/Grid";
export const LabelWidget = (props) => {
  const theme = useTheme();
  const { widgetConfig } = props;
  const {
    widget_id,
    widgetLayout,
    title,
    backgroundColor,
    refreshInterval,
    units,
    link,
    labelColorChecked,
    labelColorObject,
    unitPositioning,
  } = widgetConfig;

  // if(widgetLayout && ((widgetLayout.w !== widgetConfig.oldW) || (widgetLayout.h !== widgetConfig.oldH)) && (widgetLayout.h < 3 &&  widgetLayout.w < 4)){
  //     widgetConfig.fontSize = Math.round((widgetLayout.h + widgetLayout.w) / 2) * 6;
  // } else if((widgetLayout && widgetLayout.w) !== widgetConfig.oldW && (widgetLayout.h < widgetLayout.w)){
  //     widgetConfig.fontSize = Math.round((widgetLayout.h + widgetLayout.w) / 2) * 6;
  // } else if((widgetLayout && widgetLayout.w) !== widgetConfig.oldW && (widgetLayout.w < 3)){
  //     widgetConfig.fontSize = Math.round((widgetLayout.h + widgetLayout.w) / 1) * 6;
  // } else if(widgetLayout && widgetLayout.h !== (widgetConfig.oldH) && (widgetLayout.w < widgetLayout.h)){
  //     widgetConfig.fontSize = Math.round((widgetLayout.h + widgetLayout.w) / 1) * 6;
  // }else if(widgetLayout && widgetLayout.h !== (widgetConfig.oldH)){
  //     widgetConfig.fontSize = Math.round((widgetLayout.h + widgetLayout.w) / 1) * 6;
  // }
  const backgroundImage = widgetConfig.image != "" ? widgetConfig.image : "";
  const imageOpacity = widgetConfig.imageOpacity || 0.1;
  const labelColor = widgetConfig.labelTextColor || theme.palette.textColor;

  const useStyles = makeStyles((theme) => ({
    labelWrapper: {
      height: "100%",
      backgroundColor: theme.palette.bg.widget,
      fontFamily: theme.root.fontFamily,
      textAlign: "left",
      borderRadius: "6px",
    },
    widgetHeader: {
      padding: "10px 12px",
      // fontSize: '22px',
      textTransform: "none",
      // marginTop:'20px',
    },
    // chartTitle :{
    //     whiteSpace:'nowrap !important',
    // },
    JustifyEnd: {
      // flexDirection:"column",
      [theme.breakpoints.down("xs")]: {
        justifyContent: "space-between !important",
        // paddingLeft:'85px !important',
        paddingLeft: "10px !important",
        position: "relative",
        zIndex: "999",
        //top:'-20px',
      },
    },
    chartMain: {
      [theme.breakpoints.down("xs")]: {
        bottom: "-10px !important",
      },

      [theme.breakpoints.up("sm")]: {
        bottom: "-14px !important",
      },
      [theme.breakpoints.up("md")]: {
        bottom: "-19px !important",
      },
      [theme.breakpoints.up("lg")]: {
        bottom: "-8px !important",
      },
    },
    image: {
      height: "30%",
      opacity: "0.3",
      margin: "auto",
      display: "block",
      marginTop: "0%",
      float: "left",
      minHeight: "40px",
    },
    textContainer: {
      textAlign: "right",
      // position: "absolute",
      // bottom: 15,
      // right: 15,
      width: "100%",
      padding: "0px 10px 10px 10px",
    },
    textContainertitle: {
      textAlign: "center",
      position: "absolute",
      // bottom: 15,
      // right: 15,
      width: "100%",
      padding: "8px 0px 8px 0px",
      backgroundColor: theme.palette.bg.container,
    },

    textContainercontent: {
      textAlign: "right",
      paddingRight: "20px",
      // position: "absolute",
      // top: '40%',
      // left:'5%',
      // width: "50%",
      // padding: '8px 0px 8px 0px',
      color: widgetConfig.labelTextColor || theme.palette.textColor,
      fontWeight: "600",
      alignSelf: "flex-end",
      [theme.breakpoints.down("xs")]: {
        alignSelf: "flex-start !important",
        textAlign: "left !important",
        flexBasis: "50% !important",
      },
    },

    value: {
      fontWeight: 500,
      opacity: "1 !important",
      // fontSize: "20px",
      textAlign: "right",
      paddingRight: "20px",
      position: "unset",
      alignSelf: "flex-end",
      //bottom: '20px',
      zIndex: "99",
      //width:"100%",
      color: labelColor || theme.palette.widgetHeaderTitleColor,
      "& svg": {
        fill: widgetConfig.labelTextColor || theme.palette.textColor,
        marginRight: 10,
        width:
          widgetConfig.fontSize > 20
            ? widgetConfig.fontSize - 10 + "px !important"
            : widgetConfig.fontSize - 3 + "px !important",
        // width:(widgetLayout.w < 3) '10px' '15px !important'
      },
      [theme.breakpoints.down("xs")]: {
        alignSelf: "flex-end !important",
        textAlign: "right !important",
        flexBasis: "50% !important",
      },
    },
    title: {
      fontWeight: 400,
      color: "#a3a4a6",
    },

    cursor: {
      cursor: "pointer",
    },
    labelClass: {
      // textAlign: "right",
      // fontSize: (widgetConfig.fontSize) ? widgetConfig.fontSize: '30px',
      color: labelColor,
      alignItems: "center",
      justifyContent: "flex-end",
    },
    iconimg: {
      margin: "0px 0 0 15px",
      opacity: "0.3",
      [theme.breakpoints.down("xs")]: {
        position: "absolute",
      },
    },
    container: {
      display: "grid",
      gridTemplateColumns: "repeat(12, 1fr)",
      gridGap: theme.spacing(3),
    },
    chartContainer: {
      position: "absolute",
      bottom: 0,
    },
    settoTop: {
      zIndex: 999999,
    },
  }));

  const classes = useStyles();
  const prevVal = useRef(null);
  const subtract = useRef(null);
  const change = useRef(null);
  const [difference, setDifference] = useState(0);
  const { data, loading, setData } = useFetchChartData(widgetConfig);

  useInterval(requestData, refreshInterval * 1000);

  const getColorCodeWidget = (colorObject, value, colorObjectRange) => {
    let widgetColorCode = "";
    let lastVal = 0;

    _.forEach(colorObject, function (color, key) {
      if (_.has(colorObjectRange, key)) {
        let compVal = colorObjectRange[key];
        let data = Number(value).toFixed(2);

        if (key == "< LL" && data < compVal) {
          widgetColorCode = color;
        } else if (key == "> HH" && data > compVal) {
          widgetColorCode = color;
        } else if (data >= lastVal && data <= compVal) {
          widgetColorCode = color;
        }

        if (!_.isEmpty(widgetColorCode)) {
          return false;
        }

        lastVal = compVal;
      }
    });

    return widgetColorCode;
  };

  const getWidgetBackgroundColor = (colorObject, dataObject) => {
    if (!_.isEmpty(dataObject["colorObj"])) {
      return getColorCodeWidget(
        colorObject,
        dataObject.data,
        dataObject["colorObj"]
      );
    }
  };

  const getBackgroundColor = (defaultColor) => {
    let respColor = defaultColor;
    if (labelColorChecked && data) {
      respColor = getWidgetBackgroundColor(labelColorObject, data);
      respColor = _.isEmpty(respColor) ? defaultColor : respColor;
    }

    return respColor;
  };

  async function requestData() {
    // refresh logic goes here
    // calling api and getting formatted data
    try {
      const newData = await Utils.getChartData(widgetConfig);

      if (newData) {
        let newVal = Number(newData.data);
        // newVal = 5;
        // const randomValue = Math.round(Math.random() * 100);
        // newVal = subtract.current
        //     ? newVal - randomValue
        //     : newVal + randomValue;

        subtract.current = !subtract.current;
        // prevVal.current = 5;

        let DiffCount = 0;
        if (prevVal.current && newVal > prevVal.current) {
          change.current = <ArrowUp />;
          DiffCount = (newVal - prevVal.current).toFixed(2);
        } else if (prevVal.current && newVal < prevVal.current) {
          change.current = <ArrowDown />;
          DiffCount = (prevVal.current - newVal).toFixed(2);
        } else {
          change.current = null;
        }

        // chart related plotting logic goes here
        newData.data = newVal.toFixed(2);
        prevVal.current = newVal;

        setDifference(DiffCount);
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

  const labelData = data
    ? unitPositioning && unitPositioning == "Pre"
      ? units + " " + Number(data.data).toFixed(2)
      : unitPositioning && unitPositioning == "Post"
      ? Number(data.data).toFixed(2) + " " + units
      : Number(data.data).toFixed(2)
    : "";

  return (
    <>
      {loading ? (
        <div className="loader-container">
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <div
          key={widget_id}
          className={classes.labelWrapper + " " + (link ? classes.cursor : "")}
          style={{
            backgroundColor: getBackgroundColor(backgroundColor),
         
          }}
          onClick={openLink}
        >
          {widgetConfig.imageAlign === "left" ? (
            <Grid
              container
              spacing={0}
                md={12}
              alignItems={"center"}
              className={classes.labelMain}
              style={{
                justify:
                  widgetLayout && widgetLayout.w < 6 && widgetLayout.w >= 4
                    ? "flex-start"
                    : widgetLayout && widgetLayout.w < 4
                    ? "flex-start"
                    : "flex-between",
                flexDirection: "row",
                height: "100%",
                
              }}
            >
              <Grid
                container
                item
                
                className={classes.settoTop}
                md={widgetLayout && widgetLayout.w < 4 ? "12" : "6"}
                spacing={0} 
                sm={widgetLayout && widgetLayout.w < 4 ? "12" : "6"}
              >
                <Grid
                  container
                  item
                  md={12}
                  spacing={0}
                  alignItems={"center"}
                  style={{ flexWrap: "nowrap" }}
                >
                  <div
                    className="chart-icon"
                    style={{
                      display:
                        widgetLayout && widgetLayout.w < 6 ? "none" : "block",
                    }}
                  >
                    <img
                      src={backgroundImage}
                      width="65"
                      className={classes.iconimg}
                    ></img>
                  </div>
                  <div
                    className={
                      `${classes.widgetHeader} ${classes.chartTitle}` +
                      " widgetContainer-header-title"
                    }
                    style={{
                      color: widgetConfig.lableHeaderColor,
                      padding:
                        widgetLayout && widgetLayout.w < 4
                          ? "15px 0 0 10px"
                          : "0 0 0 0.5rem",
                      fontSize:
                        widgetLayout && widgetLayout.w < 4 ? "16px" : "22px",
                      marginTop:
                        widgetLayout && widgetLayout.w < 4 ? "0" : "0px",
                      whiteSpace:
                        widgetLayout && widgetLayout.w < 4
                          ? "normal"
                          : "normal",
                    }}
                  >
                    {widgetConfig.title}
                  </div>
                </Grid>
              </Grid>
              <Grid
                container
                className={`${classes.JustifyEnd} ${classes.settoTop}`}
                flexDirection={
                  widgetLayout && widgetLayout.w < 4 ? "row" : "column"
                }
                item
                md={widgetLayout && widgetLayout.w < 4 ? "12" : "6"}
                spacing={0}
                justify={
                  widgetLayout && widgetLayout.w < 4
                    ? "space-between"
                    : "flex-end"
                }
                sm={widgetLayout && widgetLayout.w < 4 ? "12" : "6"}
                alignItems={
                  widgetLayout && widgetLayout.w < 6 && widgetLayout.w >= 4
                    ? "flex-start"
                    : widgetLayout && widgetLayout.w < 4
                    ? "flex-start"
                    : "center"
                }
              >
                <div
                  className={classes.textContainercontent}
                  style={{
                    fontSize: widgetConfig.fontSize
                      ? widgetConfig.fontSize
                      : "30px",
                    alignSelf:
                      widgetLayout && widgetLayout.w < 4
                        ? "flex-start"
                        : "flex-end",
                    flexBasis:
                      widgetLayout && widgetLayout.w < 4 ? "50%" : "100%",

                    textAlign:
                      widgetLayout && widgetLayout.w < 4 ? "left" : "right",
                  }}
                >
                  <div
                    className={classes.labelClass}
                    style={{
                      whiteSpace:
                        widgetLayout && widgetLayout.w < 4
                          ? "nowrap"
                          : "normal",
                      margin:
                        widgetLayout && widgetLayout.w < 4
                          ? "0 0 0 10px"
                          : "0 0 0 0",
                    }}
                  >
                    {labelData}
                  </div>
                </div>
                {/* <ReactFitText maxFontSize='40px' minFontSize='18px'> */}
                <div
                  className={classes.value}
                  style={{
                    fontSize:
                      widgetConfig.fontSize > 20
                        ? widgetConfig.fontSize - 10
                        : widgetConfig.fontSize - 3,
                    right: widgetLayout && widgetLayout.w < 4 ? "10px" : "20px",
                    bottom:
                      widgetLayout && widgetLayout.w < 4 ? "30px" : "20px",
                    flexBasis:
                      widgetLayout && widgetLayout.w < 4 ? "50%" : "100%",
                  }}
                >
                  {change.current}
                  {difference}
                  <br />
                </div>
                {/* </ReactFitText> */}
              </Grid>
              <Grid
                container
                item
                md={12}
                spacing={0}
                className={classes.chartContainer}
              >
                <div
                  className={classes.chartMain}
                  style={{
                    width: "98%",
                    position: "absolute",
                    bottom:
                      widgetLayout && widgetLayout.w < 4 ? "-5px" : "-8px",
                    zIndex: "0",
                    right: "0",
                    left: "0",
                    margin: "0px auto",
                    // display: (widgetLayout && widgetLayout.w < 4)? 'none': 'block'
                  }}
                >
                  <SparkLineChartWidget
                    chart={widgetConfig}
                    sparkLineData={data}
                  />
                </div>
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={0}>
              <Grid
                container
                item
                md={12}
                spacing={0}
                justify={"center"}
                alignItems={"center"}
              >
                <div
                  className={
                    classes.widgetHeader + " widgetContainer-header-title"
                  }
                  style={{
                    color:
                      widgetConfig.lableHeaderColor || theme.palette.titleColor,
                    textTransform: "uppercase",
                    marginTop: "0",
                  }}
                >
                  {widgetConfig.title}
                </div>
              </Grid>
              <Grid container item md={2} spacing={0}>
                <div
                  className={classes.textContainer}
                  style={{
                    background: backgroundImage
                      ? `url(${backgroundImage}) center no-repeat`
                      : `url(${Clock}) no-repeat`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    opacity: imageOpacity,
                    height: "70%",
                    width: "70%",
                    margin: "0 auto 15px",
                    position: "absolute",
                    left: "0",
                    right: "0",
                    bottom: "0",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                ></div>
              </Grid>
              <Grid
                container
                item
                md={12}
                spacing={0}
                justify={"center"}
                alignItems={"center"}
              >
                <div
                  className={classes.textContainercontent}
                  style={{
                    fontSize: widgetConfig.fontSize
                      ? widgetConfig.fontSize
                      : "30px",
                  }}
                >
                  {/* <ReactFitText maxFontSize='500px' minFontSize="15px"> */}
                  <div
                    className={classes.labelClass}
                    style={{
                      position: "absolute",
                      left: "0",
                      right: "0",
                      top: "50%",
                      color: labelColor,
                      marginTop: "0",
                      transform: "translateY(-50%)",
                      textAlign: "center",
                    }}
                  >
                    {labelData}
                  </div>

                  {/* </ReactFitText> */}
                </div>
              </Grid>
              <Grid
                container
                item
                md={4}
                spacing={0}
                justify={"flex-end"}
                alignItems={"center"}
              >
                <ReactFitText maxFontSize="40px" minFontSize="18px">
                  <div className={classes.value}>
                    {change.current}
                    {difference}
                    <br />
                  </div>
                </ReactFitText>
              </Grid>
            </Grid>
          )}
        </div>
      )}
    </>
  );
};
