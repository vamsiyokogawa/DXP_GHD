import axios from "axios";
import * as Highcharts from "highcharts";
import { uuid } from "uuidv4";
import dateFormat from "dateformat";
import _ from "lodash";
import * as Constants from "./Constants";
import chartService from "../services/chartService";
import store from "../redux/store";
import orange from "../assets/orange.png";
import green from "../assets/green.png";
import red from "../assets/red.png";
import white from "../assets/white.png";
import { CollectionsBookmarkOutlined } from "@material-ui/icons";

export function setAuthenticationTokenHeaders(token) {
  axios.interceptors.request.use(function(config) {
    config.headers.Authorization = "BEARER " + token;

    return config;
  });
}

function objectSortByKey(object) {
  var ordered = {};
  _(object)
    .keys()
    .sort()
    .each(function(key) {
      ordered[key] = object[key];
    });

  return ordered;
}

export const getWidgetTypeList = enumObj => {
  let widgetTypes = [];
  enumObj = objectSortByKey(enumObj);

  for (let key in enumObj) {
    if (enumObj[key].name !== "none") {
      widgetTypes.push(enumObj[key]);
    }
  }
  return widgetTypes;
};

export const getSelectedNavigation = (navigations, id) => {
  let result = null;

  for (let i = 0; i < navigations.length; i++) {
    if (result) return result;

    if (navigations[i].id === id) {
      result = navigations[i];
    } else {
      if (navigations[i].children && navigations[i].children.length) {
        result = getSelectedNavigation(navigations[i].children, id);
      }
    }
  }

  return result;
};

export const removeNavigation = (navigations, id) => {
  let index = -1;
  for (let i = 0; i < navigations.length; i++) {
    if (navigations[i].id === id) {
      index = i;
      break;
    } else {
      if (navigations[i].children && navigations[i].children.length) {
        removeNavigation(navigations[i].children, id);
      }
    }
  }

  if (index !== -1) {
    navigations.splice(index, 1);
  }

  return navigations;
};

export const formatResponse = (response, selectedWidget) => {
  const {
    tables,
    widget_info: { type },
    xAxis,
    yAxis,
    zAxis
  } = selectedWidget;
  switch (type) {
    case Constants.widgets.LINE_CHART.type:
      return formatResponseLineChart(response, tables, xAxis, yAxis);
    case Constants.widgets.GAUGE_CHART.type:
      return formatResponseGaugeChart(response, tables, type);
    case Constants.widgets.PIE_CHART.type:
      return formatResponsePieChart(response, tables);
      case Constants.widgets.DONUT_CHART.type:
      return formatResponseDonutChart(response, tables);
    case Constants.widgets.GRID.type:
      return formatResponseGridChart(response, tables, selectedWidget);
    case Constants.widgets.LABEL.type:
      return formatResponseLabelChart(response, tables, type);
    case Constants.widgets.HEATMAP.type:
      return formatResponseHeatMapChart(response, selectedWidget, type);
    case Constants.widgets.BAR_CHART.type:
      return formatResponseBarChart(response, tables, xAxis, yAxis);
    case Constants.widgets.MULTIPLE_AXES_CHART.type:
      return formatResponseMultipleAxesChart(response, tables, xAxis, yAxis);
    case Constants.widgets.LINE_COLUMN_CHART.type:
      return formatResponseLineColumnChart(response, tables, xAxis, yAxis);
    // case Constants.widgets.AREA_CHART.type:
    //     return formatResponseAreaChart(response, tables, xAxis, yAxis);
    case Constants.widgets.SCATTER_CHART.type:
      return formatResponseScatterChart(response, tables, xAxis, yAxis);
    case Constants.widgets.THREEDPLOT_CHART.type:
      return formatResponseThreeDPlotScatterChart(
        response,
        tables,
        xAxis,
        yAxis,
        zAxis
      );
    case Constants.widgets.ANOMALY_CHART.type:
      return formatResponseAnomalyChart(response, tables, xAxis, yAxis);
    case Constants.widgets.LINE_SCATTER_CHART.type:
      return formatResponseLineScatterChart(response, tables, xAxis, yAxis);
    case Constants.widgets.RUNNING_CHART.type:
      return formatResponseRunningChart(response, tables, xAxis, yAxis);
      case Constants.widgets.BULLET_CHART.type:
      return formatResponseBulletChart(response, tables, xAxis, yAxis);
    default:
      return [];
  }
};

export const formatResponseHeatMapChart = (
  response,
  selectedWidget,
  widgetType
) => {
  const seriesObj = {
    name: "",
    data: []
  };
  if (
    response &&
    response.data &&
    response.data.config &&
    response.data.config.Metrics
  ) {
    /* tables.forEach((table) => {
            let table_name = table.tableName;
            let column = table.selectedColumn;
            if (column && response.data.config.Metrics[table_name]) {
                let table_data = response.data.config.Metrics[table_name];
                if (table_data.length) {
                    seriesObj.name = table_name;
                    seriesObj.data = table_data[0][column].toFixed(2);
                }
            }
        }); */

    // console.log("Selected widget" + JSON.stringify(selectedWidget));
    seriesObj.name = selectedWidget.widget_info.name;
    seriesObj.data = response.data.config.Metrics.data;
  }
  return seriesObj;
};

export const formatResponseRunningChart = (response, tables, xAxis, yAxis) => {
  let data = [];

  if (
    response &&
    response.data &&
    response.data.config &&
    response.data.config.Metrics
  ) {
    tables.forEach(table => {
      let table_name = table.tableName;

      if (response.data.config.Metrics[table_name]) {
        let table_data = response.data.config.Metrics[table_name];

        let seriesObj = {
          name: table_name,
          borderColor: "rgba(0, 0, 0, 0.1)",
          data: []
        };

        table_data.forEach(tableInfo => {
          seriesObj.data.push(tableInfo);
        });

        data.push(seriesObj);
      }
    });
  }

  return data;
};

export const formatResponseBulletChart = (response, tables, xAxis, yAxis) => {
  let data = [];

  if (
    response &&
    response.data &&
    response.data.config &&
    response.data.config.Metrics
  ) {
    tables.forEach(table => {
      let table_name = table.tableName;
      let column = yAxis;
      let isVisible =
        typeof table["isDefault"] != "undefined" ? table["isDefault"] : true;

      if (column && response.data.config.Metrics[table_name]) {
        let table_data = response.data.config.Metrics[table_name];

        let seriesObj = {
          name: table_name,
          data: [],
          color: table.color,
          visible: isVisible,
          unitname: table.unitName
        };

        table_data.forEach(tableInfo => {
          // seriesObj.data.push(tableInfo);
        });
        data.push(seriesObj);
      }
    });
  }

  return data;
};

export const getResponseMetaData = (response, selectedWidget) => {
  let widgetType = selectedWidget.widget_info.type;
  switch (widgetType) {
    case Constants.widgets.LINE_CHART.type:
      return getLineChartMetadata(response, selectedWidget.tables);
    case Constants.widgets.GAUGE_CHART.type:
      return getGaugeChartMetadata(response, selectedWidget.tables);
    case Constants.widgets.PIE_CHART.type:
      return getPieChartMetadata(response, selectedWidget.tables);
      case Constants.widgets.DONUT_CHART.type:
      return getDonutChartMetadata(response, selectedWidget.tables);
    case Constants.widgets.GRID.type:
      return getGridMetadata(response, selectedWidget, selectedWidget.tables);
    case Constants.widgets.LABEL.type:
      return getLabelMetadata(response, selectedWidget.tables);
    case Constants.widgets.HEATMAP.type:
      return getHeatMapMetadata(response, selectedWidget);
    case Constants.widgets.BAR_CHART.type:
      return getBarChartMetadata(response, selectedWidget.tables);
    case Constants.widgets.MULTIPLE_AXES_CHART.type:
      return getMultipleAxesChartMetadata(response, selectedWidget.tables);
    case Constants.widgets.LINE_COLUMN_CHART.type:
      return getLineColumnChartMetadata(response, selectedWidget.tables);
    // case Constants.widgets.AREA_CHART.type:
    //     return getAreaChartMetadata(response, selectedWidget.tables);
    case Constants.widgets.SCATTER_CHART.type:
      return getScatterChartMetadata(response, selectedWidget.tables);
    case Constants.widgets.THREEDPLOT_CHART.type:
      return getThreeDPlotScatterChartMetadata(response, selectedWidget.tables);
    case Constants.widgets.IMAGE.type:
      return getImageChartMetadata(response, selectedWidget.imagesList);
    case Constants.widgets.ANOMALY_CHART.type:
      return getAnomalyChartMetadata(response, selectedWidget.tables);
    case Constants.widgets.LINE_SCATTER_CHART.type:
      return getScatterLineScatterChart(response, selectedWidget.tables);
    case Constants.widgets.RUNNING_CHART.type:
      return getRunningChartMetadata(response, selectedWidget.tables);
    case Constants.widgets.BULLET_CHART.type:
      return getBulletChartMetadata(response, selectedWidget.tables);
    default:
      return [];
  }
};

export const getImageChartMetadata = (response, imageData) => {
  if (
    response &&
    response.data &&
    response.data.config &&
    response.data.config.Metrics
  ) {
    imageData = response.data.config.Metrics;
  }
  return imageData;
};

const getStringArray2 = stringArray => {
  stringArray = stringArray.map(function(item) {
    return item["Type"];
  });
  return stringArray;
};

const getStringArray = stringArray => {
  stringArray = stringArray.map(function(item) {
    return item["Value"];
  });
  return stringArray;
};

export const getHeatMapMetadata = (response, selectedWidget) => {
  if (
    response &&
    response.data &&
    response.data.config &&
    response.data.config.Metrics
  ) {
    let keyList = Object.keys(response.data.config.Metrics);
    if (keyList.length > 0) {
      let metricObj = response.data.config.Metrics;
      selectedWidget.xAxisArr = getStringArray(metricObj.xcategory);
      selectedWidget.yAxisArr = getStringArray(metricObj.ycategory);
      selectedWidget.heatMapData = metricObj.data;
    }
  }
  return selectedWidget;
};

export const getLineChartMetadata = (response, tables) => {
  if (
    response &&
    response.data &&
    response.data.config &&
    response.data.config.Metrics
  ) {
    Object.keys(response.data.config.Metrics).forEach(key => {
      tables.forEach(table => {
        if (_.isEqual(key.toLowerCase(), table.tableName.toLowerCase())) {
          let metricData = response.data.config.Metrics[key];
          if (metricData && metricData.length > 0) {
            let metricColumns = Object.keys(metricData[0]);
            table.columns = metricColumns;
            table.filters = metricColumns;
          }
        }
      });
    });
  }
  return tables;
};

export const getRunningChartMetadata = (response, tables) => {
  if (
    response &&
    response.data &&
    response.data.config &&
    response.data.config.Metrics
  ) {
    Object.keys(response.data.config.Metrics).forEach(key => {
      tables.forEach(table => {
        if (_.isEqual(key.toLowerCase(), table.tableName.toLowerCase())) {
          let metricData = response.data.config.Metrics[key];
          if (metricData && metricData.length > 0) {
            let metricColumns = Object.keys(metricData[0]);
            table.columns = metricColumns;
            table.filters = metricColumns;
          }
        }
      });
    });
  }
  return tables;
};

export const getBulletChartMetadata = (response, tables) => {
  if (
    response &&
    response.data &&
    response.data.config &&
    response.data.config.Metrics
  ) {
    Object.keys(response.data.config.Metrics).forEach(key => {
      tables.forEach(table => {
        if (_.isEqual(key.toLowerCase(), table.tableName.toLowerCase())) {
          let metricData = response.data.config.Metrics[key];
          if (metricData && metricData.length > 0) {
            let metricColumns = Object.keys(metricData[0]);
            table.columns = metricColumns;
            table.filters = metricColumns;
          }
        }
      });
    });
  }
  return tables;
};

export const getAnomalyChartMetadata = (response, tables) => {
  if (
    response &&
    response.data &&
    response.data.config &&
    response.data.config.Metrics
  ) {
    Object.keys(response.data.config.Metrics).forEach(key => {
      tables.forEach(table => {
        if (_.isEqual(key.toLowerCase(), table.tableName.toLowerCase())) {
          let metricData = response.data.config.Metrics[key];
          if (metricData && metricData.length > 0) {
            let metricColumns = Object.keys(metricData[0]);
            table.columns = metricColumns;
            table.filters = metricColumns;
          }
        }
      });
    });
  }
  return tables;
};

export const getScatterChartMetadata = (response, tables) => {
  if (
    response &&
    response.data &&
    response.data.config &&
    response.data.config.Metrics
  ) {
    Object.keys(response.data.config.Metrics).forEach(key => {
      tables.forEach(table => {
        if (_.isEqual(key.toLowerCase(), table.tableName.toLowerCase())) {
          let metricData = response.data.config.Metrics[key];
          if (metricData && metricData.length > 0) {
            let metricColumns = Object.keys(metricData[0]);
            table.columns = metricColumns;
            table.filters = metricColumns;
          }
        }
      });
    });
  }
  return tables;
};

export const getThreeDPlotScatterChartMetadata = (response, tables) => {
  if (
    response &&
    response.data &&
    response.data.config &&
    response.data.config.Metrics
  ) {
    Object.keys(response.data.config.Metrics).forEach(key => {
      tables.forEach(table => {
        if (_.isEqual(key.toLowerCase(), table.tableName.toLowerCase())) {
          let metricData = response.data.config.Metrics[key];
          if (metricData && metricData.length > 0) {
            let metricColumns = Object.keys(metricData[0]);
            table.columns = metricColumns;
            table.filters = metricColumns;
          }
        }
      });
    });
  }
  return tables;
};

export const getScatterLineScatterChart = (response, tables) => {
  if (
    response &&
    response.data &&
    response.data.config &&
    response.data.config.Metrics
  ) {
    Object.keys(response.data.config.Metrics).forEach(key => {
      tables.forEach(table => {
        if (_.isEqual(key.toLowerCase(), table.tableName.toLowerCase())) {
          let metricData = response.data.config.Metrics[key];
          if (metricData && metricData.length > 0) {
            let metricColumns = Object.keys(metricData[0]);
            table.columns = metricColumns;
            table.filters = metricColumns;
          }
        }
      });
    });
  }
  return tables;
};

export const getAreaChartMetadata = (response, tables) => {
  if (
    response &&
    response.data &&
    response.data.config &&
    response.data.config.Metrics
  ) {
    Object.keys(response.data.config.Metrics).forEach(key => {
      tables.forEach(table => {
        if (_.isEqual(key.toLowerCase(), table.tableName.toLowerCase())) {
          let metricData = response.data.config.Metrics[key];
          if (metricData && metricData.length > 0) {
            let metricColumns = Object.keys(metricData[0]);
            table.columns = metricColumns;
            table.filters = metricColumns;
          }
        }
      });
    });
  }
  return tables;
};

export const getLabelMetadata = (response, tables) => {
  if (
    response &&
    response.data &&
    response.data.config &&
    response.data.config.Metrics
  ) {
    Object.keys(response.data.config.Metrics).forEach(key => {
      tables.forEach(table => {
        if (_.isEqual(key.toLowerCase(), table.tableName.toLowerCase())) {
          let metricData = response.data.config.Metrics[key];
          if (metricData && metricData.length > 0) {
            let metricColumns = Object.keys(metricData[0]);
            table.columns = metricColumns;
            table.filters = metricColumns;
          }
        }
      });
    });
  }
  return tables;
};

export const getBarChartMetadata = (response, tables) => {
  if (
    response &&
    response.data &&
    response.data.config &&
    response.data.config.Metrics
  ) {

    Object.keys(response.data.config.Metrics).forEach(key => {
      tables.forEach(table => {
        if (_.isEqual(key.toLowerCase(), table.tableName.toLowerCase())) {
          let metricData = response.data.config.Metrics[key];
          if (metricData && metricData.length > 0) {
            let metricColumns = Object.keys(metricData[0]);
            table.columns = metricColumns;
            table.filters = metricColumns;
          }
        }
      });
    });
  }
  return tables;
};

export const getLineColumnChartMetadata = (response, tables) => {
  if (
    response &&
    response.data &&
    response.data.config &&
    response.data.config.Metrics
  ) {
    Object.keys(response.data.config.Metrics).forEach(key => {
      tables.forEach(table => {
        if (_.isEqual(key.toLowerCase(), table.tableName.toLowerCase())) {
          let metricData = response.data.config.Metrics[key];
          if (metricData && metricData.length > 0) {
            let metricColumns = Object.keys(metricData[0]);
            table.columns = metricColumns;
            table.filters = metricColumns;
          }
        }
      });
    });
  }
  return tables;
};

export const getMultipleAxesChartMetadata = (response, tables) => {
  if (
    response &&
    response.data &&
    response.data.config &&
    response.data.config.Metrics
  ) {
    Object.keys(response.data.config.Metrics).forEach(key => {
      tables.forEach(table => {
        if (_.isEqual(key.toLowerCase(), table.tableName.toLowerCase())) {
          let metricData = response.data.config.Metrics[key];
          if (metricData && metricData.length > 0) {
            let metricColumns = Object.keys(metricData[0]);
            table.columns = metricColumns;
            table.filters = metricColumns;
          }
        }
      });
    });
  }
  return tables;
};

export const getGaugeChartMetadata = (response, tables) => {
  if (
    response &&
    response.data &&
    response.data.config &&
    response.data.config.Metrics
  ) {
    let valueKey = "Value";
    let metricColumns = [];
    if (tables && tables.length > 0) {
      Object.keys(response.data.config.Metrics).forEach(key => {
        if (_.isEqual(key.toLowerCase(), tables[0].tableName.toLowerCase())) {
          if (
            response.data.config.Metrics[key] &&
            response.data.config.Metrics[key].length > 0
          ) {
            Object.keys(response.data.config.Metrics[key][0]).forEach(
              objKey => {
                if (_.isEqual(objKey.toLowerCase(), valueKey.toLowerCase())) {
                  metricColumns.push(objKey);
                }
              }
            );
          }
        }
      });
      tables[0].columns = metricColumns;
      tables[0].filters = metricColumns;
    }
  }
  return tables;
};

export const getPieChartMetadata = (response, tables) => {
  if (
    response &&
    response.data &&
    response.data.config &&
    response.data.config.Metrics &&
    tables.length > 0
  ) {
    let keyList = Object.keys(response.data.config.Metrics);
    tables[0].columns = keyList;
    tables[0].filters = getStringArray2(
      response.data.config.Metrics[keyList[0]]
    );
    tables[0].Metrics = response.data.config.Metrics;
  }
  return tables;
};

export const getDonutChartMetadata = (response, tables) => {
  if (
    response &&
    response.data &&
    response.data.config &&
    response.data.config.Metrics &&
    tables.length > 0
  ) {
    let keyList = Object.keys(response.data.config.Metrics);
    tables[0].columns = keyList;
    tables[0].filters = getStringArray2(
      response.data.config.Metrics[keyList[0]]
    );
    tables[0].Metrics = response.data.config.Metrics;
  }
  return tables;
};

export const getGridMetadata = (response, widgetSetting, tables) => {
  if (
    response &&
    response.data &&
    response.data.config &&
    response.data.config.Metrics
  ) {
   
    if(widgetSetting.kpiTable) {
      Object.keys(response.data.config.Metrics[0]).forEach(key => {
        tables.forEach(table => {
          if (_.isEqual(key.toLowerCase(), table.tableName.toLowerCase())) {
            let metricData = response.data.config.Metrics[0][key];
            if (metricData && metricData.length > 0) {
              let metricColumns = Object.keys(metricData[0]);
              table.columns = metricColumns;
              table.filters = metricColumns;
            }
          }
        });
      });
      
    } else {
      Object.keys(response.data.config.Metrics[0]).forEach(key => {
        tables.forEach(table => {
          if (_.isEqual(key.toLowerCase(), table.tableName.toLowerCase())) {
            let metricData = response.data.config.Metrics[0][key];
            if (metricData && metricData.length > 0) {
              let metricColumns = Object.keys(metricData[0]);
              table.columns = metricColumns;
              table.filters = metricColumns;
            }
          }
        });
      });

      // tables.forEach(table => {
      //   _.forEach(response.data.config.Metrics[0], function(key, obj) {
      //     let keyArray = Object.keys(key)[0];
      //     if (_.isEqual(keyArray.toLowerCase(), table.tableName.toLowerCase())) {
      //       let metricData = key[table.tableName][0];
      //       table.columns = metricData;
      //       table.filters = metricData;
      //     }
      //   });
      // });
    }
 
  

    // console.log('table', tables);
    // // if (keyList.length > 0) {
    // //   // let metricObj = response.data.config.Metrics[keyList[0]][0];
    // //   // let metricColumns = Object.keys(metricObj);
    // //   tables[0].gridColumns = keyList;
    // //   tables[0].filters = keyList;
    // // // }
    // let metrics = response.data.config.Metrics[0];
    // if(metrics.length > 0) {
    //     let metricColumns = [];
    //     metrics.forEach(metric => {
           
    //         metricColumns.push(metric.Name);
    //     })
    //     tables[0].gridColumns = metricColumns;
    //     tables[0].filters = metricColumns;
    // } 
  }
  return tables;
};

const getCategoriesFormat = (response, tables, xAxis) => {
  let categories = [];
  if (
    response &&
    response.data &&
    response.data.config &&
    response.data.config.Metrics
  ) {
    if (!_.isEmpty(response.data.config.Metrics)) {
      _.forEach(response.data.config.Metrics, function(value, key) {
        if (value.length > 0) {
          _.forEach(value, function(arrayData) {
            categories[arrayData.Date] = [arrayData.Date, ""];
          });
        }
      });
    }
  }

  return categories;
};

export const formatResponseLineChart = (response, tables, xAxis, yAxis) => {
  let data = [];
  if (
    response &&
    response.data &&
    response.data.config &&
    response.data.config.Metrics
  ) {
    // let cat = getCategoriesFormat(response, tables, xAxis);

    tables.forEach(table => {
      let table_name = table.tableName;
      let column = yAxis;
      let isVisible =
        typeof table["isDefault"] != "undefined" ? table["isDefault"] : true;

      if (column && response.data.config.Metrics[table_name]) {
        let table_data = response.data.config.Metrics[table_name];
        let seriesObj = {
          name: table_name,
          data: [],
          color: table.color,
          visible: isVisible,
          unitname: table.unitName
        };

        table_data.forEach(tableInfo => {
          let xData = isNaN(tableInfo[xAxis])
            ? tableInfo[xAxis]
            : Number(tableInfo[xAxis]);
          let yData = Number.parseFloat(tableInfo[yAxis]).toFixed(2);
          seriesObj.data.push([xData, Number(yData)]);
        });

        data.push(seriesObj);
      }
    });
  }
  return data;
};

export const formatResponseAnomalyChart = (response, tables, xAxis, yAxis) => {
  let data = [];
  if (
    response &&
    response.data &&
    response.data.config &&
    response.data.config.Metrics
  ) {
    tables.forEach(table => {
      let table_name = table.tableName;
      let column = yAxis;
      let isVisible =
        typeof table["isDefault"] != "undefined" ? table["isDefault"] : true;
      if (column && response.data.config.Metrics[table_name]) {
        let table_data = response.data.config.Metrics[table_name];
        let seriesObj = {
          type: "spline",
          name: table_name,
          data: [],
          color: table.color,
          visible: isVisible,
          unitname: table.unitName,
          lineColor:
            table_name.toLowerCase() === "anomaly" ? "transparent" : "",
          tickLength: table_name.toLowerCase() === "anomaly" ? 0 : "",
          showInLegend: table_name.toLowerCase() === "anomaly" ? false : true,
          marker: {
            symbol: "circle",
            enabled: true,
            radius: table_name.toLowerCase() === "anomaly" ? 6 : 3
          }
        };
        table_data.forEach(tableInfo => {
          seriesObj.data.push([
            tableInfo[xAxis],
            Number(tableInfo[yAxis].toFixed(2))
          ]);
        });
        data.push(seriesObj);
      }
    });
  }
  return data;
};

export const formatResponseScatterChart = (response, tables, xAxis, yAxis) => {
  let data = [];
  if (
    response &&
    response.data &&
    response.data.config &&
    response.data.config.Metrics
  ) {
    tables.forEach(table => {
      let table_name = table.tableName;
      let column = yAxis;
      let isVisible =
        typeof table["isDefault"] != "undefined" ? table["isDefault"] : true;
      if (column && response.data.config.Metrics[table_name]) {
        let table_data = response.data.config.Metrics[table_name];
        let seriesObj = {
          name: table_name,
          data: [],
          color: table.color,
          unitname: table.unitName,
          visible: isVisible,
          marker: {
            enabled: true,
            radius: 2
          }
        };
        table_data.forEach(tableInfo => {
          seriesObj.data.push([
            tableInfo[xAxis],
            Number(tableInfo[yAxis].toFixed(2))
          ]);
        });
        data.push(seriesObj);
      }
    });
  }
  return data;
};

export const formatResponseThreeDPlotScatterChart = (
  response,
  tables,
  xAxis,
  yAxis,
  zAxis
) => {
  let data = [];
  if (
    response &&
    response.data &&
    response.data.config &&
    response.data.config.Metrics
  ) {
    tables.forEach(table => {
      let table_name = table.tableName;
      let column = yAxis;
      let isVisible =
        typeof table["isDefault"] != "undefined" ? table["isDefault"] : true;
      if (column && response.data.config.Metrics[table_name]) {
        let table_data = response.data.config.Metrics[table_name];
        let seriesObj = {
          name: table_name,
          data: [],
          color: table.color,
          marker: {
            enabled: true,
            radius: 8
          },
          unitname: table.unitName,
          visible: isVisible
        };
        table_data.forEach(tableInfo => {
          seriesObj.data.push([
            tableInfo[xAxis],
            Number(tableInfo[yAxis].toFixed(2)),
            Number(tableInfo[zAxis].toFixed(2))
          ]);
        });

        data.push(seriesObj);
      }
    });
  }

  return data;
};

export const formatResponseLineScatterChart = (
  response,
  tables,
  xAxis,
  yAxis
) => {
  let data = [];
  if (
    response &&
    response.data &&
    response.data.config &&
    response.data.config.Metrics
  ) {
    tables.forEach((table,index) => {
      let table_name = table.tableName;
      let column = yAxis;
      let isVisible =
        typeof table["isDefault"] != "undefined" ? table["isDefault"] : true;
      if (column && response.data.config.Metrics[index][table_name]) {
        let table_data = response.data.config.Metrics[index][table_name];
          let seriesObj = {
            name: table_name,
            data: [],
            unitname: table.unitName,
            type:"spline",
            color: table.color,
            visible: isVisible,
            borderWidth: 0,
            legendColor: table.scatterColor,
            showInLegend: false,
          };

        table_data.line.forEach(tableInfo => {
          seriesObj.data.push([
            tableInfo[xAxis],
            Number(tableInfo[yAxis].toFixed(2))
          ]);
        });

        let scatterseriesObj = {
          name: table_name,
          data: [],
          unitname: table.scatterUnitName,
          type:"scatter",
          marker:{
            enabled: true,
            radius: 4
          },
          color: table.scatterColor,
          showInLegend: true,
          visible: isVisible,
          borderWidth: 0
        };

        table_data.scatter.forEach(scattertableInfo => {
          scatterseriesObj.data.push([
            scattertableInfo[xAxis],
            Number(scattertableInfo[yAxis].toFixed(2))
          ]);
        });

        data.push(seriesObj);
        data.push(scatterseriesObj);
      }
    });
  }
  return data;
};

export const formatResponseAreaChart = (response, tables, xAxis, yAxis) => {
  let data = [];
  if (
    response &&
    response.data &&
    response.data.config &&
    response.data.config.Metrics
  ) {
    tables.forEach(table => {
      let table_name = table.tableName;
      let column = yAxis;
      if (column && response.data.config.Metrics[table_name]) {
        let table_data = response.data.config.Metrics[table_name];
        let seriesObj = {
          name: table_name,
          data: [],
          color: table.color,
          fillColor: {
            linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
            stops: [
              [0, table.color],
              [
                1,
                Highcharts.Color(table.color)
                  .setOpacity(0)
                  .get("rgba")
              ]
            ]
          }
        };
        table_data.forEach(tableInfo => {
          seriesObj.data.push([
            tableInfo[xAxis],
            Number(tableInfo[yAxis].toFixed(2))
          ]);
        });
        data.push(seriesObj);
      }
    });
  }
  return data;
};

export const formatResponseGaugeChart = (response, tables, widgetType) => {
  let data = [];
  if (
    response &&
    response.data &&
    response.data.config &&
    response.data.config.Metrics
  ) {
    tables.forEach(table => {
      let table_name = table.tableName;
      let column = table.selectedColumn;
      let color = table.color;
      if (column && response.data.config.Metrics[table_name]) {
        let table_data = response.data.config.Metrics[table_name];
        let seriesObj = {
          name: "",
          data: []
        };
        table_data.forEach(tableInfo => {
          Object.keys(tableInfo).forEach(key => {
            if (column === key) {
              seriesObj.name = table_name;
              seriesObj.data = [
                ...seriesObj.data,
                Number(tableInfo[key].toFixed(2))
              ];
              seriesObj.color = color;
            } else if (widgetType === Constants.widgets.GAUGE_CHART.type) {
              seriesObj[key.toLowerCase()] = Number(tableInfo[key].toFixed(2));
            }
          });
        });
        data.push(seriesObj);
      }
    });
  }
  return data[0];
};

export const formatResponseLabelChart = (response, tables, widgetType) => {
  const seriesObj = {
    name: "",
    data: []
  };

  if (
    response &&
    response.data &&
    response.data.config &&
    response.data.config.Metrics
  ) {
    tables.forEach(table => {
      let table_name = table.tableName;
      let column = table.selectedColumn;

      if (column && response.data.config.Metrics[table_name]) {
        let table_data = response.data.config.Metrics[table_name]; 
        if (table_data.length) {
          seriesObj.name = table_name;
          seriesObj.data = table_data[0][column].toFixed(2);
          seriesObj["colorObj"] = {};

          if (_.has(table_data[0], "LL")) {
            seriesObj["colorObj"]["< LL"] = table_data[0]["LL"];
          }
          if (_.has(table_data[0], "L")) {
            seriesObj["colorObj"]["LL - L"] = table_data[0]["L"];
          }
          if (_.has(table_data[0], "H")) {
            seriesObj["colorObj"]["L - H"] = table_data[0]["H"];
          }
          if (_.has(table_data[0], "HH")) {
            seriesObj["colorObj"]["H - HH"] = table_data[0]["HH"];
            seriesObj["colorObj"]["> HH"] = table_data[0]["HH"];
          }
          if (_.has(table_data[0], "SparkLine")) {
            seriesObj["SparkLine"] = table_data[0]["SparkLine"];
          }          
        }
      }
    });
  }

  return seriesObj;
};

export const formatResponseBarChart = (response, tables, xAxis, yAxis) => {
  let recordObj = {
    data: [],
    categories: [],
    axisTitle: []
  };

  if (
    response &&
    response.data &&
    response.data.config &&
    response.data.config.Metrics
  ) {
    let tableName = [];
    tables.forEach(table => {

      let table_name = table.tableName;
      let column = yAxis;
      let isVisible =
        typeof table["isDefault"] != "undefined" ? table["isDefault"] : true;

      if (column && response.data.config.Metrics[table_name]) {
        let table_data = response.data.config.Metrics[table_name];
        
        let seriesObj = {
          name: table_name,
          data: [],
          color: table.color,
          borderWidth: 0,
          visible: isVisible,
          yAxis: table.axisPosition === 'top' ? 1 : 0,
          unitname: table.unitName
        };

        recordObj['axisTitle'][table.axisPosition] = 
        (typeof recordObj['axisTitle'][table.axisPosition] != 'undefined' && 
        recordObj['axisTitle'][table.axisPosition] != '') ? 
        recordObj['axisTitle'][table.axisPosition] +'/'+table_name : table_name;

        table_data.forEach(tableInfo => {
            //seriesObj.data.push(tableInfo["Value"]);
            if(_.indexOf(recordObj['categories'], tableInfo["Date"]) < 0) {
              recordObj['categories'].push(tableInfo["Date"]);
            }

            seriesObj.data.push(
              Number(tableInfo["Value"])
            );

        });
        
        recordObj['data'].push(seriesObj);
      }
    });
  }

  return recordObj;
};

export const formatResponseLineColumnChart = (
  response,
  tables,
  xAxis,
  yAxis
) => {
  let data = [];

  if (
    response &&
    response.data &&
    response.data.config &&
    response.data.config.Metrics
  ) {
    tables.forEach(table => {
      let table_name = table.tableName;
      let column = yAxis;
      let isVisible =
        typeof table["isDefault"] != "undefined" ? table["isDefault"] : true;
      if (column && response.data.config.Metrics[table_name]) {
        let table_data = response.data.config.Metrics[table_name];
        let seriesObj = {
          name: table_name,
          data: [],
          type: table.lineChartType === "Line" ? "spline" : "column",
          yAxis: table.multipleYaxisPlotType === "right" ? 1 : 0,
          color: table.color,
          visible: isVisible,
          borderWidth: 0,
          unitname: table.unitName
        };
        table_data.forEach(tableInfo => {
          seriesObj.data.push([
            tableInfo[xAxis],
            Number(tableInfo[yAxis].toFixed(2))
          ]);
        });
        data.push(seriesObj);
      }
    });
  }

  return data;
};

export const formatResponseMultipleAxesChart = (
  response,
  tables,
  xAxis,
  yAxis
) => {
  let data = [];

  if (
    response &&
    response.data &&
    response.data.config &&
    response.data.config.Metrics
  ) {
    let axisCount = 0;

    tables.forEach(table => {
      let table_name = table.tableName;
      let column = yAxis;
      let isVisible =
        typeof table["isDefault"] != "undefined" ? table["isDefault"] : true;

      if (column && response.data.config.Metrics[table_name]) {
        let table_data = response.data.config.Metrics[table_name];
        let contentName = table.unitName
          ? table_name + " (" + table.unitName + ")"
          : table_name;
        let seriesObj = {
          name: contentName,
          data: [],
          type: "spline",
          // yAxis: table.multipleYaxisPlotType === "right" ? 1 : 0,
          yAxis: axisCount,
          color: table.color,
          visible: isVisible,
          tooltip: {
            valueSuffix: " " + table.unitName || ""
          }
        };

        table_data.forEach(tableInfo => {
          seriesObj.data.push([
            tableInfo[xAxis],
            Number(tableInfo[yAxis].toFixed(2))
          ]);
        });
        data.push(seriesObj);
      }

      axisCount++;
    });
  }

  return data;
};

export const formatResponsePieChart = (response, tables) => {
  let data = [];
  let seriesData = {
    name: "",
    colorByPoint: true,
    data: []
  };
  if (
    response &&
    response.data &&
    response.data.config &&
    response.data.config.Metrics &&
    tables &&
    tables.length > 0
  ) {
    const selectedColumn = tables[0].selectedColumn;
    seriesData.name = selectedColumn;
    let pieFilters = [];
    let allFilters = response.data.config.Metrics[selectedColumn];
    allFilters.forEach(el => {
      tables[0].selectedColumnSudoNames.forEach(element => {
        if (element.key === el.Type)
          pieFilters.push({
            name: element.value,
            y: Number(parseFloat(el.Value).toFixed(2)),
            unitname: element.unitName,
            color: element.color
          });
      });
    });
    seriesData.data = pieFilters;
  }
  data.push(seriesData);
  return data;
};

export const formatResponseDonutChart = (response, tables) => {
  let data = [];
  let seriesData = {
    name: "",
    colorByPoint: true,
    innerSize: '55%',
    data: []
  };
  if (
    response &&
    response.data &&
    response.data.config &&
    response.data.config.Metrics &&
    tables &&
    tables.length > 0
  ) {
    const selectedColumn = tables[0].selectedColumn;
    seriesData.name = selectedColumn;
    let pieFilters = [];
    let allFilters = response.data.config.Metrics[selectedColumn];
    allFilters.forEach(el => {
      tables[0].selectedColumnSudoNames.forEach(element => {
        if (element.key === el.Type)
          pieFilters.push({
            name: element.value,
            y: Number(parseFloat(el.Value).toFixed(2)),
            unitname: element.unitName,
            color: element.color
          });
      });
    });
    seriesData.data = pieFilters;
  }
  data.push(seriesData);
  return data;
};

export const formatResponseGridChart = (response, tables, widgetSetting) => {
  let data = {};

  if (
    response &&
    response.data &&
    response.data.config &&
    response.data.config.Metrics
  ) {
    if (tables && tables.length > 0) {
      _.forEach(tables, (key, item) => {
        let selectedGridColumns = key.selectedColumnSudoNames;

        let dataRows = {
          rows: [],
          columns: []
        };

        dataRows.rows = response.data.config.Metrics[0][key.tableName].map((item, index) => ({
          ...item,
          id: index + 1
        }));

        dataRows.columns = selectedGridColumns.map(selectedGridColumn => {
          const { key, value, align, style } = selectedGridColumn;
          const headerName = addSpaces(value);
          let headerWidth = 165;
          if (headerName.length > 15) {
            headerWidth = headerName.length * 11;
          }

          let fieldAlign = 'leftRow';
          if(align && align == 'right') {
            fieldAlign = 'rightRow';
          } else if(align && align == 'center') {
            fieldAlign = 'centerRow';
          }
          let fieldStyle = {};
          if(style){
            let styles = style.split(':')
            fieldStyle[styles[0].trim()] = styles[1].trim();
          }
         
          return {
              field: key,
              headerName,
              fieldType: '',
              width: headerWidth,
              hide: true,
              headerAlign: fieldAlign,
              style: fieldStyle
          };
        });

        data[key.tableName] = dataRows;
      });
    }

    if(widgetSetting.kpiTable) {
      let sensorObj = getSensortData('sensor');
      let dataRows = {
        rows: sensorObj['rows'],
        columns: sensorObj['columns']
      };

      data['sensorstatus'] = dataRows;
    }
  }

  return data;
};

function addSpaces(str) {
  return (
    str
      // Look for long acronyms and filter out the last letter
      .replace(/([A-Z]+)([A-Z][a-z])/g, " $1 $2")
      // Look for lower-case letters followed by upper-case letters
      .replace(/([a-z\d])([A-Z])/g, "$1 $2")
      // Look for lower-case letters followed by numbers
      .replace(/([a-zA-Z])(\d)/g, "$1 $2")
      .replace(/^./, function(str) {
        return str.toUpperCase();
      })
      // Remove any white space left around the word
      .trim()
  );
}

export const requestBuilderCharts = (selectedWidget, fetchMetadata) => {
  let type = selectedWidget.type;
  let source = selectedWidget.source;
  /*if(_.isEqual(selectedWidget.widget_info.type, Constants.widgets.PIE_CHART.type) && selectedWidget.tables.length>0){
        type = selectedWidget.tables[0].tableName.toLowerCase() + selectedWidget.widget_info.type.toLowerCase();
        source = null;
    }*/
  let request_info_blank = { ...Constants.request_info_blank };
  request_info_blank.url = constructURL(selectedWidget);
  request_info_blank.request.info.dataPath = selectedWidget.data_path;
  request_info_blank.request.info.source = source;
  request_info_blank.request.config.type = type;
  request_info_blank.request.config.widgetsetup = fetchMetadata ? "yes" : "no";
  request_info_blank.request.config.metrics = [];

  selectedWidget.tables.forEach(tableInfo => {
    let metric;
    if (selectedWidget.startDate && selectedWidget.endDate) {
      metric = {
        metric: tableInfo.tableName,
        aggregrate: "none",
        start: convertEpocToDateString(false, selectedWidget.startDate),
        end: convertEpocToDateString(false, selectedWidget.endDate)
      };
    } else {
      metric = {
        metric: tableInfo.tableName,
        aggregrate: "none"
      };
    }
    request_info_blank.request.config.metrics.push(metric);
  });

  return request_info_blank;
};

Date.prototype.format = function(mask, utc) {
  return dateFormat(this, mask, utc);
};

export const convertEpocToDateString = (isEpocToDateString, dateTimeString) => {
  let dateObj = null;
  if (isEpocToDateString) {
    let dateString = "";
    if (_.isEmpty(dateTimeString)) {
      dateObj = new Date();
      dateString = dateObj.format("yyyy-mm-dd'T'HH:MM");
      return dateString;
    }
    let epocNumber = Number(dateTimeString);
    dateObj = new Date(epocNumber * 1000);
    dateString = dateObj.format("yyyy-mm-dd'T'HH:MM");
    return dateString;
  } else {
    dateObj = _.isEmpty(dateTimeString) ? new Date() : new Date(dateTimeString); // Your timezone!
    let epochString = Math.round(dateObj.getTime() / 1000);
    return epochString;
  }
};

export const convertEpocToDateFormat = (dateConvert) => {
  let dateObj = new Date(Number(dateConvert));
  return dateObj.format("yyyy-mm-dd HH:MM");
}

export const getChartData = (widgetConfig, cancelToken) => {
  let requestInfo = requestBuilderCharts(widgetConfig, false);
  return new Promise((resolve, reject) => {
    chartService(requestInfo, cancelToken)
      .then(response => {
        if (response && response.status === 200) {
          const data = formatResponse(response, widgetConfig);
          resolve(data);
        } else {
          resolve(null);
        }
      })
      .catch(error => reject(error));
  });
};

export const formatMenuFromLoginData = (
  menu,
  dictionary = {},
  parent_id = null,
  prevLevel = 0
) => {
  if (!menu) return [];

  menu = menu.map(item => {
    let { id = uuid(), name, dashboard, children } = item;
    if (typeof dashboard === "string") {
      try {
        dashboard = JSON.parse(dashboard);
      } catch {
        dashboard = { layout: [], widgets: [], datasourceData: [] };
      }
    }

    const level = prevLevel + 1;

    dictionary[id] = dashboard || { layout: [], widgets: [], datasourceData: [] };

    if (children) {
      children = formatMenuFromLoginData(children, dictionary, id, level);
    }

    return { id, name, children, level, parent_id };
  });

  return menu;
};

export const formatTemplatesFromLoginData = (templates, dictionary = {}) => {
  if (!templates) return [];

  return templates.map(template => {
    const id = template.id || uuid();

    let dashboard = { layout: [], widgets: [], datasourceData: []  };
    if (typeof template.dashboard === "string") {
      try {
        const obj = JSON.parse(template.dashboard);
        dashboard = Array.isArray(obj) ? { layout: [], widgets: [], datasourceData: [] } : obj;
      } catch {
        dashboard = { layout: [], widgets: [],datasourceData: [] };
      }
    }

    dictionary[id] = dictionary[id] || [];

    dictionary[id] = dashboard;

    return { name: template.name, id };
  });
};

export function getBreadcrumb(tree, id, arr = []) {
  for (let i = 0; i < tree.length; i++) {
    const item = tree[i];
    if (item.id === id) {
      arr.push(item);
      break;
    } else if (item.children && item.children.length) {
      arr.push(item);
      const prevLength = arr.length;
      const newArr = getBreadcrumb(item.children, id, arr);
      if (prevLength === newArr.length) {
        arr.pop();
      }
    }
  }

  return arr;
}

function constructURL(selectedWidget) {
  const { datasource, dataSourceEndPoint } = selectedWidget;
  let {
    commonReducer: {
      selectedTenant: { tenantcode },
      dataSources
    }
  } = store.getState();

  const { data_sources } =
    dataSources.find(item => item.tenant === tenantcode) || {};
  if (
    typeof data_sources != "undefined" &&
    data_sources &&
    data_sources.length
  ) {
    const data_source = data_sources.find(
      item => item.ds_code === datasource.ds_code
    );
    if (data_source) return data_source.url + dataSourceEndPoint;
  }

  return datasource.url;
}

function calculateDates(diff) {
  const currentDate = new Date();
  const prevDate = new Date(new Date().setDate(currentDate.getDate() - diff));

  const startDate = prevDate.format("yyyy-mm-dd'T'HH:MM");
  const endDate = currentDate.format("yyyy-mm-dd'T'HH:MM");
  return { startDate, endDate };
}

function calculateHours(diff) {
  const currentDate = new Date();
  const prevDate = new Date(new Date().setHours(currentDate.getHours() - diff));
  const startDate = prevDate.format("yyyy-mm-dd'T'HH:MM");
  const endDate = currentDate.format("yyyy-mm-dd'T'HH:MM");

  return { startDate, endDate };
}

export function getDatesForRange(value) {
  switch (value) {
    case Constants.DATE_RANGES[0]:
      return calculateDates(1);

    case Constants.DATE_RANGES[1]:
      return calculateDates(7);

    case Constants.DATE_RANGES[2]:
      return calculateDates(30);

    case Constants.DATE_RANGES[3]:
      return calculateDates(365);

    case Constants.DATE_RANGES[5]:
      return calculateHours(1);

    case Constants.DATE_RANGES[6]:
      return calculateHours(2);

    case Constants.DATE_RANGES[7]:
      return calculateHours(3);

    case Constants.DATE_RANGES[8]:
      return calculateHours(6);

    case Constants.DATE_RANGES[9]:
      return calculateHours(8);

    case Constants.DATE_RANGES[10]:
      return calculateHours(12);

    case Constants.DATE_RANGES[11]:
      return calculateHours(24);
      
    default:
      return;
  }
}

export function getSensortData (type = 'sensor') {
  return Constants.getSensortData;
}