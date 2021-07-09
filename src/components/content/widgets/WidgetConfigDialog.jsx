import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Geocode from "react-geocode";
import _, { isNull } from "lodash";
import { uuid } from "uuidv4";
import ColorPicker from "material-ui-color-picker";
import {
  Button,
  Checkbox,
  Dialog,
  Fab,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  Input,
  InputLabel,
  ListItemText,
  makeStyles,
  useTheme,
  MenuItem,
  Select,
  TextField,
  Typography,
  withStyles,
  Slider,
  Switch,
  FormControlLabel
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import * as Utils from "../../../constants/Utils";
import chartService from "../../../services/chartService";
import AddTableInfo from "../settings/AddTableInfo";
import MapContainer from "../../common/MapContainer";
import * as Constants from "../../../constants/Constants";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import PublishIcon from "@material-ui/icons/Publish";
import { LabelColorComponent } from "../../common/LabelColor";
import DeleteIcon from "@material-ui/icons/Delete";
import * as mui from "@material-ui/icons";
import uploadFileToBlob, { isStorageConfigured, getBlobImageContainer } from '../../../services/azure-storage-blob.jsx';

const storageConfigured = isStorageConfigured();

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150
  },

  formControlChartDataSource: {
    margin: theme.spacing(1),
    minWidth: "100%",

    [theme.breakpoints.down("sm")]: {
      minWidth: "100%"
    },
    [theme.breakpoints.up("md")]: {
      minWidth: "100%"
    },
    [theme.breakpoints.up("lg")]: {
      minWidth: "100%",
      maxWidth: "100%"
    }
  },
  formControlTableColumn: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%"
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: "100%"
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: 300
    }
  },
  formControlTableFilter: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%"
    },
    [theme.breakpoints.up("md")]: {
      // minWidth: '50%'
      maxWidth: "100%"
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: 300
    }
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  gridContainer: {
    width: 500
  },
  addTableInfoMargin: {
    background: theme.palette.bg.buttonPrimary,
    borderRadius: "0 !important",
    "&:hover": {
      background: theme.palette.bg.hoverColor
    }
    //margin: theme.spacing(1),
  },
  addTableInfoIcon: {
    //marginRight: theme.spacing(1),
  },
  addLoadedImageButton: {
    marginLeft: "10px",
    background: theme.palette.bg.buttonPrimary,
    "&:hover": {
      background: theme.palette.bg.hoverColor
    }
  },
  addMarginBotton: {
    marginBottom: "10px",
    background: theme.palette.bg.buttonPrimary,
    borderRadius: "0 !important",
    "&:hover": {
      background: theme.palette.bg.hoverColor
    }
  },
  fetchButton: {
    marginLeft: "8px",
    "& .MuiGrid-root .MuiButton-containedPrimary, .MuiButton-containedSizeSmall": {}
  },
  uploadBtn: {
    minWidth: "30px !important",
    backgroundColor: theme.palette.bg.buttonPrimary
  }
}));

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const WidgetConfigDialog = props => {

  const { widgetConfig, onCloseDialog } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();

  const allIcons = Object.keys(mui);

  const intervals = [
    0,
    5,
    10,
    20,
    30,
    60,
    90,
    120,
    150,
    180,
    210,
    240,
    270,
    300,
    500
  ];
  const widgetTypes = Utils.getWidgetTypeList(Constants.widgets);

  const isAdmin = useSelector(state => state.loginReducer.isAdmin);
  const formTemplates = useSelector(state => state.formTemplatesReducer.formTemplates);
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

  const [selectedWidget, setSelectedWidget] = useState(widgetConfig);
  const [selectedFormTemplate, setSelectedFormTemplate] = useState(selectedWidget.formTemplate || null);
  const [selectedWidgetInfo, setSelectedWidgetInfo] = useState(
    selectedWidget.widget_info
  );

  const onSelectFormTemplate = (event) =>{
    const id = event.target.value;
    const template = formTemplates.find(tmp => tmp.id === id);
    setSelectedFormTemplate(template)
  }
  const [selectedDataSource, setSelectedDataSource] = useState(
    selectedWidget.datasource
  );

  let data =
    selectedWidget.datasource != null &&
    typeof selectedWidget.datasource["datasourceid"] != "undefined"
      ? selectedWidget.datasource.datasourceid
      : "";

  const [selectedDataSourceValue, setselectedDataSourceValue] = useState(data);

  const [refreshInterval, setRefreshInterval] = useState(
    selectedWidget.refreshInterval
  );

  const [tables, setTables] = useState(selectedWidget.tables || []);
  const [title, setTitle] = useState(selectedWidget.title);
  const [widgetImageAlign, setImageAlign] = useState(selectedWidget.imageAlign);
  const [chartBackgroundColor, setChartBackgroundColor] = useState(
    selectedWidget.chartBackgroundColor || "#000"
  );

  const [widgetIndex, setWidgetIndex] = useState(selectedWidget.widgetIndex);
  const [link, setLink] = useState(selectedWidget.link);
  const [units, setUnits] = useState(selectedWidget.units);
  const [source, setSource] = useState(selectedWidget.source);
  const [type, setType] = useState(selectedWidget.type);
  const [dataSourceEndPoint, setDataSourceEndPoint] = useState(
    selectedWidget.dataSourceEndPoint
  );

  const [dataPath, setDataPath] = useState(selectedWidget.data_path);
  const [imageDataPath, setImageDataPath] = useState(
    selectedWidget.image_data_path
  );

  const [backgroundColor, setBackgroundColor] = useState(
    selectedWidget.backgroundColor
  );

  const [dateSelection, setDateSelection] = useState(
    selectedWidget.dateSelection || "Range"
  );

  const [startDate, setStartDate] = useState(selectedWidget.startDate);
  const [endDate, setEndDate] = useState(selectedWidget.endDate);
  const [columns, setColumns] = useState([]);
  const [xAxis, setXAxis] = useState(selectedWidget.xAxis);
  const [yAxis, setYAxis] = useState(selectedWidget.yAxis);
  const [zAxis, setZAxis] = useState(selectedWidget.zAxis);
  const [selectedPosition, setSelectedPosition] = useState(selectedWidget.templatePosition || 'Top');
  const [graphPlotType, setGraphPlotType] = useState(
    selectedWidget.graphPlotType
  );

  let dialogTitle = selectedWidget.isNewWidget ? "Add Widget" : "Edit Widget";

  // const [imageConfig, setImageConfig] = useState(widgetConfig.image);
  // const [linkConfig, setLinkConfig] = useState(widgetConfig.link);

  /**
   * for Image
   */
  const [selectedFile, setSelectedFile] = useState();

  const [isShowTitle, setShowTitle] = useState(
    selectedWidget.isShowTitle || false
  );
  const [isShowTableHedaer, setShowTableHeader] = useState(
    selectedWidget.isShowTableHedaer || false
  );

  const [isShowTableGrid, setShowTableGrid] = useState(
    selectedWidget.isShowTableGrid || false
  );

  const [imagesList, setImagesList] = useState(selectedWidget.imagesList || []);
  const [selectedImage, setSelectedImage] = useState(selectedWidget.image);

  /**
   * Heat Map
   */
  const [heatDesc, setHeatDesc] = useState(selectedWidget.desc);
  const [heatDeviceId, setHeatDeviceId] = useState(selectedWidget.heatDeviceId);
  const [xAxisArr, setxAxisArr] = useState(selectedWidget.xAxisArr || []);
  const [yAxisArr, setyAxisArr] = useState(selectedWidget.yAxisArr || []);
  const [zAxisArr, setzAxisArr] = useState(selectedWidget.zAxisArr || []);
  const [heatMapData, setHeatMapData] = useState(
    selectedWidget.heatMapData || []
  );
  const [selectedHeatXAxis, setselectedHeatXAxis] = useState(
    selectedWidget.selectedHeatXAxis || []
  );
  const [selectedHeatYAxis, setselectedHeatYAxis] = useState(
    selectedWidget.selectedHeatYAxis || []
  );

  const [isKPITable, setKPITable] = useState(selectedWidget.kpiTable || false);

  const [unitPositioning, setunitPositioning] = useState(
    selectedWidget.unitPositioning
  );

  // const [unitPositioning, setunitPositioning] = React.useState('');

  const handleUnitPositioningChange = event => {
    setunitPositioning(event.target.value);
  };

  const onFilterMultiSelectChange = (event, type) => {
    if (type === "HeatXAxis") {
      setselectedHeatXAxis(event.target.value);
      selectedWidget.selectedHeatXAxis = event.target.value;
      return;
    }
    if (type === "HeatYAxis") {
      setselectedHeatYAxis(event.target.value);
      selectedWidget.selectedHeatYAxis = event.target.value;
      return;
    }
  };
  const getBackgroundImagesAligns = () => {
    return [
      {
        key: Constants.COLUMN_ALIGNS.Center,
        value: "center"
      },
      {
        key: Constants.COLUMN_ALIGNS.Left,
        value: "left"
      }
    ];
  };
  /**
   * Google Maps
   */
  const [googleAddress, setGoogleAddress] = useState(
    selectedWidget.googleAddress || []
  );
  const [googleLatLong, setGoogleLatLong] = useState(
    selectedWidget.googleLatLong || { lat: 0, lng: 0 }
  );
  const onHandleTitle = event => {
    setShowTitle(event.target.checked);
  };

  const onHandleShowGrid = event => {
    setShowTableGrid(event.target.checked);
  };

  const onHandleChartColor = color => {
    setChartBackgroundColor(color);
  };
  const onHandleTableHeader = event => {
    setShowTableHeader(event.target.checked);
  };
  const [storeObject, setStoreObject] = useState(
    selectedWidget.storeObject || ""
  );

  const [lineChartType, setLineChartType] = useState(
    selectedWidget.lineChartType || "spline"
  );

  const [gaugeChartType, setGaugeChartType] = useState(
    selectedWidget.gaugeChartType || "gauge"
  );

  const [imgChartType, setImgChartType] = useState(
    selectedWidget.imgChartType || "image"
  );

  /** Legend Setting for Chart */
  const [legentSelection, setLegentSelection] = useState(
    selectedWidget.legentSelection || ""
  );

  const [imageOpacity, setImageOpacity] = useState(
    selectedWidget.imageOpacity || 0.1
  );

  const [lableHeaderColor, setLableHeaderColor] = useState(
    selectedWidget.lableHeaderColor || theme.palette.textColor
  );

  const [labelTextColor, setLabelTextColor] = useState(
    selectedWidget.labelTextColor || theme.palette.textColor
  );

  /** Label State for Data coloring */
  const [labelColorChecked, setLabelColorChecked] = useState(
    selectedWidget.labelColorChecked || false
  );

  const [labelColorObject, setLabelColorObject] = useState(
    selectedWidget.labelColorObject || ""
  );

  const [selectedDynamicContent, setSelectedDynamicContent] = useState(
    selectedWidget.dynamicText || []
  );

  const getPlotChartType = () => {
    return [
      Constants.Bar_Graph_Plot_Type.Horizontal,
      Constants.Bar_Graph_Plot_Type.Vertical
    ];
  };

  const onGraphPlotTypeSelect = event => {
    setGraphPlotType(event.target.value);
  };

  const onWidgetTypeSelectionChange = event => {
    onWidgetChangeReset();
    let selectedWidget = widgetTypes.find(
      type => type.id === event.target.value
    );

    setSelectedWidgetInfo(selectedWidget);
  };

  const handleDataSourceSelection = event => {
    setselectedDataSourceValue(event.target.value);
    setSelectedDataSource(
      JSON.parse(event.nativeEvent.target.dataset.mySource)
    );
  };

  const onTableInfoChange = (i, event) => {
    const values = [...selectedDynamicContent];
    values[i].value = event.target.value;
    setSelectedDynamicContent(values);
  };

  const setDynamicLinkOnMultiple = (i, event) => {
    const values = [...selectedDynamicContent];
    values[i].link = event.target.value;
    setSelectedDynamicContent(values);
  };

  const setDynamicIconOnMultiple = (i, event) => {
    const values = [...selectedDynamicContent];
    values[i].icon = event.target.value;
    setSelectedDynamicContent(values);
  };

  const onRemoveDynamicData = i => {
    const values = [...selectedDynamicContent];
    values.splice(i, 1);
    setSelectedDynamicContent(values);
  };

  const onRefreshIntervalChange = event => {
    setRefreshInterval(event.target.value);
  };

  const handleDateSelectionChange = event => {
    const { value } = event.target;
    setDateSelection(value);

    if (value !== "Range") {
      const { startDate, endDate } = Utils.getDatesForRange(value);

      setStartDate(startDate);
      setEndDate(endDate);
    }
  };

  const onSelectLineChartHandler = event => {
    setLineChartType(event.target.value);
  };

  const onSelectGaugeChartHandler = event => {
    setGaugeChartType(event.target.value);
  };

  const onSelectImageChartHandler = event => {
    setImgChartType(event.target.value);
  };

  const onAddTableInfoClickHandler = () => {
    const table = {
      tableName: "",
      columns: columns, //["Date","Value"],
      gridColumns: [],
      selectedColumns: [],
      selectedGridColumns: [],
      filters: columns, //["Date","Value"],
      selectedFilters: [],
      color: "",
      selectedWidgetInfo: selectedWidgetInfo,
      yAxisStops: [],
      id: uuid(),
      setSelectedColumnSudoNames: [],
      isDefault: true,
      unitName: "",
      scatterUnitName: "",
      scatterColor: "",
      axisPosition: "bottom"
    };

    setTables([...tables, table]);
  };

  const onSelectDynamicContent = () => {
    const values = [...selectedDynamicContent];
    values.push({ value: null, link: null, icon: null });
    setSelectedDynamicContent(values);
  };

  const onRemoveTableInfoClickHandler = id => {
    setTables(tables.filter(table => table.id !== id));
  };

  const onUpdateTableHandler = (table, field) => {
    tables.map(tableContent => {
      if (table.id === tableContent.id) {
        tableContent = table;
      } else if (typeof tableContent[field] == "undefined") {
        tableContent[field] = true;
      }

      return tableContent;
    });

    setTables(tables);
  };

  const onSortClickHandler = sortObj => {
    setStoreObject(sortObj);
  };

  const onAlignSelectChange = event => {
    setImageAlign(event.target.value);
  };

  const onWidgetChangeReset = () => {
    let selectedWidgetReset = { ...Constants.new_widget };
    setSelectedWidget(selectedWidgetReset);
    setWidgetIndex(selectedWidgetReset.widgetIndex);
    setTitle(selectedWidgetReset.title);
    setUnits(selectedWidgetReset.units);
    setSource(selectedWidgetReset.source);
    setType(selectedWidgetReset.type);
    setBackgroundColor(selectedWidgetReset.backgroundColor);
    setDataPath(selectedWidgetReset.data_path);
    setImageDataPath(selectedWidgetReset.image_data_path);
    setTables(selectedWidgetReset.tables);
    setRefreshInterval(selectedWidgetReset.refreshInterval);
    setStartDate(
      Utils.convertEpocToDateString(true, selectedWidgetReset.startDate)
    );
    setEndDate(
      Utils.convertEpocToDateString(true, selectedWidgetReset.endDate)
    );
    setLink(selectedWidgetReset.link);
  };

  const updateWidgetInfo = () => {
    selectedWidget.widget_info = selectedWidgetInfo;
    selectedWidget.title = title;
    selectedWidget.widgetIndex = widgetIndex;
    selectedWidget.imageAlign = widgetImageAlign;
    selectedWidget.type = type;
    selectedWidget.datasource = selectedDataSource;
    selectedWidget.data_path = dataPath;
    selectedWidget.dataSourceEndPoint = dataSourceEndPoint;
    selectedWidget.tables = tables;
    selectedWidget.dateSelection = dateSelection;
    selectedWidget.isShowTitle = isShowTitle;
    selectedWidget.isShowTableHedaer = isShowTableHedaer;
    selectedWidget.isShowTableGrid = isShowTableGrid;
    selectedWidget.storeObject = storeObject;
    selectedWidget.lineChartType = "";
    selectedWidget.gaugeChartType = gaugeChartType;
    selectedWidget.imgChartType = "";
    selectedWidget.legentSelection = legentSelection;
    selectedWidget.kpiTable = isKPITable;
    selectedWidget.templatePosition = selectedPosition;
    selectedWidget.formTemplate = selectedFormTemplate;

    if (selectedWidgetInfo.group === Constants.widgets.IMAGE.group) {
      selectedWidget.backgroundColor = backgroundColor;
      selectedWidget.image = selectedImage;
      selectedWidget.dynamicText = selectedDynamicContent;
      selectedWidget.imagesList = imagesList;

      selectedWidget.type = imgChartType ? 'svgImage' : "imagesurllist";
      selectedWidget.imageOpacity = imageOpacity;
      selectedWidget.lableHeaderColor = lableHeaderColor;
      selectedWidget.labelTextColor = lableHeaderColor;
      selectedWidget.imgChartType = imgChartType;
      selectedWidget.svgToken = svgToken;
      return;
    }

    if (selectedWidgetInfo.group === Constants.widgets.LINE_CHART.group) {
      selectedWidget.lineChartType = lineChartType;
    }

    /* Widget should be label, label image or map*/
    if (
      typeof selectedImage != "undefined" &&
      (selectedWidgetInfo.group === Constants.widgets.LABEL.group ||
        selectedWidgetInfo.group === Constants.widgets.LABELURL.group ||
        selectedWidgetInfo.group === Constants.widgets.MAPLABELREDIRECT.group)
    ) {
      selectedWidget.backgroundColor = backgroundColor;
      selectedWidget.imagesList = imagesList;
      selectedWidget.image_data_path = imageDataPath;
      selectedWidget.image = "";
      selectedWidget.imageOpacity = imageOpacity;

      if (imageDataPath && selectedWidget.imagesList.length > 0) {
        selectedWidget.image = selectedImage;
      }
    }

    if (
      selectedWidgetInfo.group === Constants.widgets.LABEL.group ||
      selectedWidgetInfo.group === Constants.widgets.LABELURL.group ||
      selectedWidgetInfo.group === Constants.widgets.MAPLABELREDIRECT.group
    ) {
      selectedWidget.lableHeaderColor = lableHeaderColor;
      selectedWidget.labelTextColor = labelTextColor;
      selectedWidget.chartBackgroundColor = chartBackgroundColor;
    }

    if (selectedWidgetInfo.group === Constants.widgets.LABEL.group) {
      selectedWidget.labelColorChecked = labelColorChecked;
      selectedWidget.unitPositioning = unitPositioning;

      selectedWidget.labelColorObject = labelColorChecked
        ? labelColorObject
        : "";
    }

    if (selectedWidgetInfo.group === Constants.widgets.HEATMAP.group) {
      selectedWidget.heatDeviceId = heatDeviceId;
      selectedWidget.heatDesc = heatDesc;
      selectedWidget.xAxisArr = xAxisArr;
      selectedWidget.yAxisArr = yAxisArr;
      selectedWidget.heatMapData = heatMapData;
      selectedWidget.selectedHeatXAxis = selectedHeatXAxis;
      selectedWidget.selectedHeatYAxis = selectedHeatYAxis;
    }

    if (selectedWidgetInfo.group === Constants.widgets.HEATMAP.group) {
      selectedWidget.zAxisArr = zAxisArr;
    }

    if (selectedWidgetInfo.group === Constants.widgets.GOOGLEMAP.group) {
      selectedWidget.googleAddress = googleAddress;
      selectedWidget.googleLatLong = googleLatLong;
    }

    if (selectedWidgetInfo.group === Constants.widgets.MAPLABELREDIRECT.group) {
      selectedWidget.googleAddress = googleAddress;
      selectedWidget.googleLatLong = googleLatLong;
    }

    selectedWidget.units = units;
    selectedWidget.source = source;
    selectedWidget.startDate = startDate;
    selectedWidget.endDate = endDate;
    selectedWidget.backgroundColor = backgroundColor;
    selectedWidget.refreshInterval = refreshInterval;
    selectedWidget.xAxis = xAxis;
    selectedWidget.yAxis = yAxis;
    selectedWidget.zAxis = zAxis;
    selectedWidget.graphPlotType = graphPlotType;
    selectedWidget.link = link;
  };

  const onFetchClickHandler = () => {
    if (selectedWidgetInfo.group === Constants.widgets.IMAGE.group) {
      updateWidgetInfo();
      chartServiceApi(false);
      return;
    }

    if (tables && tables.length > 0) {
      updateWidgetInfo();
      chartServiceApi(true);
    }
  };

  const saveWidgetInfo = () => {
    updateWidgetInfo();
    let eventName = Constants.EVT_DASHBOARDS_ON_UPDATE_WIDGET;
    if (selectedWidget.isNewWidget) {
      selectedWidget.widget_id = uuid();
      eventName = Constants.EVT_DASHBOARDS_ON_ADD_WIDGET;
    }
    var isValidIcon = true;
    if (selectedWidget.type == "imagesurllist") {
      if (selectedWidget.dynamicText != undefined) {
        selectedWidget.dynamicText.map(range => {
          if (allIcons.indexOf(range.icon) <= 0) {
            isValidIcon = false;
          }
        });
        if (isValidIcon) {
          dispatch({
            type: eventName,
            value: { ...selectedWidget }
          });
        } else {
          onClose();
          return false;
        }
      }
    } else {
      dispatch({
        type: eventName,
        value: { ...selectedWidget }
      });
    }
    onClose();
    return;
  };

  const onSaveChangeClickHandler = () => {
    if (
      selectedWidget &&
      selectedWidget.widget_info &&
      selectedWidget.datasource &&
      selectedWidget.data_path
    ) {
      console.log('Saving ONe')
      saveWidgetInfo();
    }

    if (
      selectedWidget &&
      selectedWidgetInfo &&
      (selectedWidgetInfo.group === Constants.widgets.GOOGLEMAP.group ||
        selectedWidgetInfo.group === Constants.widgets.MAPLABELREDIRECT.group ||
        selectedWidgetInfo.group === Constants.widgets.HEATMAP.group ||
        selectedWidgetInfo.group === Constants.widgets.IMAGE.group ||
        selectedWidgetInfo.group === Constants.widgets.LABELURL.group)
    ) {
      console.log('Saving Two')
      saveWidgetInfo();
    }
  };

  const onXAxisSelect = event => {
    setXAxis(event.target.value);
  };

  const onYAxisSelect = event => {
    setYAxis(event.target.value);
  };

  const onZAxisSelect = event => {
    setZAxis(event.target.value);
  };

  const getColumns = () => {
    if (tables && tables.length) {
      return tables[0].columns;
    }

    return [];
  };

  const chartServiceApi = fetchMetadata => {
    let requestInfo = Utils.requestBuilderCharts(selectedWidget, fetchMetadata);
    chartService(requestInfo)
      .then(response => {
        if (response && response.status === 200) {
          let data;
          if (fetchMetadata) {
            data = Utils.getResponseMetaData(response, selectedWidget);
            if (selectedWidgetInfo.group === Constants.widgets.HEATMAP.group) {
              setxAxisArr(data.xAxisArr);
              setyAxisArr(data.yAxisArr);
              setzAxisArr(data.zAxisArr);
              setHeatMapData(data.heatMapData);
            } else {
              setTables([...data]);
            }
          } else {
            if (selectedWidgetInfo.group === Constants.widgets.IMAGE.group) {
              data = Utils.getResponseMetaData(response, selectedWidget);
              setImagesList(data);
              return;
            }
          }
        } else {
          selectedWidget.data = null;
        }
      })
      .catch(error => {
        // onClose();

        alert(error);
      });
  };

  const onClose = () => {
    onCloseDialog();
  };

  const onColorChange = color => {
    setBackgroundColor(color);
  };

  const onLabelHeaderColorChange = color => {
    setLableHeaderColor(color);
  };

  const onLabelColorChange = color => {
    setLabelTextColor(color);
  };

  const fetchLatLong = () => {
    Geocode.setApiKey(Constants.KEY_CONSTANTS.googleApiKey);
    Geocode.setLanguage("en");
    Geocode.setRegion("es");
    Geocode.fromAddress(googleAddress).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        setGoogleLatLong({ lat, lng });
      },
      error => {
        console.error(error);
      }
    );
  };

  const uploadImage = () => {
    updateWidgetInfo();
    chartServiceApi(false);
  };

  /** get Image request */
  const getImageRequest = () => {
    let requestType = {};
    requestType["request"] = {};
    requestType["request"]["info"] = {};
    requestType["request"]["config"] = {};

    requestType["request"]["info"]["dataPath"] = imageDataPath;
    requestType["request"]["info"]["desc"] = "desc";

    requestType["request"]["config"]["type"] = "imagesurllist";
    requestType["request"]["config"]["widgetsetup"] = "no";
    requestType["url"] = `${selectedDataSource.url}api/Energy/GetImagesList`;

    return requestType;
  };

  /** Fetch Images */
  const onFetchImageClickHandler = () => {
    const requestType = getImageRequest();

    chartService(requestType)
      .then(res => {
        if (res.status && res.status == 200) {
          setImagesList(res.data.config.Metrics);
        } else {
          setImagesList([]);
        }
      })
      .catch(error => {
        setImagesList([]);
      });
  };

  const onSelectLengendOptionHandler = event => {
    setLegentSelection(event.target.value);
  };

  const changeOpacityHandler = (e, newValue) => {
    setImageOpacity(newValue);
  };

  const updateLabelColorHandler = colorObject => {
    setLabelColorObject(colorObject);
  };

  const updateColorCheckedHandler = labelColorChecked => {
    setLabelColorChecked(labelColorChecked);
  };

  const onGridChecked = e => {
    setKPITable(e.target.checked);
  };

  const getTemplatePostions = () => {
    return [
      {
        key: "Top",
        value: "Top"
      },
      {
        key: 'Bottom',
        value: "Bottom"
      },
    ];
  };
  const onSelectPosition = (event) => {
    setSelectedPosition(event.target.value)
  };
  
  const [loading, setImageLoading] = useState(false);
  const [svgBlobsImages, setSvgBlobsImages] = useState([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [svgToken, setSvgToken] = useState();

  const getBlobImageFromContainer = async () => {
    if(!imageLoaded) {
      const blobsInContainer = await getBlobImageContainer();
      setSvgBlobsImages(blobsInContainer);
      setImageLoaded(true);
    }
  }

  if(imgChartType == 'svg' && !imageLoaded) {
    getBlobImageFromContainer();
  }
  /** SVG Image upload functionality */
  const onSVGImageUpload = async (event) => {
    setImageLoading(true);

    const files = event.target.files[0];
    const blobsInContainer = await uploadFileToBlob(files);
    
    setSvgBlobsImages(blobsInContainer);
    setImageLoading(false);
  }

  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={true}
      fullWidth
      maxWidth="md"
      disableBackdropClick={true}
    >
      <DialogTitle id="customized-dialog-title" onClose={onClose}>
        {dialogTitle}
      </DialogTitle>

      <DialogContent dividers>
        
        <Grid container alignItems="flex-start" spacing={1}>
          <Grid item={true} xs={12}>
            <div className="show-index">
              <Checkbox
                className="show-title"
                checked={isShowTitle}
                value={isShowTitle}
                onClick={evt => onHandleTitle(evt)}
              />{" "}
              Show Title &nbsp;&nbsp;&nbsp;

              {selectedWidgetInfo &&
                (selectedWidgetInfo.type === Constants.widgets.LINE_CHART.type ||
                  selectedWidgetInfo.type === Constants.widgets.BAR_CHART.type ||
                  selectedWidgetInfo.type === Constants.widgets.ANOMALY_CHART.type ||
                  selectedWidgetInfo.type === Constants.widgets.MULTIPLE_AXES_CHART.type ||
                  selectedWidgetInfo.type === Constants.widgets.LINE_COLUMN_CHART.type ||
                  selectedWidgetInfo.type === Constants.widgets.SCATTER_CHART.type ||
                  selectedWidgetInfo.type === Constants.widgets.LINE_SCATTER_CHART.type 
                  ) && (
                  <>
              <Checkbox
                className="show-title"
                checked={isShowTableGrid}
                value={isShowTableGrid}
                onClick={evt => onHandleShowGrid(evt)}
              />{" "}
              Show Grid
              </>
                )}
                &nbsp;&nbsp;&nbsp;
                
              {selectedWidgetInfo &&
                selectedWidgetInfo.type === Constants.widgets.GRID.type && (
                  <>
                    <Checkbox
                      checked={isShowTableHedaer}
                      value={isShowTableHedaer}
                      onClick={evt => onHandleTableHeader(evt)}
                    />{" "}
                    Show Table Header
                  </>
                )}
            </div>
          </Grid>
          <Grid item={true} xs={12}>
            <FormControl
              required
              className={classes.formControlChartDataSource}
            >
              <TextField
                value={widgetIndex}
                required
                id="standard-required-widgetindex"
                onChange={evt => setWidgetIndex(evt.target.value)}
                label="Index"
                defaultValue=""
              />
              <FormHelperText>Required</FormHelperText>
            </FormControl>
          </Grid>
          { formTemplates.length > 0 && 
            <>
            <Grid item={true} md={6} xs={12}>
                <FormControl
                  required
                  className={classes.formControlChartDataSource}
                >
                  <InputLabel id="column-align-list">
                    Forms
                  </InputLabel>
                  <Select
                      labelId="widget-select-required-label"
                      id="widget-select-required"
                      value={selectedFormTemplate ? selectedFormTemplate.id : null}
                      onChange={onSelectFormTemplate}
                      className={classes.selectEmpty}
                      label={"Select form"}
                    >
                      {formTemplates && formTemplates.map(tmp => {
                        return (
                          <MenuItem key={tmp.id} value={tmp.id}>
                            {tmp.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  <FormHelperText>Required</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item={true} md={6} xs={12}>
              <FormControl
                  required
                  className={classes.formControlChartDataSource}
                >
                  <InputLabel id="column-align-list">
                    Form Position
                  </InputLabel>
                  <Select
                    labelId="column-align-select-required-label"
                    id="column-align-select-required"
                    value={selectedPosition}
                    onChange={evt =>
                      onSelectPosition(evt)
                    }
                    className={classes.selectEmpty}
                    label={"Select Position"}
                    disabled={!isAdmin}
                  >
                    {getTemplatePostions().map(align => {
                      return (
                        <MenuItem
                          key={align.key}
                          value={align.value}
                        >
                          {align.key}
                        </MenuItem>
                      );
                    })}
                  </Select>
              </FormControl>
            </Grid>
          </>
          }
          {selectedWidget.isNewWidget ? (
            <Grid item={true} xs={12}>
              <FormControl required className={classes.formControl}>
                <InputLabel id="widget-list">Widget Type</InputLabel>
                <Select
                  labelId="widget-select-required-label"
                  id="widget-select-required"
                  value={selectedWidgetInfo ? selectedWidgetInfo.id : null}
                  onChange={onWidgetTypeSelectionChange}
                  className={classes.selectEmpty}
                  label={"Select Widget"}
                >
                  {widgetTypes.map(widgetType => {
                    return (
                      <MenuItem key={widgetType.id} value={widgetType.id}>
                        {widgetType.name}
                      </MenuItem>
                    );
                  })}
                </Select>
                <FormHelperText>Required</FormHelperText>
              </FormControl>
            </Grid>
          ) : null}

          {selectedWidgetInfo &&
            selectedWidgetInfo.type === Constants.widgets.LINE_CHART.type && (
              <Grid item={true} xs={12}>
                <FormControl required className={classes.formControl}>
                  <InputLabel id="widget-list">Line Chart type</InputLabel>

                  <Select
                    labelId="widget-select-required-label"
                    id="widget-select-required"
                    value={lineChartType}
                    onChange={onSelectLineChartHandler}
                    className={classes.selectEmpty}
                    label={"Select Widget"}
                  >
                    {Constants.LINE_FIELD_CHART_TYPE.map(widgetType => {
                      return (
                        <MenuItem key={widgetType.id} value={widgetType.type}>
                          {widgetType.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <FormHelperText>Required</FormHelperText>
                </FormControl>
              </Grid>
            )}
            {selectedWidgetInfo &&
            selectedWidgetInfo.type === Constants.widgets.GAUGE_CHART.type && (
              <Grid item={true} xs={12}>
                <FormControl required className={classes.formControl}>
                  <InputLabel id="widget-list">Gauage Chart type</InputLabel>

                  <Select
                    labelId="widget-select-required-label"
                    id="widget-select-required"
                    value={gaugeChartType}
                    onChange={onSelectGaugeChartHandler}
                    className={classes.selectEmpty}
                    label={"Select Widget"}
                  >
                    {Constants.GAUGE_CHART_TYPE.map(widgetType => {
                      return (
                        <MenuItem key={widgetType.id} value={widgetType.type}>
                          {widgetType.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <FormHelperText>Required</FormHelperText>
                </FormControl>
              </Grid>
            )}

            {selectedWidgetInfo &&
            selectedWidgetInfo.type === Constants.widgets.IMAGE.type && (
              <Grid item={true} xs={12}>
                <FormControl required className={classes.formControl}>
                  <InputLabel id="widget-list">Image Chart type</InputLabel>

                  <Select
                    labelId="widget-select-required-label"
                    id="widget-select-required"
                    value={imgChartType}
                    onChange={onSelectImageChartHandler}
                    className={classes.selectEmpty}
                    label={"Select Widget"}
                  >
                    {Constants.IMAGE_CHART_TYPE.map(widgetType => {
                      return (
                        <MenuItem key={widgetType.id} value={widgetType.type}>
                          {widgetType.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <FormHelperText>Required</FormHelperText>
                </FormControl>
              </Grid>
            )}
        </Grid>
        {selectedWidgetInfo &&
        (selectedWidgetInfo.group === Constants.widgets.LINE_CHART.group ||
          selectedWidgetInfo.group === Constants.widgets.GRID.group ||
          selectedWidgetInfo.group === Constants.widgets.LABEL.group ||
          // selectedWidgetInfo.group ===
          //     Constants.widgets.AREA_CHART.group ||
          selectedWidgetInfo.group === Constants.widgets.SCATTER_CHART.group ||
          selectedWidgetInfo.group ===
            Constants.widgets.THREEDPLOT_CHART.group ||
          selectedWidgetInfo.group === Constants.widgets.ANOMALY_CHART.group ||
          selectedWidgetInfo.group === Constants.widgets.BULLET_CHART.group ||
          selectedWidgetInfo.group ===
            Constants.widgets.LINE_SCATTER_CHART.group) ? (
          <Grid container item={true} md={12} spacing={1}>
            {selectedWidgetInfo.group !== Constants.widgets.LABEL.group && (
              <Grid item={true} md={6} xs={12}>
                <FormControl
                  required
                  className={classes.formControlChartDataSource}
                >
                  <TextField
                    value={title}
                    required
                    id="standard-required-title"
                    onChange={evt => setTitle(evt.target.value)}
                    label="Title"
                    defaultValue=""
                  />
                  <FormHelperText>Required</FormHelperText>
                </FormControl>
              </Grid>
            )}
            <Grid item={true} md={6} xs={12}>
              <FormControl className={classes.formControlChartDataSource}>
                <ColorPicker
                  name="color"
                  defaultValue="#000"
                  label="Background color"
                  value={backgroundColor}
                  onChange={onColorChange}
                />
              </FormControl>
            </Grid>
            <Grid item={true} md={6} xs={12}>
              <FormControl
                required
                className={classes.formControlChartDataSource}
              >
                <TextField
                  value={units}
                  required
                  id="standard-required-units"
                  onChange={evt => setUnits(evt.target.value)}
                  label="Units"
                  defaultValue=""
                  disabled={!isAdmin}
                />
                <FormHelperText>Required</FormHelperText>
              </FormControl>
            </Grid>
            {selectedWidgetInfo.group === Constants.widgets.LABEL.group && (
              <>
                <Grid item={true} md={6} xs={12}>
                  <FormControl className={classes.formControlChartDataSource}>
                    <ColorPicker
                      name="color"
                      defaultValue="#000"
                      label="Label Header Text color"
                      value={lableHeaderColor}
                      onChange={onLabelHeaderColorChange}
                      id="headerLabelColor"
                    />
                  </FormControl>
                </Grid>
                <Grid item={true} md={6} xs={12}>
                  <FormControl className={classes.formControlChartDataSource}>
                    <ColorPicker
                      name="color"
                      defaultValue="#000"
                      label="Label Text color"
                      value={labelTextColor}
                      onChange={onLabelColorChange}
                      id="labelColor"
                    />
                  </FormControl>
                </Grid>
                <Grid item={true} md={6} xs={12}>
                  <FormControl className={classes.formControlChartDataSource}>
                    <ColorPicker
                      name="color"
                      defaultValue="#000"
                      label="chart color"
                      value={chartBackgroundColor}
                      onChange={onHandleChartColor}
                      id="chartColor"
                    />
                  </FormControl>
                </Grid>
                {/*                  
                        <FormControl className={classes.formControlChartDataSource}>
                    <ColorPicker
                      name="color"
                      defaultValue="#000"
                      label="Chart Color"
                      value={chartBackgroundColor}
                      // onChange={onHandleChartColor}
                      id="ChartColor"
                    />
                  </FormControl>     */}
              </>
            )}
            <Grid item={true} md={6} xs={12}>
              <FormControl
                required
                className={classes.formControlChartDataSource}
              >
                <TextField
                  value={source}
                  required
                  id="standard-required-source"
                  onChange={evt => setSource(evt.target.value)}
                  label="Source"
                  defaultValue=""
                  disabled={!isAdmin}
                />
                <FormHelperText>Required</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item={true} md={6} xs={12}>
              <FormControl
                required
                className={classes.formControlChartDataSource}
              >
                <TextField
                  value={type}
                  required
                  id="standard-required-type"
                  onChange={evt => setType(evt.target.value)}
                  label="Type"
                  defaultValue=""
                  disabled={!isAdmin}
                />
                <FormHelperText>Required</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item={true} md={6} xs={12}>
              <FormControl
                required
                className={classes.formControlChartDataSource}
              >
                <InputLabel id="datasource-list">Datasource</InputLabel>
                <Select
                  labelId="datasource-select-required-label"
                  id="datasource-select-required"
                  value={selectedDataSourceValue}
                  onChange={handleDataSourceSelection}
                  className={classes.selectEmpty}
                  label={"Select Datasource"}
                  disabled={!isAdmin}
                >
                  {dataSources.map(dataSource => {
                    return (
                      <MenuItem
                        key={dataSource.datasourceid}
                        value={dataSource.datasourceid}
                        data-my-source={JSON.stringify(dataSource)}
                      >
                        {dataSource.name}
                      </MenuItem>
                    );
                  })}
                </Select>
                <FormHelperText>Required</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item={true} md={6} xs={12}>
              <FormControl
                required
                className={classes.formControlChartDataSource}
              >
                <TextField
                  value={dataSourceEndPoint}
                  required
                  id="standard-required-datapath"
                  onChange={evt => setDataSourceEndPoint(evt.target.value)}
                  label="Data Source End point"
                  defaultValue=""
                  disabled={!isAdmin}
                />
                <FormHelperText>Required</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item={true} md={6} xs={12}>
              <FormControl
                required
                className={classes.formControlChartDataSource}
              >
                <TextField
                  value={dataPath}
                  required
                  id="standard-required-datapath"
                  onChange={evt => setDataPath(evt.target.value)}
                  label="Data path"
                  defaultValue=""
                  disabled={!isAdmin}
                />
                <FormHelperText>Required</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item={true} md={6} xs={12}>
              <FormControl
                required
                className={classes.formControlChartDataSource}
              >
                <InputLabel id="refresh-intervals-list">
                  Refresh Interval
                </InputLabel>
                <Select
                  labelId="refresh-interval-select-required-label"
                  id="refresh-interval-required"
                  value={refreshInterval ? refreshInterval : null}
                  onChange={onRefreshIntervalChange}
                  className={classes.selectEmpty}
                  label={"Refresh Interval"}
                  disabled={!isAdmin}
                >
                  {intervals.map(interval => {
                    return <MenuItem value={interval}>{interval}</MenuItem>;
                  })}
                </Select>
                <FormHelperText>Required</FormHelperText>
              </FormControl>
            </Grid>
            {selectedWidgetInfo.group === Constants.widgets.LABEL.group && (
              <>
                <Grid item={true} md={6} xs={12}>
                <FormControl
                required
                className={classes.formControlChartDataSource}
              >
                <InputLabel id="datasource-list">Unit Positioning</InputLabel>
              
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={unitPositioning}
                      onChange={handleUnitPositioningChange}
                    >
                      <MenuItem value="Post">Post</MenuItem>
                      <MenuItem value="Pre">Pre</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <FormControl
                  required
                  className={classes.formControlChartDataSource}
                >
                  <TextField
                    value={title}
                    required
                    id="display-title"
                    onChange={evt => setTitle(evt.target.value)}
                    label="Display Title"
                    defaultValue=""
                  />
                  <FormHelperText>Required</FormHelperText>
                </FormControl>
                <FormControl
                  required
                  className={classes.formControlChartDataSource}
                >
                  <TextField
                    value={link}
                    id="link"
                    onChange={evt => setLink(evt.target.value)}
                    label="Link"
                    defaultValue=""
                  />
                </FormControl>
                <FormControl
                  required
                  className={classes.formControlChartDataSource}
                >
                  <InputLabel id="image-list">Image Align By</InputLabel>
                  <Select
                    labelId="align-select-required-label"
                    id="align-select-required"
                    value={widgetImageAlign}
                    onChange={onAlignSelectChange}
                    className={classes.selectEmpty}
                    label={"Select Datasource"}
                    disabled={!isAdmin}
                  >
                    {getBackgroundImagesAligns().map(align => {
                      return (
                        <MenuItem key={align.key} value={align.value}>
                          {align.value}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <FormHelperText>Required</FormHelperText>
                </FormControl>
              </>
            )}

            {selectedWidgetInfo.group ===
              Constants.widgets.LINE_CHART.group && (
              <>
                <FormControl
                  required
                  className={classes.formControlChartDataSource}
                >
                  <InputLabel id="refresh-intervals-list">
                    Legend Layout
                  </InputLabel>
                  <Select
                    labelId="refresh-interval-select-required-label"
                    id="refresh-interval-required"
                    value={legentSelection}
                    onChange={onSelectLengendOptionHandler}
                    className={classes.selectEmpty}
                    label={"Legend Layout"}
                    disabled={!isAdmin}
                  >
                    {Constants.CHART_LEGEND_SETTING.map(legendSetting => {
                      return (
                        <MenuItem value={legendSetting.key}>
                          {legendSetting.title}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <FormHelperText>Required</FormHelperText>
                </FormControl>
              </>
            )}

            {_.isEqual(
              selectedWidgetInfo.type,
              Constants.widgets.GRID.type
            ) && (
              // <Grid xs={12}>
              <Grid item={true} md={6} xs={12}>
                <FormControl
                  required
                  className={classes.formControlChartDataSource}
                >
                  <InputLabel id="column-list">Graph Plot Type</InputLabel>
                  <Select
                    labelId="columns-select-required-yaxis"
                    id="columns-select-required"
                    value={graphPlotType}
                    onChange={evt => onGraphPlotTypeSelect(evt)}
                    className={classes.selectEmpty}
                    label={"Select Plot Type"}
                    input={<Input />}
                    MenuProps={MenuProps}
                  >
                    {getPlotChartType().map(column => {
                      return (
                        <MenuItem key={Math.random()} value={column}>
                          {column}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
            )}

            {selectedWidgetInfo.group === Constants.widgets.LABEL.group && (
              <>
                <Grid item={true} xs={12}>
                  <FormControl
                    required
                    className={classes.formControlChartDataSource}
                  >
                    <TextField
                      value={imageDataPath}
                      required
                      id="standard-required-image-datapath"
                      onChange={evt => setImageDataPath(evt.target.value)}
                      label="Image Data path"
                      defaultValue=""
                      disabled={!isAdmin}
                    />
                    <FormHelperText>Required</FormHelperText>
                  </FormControl>

                  {imageDataPath && (
                    <Fab
                      variant="extended"
                      size="small"
                      color="secondary"
                      aria-label="add"
                      className={`${classes.addMarginBotton} ${classes.addMarginBotton}`}
                      onClick={onFetchImageClickHandler}
                    >
                      Load Image
                    </Fab>
                  )}
                </Grid>

                {imageDataPath && (
                  <Grid item={true} md={6} sm={6} xs={12}>
                    <FormControl
                      required
                      className={classes.formControlChartDataSource}
                    >
                      <Typography id="discrete-slider-small-steps" gutterBottom>
                        Opacity
                      </Typography>
                      <Slider
                        defaultValue={0.1}
                        value={imageOpacity}
                        onChange={changeOpacityHandler}
                        aria-labelledby="discrete-slider-small-steps"
                        step={0.1}
                        marks
                        min={0.0}
                        max={1.0}
                        valueLabelDisplay="auto"
                      />
                    </FormControl>
                  </Grid>
                )}

                {imageDataPath && (
                  <Grid item={true} xs={12}>
                    <Grid container direction="row">
                      {imagesList.map(img => {
                        var ext = img.split(".").pop();
                        if (ext === "jpg" || ext === "png" || ext === "jpeg") {
                          return (
                            <Grid
                              item
                              style={{
                                position: "relative",
                                margin: 5
                              }}
                              xs={1}
                            >
                              <img
                                src={img}
                                alt={img}
                                style={{
                                  width: "100%",
                                  height: "100%"
                                }}
                                onClick={() => setSelectedImage(img)}
                              />
                              {selectedImage && selectedImage === img && (
                                <CheckCircleIcon
                                  style={{
                                    position: "absolute",
                                    top: 0,
                                    right: 0,
                                    color: "green"
                                  }}
                                />
                              )}
                            </Grid>
                          );
                        }
                        return null;
                      })}
                    </Grid>
                  </Grid>
                )}
              </>
            )}

            <Grid item={true} xs={12}>
              <Fab
                variant="extended"
                size="small"
                color="secondary"
                aria-label="add"
                className={classes.addTableInfoMargin}
                onClick={onAddTableInfoClickHandler}
                disabled={
                  !isAdmin ||
                  ((_.isEqual(
                    selectedWidgetInfo.type,
                    Constants.widgets.GRID.type
                  ) ||
                    _.isEqual(
                      selectedWidgetInfo.type,
                      Constants.widgets.GAUGE_CHART.type
                    ) ||
                    _.isEqual(
                      selectedWidgetInfo.type,
                      Constants.widgets.PIE_CHART.type
                    ) ||
                    _.isEqual(
                      selectedWidgetInfo.type,
                      Constants.widgets.DONUT_CHART.type
                    ) ) &&
                  tables.length === 0
                    ? false
                    : /*_.isEqual(
                          selectedWidgetInfo.type,
                          Constants.widgets.GRID.type
                        ) || */
                    _.isEqual(
                        selectedWidgetInfo.type,
                        Constants.widgets.GAUGE_CHART.type
                      ) ||
                      _.isEqual(
                        selectedWidgetInfo.type,
                        Constants.widgets.PIE_CHART.type
                      ) ||
                      _.isEqual(
                        selectedWidgetInfo.type,
                        Constants.widgets.DONUT_CHART.type
                      )
                    ? true
                    : false)
                }
              >
                <AddIcon className={classes.addTableInfoIcon} />
                Add Metrics
              </Fab>
            </Grid>

            {_.isEqual(
              selectedWidgetInfo.type,
              Constants.widgets.GRID.type
            ) && (
              <Grid item={true} xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={isKPITable}
                      onChange={onGridChecked}
                      name="checkedB"
                    />
                  }
                  label="KPI Table"
                />
              </Grid>
            )}

            {tables.map((table, index) => (
              <AddTableInfo
                table={table}
                key={index}
                sortingObj={storeObject}
                chartType={lineChartType}
                onSort={onSortClickHandler}
                onRemove={onRemoveTableInfoClickHandler}
                onUpdateValue={onUpdateTableHandler}
              />
            ))}

            {_.isEqual(
              selectedWidgetInfo.type,
              Constants.widgets.LABEL.type
            ) && (
              <LabelColorComponent
                isChecked={labelColorChecked}
                colorObjectProp={labelColorObject}
                isColorCheckedEvent={updateColorCheckedHandler}
                colorObjectHandler={updateLabelColorHandler}
                colorComponent={Constants.SET_COLOR_LABEL}
              />
            )}

            {(_.isEqual(
              selectedWidgetInfo.type,
              Constants.widgets.LINE_CHART.type
            ) ||
              _.isEqual(
                selectedWidgetInfo.type,
                Constants.widgets.MULTIPLE_AXES_CHART.type
              ) ||
              _.isEqual(
                selectedWidgetInfo.type,
                Constants.widgets.LINE_COLUMN_CHART.type
              ) ||
              // _.isEqual(
              //     selectedWidgetInfo.type,
              //     Constants.widgets.AREA_CHART.type
              // ) ||
              _.isEqual(
                selectedWidgetInfo.type,
                Constants.widgets.SCATTER_CHART.type
              ) ||
              _.isEqual(
                selectedWidgetInfo.type,
                Constants.widgets.THREEDPLOT_CHART.type
              ) ||
              _.isEqual(
                selectedWidgetInfo.type,
                Constants.widgets.ANOMALY_CHART.type
              ) ||
              _.isEqual(
                selectedWidgetInfo.type,
                Constants.widgets.BULLET_CHART.type
              ) ||
              _.isEqual(
                selectedWidgetInfo.type,
                Constants.widgets.LINE_SCATTER_CHART.type
              )) &&
              getColumns().length > 0 && (
                <Grid container alignItems="flex-start" spacing={1}>
                  <Grid xs={12} md={6}>
                    <FormControl
                      required
                      className={classes.formControlChartDataSource}
                    >
                      <InputLabel id="column-list">X-Axis</InputLabel>
                      <Select
                        labelId="columns-select-required-xaxis"
                        id="columns-select-required"
                        value={xAxis}
                        onChange={evt => onXAxisSelect(evt)}
                        className={classes.selectEmpty}
                        label={"Select X-Axis"}
                        input={<Input />}
                        MenuProps={MenuProps}
                        disabled={!isAdmin}
                      >
                        {getColumns().map(column => {
                          return (
                            <MenuItem key={Math.random()} value={column}>
                              {column}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid xs={12} md={6}>
                    <FormControl
                      required
                      className={classes.formControlChartDataSource}
                    >
                      <InputLabel id="column-list">Y-Axis</InputLabel>
                      <Select
                        labelId="columns-select-required-yaxis"
                        id="columns-select-required"
                        value={yAxis}
                        onChange={evt => onYAxisSelect(evt)}
                        className={classes.selectEmpty}
                        label={"Select Y-Axis"}
                        input={<Input />}
                        MenuProps={MenuProps}
                        disabled={!isAdmin}
                      >
                        {getColumns().map(column => {
                          return (
                            <MenuItem key={Math.random()} value={column}>
                              {column}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                  {_.isEqual(
                    selectedWidgetInfo.type,
                    Constants.widgets.THREEDPLOT_CHART.type
                  ) &&
                    getColumns().length > 0 && (
                      <Grid xs={12} md={6}>
                        <FormControl
                          required
                          className={classes.formControlChartDataSource}
                        >
                          <InputLabel id="column-list">Z-Axis</InputLabel>
                          <Select
                            labelId="columns-select-required-zaxis"
                            id="columns-select-required"
                            value={zAxis}
                            onChange={evt => onZAxisSelect(evt)}
                            className={classes.selectEmpty}
                            label={"Select Y-Axis"}
                            input={<Input />}
                            MenuProps={MenuProps}
                            disabled={!isAdmin}
                          >
                            {getColumns().map(column => {
                              return (
                                <MenuItem key={Math.random()} value={column}>
                                  {column}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </Grid>
                    )}
                </Grid>
                // </Grid>
              )}
            {_.isEqual(
              selectedWidgetInfo.type,
              Constants.widgets.BAR_CHART.type
            ) &&
              getColumns().length > 0 && (
                <Grid xs={12}>
                  <FormControl
                    required
                    className={classes.formControlChartDataSource}
                  >
                    <InputLabel id="column-list">X-Axis</InputLabel>
                    <Select
                      labelId="columns-select-required-xaxis"
                      id="columns-select-required"
                      value={xAxis}
                      onChange={evt => onXAxisSelect(evt)}
                      className={classes.selectEmpty}
                      label={"Select X-Axis"}
                      input={<Input />}
                      MenuProps={MenuProps}
                      disabled={!isAdmin}
                    >
                      {getColumns().map(column => {
                        return (
                          <MenuItem key={Math.random()} value={column}>
                            {column}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <FormControl
                    required
                    className={classes.formControlChartDataSource}
                  >
                    <InputLabel id="column-list">Y-Axis</InputLabel>
                    <Select
                      labelId="columns-select-required-yaxis"
                      id="columns-select-required"
                      value={yAxis}
                      onChange={evt => onYAxisSelect(evt)}
                      className={classes.selectEmpty}
                      label={"Select Y-Axis"}
                      input={<Input />}
                      MenuProps={MenuProps}
                      disabled={!isAdmin}
                    >
                      {getColumns().map(column => {
                        return (
                          <MenuItem key={Math.random()} value={column}>
                            {column}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <FormControl
                    required
                    className={classes.formControlChartDataSource}
                  >
                    <InputLabel id="column-list">Graph Plot Type</InputLabel>
                    <Select
                      labelId="columns-select-required-yaxis"
                      id="columns-select-required"
                      value={graphPlotType}
                      onChange={evt => onGraphPlotTypeSelect(evt)}
                      className={classes.selectEmpty}
                      label={"Select Plot Type"}
                      input={<Input />}
                      MenuProps={MenuProps}
                    >
                      {getPlotChartType().map(column => {
                        return (
                          <MenuItem key={Math.random()} value={column}>
                            {column}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
              )}
            <Grid container alignItems="flex-start" spacing={1}>
              <Grid item={true} xs={12}>
                <FormControl
                  required
                  className={classes.formControlChartDataSource}
                >
                  <InputLabel id="column-list">Date Selection</InputLabel>
                  <Select
                    labelId="date-selection-required"
                    id="date-selection-required"
                    value={dateSelection}
                    onChange={evt => handleDateSelectionChange(evt)}
                    className={classes.selectEmpty}
                    label={"Select Date Range"}
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
              </Grid>
              {dateSelection === "Range" && (
                <>
                  <Grid item={true} md={6} sm={6} xs={12}>
                    <FormControl
                      required
                      className={classes.formControlChartDataSource}
                    >
                      <TextField
                        id="date"
                        label="Start date"
                        type="datetime-local"
                        value={startDate}
                        onChange={evt => {
                          setStartDate(evt.target.value);
                        }}
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item={true} xs={12} sm={6} md={6}>
                    <FormControl
                      required
                      className={classes.formControlChartDataSource}
                    >
                      <TextField
                        id="date"
                        label="End date"
                        type="datetime-local"
                        value={endDate}
                        onChange={evt => setEndDate(evt.target.value)}
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                    </FormControl>
                  </Grid>
                </>
              )}
            </Grid>
            <Grid item={true} xs={12} className={classes.fetchButton}>
              <Button
                size="small"
                variant="contained"
                onClick={onFetchClickHandler}
                color="primary"
                disabled={!isAdmin}
              >
                Fetch
              </Button>
            </Grid>
          </Grid>
        ) : selectedWidgetInfo &&
          selectedWidgetInfo.group === Constants.widgets.IMAGE.group ? (
          <Grid item={true} xs={12}>
            <Grid container alignItems="flex-start" spacing={1}>
              <FormControl
                required
                className={classes.formControlChartDataSource}
              >
                <TextField
                  value={title}
                  required
                  id="standard-required-title"
                  onChange={evt => setTitle(evt.target.value)}
                  label="Title"
                  defaultValue=""
                />
                <FormHelperText>Required</FormHelperText>
              </FormControl>

              <FormControl className={classes.formControlChartDataSource}>
                <ColorPicker
                  name="color"
                  defaultValue="#000"
                  label="Background color"
                  value={backgroundColor}
                  onChange={onColorChange}
                />
              </FormControl>

              <FormControl className={classes.formControlChartDataSource}>
                <ColorPicker
                  name="color"
                  defaultValue="#000"
                  label="Label Header Text color"
                  value={lableHeaderColor}
                  onChange={onLabelHeaderColorChange}
                  id="headerLabelColor"
                />
              </FormControl>

              <FormControl
                required
                className={classes.formControlChartDataSource}
              >
                <TextField
                  value={dataPath}
                  required
                  id="standard-required-datapath"
                  onChange={evt => setDataPath(evt.target.value)}
                  label="Data path"
                  defaultValue=""
                />
                <FormHelperText>Required</FormHelperText>
              </FormControl>
              <FormControl
                required
                className={classes.formControlChartDataSource}
              >
                <TextField
                  value={heatDesc}
                  required
                  id="standard-required-datapath"
                  onChange={evt => setHeatDesc(evt.target.value)}
                  label="Description"
                  defaultValue=""
                />
                <FormHelperText>Required</FormHelperText>
              </FormControl>
              <FormControl
                required
                className={classes.formControlChartDataSource}
              >
                <InputLabel id="datasource-list">Datasource</InputLabel>
                <Select
                  labelId="datasource-select-required-label"
                  id="datasource-select-required"
                  // value={selectedDataSource}
                  value={selectedDataSourceValue}
                  onChange={handleDataSourceSelection}
                  className={classes.selectEmpty}
                  label={"Select Datasource"}
                >
                  {dataSources.map(dataSource => {
                    return (
                      <MenuItem
                        key={dataSource.datasourceid}
                        value={dataSource.datasourceid}
                        data-my-source={JSON.stringify(dataSource)}
                      >
                        {dataSource.name}
                      </MenuItem>
                    );
                  })}
                </Select>
                <FormHelperText>Required</FormHelperText>
              </FormControl>
              <FormControl
                required
                className={classes.formControlChartDataSource}
              >
                <TextField
                  value={dataSourceEndPoint}
                  required
                  id="standard-required-datapath"
                  onChange={evt => setDataSourceEndPoint(evt.target.value)}
                  label="Data Source End point"
                  defaultValue=""
                  disabled={!isAdmin}
                />
                <FormHelperText>Required</FormHelperText>
              </FormControl>

              {(imgChartType &&  imgChartType != 'svg') ? (
              <>
              <Grid item={true} xs={12}>
                <Button
                  size="small"
                  variant="contained"
                  onClick={onFetchClickHandler}
                  color="primary"
                >
                  Fetch
                </Button>
              </Grid>

              {dataPath && (
                <Grid item={true} md={6} sm={6} xs={12}>
                  <FormControl
                    required
                    className={classes.formControlChartDataSource}
                  >
                    <Typography id="discrete-slider-small-steps" gutterBottom>
                      Opacity
                    </Typography>
                    <Slider
                      defaultValue={0.1}
                      value={imageOpacity}
                      onChange={changeOpacityHandler}
                      aria-labelledby="discrete-slider-small-steps"
                      step={0.1}
                      marks
                      min={0.0}
                      max={1.0}
                      valueLabelDisplay="auto"
                    />
                  </FormControl>
                </Grid>
              )}

              <Grid item={true} xs={12}>
                <Grid container direction="row">
                  {imagesList.map(img => {
                    var ext = img.split(".").pop();
                    if (ext === "jpg" || ext === "png" || ext === "jpeg") {
                      return (
                        <Grid
                          item
                          style={{
                            position: "relative",
                            margin: 5
                          }}
                          xs={1}
                        >
                          <img
                            src={img}
                            alt={img}
                            style={{
                              width: "100%",
                              height: "100%"
                            }}
                            onClick={() => setSelectedImage(img)}
                          />
                          {selectedImage && selectedImage === img && (
                            <CheckCircleIcon
                              style={{
                                position: "absolute",
                                top: 0,
                                right: 0,
                                color: "green"
                              }}
                            />
                          )}
                        </Grid>
                      );
                    }
                    return null;
                  })}
                </Grid>
              </Grid>

              <Grid item={true} xs={12}>
                <Fab
                  variant="extended"
                  size="small"
                  color="secondary"
                  aria-label="add"
                  className={classes.addTableInfoMargin}
                  onClick={onSelectDynamicContent}
                  disabled={false}
                >
                  <AddIcon className={classes.addTableInfoIcon} />
                  Add Dynamic Content
                </Fab>
              </Grid>

              {selectedDynamicContent.map((field, idx) => {
                return (
                  <div key={`${field}-${idx}`}>
                    <FormControl
                      required
                      className={classes.formControlChartDataSource}
                    >
                      <TextField
                        value={field.value}
                        required
                        id="standard-basic"
                        label="Text Name"
                        defaultValue=""
                        onChange={evt => onTableInfoChange(idx, evt)}
                        disabled={!isAdmin}
                      />
                    </FormControl>
                    <FormControl
                      required
                      className={classes.formControlChartDataSource}
                    >
                      <TextField
                        value={field.link}
                        id="link"
                        onChange={evt => setDynamicLinkOnMultiple(idx, evt)}
                        label="Link"
                        defaultValue=""
                      />
                    </FormControl>

                    <FormControl
                      required
                      className={classes.formControlChartDataSource}
                    >
                      <TextField
                        value={field.icon}
                        id="icon"
                        onChange={evt => setDynamicIconOnMultiple(idx, evt)}
                        label="Icon"
                        defaultValue=""
                      />

                      {/* <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={field.icon}
                          onChange={evt => setDynamicIconOnMultiple(idx, evt)}
                        >
                          {allIcons.map(item => {
                            return (
                              <MenuItem key={Math.random()} value={item}>
                                {item}
                              </MenuItem>
                            );
                          })}
                        </Select> */}
                    </FormControl>

                    <FormControl
                      required
                      className={classes.formControlTableColumn}
                    >
                      <DeleteIcon onClick={() => onRemoveDynamicData(idx)} />
                    </FormControl>
                  </div>
                );
              })}

              <Grid item={true} xs={12}>
                <Fab
                  variant="extended"
                  size="small"
                  color="secondary"
                  aria-label="add"
                  className={classes.addTableInfoMargin}
                  onClick={onAddTableInfoClickHandler}
                  disabled={false}
                >
                  <AddIcon className={classes.addTableInfoIcon} />
                  Add Metrics
                </Fab>
              </Grid>

              {tables.map((table, index) => (
                <AddTableInfo
                  table={table}
                  key={index}
                  onRemove={onRemoveTableInfoClickHandler}
                />
              ))}

              <Grid item={true} xs={12} alignContent="center">
                <Button
                  variant="contained"
                  component="span"
                  onClick={() => uploadImage()}
                  size="large"
                >
                  <PublishIcon />
                </Button>
              </Grid>
              </>
              ) : 
                <>
                  <FormControl
                      required
                      className={classes.formControlChartDataSource}
                    >
                      <TextField
                        value={dataSourceEndPoint}
                        required
                        id="standard-required-token"
                        onChange={evt => setSvgToken(evt.target.value)}
                        label="SVG Token"
                        defaultValue=""
                        disabled={!isAdmin}
                      />
                      <FormHelperText>Required</FormHelperText>
                  </FormControl>

                  <FormControl
                  required
                  className={classes.formControlChartDataSource}
                >
                  <InputLabel id="refresh-intervals-list">
                    Refresh Interval
                  </InputLabel>
                  <Select
                    labelId="refresh-interval-select-required-label"
                    id="refresh-interval-required"
                    value={refreshInterval ? refreshInterval : null}
                    onChange={onRefreshIntervalChange}
                    className={classes.selectEmpty}
                    label={"Refresh Interval"}
                    disabled={!isAdmin}
                  >
                    {intervals.map(interval => {
                      return <MenuItem value={interval}>{interval}</MenuItem>;
                    })}
                  </Select>
                  <FormHelperText>Required</FormHelperText>
                </FormControl>
                
                  <Grid item={true} xs={12} alignContent="center">
                    <label htmlFor="upload-photo">
                      <input
                        hidden
                        id="upload-photo"
                        name="upload-photo"
                        type="file"
                        onChange={onSVGImageUpload}
                      />

                      <Fab
                        color="secondary"
                        size="small"
                        component="span"
                        aria-label="add"
                        variant="extended"
                      >
                        <AddIcon /> Upload Image
                      </Fab>
                    </label>
                  </Grid>

                  {svgBlobsImages && (
                    <Grid item={true} xs={12}>
                      <Grid container direction="row">
                        {svgBlobsImages.map(img => {
                          var ext = img.split(".").pop();
                          if (ext === "svg") {
                            return (
                              <Grid
                                item
                                style={{
                                  position: "relative",
                                  margin: 5
                                }}
                                xs={1}
                              >
                                <img
                                  src={img}
                                  alt={img}
                                  style={{
                                    width: "100%",
                                    height: "100%"
                                  }}
                                  onClick={() => setSelectedImage(img)}
                                />
                                {selectedImage && selectedImage === img && (
                                  <CheckCircleIcon
                                    style={{
                                      position: "absolute",
                                      top: 0,
                                      right: 0,
                                      color: "green"
                                    }}
                                  />
                                )}
                              </Grid>
                            );
                          }
                          return null;
                        })}
                      </Grid>
                    </Grid>
                  )}
                 
                </>
              }
            </Grid>
          </Grid>
        ) : selectedWidgetInfo &&
          selectedWidgetInfo.group === Constants.widgets.HEATMAP.group ? (
          <Grid container item={true} xs={12}>
            <Grid container xs={12} alignItems="flex-start" spacing={1}>
              <FormControl
                required
                className={classes.formControlChartDataSource}
              >
                <TextField
                  value={title}
                  required
                  id="standard-required-title"
                  onChange={evt => setTitle(evt.target.value)}
                  label="Device Name"
                  defaultValue=""
                />
                <FormHelperText>Required</FormHelperText>
              </FormControl>

              <FormControl className={classes.formControlChartDataSource}>
                <ColorPicker
                  name="color"
                  defaultValue="#000"
                  label="Background color"
                  value={backgroundColor}
                  onChange={onColorChange}
                />
              </FormControl>
              <FormControl
                required
                className={classes.formControlChartDataSource}
              >
                <TextField
                  value={heatDeviceId}
                  required
                  id="standard-required-units"
                  onChange={evt => setHeatDeviceId(evt.target.value)}
                  label="Device Id"
                  defaultValue=""
                />
                <FormHelperText>Required</FormHelperText>
              </FormControl>
              <FormControl
                required
                className={classes.formControlChartDataSource}
              >
                <InputLabel id="datasource-list">Datasource</InputLabel>
                <Select
                  labelId="datasource-select-required-label"
                  id="datasource-select-required"
                  // value={selectedDataSource}
                  value={selectedDataSourceValue}
                  onChange={handleDataSourceSelection}
                  className={classes.selectEmpty}
                  label={"Select Datasource"}
                >
                  {dataSources.map(dataSource => {
                    return (
                      <MenuItem
                        key={dataSource.datasourceid}
                        value={dataSource.datasourceid}
                        data-my-source={JSON.stringify(dataSource)}
                      >
                        {dataSource.name}
                      </MenuItem>
                    );
                  })}
                </Select>
                <FormHelperText>Required</FormHelperText>
              </FormControl>
              <FormControl
                required
                className={classes.formControlChartDataSource}
              >
                <TextField
                  value={dataSourceEndPoint}
                  required
                  id="standard-required-datapath"
                  onChange={evt => setDataSourceEndPoint(evt.target.value)}
                  label="Data Source End point"
                  defaultValue=""
                  disabled={!isAdmin}
                />
                <FormHelperText>Required</FormHelperText>
              </FormControl>
              <FormControl
                required
                className={classes.formControlChartDataSource}
              >
                <TextField
                  value={dataPath}
                  required
                  id="standard-required-datapath"
                  onChange={evt => setDataPath(evt.target.value)}
                  label="Data path"
                  defaultValue=""
                />
                <FormHelperText>Required</FormHelperText>
              </FormControl>
              <FormControl
                required
                className={classes.formControlChartDataSource}
              >
                <TextField
                  value={heatDesc}
                  required
                  id="standard-required-datapath"
                  onChange={evt => setHeatDesc(evt.target.value)}
                  label="Description"
                  defaultValue=""
                />
                <FormHelperText>Required</FormHelperText>
              </FormControl>
              <FormControl
                required
                className={classes.formControlChartDataSource}
              >
                <TextField
                  value={source}
                  required
                  id="standard-required-source"
                  onChange={evt => setSource(evt.target.value)}
                  label="Source"
                  defaultValue=""
                />
                <FormHelperText>Required</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item={true} xs={12}>
              <Fab
                variant="extended"
                size="small"
                color="secondary"
                aria-label="add"
                className={classes.addTableInfoMargin}
                onClick={onAddTableInfoClickHandler}
                disabled={false}
              >
                <AddIcon className={classes.addTableInfoIcon} />
                Add Metrics
              </Fab>
            </Grid>
            {tables.map((table, index) => (
              <AddTableInfo
                table={table}
                key={index}
                onRemove={onRemoveTableInfoClickHandler}
              />
            ))}
            <Grid xs={12}>
              <FormControl
                required
                className={classes.formControlChartDataSource}
              >
                <InputLabel id="column-list">X-Axis</InputLabel>
                <Select
                  labelId="filter-select-required-label"
                  id="filter-select-required"
                  multiple
                  value={selectedHeatXAxis}
                  onChange={evt => onFilterMultiSelectChange(evt, "HeatXAxis")}
                  className={classes.selectEmpty}
                  label={"Select X-Axis"}
                  input={<Input />}
                  MenuProps={MenuProps}
                  renderValue={selected => selected.join(", ")}
                >
                  {xAxisArr &&
                    xAxisArr.map(column => {
                      return (
                        <MenuItem key={Math.random()} value={column}>
                          <Checkbox
                            checked={selectedHeatXAxis.indexOf(column) > -1}
                          />
                          <ListItemText primary={column} />
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
              <FormControl
                required
                className={classes.formControlChartDataSource}
              >
                <InputLabel id="column-list">Y-Axis</InputLabel>
                <Select
                  labelId="filter-select-required-label"
                  id="filter-select-required"
                  multiple
                  value={selectedHeatYAxis}
                  onChange={evt => onFilterMultiSelectChange(evt, "HeatYAxis")}
                  className={classes.selectEmpty}
                  label={"Select Y-Axis"}
                  input={<Input />}
                  MenuProps={MenuProps}
                  renderValue={selected => selected.join(", ")}
                >
                  {yAxisArr &&
                    yAxisArr.map(column => {
                      return (
                        <MenuItem key={Math.random()} value={column}>
                          <Checkbox
                            checked={selectedHeatYAxis.indexOf(column) > -1}
                          />
                          <ListItemText primary={column} />
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </Grid>
            <Grid container alignItems="flex-start" spacing={1}>
              <Grid item={true} xs={12}>
                <FormControl
                  required
                  className={classes.formControlChartDataSource}
                >
                  <InputLabel id="column-list">Date Selection</InputLabel>
                  <Select
                    labelId="date-selection-required"
                    id="date-selection-required"
                    value={dateSelection}
                    onChange={evt => handleDateSelectionChange(evt)}
                    className={classes.selectEmpty}
                    label={"Select Date Range"}
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
              </Grid>
              {dateSelection === "Range" && (
                <>
                  <Grid item={true} xs={12} sm={5} md={5}>
                    <FormControl
                      required
                      className={classes.formControlChartDataSource}
                    >
                      <TextField
                        id="date"
                        label="Start date"
                        type="datetime-local"
                        value={startDate}
                        //defaultValue="2017-05-24"
                        onChange={evt => setStartDate(evt.target.value)}
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item={true} xs={12} md={5} sm={5}>
                    <FormControl
                      required
                      className={classes.formControlChartDataSource}
                    >
                      <TextField
                        id="date"
                        label="End date"
                        type="datetime-local"
                        value={endDate}
                        //defaultValue="2017-05-24"
                        //className={classes.textField}
                        onChange={evt => setEndDate(evt.target.value)}
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                    </FormControl>
                  </Grid>
                </>
              )}
            </Grid>
            <Grid item={true} xs={12}>
              <Button
                size="small"
                variant="contained"
                onClick={onFetchClickHandler}
                color="primary"
              >
                Fetch
              </Button>
            </Grid>
          </Grid>
        ) : selectedWidgetInfo &&
          selectedWidgetInfo.group === Constants.widgets.GOOGLEMAP.group ? (
          <Grid item={true} xs={12}>
            <FormControl
              required
              className={classes.formControlChartDataSource}
            >
              <TextField
                value={title}
                required
                id="standard-required-title"
                onChange={evt => setTitle(evt.target.value)}
                label="Device Name"
                defaultValue=""
              />
              <FormHelperText>Required</FormHelperText>
            </FormControl>

            <FormControl className={classes.formControlChartDataSource}>
              <ColorPicker
                name="color"
                defaultValue="#000"
                label="Background color"
                value={backgroundColor}
                onChange={onColorChange}
              />
            </FormControl>
            <Grid container spacing={2}>
              <Grid item={true} xs={12} md={6} sm={6}>
                <FormControl className={classes.formControlChartDataSource}>
                  <TextField
                    value={googleAddress}
                    required
                    id="standard-required-title"
                    onChange={evt => setGoogleAddress(evt.target.value)}
                    label="Google Address"
                    defaultValue=""
                    multiline
                  />
                  <FormHelperText>Required</FormHelperText>
                </FormControl>
                <Button
                  size="small"
                  variant="contained"
                  onClick={fetchLatLong}
                  color="primary"
                >
                  Fetch
                </Button>
              </Grid>
              <Grid item={true} xs={12} md={6} sm={6}>
                <MapContainer
                  latLong={googleLatLong}
                  width={400}
                  height={200}
                />
              </Grid>
            </Grid>
          </Grid>
        ) : selectedWidgetInfo &&
          selectedWidgetInfo.group === Constants.widgets.GOOGLEMAP.group ? (
          <Grid item={true} xs={12}>
            <FormControl
              required
              className={classes.formControlChartDataSource}
            >
              <TextField
                value={title}
                required
                id="standard-required-title"
                onChange={evt => setTitle(evt.target.value)}
                label="Device Name"
                defaultValue=""
              />
              <FormHelperText>Required</FormHelperText>
            </FormControl>

            <FormControl className={classes.formControlChartDataSource}>
              <ColorPicker
                name="color"
                defaultValue="#000"
                label="Background color"
                value={backgroundColor}
                onChange={onColorChange}
              />
            </FormControl>
            <Grid container spacing={2}>
              <Grid item={true} xs={12} md={6} sm={6}>
                <FormControl className={classes.formControlChartDataSource}>
                  <TextField
                    value={googleAddress}
                    required
                    id="standard-required-title"
                    onChange={evt => setGoogleAddress(evt.target.value)}
                    label="Google Address"
                    defaultValue=""
                    multiline
                  />
                  <FormHelperText>Required</FormHelperText>
                </FormControl>
                <Button
                  size="small"
                  variant="contained"
                  onClick={fetchLatLong}
                  color="primary"
                >
                  Fetch
                </Button>
              </Grid>
              <Grid item={true} xs={12} md={6} sm={6}>
                <MapContainer
                  latLong={googleLatLong}
                  width={400}
                  height={200}
                />
              </Grid>
            </Grid>
          </Grid>
        ) : selectedWidgetInfo &&
          selectedWidgetInfo.group ===
            Constants.widgets.MAPLABELREDIRECT.group ? (
          <>
            <Grid item={true} xs={12}>
              <FormControl
                required
                className={classes.formControlChartDataSource}
              >
                <TextField
                  value={title}
                  required
                  id="standard-required-title"
                  onChange={evt => setTitle(evt.target.value)}
                  label="Title"
                  defaultValue=""
                />
                <FormHelperText>Required</FormHelperText>
              </FormControl>

              <FormControl className={classes.formControlChartDataSource}>
                <ColorPicker
                  name="color"
                  defaultValue="#000"
                  label="Background color"
                  value={backgroundColor}
                  onChange={onColorChange}
                />
              </FormControl>

              <FormControl className={classes.formControlChartDataSource}>
                <ColorPicker
                  name="color"
                  defaultValue="#000"
                  label="Label Text color"
                  value={labelTextColor}
                  onChange={onLabelColorChange}
                  id="labelColor"
                />
              </FormControl>

              <Grid container spacing={2}>
                <Grid item={true} xs={12} md={6} sm={6}>
                  <FormControl className={classes.formControlChartDataSource}>
                    <TextField
                      value={googleAddress}
                      required
                      id="standard-required-title"
                      onChange={evt => setGoogleAddress(evt.target.value)}
                      label="Google Address"
                      defaultValue=""
                      multiline
                    />
                    <FormHelperText>Required</FormHelperText>
                  </FormControl>
                  <FormControl
                    required
                    className={classes.formControlChartDataSource}
                  >
                    <InputLabel id="datasource-list">Datasource</InputLabel>
                    <Select
                      labelId="datasource-select-required-label"
                      id="datasource-select-required"
                      //value={selectedDataSource}
                      value={selectedDataSourceValue}
                      onChange={handleDataSourceSelection}
                      className={classes.selectEmpty}
                      label={"Select Datasource"}
                      disabled={!isAdmin}
                    >
                      {dataSources.map(dataSource => {
                        return (
                          <MenuItem
                            key={dataSource.datasourceid}
                            value={dataSource.datasourceid}
                            data-my-source={JSON.stringify(dataSource)}
                          >
                            {dataSource.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText>Required</FormHelperText>
                  </FormControl>

                  <FormControl
                    required
                    className={classes.formControlChartDataSource}
                  >
                    <TextField
                      value={link}
                      id="link"
                      onChange={evt => setLink(evt.target.value)}
                      label="Link"
                      defaultValue=""
                    />
                  </FormControl>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={fetchLatLong}
                    color="primary"
                  >
                    Fetch
                  </Button>
                </Grid>
                <Grid item={true} xs={12} md={6} sm={6}>
                  <MapContainer
                    latLong={googleLatLong}
                    width={400}
                    height={200}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item={true} xs={12}>
              <FormControl
                required
                className={classes.formControlChartDataSource}
              >
                <TextField
                  value={imageDataPath}
                  required
                  id="standard-required-image-datapath"
                  onChange={evt => setImageDataPath(evt.target.value)}
                  label="Image Data path"
                  defaultValue=""
                  disabled={!isAdmin}
                />
                <FormHelperText>Required</FormHelperText>
              </FormControl>

              {imageDataPath && (
                <Fab
                  variant="extended"
                  size="small"
                  color="secondary"
                  aria-label="add"
                  className={`${classes.addMarginBotton} ${classes.addMarginBotton}`}
                  onClick={onFetchImageClickHandler}
                >
                  Load Image
                </Fab>
              )}
            </Grid>
            {imageDataPath && (
              <Grid item={true} xs={12} md={6} sm={6}>
                <FormControl
                  required
                  className={classes.formControlChartDataSource}
                >
                  <Typography id="discrete-slider-small-steps" gutterBottom>
                    Opacity
                  </Typography>
                  <Slider
                    defaultValue={0.1}
                    value={imageOpacity}
                    onChange={changeOpacityHandler}
                    aria-labelledby="discrete-slider-small-steps"
                    step={0.1}
                    marks
                    min={0.0}
                    max={1.0}
                    valueLabelDisplay="auto"
                  />
                </FormControl>
              </Grid>
            )}

            {imageDataPath && (
              <Grid item={true} xs={12}>
                <Grid container direction="row">
                  {imagesList.map(img => {
                    var ext = img.split(".").pop();
                    if (ext === "jpg" || ext === "png" || ext === "jpeg") {
                      return (
                        <Grid
                          item
                          style={{
                            position: "relative",
                            margin: 5
                          }}
                          xs={1}
                        >
                          <img
                            src={img}
                            alt={img}
                            style={{
                              width: "100%",
                              height: "100%"
                            }}
                            onClick={() => setSelectedImage(img)}
                          />
                          {selectedImage && selectedImage === img && (
                            <CheckCircleIcon
                              style={{
                                position: "absolute",
                                top: 0,
                                right: 0,
                                color: "green"
                              }}
                            />
                          )}
                        </Grid>
                      );
                    }
                    return null;
                  })}
                </Grid>
              </Grid>
            )}
          </>
        ) : selectedWidgetInfo &&
          selectedWidgetInfo.group ===
            Constants.widgets.MAPLABELREDIRECT.group ? (
          <Grid item={true} xs={12}>
            <FormControl
              required
              className={classes.formControlChartDataSource}
            >
              <TextField
                value={title}
                required
                id="standard-required-title"
                onChange={evt => setTitle(evt.target.value)}
                label="Device Name"
                defaultValue=""
              />
              <FormHelperText>Required</FormHelperText>
            </FormControl>

            <FormControl className={classes.formControlChartDataSource}>
              <ColorPicker
                name="color"
                defaultValue="#000"
                label="Background color"
                value={backgroundColor}
                onChange={onColorChange}
              />
            </FormControl>
            <Grid container spacing={2}>
              <Grid item={true} xs={12} md={6} sm={6}>
                <FormControl className={classes.formControlChartDataSource}>
                  <TextField
                    value={googleAddress}
                    required
                    id="standard-required-title"
                    onChange={evt => setGoogleAddress(evt.target.value)}
                    label="Google Address"
                    defaultValue=""
                    multiline
                  />
                  <FormHelperText>Required</FormHelperText>
                </FormControl>
                <Button
                  size="small"
                  variant="contained"
                  onClick={fetchLatLong}
                  color="primary"
                >
                  Fetch
                </Button>
              </Grid>
              <Grid item={true} xs={12} md={6} sm={6}>
                <MapContainer
                  latLong={googleLatLong}
                  width={400}
                  height={200}
                />
              </Grid>
            </Grid>
          </Grid>
        ) : selectedWidgetInfo &&
          selectedWidgetInfo.group === Constants.widgets.LABELURL.group ? (
          <Grid item={true} xs={12}>
            <FormControl
              required
              className={classes.formControlChartDataSource}
            >
              <TextField
                value={title}
                required
                id="standard-required-title"
                onChange={evt => setTitle(evt.target.value)}
                label="Title"
                defaultValue=""
              />
              <FormHelperText>Required</FormHelperText>
            </FormControl>
            <FormControl className={classes.formControlChartDataSource}>
              <ColorPicker
                name="color"
                defaultValue="#000"
                label="Background color"
                value={backgroundColor}
                onChange={onColorChange}
              />
            </FormControl>

            <FormControl className={classes.formControlChartDataSource}>
              <ColorPicker
                name="color"
                defaultValue="#000"
                label="Label Text color"
                value={labelTextColor}
                onChange={onLabelColorChange}
                id="labelColor"
              />
            </FormControl>

            <FormControl
              required
              className={classes.formControlChartDataSource}
            >
              <InputLabel id="datasource-list">Datasource</InputLabel>
              <Select
                labelId="datasource-select-required-label"
                id="datasource-select-required"
                value={selectedDataSourceValue}
                onChange={handleDataSourceSelection}
                className={classes.selectEmpty}
                label={"Select Datasource"}
                disabled={!isAdmin}
              >
                {dataSources.map(dataSource => {
                  return (
                    <MenuItem
                      key={dataSource.datasourceid}
                      value={dataSource.datasourceid}
                      data-my-source={JSON.stringify(dataSource)}
                    >
                      {dataSource.name}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>
            <FormControl
              required
              className={classes.formControlChartDataSource}
            >
              <TextField
                value={link}
                id="link"
                onChange={evt => setLink(evt.target.value)}
                label="Link"
                defaultValue=""
              />
            </FormControl>

            <Grid container spacing={2}>
              <Grid item={true} xs={12}>
                <>
                  <FormControl
                    required
                    className={classes.formControlChartDataSource}
                  >
                    <TextField
                      value={imageDataPath}
                      required
                      id="standard-required-image-datapath"
                      onChange={evt => setImageDataPath(evt.target.value)}
                      label="Image Data path"
                      defaultValue=""
                      disabled={!isAdmin}
                    />
                    <FormHelperText>Required</FormHelperText>
                  </FormControl>

                  {imageDataPath && (
                    <Fab
                      variant="extended"
                      size="small"
                      color="secondary"
                      aria-label="add"
                      className={`${classes.addTableInfoMargin} ${classes.addLoadedImageButton}`}
                      onClick={onFetchImageClickHandler}
                    >
                      Load Image
                    </Fab>
                  )}

                  {imageDataPath && (
                    <Grid item={true} xs={12} md={6} sm={6}>
                      <FormControl
                        required
                        className={classes.formControlChartDataSource}
                      >
                        <Typography
                          id="discrete-slider-small-steps"
                          gutterBottom
                        >
                          Opacity
                        </Typography>
                        <Slider
                          defaultValue={0.1}
                          value={imageOpacity}
                          onChange={changeOpacityHandler}
                          aria-labelledby="discrete-slider-small-steps"
                          step={0.1}
                          marks
                          min={0.0}
                          max={1.0}
                          valueLabelDisplay="auto"
                        />
                      </FormControl>
                    </Grid>
                  )}

                  <Grid item={true} xs={12}>
                    <Grid container direction="row">
                      {imagesList.map(img => {
                        var ext = img.split(".").pop();
                        if (ext === "jpg" || ext === "png" || ext === "jpeg") {
                          return (
                            <Grid
                              item
                              style={{
                                position: "relative",
                                margin: 5
                              }}
                              xs={1}
                            >
                              <img
                                src={img}
                                alt={img}
                                style={{
                                  width: "100%",
                                  height: "100%"
                                }}
                                onClick={() => setSelectedImage(img)}
                              />
                              {selectedImage && selectedImage === img && (
                                <CheckCircleIcon
                                  style={{
                                    position: "absolute",
                                    top: 0,
                                    right: 0,
                                    color: "green"
                                  }}
                                />
                              )}
                            </Grid>
                          );
                        }
                        return null;
                      })}
                    </Grid>
                  </Grid>
                </>
              </Grid>
            </Grid>
            </Grid>
       
       ) : (
          <Grid item={true} xs={12}></Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          size="small"
          variant="contained"
          onClick={onSaveChangeClickHandler}
          color="primary"
        >
          Save changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WidgetConfigDialog;
