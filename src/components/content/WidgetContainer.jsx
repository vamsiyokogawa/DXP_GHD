import React, { useState, useEffect, useRef } from "react";
import "./css/content.css";
import { useSelector, useDispatch } from "react-redux";
import { WidthProvider, Responsive } from "react-grid-layout";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import FilterListSharpIcon from "@material-ui/icons/FilterListSharp";
import SettingsSharpIcon from "@material-ui/icons/SettingsSharp";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { LineChartWidget } from "./widgets/charts/LineChart";
import { BarChartWidget } from "./widgets/charts/BarChart";
import { ScatterChartWidget } from "./widgets/charts/ScatterChart";
import { MultipleAxisChartWidget } from "./widgets/charts/MultipleAxisChart";
import { LineColumnChartWidget } from "./widgets/charts/LineColumnChart";
import { AreaChartWidget } from "./widgets/charts/AreaChart";
import { GaugeChartWidget } from "./widgets/charts/GaugeChart";
import { PieChartWidget } from "./widgets/charts/PieChart";
import { BulletChartWidget } from "./widgets/charts/BulletChart";
import { DonutChartWidget } from "./widgets/charts/DonutChart";
import { ThreeDPlotChartWidget } from "./widgets/charts/ThreeDPlotChart";
import { DataGridWidget } from "./widgets/charts/DataGridWidget";
import { AnomalyChartWidget } from "./widgets/charts/AnomalyChart";
import { LineScatterChartWidget } from "./widgets/charts/LineScatterChart";
import { LabelWidget } from "./widgets/charts/LabelWidget";
import { ImageWidget } from "./widgets/charts/ImageWidget";
import { HeatMapWidget } from "./widgets/charts/HeatMapWidget";
import { GoogleMapsWidget } from "./widgets/charts/GoogleMapsWidget";
import { LabelUrlWidget } from "./widgets/charts/LabelUrlWidget";
import { MapLabelRedirectWidget } from "./widgets/charts/MapLabelRedirectWidget";
import { RunningChartWidget } from "./widgets/charts/RunningChart";
import { SvgChart } from "./widgets/charts/SvgChart";
import * as Constants from "../../constants/Constants";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import * as Utils from "../../../src/constants/Utils";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Typography from "@material-ui/core/Typography";
import _ from "lodash";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandMoreSharpIcon from "@material-ui/icons/ExpandMoreSharp";
import useViewport from "../../components/common/useViewport";
import * as Icons from "@material-ui/icons/";
import Icon from "@material-ui/core/Icon";
import { DropDowmMenuComponent } from "../common/selectDropDown";
import MoreVertIcon from '@material-ui/icons/MoreVert';

const COMPONENTS_MAP = {
  [Constants.widgets.LINE_CHART.type]: LineChartWidget,
  [Constants.widgets.PIE_CHART.type]: PieChartWidget,
  [Constants.widgets.BULLET_CHART.type]: BulletChartWidget,
  [Constants.widgets.DONUT_CHART.type]: DonutChartWidget,
  [Constants.widgets.THREEDPLOT_CHART.type]: ThreeDPlotChartWidget,
  [Constants.widgets.GAUGE_CHART.type]: GaugeChartWidget,
  [Constants.widgets.GRID.type]: DataGridWidget,
  [Constants.widgets.LABEL.type]: LabelWidget,
  [Constants.widgets.BAR_CHART.type]: BarChartWidget,
  [Constants.widgets.MULTIPLE_AXES_CHART.type]: MultipleAxisChartWidget,
  [Constants.widgets.LINE_COLUMN_CHART.type]: LineColumnChartWidget,
  // [Constants.widgets.AREA_CHART.type]: AreaChartWidget,
  [Constants.widgets.IMAGE.type]: ImageWidget,
  ['SVGChart']: SvgChart,
  [Constants.widgets.HEATMAP.type]: HeatMapWidget,
  [Constants.widgets.GOOGLEMAP.type]: GoogleMapsWidget,
  [Constants.widgets.LABELURL.type]: LabelUrlWidget,
  [Constants.widgets.MAPLABELREDIRECT.type]: MapLabelRedirectWidget,
  [Constants.widgets.SCATTER_CHART.type]: ScatterChartWidget,
  [Constants.widgets.ANOMALY_CHART.type]: AnomalyChartWidget,
  [Constants.widgets.LINE_SCATTER_CHART.type]: LineScatterChartWidget,
  [Constants.widgets.RUNNING_CHART.type]: RunningChartWidget
};

const useStyles = makeStyles(theme => ({
  // root: {
  //   [theme.breakpoints.down('sm')]: {
  //     backgroundColor: 'red',
  //   },
  // },
  margin: {
    margin: theme.spacing(1),
    cursor: "cell"
  },
  widgetCard: {
    borderColor: theme.palette.widgetBorder + " !important"
    // backgroundColor: theme.palette.bg.widget + " !important"
  },
  widgetHeader: {
    backgroundColor: "rgba(0, 0, 0, 0.1);",
    // backgroundColor: theme.palette.bg.widgetHeader,
    fontFamily: theme.root.fontFamily,
    // transition: "0.5s all",
    padding: "15px 0px",
    borderRadius: 0,
    zIndex: 1,
    "&:hover": {
      cursor: "move",
      opacity: "1 !important"
    }
  },

  drowDownList: {
    "& .MuiSelect-outlined": {
      padding: "6px 20px",
      color: theme.palette.color.primary
    },
    "& .MuiSelect-icon": {
      top: "calc(50% - 9px)"
    }
    //   "& .MuiListItemIcon-root": {
    //    minWidth:'30px !important'
    // },
    // ".MuiListItem-gutters": {
    //   paddingLeft: '15px',
    //   paddingRight: '15px',
    // },
  },
  rangeList: {
    width: 258,
    minWidth: 300,
    margin: "0px auto",
    top: "0px !important",
    right: "0px !important"
  },
  rangeBtn: {
    width: "auto",
    margin: 9,
    padding: "5px !important",
    minWidth: "auto"
  },
  rangePicker: {
    position: "absolute",
    right: "184px",
    background: theme.palette.bg.header,
    color: "#000",
    top: "42px",
    display: "flex",
    height: "218px"
  },
  textFields: {
    fontSize: "14px"
  },
  datePickerField: {
    backgroundColor: theme.palette.bg.header
  },
  dropdownStyle: {
    border: "1px solid `${theme.palette.bg.dropDownColor}`"
  },
  expandIcon: {
    padding: "0px",
    color: "#d1cfcf",
    marginTop:'-3px',
  },
  iconColor: {
    color: "#d1cfcf"
  },

  widgetHeaderTitleHover: {
    "&:hover": {
      color: "red !important"
      // rgb(143 145 149)
    }
  },
  boxBorder: {
    // border: "1px solid red",
  },
  kababIcon: {
    margin: "4px",
    padding: "4px",
    color: theme.palette.color.kakabIconColor,
      },
      
  
}));

const ReactGridLayout = WidthProvider(Responsive);

const WidgetContainer = () => {
  const [fullScreenWidget, setFullScreenWidget] = useState(0);
  const [dateSelection, setDateSelection] = useState("Range");
  const currentDate = new Date();
  const prevDate = new Date(new Date().setDate(currentDate.getDate() - 1));

  const [startDate, setStartDate] = useState(prevDate);
  const [endDate, setEndDate] = useState(currentDate);
  const [showDateRange, setShowDateRange] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDropdown, setOpenDropdown] = React.useState(false);
  const [currentBreakPoint, setCurrentBreakPoint] = React.useState("lg");
  const dashboard = useSelector(
    state => state.dashboardsReducer.selectedDashboard
  );
  const dataSources = useSelector(state => {
    const { dataSources, selectedTenant } = state.commonReducer;
    if (selectedTenant) {
      const sources = dataSources.find(
        item => item.tenant === selectedTenant.tenantcode
      );
      return (sources && sources.data_sources) || [];
    }

    return [];
  });
  const [openLabelItem, setopenLabelItem] = React.useState(null);
  const [openMenuItem, setopenMenuItem] = React.useState(null);
  const [widgetWidth, setWidgetWidth] = useState(null);
  const [widgetHeight, setWidgetHeight] = useState(null);
  const [widgetCurrentWidth, setWidgetCurrentWidth] = useState(null);
  const [widgetCurrentHeight, setWidgetCurrentHeight] = useState(null);
  const theme = useTheme();
  const [tableType, setTableType] = useState(null);
  const [widgetIndex, setWidgetIndex] = useState(null);

  const dispatch = useDispatch();

  const classes = useStyles();

  const { width } = useViewport();

  if(width > 1024) {
    dispatch({
      type: Constants.EVT_SHOW_SIDEBAR,
      value: false,
    });
  }

  const widgetRef = useRef(null);

  const allIcons = Object.keys(Icons);

  const updateLayoutWidgetByResize = content => {
    let sortWidgets = _.sortBy(dashboard.widgets, [
      function(o) {
        return Number(o.widgetIndex);
      }
    ]);

    sortWidgets.forEach(widget => {
      _.map(content["xxs"], function(a) {
        if (a.i === widget.widget_id && widget.widgetIndex) {
          a.y = Number(widget.widgetIndex);
        }

        return a;
      });
    });

    return content;
  };

  const StyledMenu = withStyles({
    paper: {
      ...theme.palette.pumpDropdown.head,
      '& .MuiTypography-body1': {
        fontSize: '14px'
      }
    }
  })(props => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center"
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center"
      }}
      {...props}
    />
  ));

  const StyledMenuItem = withStyles(theme => ({
    root: {
      '& .MuiTypography-body1': {
        color: theme.palette.titleColor
      },
      "&:focus": {
        // backgroundColor: theme.palette.bg,
        backgroundColor: theme.palette.bg.headerwidget,
        "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
          color: theme.palette.common.white
        }
      }
    }
  }))(MenuItem);

  const onLayoutChange = (layout, layouts) => {
    if (currentBreakPoint === "lg" || currentBreakPoint === "md") {
      dispatch({
        type: Constants.EVT_DASHBOARDS_ON_LAYOUT_CHANGE,
        value: layouts[currentBreakPoint]
      });

      if (dashboard) {
        dashboard.widgets.forEach(widget => {
          setTimeout(() => {
            window.dispatchEvent(new Event("resize"));
          });
        });
      }
    }
  };

  const onClose = widget_id => {
    dispatch({
      type: Constants.EVT_DASHBOARDS_ON_REMOVE_WIDGET,
      value: widget_id
    });
  };

  const onWidgetClose = index => {
    const widget = dashboard.widgets[index];
    setopenMenuItem(null);
    dispatch({
      type: Constants.EVT_DASHBOARDS_ON_REMOVE_WIDGET,
      value: widget.widget_id
    });
  };

  const onFullScreenClickHandler = index => {
    const widget = dashboard.widgets[index];
    setopenMenuItem(null);
    if (fullScreenWidget == widget.widget_info.id) {
      setFullScreenWidget(0);
    } else {
      setFullScreenWidget(widget.widget_info.id);
    }
  };

  const isOverlay = id => {
    return id == fullScreenWidget;
  };

  const isMainOverlay = () => {
    return fullScreenWidget !== 0;
  };

  const onEditWidgetClickHandler = index => {
    const widget = dashboard.widgets[index];
    // widget.dateSelection = dateSelection;
    widget.isNewWidget = false;
    setopenMenuItem(null);
    dispatch({
      type: Constants.EVT_OPEN_CONFIG,
      value: widget
    });
  };

  const handleDateSelectionChange = (event, widget) => {
    setDateSelection(event.target.value);
    if ("Range" !== event.target.value) {
      const { startDate, endDate } = Utils.getDatesForRange(event.target.value);
      // widget.dateSelection = dateSelection;
      widget.dateSelection = event.target.value;
      widget.startDate = startDate;
      widget.endDate = endDate;
      let eventName = Constants.EVT_DASHBOARDS_ON_UPDATE_WIDGET;
      dispatch({
        type: eventName,
        value: { ...widget }
      });
      setShowDateRange(false);
    }

    if ("Range" === event.target.value) {
      setShowDateRange(true);
    }
  };

  const handleImageSelectionChange = (event, widget) => {
    setopenLabelItem(event.currentTarget);
  };

  const handleMenuSelectionChange = (event, index) => {
    setWidgetIndex(index);
    setopenMenuItem(event.currentTarget);
  };

  const onLinkClick = widget => {
    window.open(widget.link);
  };

  const handleClose = (event, widget) => {
    setopenLabelItem(null);
  };

  const handleMenuClose = (event, widget) => {
    setopenMenuItem(null);
  };

  const applyDateRangeHandle = (event, widget) => {
    setShowDateRange(false);
    widget.dateSelection = dateSelection;
    widget.startDate = startDate;
    widget.endDate = endDate;
    let eventName = Constants.EVT_DASHBOARDS_ON_UPDATE_WIDGET;

    dispatch({
      type: eventName,
      value: { ...widget }
    });
  };


  const isOnlyHeaderDrag = type => {
    return (
      type === Constants.widgets.LINE_CHART.type ||
      type === Constants.widgets.MULTIPLE_AXES_CHART.type ||
      type === Constants.widgets.LINE_SCATTER_CHART.type
    );
  };

  const onBreakpointChange = (breakpoint, newCols) => {
    setCurrentBreakPoint(breakpoint);
  };

  const onResize = (layout, oldlyout, newlayout, placeholder, e) => {
    // console.log(layout, oldlyout, newlayout, placeholder, e);

    if (layout.length > 0 && oldlyout) {
      let index = _.findIndex(layout, e => e.i == oldlyout.i);
      if (index) {
        if (
          dashboard.widgets[index] &&
          dashboard.widgets[index].widget_info.group ===
            Constants.widgets.LABEL.group
        ) {
          dashboard.widgets[index].widgetLayout = newlayout;
          dashboard.widgets[index].oldW = oldlyout.w;
          dashboard.widgets[index].oldH = oldlyout.h;
          if (
            newlayout &&
            (newlayout.w !== oldlyout.oldW || newlayout.h !== oldlyout.oldH) &&
            (newlayout.h < 3 && newlayout.w < 6)
          ) {
            dashboard.widgets[index].fontSize =
              Math.round((newlayout.h + newlayout.w) / 2) * 4 + 2;
          } else if (
            (newlayout && newlayout.w) !== oldlyout.oldW &&
            newlayout.h < newlayout.w
          ) {
            dashboard.widgets[index].fontSize =
              Math.round((newlayout.h + newlayout.w) / 2) * 6;
          } else if (
            (newlayout && newlayout.w) !== oldlyout.oldW &&
            newlayout.w < 3
          ) {
            dashboard.widgets[index].fontSize =
              Math.round((newlayout.h + newlayout.w) / 1) * 6;
          } else if (
            newlayout &&
            newlayout.h !== oldlyout.oldH &&
            newlayout.w < newlayout.h
          ) {
            dashboard.widgets[index].fontSize =
              Math.round((newlayout.h + newlayout.w) / 1) * 6;
          } else if (newlayout && newlayout.h !== oldlyout.oldH) {
            dashboard.widgets[index].fontSize =
              Math.round((newlayout.h + newlayout.w) / 1) * 6;
          }
          setWidgetWidth(e.screenX);
        }
      }
    }
  };

  const tableChangeHandler = (data, widgetId, widget, title) => {
    setTableType(data);
    widget.title = title;
  };
  const intervalSetDataSource =(widgets,dataSource)=>{
    widgets = widgets.filter(widget => widget.datasource && widget.datasource.ds_code === dataSource.ds_code && widget.refreshInterval);
    const minInterval = Math.min(...widgets.map(item => item.refreshInterval));
    widgets.forEach(widget=>{
      widget.refreshInterval = minInterval 
      let index = _.findIndex(dashboard.widgets, e => e.widget_id === widget.widget_id);
      if (index) {
        dashboard.widgets[index] = widget;
      }
    })
  }
  const findMatchDatasource = (widgets) => {
    const dataSource = [];
    widgets.forEach(widget =>{
      if(widget.datasource && (dataSource.indexOf(widget.datasource.ds_code) === -1)){
        dataSource.push(widget.datasource.ds_code)
        intervalSetDataSource(widgets,widget.datasource)
      }
    })
  };
  /** Define for set interval for matching widget data source */
  if (dashboard && dashboard.widgets && dashboard.widgets.length) {
    findMatchDatasource(dashboard.widgets)
  }
 
  const layout = {};
  layout["lg"] =
    dashboard && dashboard.layout && dashboard.layout.length
      ? dashboard.layout
      : [];

  /** Define Sorting for small size widgets */
  if (dashboard && dashboard.layout && dashboard.layout.length) {
    layout["xxs"] = _.cloneDeep(layout["lg"]);
    updateLayoutWidgetByResize(layout);
    layout["xs"] = _.cloneDeep(layout["xxs"]);
  }

  return (
    <>
    <div className="root_widgetContent">
      <ReactGridLayout
        className={"widgetContent" + (isMainOverlay() ? " overlay" : " ")}
        layouts={layout}
        onBreakpointChange={onBreakpointChange}
        cols={{ lg: 24, md: 24, sm: 1, xs: 1, xxs: 1 }}
        onLayoutChange={onLayoutChange}
        rowHeight={50}
        margin={[15, 15]}
        isResizable={true}
        onResize={onResize}
        autoSize={true}
        resizeHandles={["se", "ne"]}
        draggableHandle={width < 500 ? ".drag" : ""}
        draggableCancel=".no-body-drag"
      >
        {dashboard
          ? dashboard.widgets.map((widget, index) => {
              return (
                <div
                  key={widget.widget_id}
                  className={
                    "widgetContainer " +
                    classes.widgetCard +
                    (isMainOverlay()
                      ? isOverlay(widget.widget_info.id)
                        ? " overlay-content"
                        : " notoverlay"
                      : " ")
                  }
                  style={{
                    borderColor: theme.palette.bg.borderColor,
                    backgroundColor:
                      widget.backgroundColor || theme.palette.bg.widget
                  }}
                  id={widget.widget_id}
                >
                  <div
                    className={classes.widgetHeader + " widgetContainer-header"}
                    style={{
                      opacity: widget.isShowTitle ? 1 : 0,
                      backgroundColor:
                        widget.widget_info.group !==
                        Constants.widgets.LABEL.group
                          ? widget.backgroundColor ||
                            theme.palette.bg.widgetHeader
                          : theme.palette.bg.widgetHeader
                    }}
                  >
                    {widget.isShowTitle && (
                      <div
                        className="widgetContainer-header-title"
                        style={{
                          color:
                            theme.palette.titleColor ||
                            theme.palette.widgetHeaderTitleColor
                        }}
                      >
                        {widget.widget_info.group !==
                        Constants.widgets.LABELURL.group
                          ? widget.widget_info.group !==
                            Constants.widgets.MAPLABELREDIRECT.group
                            ? widget.title
                            : ""
                          : ""}

                        {widget.widget_info.group ===
                          Constants.widgets.IMAGE.group && (
                          <FormControl
                            required
                            className={classes.formControlChartDataSource}
                          >
                            <>
                              {widget.dynamicText &&
                                widget.dynamicText.length > 0 && (
                                  <IconButton
                                    aria-label="close"
                                    className={`${classes.closeButton} ${classes.expandIcon}`}
                                    onClick={handleImageSelectionChange}
                                  >
                                    <ExpandMoreSharpIcon fontSize={"inherit"} />
                                  </IconButton>
                                )}

                              <StyledMenu
                                id="customized-menu"
                                anchorEl={openLabelItem}
                                keepMounted
                                open={Boolean(openLabelItem)}
                                onClose={handleClose}
                                className={classes.boxBorder}
                              >
                                {widget.dynamicText != undefined &&
                                  widget.dynamicText.map(range => {
                                    return (
                                      <StyledMenuItem
                                        key={range.icon}
                                        onClick={() => onLinkClick(range)}
                                      >
                                        <ListItemIcon
                                          className={classes.iconColor}
                                        >
                                          {range.icon != null &&
                                            allIcons.indexOf(range.icon) >= 0 &&
                                            React.createElement(
                                              Icons[range.icon]
                                            )}
                                        </ListItemIcon>
                                        <ListItemText variant="inherit">
                                          {range.value != null && range.value}
                                        </ListItemText>
                                      </StyledMenuItem>
                                    );
                                  })}
                              </StyledMenu>
                            </>
                          </FormControl>
                        )}

                        {widget.widget_info.group ===
                          Constants.widgets.GRID.group &&
                          widget.kpiTable && (
                            <DropDowmMenuComponent
                              content={widget}
                              onDropDownChangeHandler={tableChangeHandler}
                            />
                          )}
                      </div>
                    )}

                    <div
                      className="widgetContainer-header-actions"
                      style={{
                        background: theme.palette.titleHoverColor
                        //background:"red",
                      }}
                    >

                      {(widget.widget_info.group ===
                        Constants.widgets.LINE_CHART.group ||
                        widget.widget_info.group ===
                          Constants.widgets.GRID.group ||
                        widget.widget_info.group ===
                          Constants.widgets.HEATMAP.group ||
                        widget.widget_info.group ===
                          Constants.widgets.BAR_CHART.group ||
                        widget.widget_info.group ===
                          Constants.widgets.MULTIPLE_AXES_CHART.group ||
                        widget.widget_info.group ===
                          Constants.widgets.LINE_COLUMN_CHART.group ||
                        widget.widget_info.group ===
                          Constants.widgets.SCATTER_CHART.group ||
                        widget.widget_info.group ===
                          Constants.widgets.THREEDPLOT_CHART.group ||
                        widget.widget_info.group ===
                          Constants.widgets.ANOMALY_CHART.group ||
                        widget.widget_info.group ===
                          Constants.widgets.BULLET_CHART.group ||
                        widget.widget_info.group ===
                          Constants.widgets.LINE_SCATTER_CHART.group) && (
                        <FormControl
                          required
                          className={classes.formControlChartDataSource}
                        >
                          <Select
                            labelId="date-selection-required"
                            id="date-selection-required"
                            className={`${classes.drowDownList} ${classes.datePickerField}`}
                            value={widget.dateSelection}
                            style={{
                              color: "#fff",
                              padding: "0px 5px !important",
                              textDecoration: "none",
                              marginTop: "4px",
                              marginRight:"5px",
                              borderRadius:"4px"
                            }}
                            onChange={evt =>
                              handleDateSelectionChange(evt, widget)
                            }
                            variant="outlined"
                          >
                            {Constants.DATE_RANGES.map(range => {
                              return (
                                <MenuItem key={range} value={range}>
                                  {range}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      )}

                      {showDateRange && (
                        <Grid
                          direction="column"
                          justify="center"
                          alignItems="center"
                          className={`${classes.rangePicker} ${classes.datePickerField}`}
                        >
                          <FormControl className={classes.formControl}>
                            <TextField
                              id="date"
                              label="Start date"
                              type="datetime-local"
                              className={classes.textFields}
                              value={startDate}
                              onChange={evt => {
                                setStartDate(evt.target.value);
                              }}
                              InputLabelProps={{
                                shrink: true
                              }}
                            />
                          </FormControl>
                          <FormControl className={classes.formControl}>
                            <TextField
                              id="date"
                              label="End date"
                              type="datetime-local"
                              className={classes.textFields}
                              value={endDate}
                              onChange={evt => setEndDate(evt.target.value)}
                              InputLabelProps={{
                                shrink: true
                              }}
                            />
                          </FormControl>

                          <Button
                            className={classes.rangeBtn}
                            size="small"
                            variant="contained"
                            color="primary"
                            onClick={evt => applyDateRangeHandle(evt, widget)}
                            title="Refresh Dashboard"
                          >
                            Apply
                          </Button>
                          
                        </Grid>
                      )}
                       <IconButton
                      aria-label="close"
                      className={`${classes.closeButton} ${classes.expandIcon} ${classes.kababIcon}`}
                      // onClick={handleMenuSelectionChange}
                      onClick={evt => handleMenuSelectionChange(evt, index)}
                    >
                      <MoreVertIcon fontSize={"inherit"} />
                    </IconButton>

                    <StyledMenu
                      id="customized-menu"
                      anchorEl={openMenuItem}
                      keepMounted
                      open={Boolean(openMenuItem)}
                      onClose={handleMenuClose}
                      className={classes.boxBorder}
                    >
                      <StyledMenuItem
                        // key={index}
                        onClick={evt => onFullScreenClickHandler(widgetIndex)}
                      >
                        <ListItemIcon>
                          <FilterListSharpIcon />
                        </ListItemIcon>
                        <ListItemText variant="inherit">
                          Full Screen
                        </ListItemText>
                      </StyledMenuItem>

                      <StyledMenuItem
                        // key={index}
                        onClick={evt => onEditWidgetClickHandler(widgetIndex)}
                      >
                        <ListItemIcon>
                          <SettingsSharpIcon />
                        </ListItemIcon>
                        <ListItemText variant="inherit">
                          Edit Widget
                        </ListItemText>
                      </StyledMenuItem>

                      <StyledMenuItem
                        // key={index}
                        onClick={() => onWidgetClose(widgetIndex)}
                      >
                        <ListItemIcon>
                          <CloseIcon />
                        </ListItemIcon>
                        <ListItemText variant="inherit">
                          Remove Widget
                        </ListItemText>
                      </StyledMenuItem>
                    </StyledMenu>

                      {/* <IconButton
                        aria-label="close"
                        className={classes.closeButton}
                        onClick={() => onFullScreenClickHandler(widget)}
                      >
                        <FilterListSharpIcon fontSize={"small"} />
                      </IconButton>
                      <IconButton
                        aria-label="close"
                        className={classes.closeButton}
                        onClick={() => onEditWidgetClickHandler(widget)}
                      >
                        <SettingsSharpIcon fontSize={"small"} />
                      </IconButton>
                      <IconButton
                        aria-label="close"
                        className={classes.closeButton}
                        onClick={() => onClose(widget.widget_id)}
                      >
                        <CloseIcon />
                      </IconButton> */}
                     
                    </div>
                    
                  </div>
                  <div
                    id={`${widget.widget_id}_${widget.widget_info.name}`}
                    className={
                      "widgetContainer-content " +
                      (isOnlyHeaderDrag(widget.widget_info.type)
                        ? "no-body-drag"
                        : "")
                    }
                    style={{
                      marginTop: widget.isShowTitle ? "0px" : "0px",
                      paddingTop: widget.isShowTitle ? "50px" : "0px"
                    }}
                  >
                    {React.createElement(
                      (widget.type == 'svgImage') ? SvgChart : COMPONENTS_MAP[widget.widget_info.type],
                      {
                        widgetConfig: widget,
                        width: widgetWidth,
                        height: widgetHeight,
                        legendObject: Constants.SELECT_CHART_LAYOUT
                      }
                    )}
                  </div>
                </div>
              );
            })
          : null}
            {/* <SvgChart widgetConfig ='' /> */}
      </ReactGridLayout>
      {/* <SvgChart widgetConfig ='' />  */}
    </div>
    </>
  );
};

export default WidgetContainer;
