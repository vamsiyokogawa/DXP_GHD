import React, { useState, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from "@material-ui/core/Radio";
import ListItemText from "@material-ui/core/ListItemText";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import { Select, Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import DeleteIcon from "@material-ui/icons/Delete";
import _ from "lodash";
import ColorPicker from "material-ui-color-picker";
import * as Constants from "./../../../constants/Constants";
import DoneIcon from "@material-ui/icons/Done";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
    width: "100%",
    [theme.breakpoints.down(767)]: {
      minWidth: "100%"
    },
    [theme.breakpoints.up("md")]: {
      minWidth: "46%"
    },
    [theme.breakpoints.up("lg")]: {
      minWidth: 150
    }
  },
  formControlChartDataSource: {
    margin: theme.spacing(1),
    minWidth: 350,
    [theme.breakpoints.down("sm")]: {
      minWidth: "100%"
    },
    [theme.breakpoints.up("md")]: {
      minWidth: "100%"
    },
    [theme.breakpoints.up("lg")]: {
      minWidth: 350,
      maxWidth: "100%"
    }
  },
  formControlTableColumn: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
    width: "100%"
  },
  formControlTableFilter: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  gridContainer: {
    width: 500
  },
  addTableInfoMargin: {
    //margin: theme.spacing(1),
  },
  addTableInfoIcon: {
    //marginRight: theme.spacing(1),
  },
  fileBtnIcon: {
    minWidth: "30px !important",
    backgroundColor: theme.palette.bg.buttonPrimary
  }
}));

const AddTableInfo = props => {
  const { table, onRemove, onSort, sortingObj, onUpdateValue } = props;
  const classes = useStyles();

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

  const isAdmin = useSelector(state => state.loginReducer.isAdmin);
  const [selectedColumn, setSelectedColumn] = useState(table.selectedColumn);
  const [selectedGridColumns, setSelectedGridColumns] = useState(
    table.selectedGridColumns
  );
  const [selectedFilters, setSelectedFilters] = useState(table.selectedFilters);
  const [selectedTableName, setSelectedTableName] = useState(table.tableName);
  const [selectedUnitName, setSelectedUnitName] = useState(table.unitName);
  const [selectedScatterUnitName, setSelectedScatterUnitName] = useState(
    table.scatterUnitName
  );
  const [selectedTextName, setSelectedTextName] = useState(table.text);
  const [selectedColor, setSelectedColor] = useState(table.color);
  const [selectedScatterColor, setSelectedScatterColor] = useState(table.scatterColor);
  // const [selectedColumnAlign, setSelectedAlign] = useState(table.selectedColumnAlign);
  const [multipleYaxisPlotType, setMultipleYaxisPlotType] = useState(
    table.multipleYaxisPlotType
  );
  const [lineChartType, setLineChartType] = useState(table.lineChartType);
  const [updateState, setUpdateState] = useState(false);

  const getStringArray2 = stringArray => {
    stringArray = stringArray.map(function(item) {
      return item["Type"];
    });
    return stringArray;
  };

  const onColumnMultiSelectChange = event => {
    setSelectedColumn(event.target.value);
    table.selectedColumn = event.target.value;
    if (table.Metrics) {
      table.filters = getStringArray2(table.Metrics[event.target.value]);
    }
  };

  const onFilterMultiSelectChange = event => {
    setSelectedFilters(event.target.value);
    table.selectedFilters = event.target.value;
  };

  const onGridColumnFilterMultiSelectChange = event => {
    setSelectedGridColumns(event.target.value);
    table.selectedGridColumns = event.target.value;
  };

  const onTableInfoChange = event => {
    setSelectedTableName(event.target.value);
    table.tableName = event.target.value;
  };

  const onTableTextInfoChange = event => {
    setSelectedTextName(event.target.value);
    table.text = event.target.value;
  };

  const onTableUnitChange = event => {
    setSelectedUnitName(event.target.value);
    table.unitName = event.target.value;
  };

  const onTableScatterUnitChange = event => {
    setSelectedScatterUnitName(event.target.value);
    table.scatterUnitName = event.target.value;
  };

  const onColorChange = color => {
    setSelectedColor(color);
    table.color = color;
  };

  const onScatterColorChange = color => {
    setSelectedScatterColor(color);
    table.scatterColor = color;
  };


  const getMultipleYAxisPlotType = () => {
    return [
      Constants.Multiple_Yaxis_Plot_Type.YAxis_left,
      Constants.Multiple_Yaxis_Plot_Type.YAxis_right
    ];
  };

  const onMultipleYaxisPlotTypeSelect = event => {
    setMultipleYaxisPlotType(event.target.value);
    table.multipleYaxisPlotType = event.target.value;
  };

  const getLineChartType = () => {
    return [
      Constants.Line_Chart_Type.spline,
      Constants.Line_Chart_Type.column,
      Constants.Line_Chart_Type.scatter
    ];
  };

  const onLineChartTypeSelect = event => {
    setLineChartType(event.target.value);
    table.lineChartType = event.target.value;
  };

  /**
   * Pie Chart Column Sudo name
   */
  const [columnSudoName, setColumnSudoName] = useState();
  const [selectedColumnSudoNames, setSelectedColumnSudoNames] = useState(
    table.selectedColumnSudoNames || []
  );
  const [selectedColumnAlign, setSelectedColumnAlign] = useState("");
  const [selectedColumnUnitName, setSelectedColumnUnitName] = useState("");
  const [selectedColumnColor, setSelectedColumnColor] = useState("");
  const [selectedColumnStyle, setSelectedColumnStyle] = useState("");

  const sortingObjField =
    sortingObj && sortingObj.field !== undefined ? sortingObj.field : "";
  const sortingObjSort =
    sortingObj && sortingObj.sort !== undefined ? sortingObj.sort : "";

  // const [selectedColumn2, setSelectedColumn2] = useState();
  const [selectedValue, setselectedValue] = useState(sortingObjField || "");
  const [sortType, setSortType] = useState("desc");

  const [stateOrder, setStateOrder] = useState(sortingObjSort || "");

  let defaultCheckData =
    typeof table.isDefault != "undefined" ? table.isDefault : true;
  const [defaultData, setDefaultData] = useState(defaultCheckData);

  const [isShowDatatableHeader, setShowDatatableHeader] = useState(false);
  const [axisPosition, setAxisPosition] = useState(table.axisPosition);

  if (selectedColumnSudoNames.length > 0) {
    selectedColumnSudoNames.map(column => {
      if (!column.align) {
        column.align = "left";   
      }

      return column;
    });
  }

  const getChartTypeOrder = () => {
    return [
      {
        key: Constants.Bar_Graph_Plot_Type_Order.Ascending,
        value: "asc"
      },
      {
        key: Constants.Bar_Graph_Plot_Type_Order.Descending,
        value: "desc"
      }
    ];
  };

  const getChartColumnAligns = () => {
    return [
      {
        key: Constants.COLUMN_ALIGNS.Center,
        value: "center"
      },
      {
        key: Constants.COLUMN_ALIGNS.Left,
        value: "left"
      },
      {
        key: Constants.COLUMN_ALIGNS.Right,
        value: "right"
      }
    ];
  };

  const onAlignSelectChange = (index, event) => {
    setSelectedColumnAlign(event.target.value);
    selectedColumnSudoNames[index].align = event.target.value;
    setSelectedColumnSudoNames(selectedColumnSudoNames);
  };

  const onUnitNameSelectChange = (index, event) => {
    setSelectedColumnUnitName(event.target.value);
    selectedColumnSudoNames[index].unitName = event.target.value;
    setSelectedColumnSudoNames(selectedColumnSudoNames);
  };

  const onColumnStyleChange = (index, event) => {
    setSelectedColumnStyle(event.target.value);
    selectedColumnSudoNames[index].style = event.target.value;
    setSelectedColumnSudoNames(selectedColumnSudoNames);
  };

  const onColumnColorSelectChange = (index, event) => {
    setSelectedColumnColor(event);
    selectedColumnSudoNames[index].color = event;
    setSelectedColumnSudoNames(selectedColumnSudoNames);
  };

  // const onHandleHeader = (index, event) => {
  //   console.log("eventtttt", event.target.checked);
  //   setShowDatatableHeader(event.target.checked);
  //   selectedColumnSudoNames[index].isShowColumnHeader = event.target.checked;
  //   setSelectedColumnSudoNames(selectedColumnSudoNames);
  // };

  const onTextFieldChange = (event, type) => {
    if (type == "columnSudoName") {
      setColumnSudoName(event.target.value);
      return;
    }
  };

  const onSubmit = () => {
    let ss = selectedColumnSudoNames;
    ss.push({
      key: selectedColumn,
      value: columnSudoName,
      unitName: "",
      align: "left",
      color: ""
    });
    setSelectedColumnSudoNames(ss);
    table.selectedColumnSudoNames = ss;
    setSelectedColumn("");
    setColumnSudoName("");
  };

  const onFilterChange = event => {
    setColumnSudoName("");
    setSelectedColumn(event.target.value);
  };

  const onDeleteSudoColumn = index => {
    let dd = selectedColumnSudoNames;
    dd.splice(index, 1);
    setSelectedColumnSudoNames(dd);
    let prevStatus = !updateState;
    setUpdateState(prevStatus);
  };

  const onSelectColumnFilter = event => {
    setselectedValue(event.target.value);
  };

  const onGridTypeOrderSelect = event => {
    setStateOrder(event.target.value);

    onSort({
      field: selectedValue,
      sort: event.target.value
    });
  };

  /**
   * Image Widget
   */
  const [selectedFile, setSelectedFile] = useState();
  const changeHandler = event => {
    setSelectedFile(event.target.files[0]);
    console.log(
      "FIle is  && " +
        (window.URL || window.webkitURL).createObjectURL(event.target.files[0])
    );

    setSelectedTableName(event.target.value);
    table.tableName = event.target.value;
  };

  // selectedColumnSudoNames.sort((a, b) => {
  //   const isReversed = sortType === "asc" ? 1 : -1;
  //   return isReversed * a.value.localeCompare(b.value);
  // });

  /**
   * Set Default For line Image
   */
  const defaultSelectionHandler = e => {
    setDefaultData(e.target.checked);
    table.isDefault = e.target.checked;
    onUpdateValue(table, "isDefault");
  };

  /**
   * Select X-Axis for Bar Chart
   */
  const onAxisSelectionHandler = e => {
    table.axisPosition = e.target.value;
    setAxisPosition(e.target.value);
  };

  return (
    <Grid container alignItems="center" spacing={1}>
      <Grid item={true} md={3} sm={3} xs={12}>
        <FormControl required className={classes.formControl}>
          <TextField
            value={selectedTableName}
            required
            id="standard-basic"
            label="Table Name"
            defaultValue=""
            onChange={evt => onTableInfoChange(evt)}
            disabled={!isAdmin}
          />
        </FormControl>
      </Grid>
      {/* <Grid item={true} xs={12}>
        <FormControl required className={classes.formControl}>
          <TextField
            value={selectedTextName}
            required
            id="standard-basic"
            label="Text Name"
            defaultValue=""
            onChange={evt => onTableTextInfoChange(evt)}
            disabled={!isAdmin}
          />

        </FormControl>
        </Grid> */}

      {/*_.isEqual(
                table.selectedWidgetInfo.type,
                Constants.widgets.GRID.type
            ) ? (
                <Grid item={true} xs={3}>
                    <FormControl
                        required
                        className={classes.formControlTableColumn}
                    >
                        <InputLabel id="grid-column-list">Columns</InputLabel>
                        <Select
                            labelId="grid-column-select-required-label"
                            id="grid-column-select-required"
                            multiple
                            value={selectedGridColumns}
                            onChange={(evt) =>
                                onGridColumnFilterMultiSelectChange(evt)
                            }
                            className={classes.selectEmpty}
                            label={"Select Filters"}
                            input={<Input />}
                            MenuProps={MenuProps}
                            renderValue={(selected) => selected.join(", ")}
                            disabled={!isAdmin}
                        >
                            {table.gridColumns.map((filter) => {
                                return (
                                    <MenuItem
                                        key={Math.random() + filter}
                                        value={filter}
                                    >
                                        <Checkbox
                                            checked={
                                                selectedGridColumns.indexOf(
                                                    filter
                                                ) > -1
                                            }
                                        />
                                        <ListItemText primary={filter} />
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </Grid>
            ) : */ !(
        _.isEqual(
          table.selectedWidgetInfo.type,
          Constants.widgets.LINE_CHART.type
        ) ||
        _.isEqual(
          table.selectedWidgetInfo.type,
          Constants.widgets.BAR_CHART.type
        ) ||
        _.isEqual(
          table.selectedWidgetInfo.type,
          Constants.widgets.HEATMAP.type
        ) ||
        _.isEqual(
          table.selectedWidgetInfo.type,
          Constants.widgets.MULTIPLE_AXES_CHART.type
        ) ||
        _.isEqual(
          table.selectedWidgetInfo.type,
          Constants.widgets.LINE_COLUMN_CHART.type
        ) ||
        _.isEqual(
          table.selectedWidgetInfo.type,
          Constants.widgets.RUNNING_CHART.type
        ) ||
        _.isEqual(
          table.selectedWidgetInfo.type,
          Constants.widgets.SCATTER_CHART.type
        ) ||
        _.isEqual(
          table.selectedWidgetInfo.type,
          Constants.widgets.IMAGE.type
        ) ||
        _.isEqual(
          table.selectedWidgetInfo.type,
          Constants.widgets.ANOMALY_CHART.type
        ) ||
        _.isEqual(
          table.selectedWidgetInfo.type,
          Constants.widgets.LINE_SCATTER_CHART.type
        ) ||
        _.isEqual(table.selectedWidgetInfo.type, Constants.widgets.GRID.type)
      ) && (
        <Grid item={true} md={3} sm={3} xs={12}>
          <FormControl required className={classes.formControlTableColumn}>
            <InputLabel id="column-list">Columns</InputLabel>
            <Select
              labelId="columns-select-required-label"
              id="columns-select-required"
              value={selectedColumn}
              onChange={evt => onColumnMultiSelectChange(evt)}
              className={classes.selectEmpty}
              label={"Select Columns"}
              input={<Input />}
              MenuProps={MenuProps}
              disabled={!isAdmin}
            >
              {table.columns.map(column => {
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

      {(_.isEqual(
        table.selectedWidgetInfo.type,
        Constants.widgets.LINE_CHART.type
      ) ||
        _.isEqual(
          table.selectedWidgetInfo.type,
          Constants.widgets.BAR_CHART.type
        ) ||
        _.isEqual(
          table.selectedWidgetInfo.type,
          Constants.widgets.MULTIPLE_AXES_CHART.type
        ) ||
        _.isEqual(
          table.selectedWidgetInfo.type,
          Constants.widgets.LINE_COLUMN_CHART.type
        ) ||
        // _.isEqual(
        //   table.selectedWidgetInfo.type,
        //   Constants.widgets.AREA_CHART.type
        // ) ||
        _.isEqual(
          table.selectedWidgetInfo.type,
          Constants.widgets.SCATTER_CHART.type
        ) ||
        _.isEqual(
          table.selectedWidgetInfo.type,
          Constants.widgets.ANOMALY_CHART.type
        ) ||
        _.isEqual(
          table.selectedWidgetInfo.type,
          Constants.widgets.LINE_SCATTER_CHART.type
        ) ||
        _.isEqual(
          table.selectedWidgetInfo.type,
          Constants.widgets.HEATMAP.type
        )) && (
        <Grid item={true} md={2} sm={2} xs={12}>
          <FormControl required className={classes.formControlTableColumn}>
            <ColorPicker
              name="color"
              defaultValue="#000"
              label="Line color"
              value={selectedColor}
              onChange={onColorChange}
            />
          </FormControl>
        </Grid>
      )}

      {_.isEqual(
        table.selectedWidgetInfo.type,
        Constants.widgets.LINE_SCATTER_CHART.type
      ) && (
        <Grid item={true} md={2} sm={2} xs={12}>
          <FormControl required className={classes.formControlTableColumn}>
            <ColorPicker
              name="color"
              defaultValue="#000"
              label="Scatter color"
              value={selectedScatterColor}
              onChange={onScatterColorChange}
            />
          </FormControl>
        </Grid>
      )}

      {(_.isEqual(
        table.selectedWidgetInfo.type,
        Constants.widgets.LINE_COLUMN_CHART.type
      ) ||
        _.isEqual(
          table.selectedWidgetInfo.type,
          Constants.widgets.LINE_SCATTER_CHART.type
        )) && (
          <>
          </>
        // <Grid item={true} md={2} sm={2} xs={12}>
        //   <FormControl required className={classes.formControlTableColumn}>
        //     <InputLabel id="column-list">Chart Type</InputLabel>
        //     <Select
        //       labelId="columns-select-required-yaxis"
        //       id="columns-select-required"
        //       value={lineChartType}
        //       onChange={evt => onLineChartTypeSelect(evt)}
        //       className={classes.selectEmpty}
        //       label={"Select Chart Type"}
        //       input={<Input />}
        //       MenuProps={MenuProps}
        //     >
        //       {getLineChartType().map(column => {
        //         return (
        //           <MenuItem key={Math.random()} value={column}>
        //             {column}
        //           </MenuItem>
        //         );
        //       })}
        //     </Select>
        //   </FormControl>
        // </Grid>
      )}

      {(_.isEqual(
        table.selectedWidgetInfo.type,
        Constants.widgets.MULTIPLE_AXES_CHART.type
      ) ||
        _.isEqual(
          table.selectedWidgetInfo.type,
          Constants.widgets.LINE_COLUMN_CHART.type
        )) && (
        <Grid item={true} md={2} sm={2} xs={12}>
          <FormControl required className={classes.formControlTableColumn}>
            <InputLabel id="column-list">Plot on Y Axis</InputLabel>
            <Select
              labelId="columns-select-required-yaxis"
              id="columns-select-required"
              value={multipleYaxisPlotType}
              onChange={evt => onMultipleYaxisPlotTypeSelect(evt)}
              className={classes.selectEmpty}
              label={"Select Plot Type"}
              input={<Input />}
              MenuProps={MenuProps}
            >
              {getMultipleYAxisPlotType().map(column => {
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

      {!(
        _.isEqual(
          table.selectedWidgetInfo.type,
          Constants.widgets.HEATMAP.type
        ) ||
        _.isEqual(
          table.selectedWidgetInfo.type,
          Constants.widgets.IMAGE.type
        ) ||
        _.isEqual(
          table.selectedWidgetInfo.type,
          Constants.widgets.PIE_CHART.type
        ) ||
        _.isEqual(
          table.selectedWidgetInfo.type,
          Constants.widgets.DONUT_CHART.type
        )  ||
        _.isEqual(table.selectedWidgetInfo.type, Constants.widgets.GRID.type)
      ) && (
        <Grid item={true} md={2} sm={2} xs={12}>
          <FormControl required className={classes.formControlTableColumn}>
            <InputLabel id="filter-list">Filter by</InputLabel>
            <Select
              labelId="filter-select-required-label"
              id="filter-select-required"
              multiple
              value={selectedFilters}
              onChange={evt => onFilterMultiSelectChange(evt)}
              className={classes.selectEmpty}
              label={"Select Filters"}
              input={<Input />}
              MenuProps={MenuProps}
              renderValue={selected => selected.join(", ")}
              disabled={!isAdmin}
            >
              {table.filters.map(filter => {
                return (
                  <MenuItem key={Math.random()} value={filter}>
                    <Checkbox checked={selectedFilters.indexOf(filter) > -1} />
                    <ListItemText primary={filter} />
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
      )}

      {_.isEqual(
        table.selectedWidgetInfo.type,
        Constants.widgets.IMAGE.type
      ) && (
        <Grid item={true} md={1} sm={1} xs={12} alignContent="center">
          <input
            color="primary"
            accept="image/*"
            type="file"
            onChange={changeHandler}
            id="icon-button-file"
            style={{ display: "none" }}
          />
          <label htmlFor="icon-button-file">
            <Button
              component="span"
              size="large"
              className={classes.fileBtnIcon}
            >
              <InsertDriveFileIcon />
            </Button>
          </label>
        </Grid>
      )}

      {_.isEqual(
        table.selectedWidgetInfo.type,
        Constants.widgets.IMAGE.type
      ) && (
        <Grid item={true} md={2} sm={2} xs={12} alignItems="center">
          {selectedFile && (
            <img
              src={URL.createObjectURL(selectedFile)}
              alt={selectedFile.name}
              style={{
                width: 100,
                height: 100,
                border: "1px solid"
              }}
            />
          )}
        </Grid>
      )}

      
      {_.isEqual(
          table.selectedWidgetInfo.type,
          Constants.widgets.BAR_CHART.type
        ) && 
        <Grid item={true} md={2} sm={2} xs={12}>
          <FormControl required className={classes.formControlTableColumn}>
            <InputLabel id="x-axis-list">X-axis</InputLabel>
            <Select
              labelId="select-x-axis-position"
              id="select-x-axis-position-required"
              value={axisPosition}
              onChange={evt => onAxisSelectionHandler(evt)}
              className={classes.selectEmpty}
              label={"Select X-axis position"}
              disabled={!isAdmin}
            >
                <MenuItem value="bottom">Bottom</MenuItem>
                <MenuItem value="top">Top</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
      }

      {(_.isEqual(
        table.selectedWidgetInfo.type,
        Constants.widgets.LINE_CHART.type
      ) ||
        _.isEqual(
          table.selectedWidgetInfo.type,
          Constants.widgets.MULTIPLE_AXES_CHART.type
        ) ||
        _.isEqual(
          table.selectedWidgetInfo.type,
          Constants.widgets.LINE_SCATTER_CHART.type
        ) ||
        _.isEqual(
          table.selectedWidgetInfo.type,
          Constants.widgets.BAR_CHART.type
        ) ||
        _.isEqual(
          table.selectedWidgetInfo.type,
          Constants.widgets.SCATTER_CHART.type
        ) ||
        _.isEqual(
          table.selectedWidgetInfo.type,
          Constants.widgets.THREEDPLOT_CHART.type
        ) ||
        _.isEqual(
          table.selectedWidgetInfo.type,
          Constants.widgets.LINE_COLUMN_CHART.type
        ) ||
        _.isEqual(
          table.selectedWidgetInfo.type,
          Constants.widgets.ANOMALY_CHART.type
        )) &&
        selectedTableName && (
          <Grid item={true} md={2} sm={2} xs={12} alignItems="center">
            <Checkbox
              checked={defaultData}
              onClick={evt => defaultSelectionHandler(evt)}
            />{" "}
            Default
          </Grid>
        )}

    


      {(_.isEqual(
        table.selectedWidgetInfo.type,
        Constants.widgets.LINE_CHART.type
      ) ||
        _.isEqual(
          table.selectedWidgetInfo.type,
          Constants.widgets.MULTIPLE_AXES_CHART.type
        ) ||
        _.isEqual(
          table.selectedWidgetInfo.type,
          Constants.widgets.LINE_SCATTER_CHART.type
        ) ||
        _.isEqual(
          table.selectedWidgetInfo.type,
          Constants.widgets.BAR_CHART.type
        ) ||
        _.isEqual(
          table.selectedWidgetInfo.type,
          Constants.widgets.SCATTER_CHART.type
        ) ||
        _.isEqual(
          table.selectedWidgetInfo.type,
          Constants.widgets.LINE_COLUMN_CHART.type
        ) ||
        _.isEqual(
          table.selectedWidgetInfo.type,
          Constants.widgets.ANOMALY_CHART.type
        )) &&
        selectedTableName && (
          
          <FormControl required className={classes.formControlChartDataSource}>
            <TextField
              value={selectedUnitName}
              required
              id="standard-required-units"
              onChange={evt => onTableUnitChange(evt)}
              label="Line Units"
            />
          </FormControl>
        )}

      {_.isEqual(
        table.selectedWidgetInfo.type,
        Constants.widgets.LINE_SCATTER_CHART.type
      ) && (
        <FormControl required className={classes.formControlChartDataSource}>
          <TextField
            value={selectedScatterUnitName}
            required
            id="standard-required-units"
            onChange={evt => onTableScatterUnitChange(evt)}
            label="Scatter Units"
          />
        </FormControl>
      )}

      <Grid item={true} md={1} sm={1} xs={12}>
        <FormControl required className={classes.formControlTableColumn}>
          <DeleteIcon onClick={() => onRemove(table.id)} />
        </FormControl>
      </Grid>

      {(_.isEqual(
        table.selectedWidgetInfo.type,
        Constants.widgets.PIE_CHART.type
      ) ||
        _.isEqual(
          table.selectedWidgetInfo.type,
          Constants.widgets.DONUT_CHART.type
        ) ||
        _.isEqual(
          table.selectedWidgetInfo.type,
          Constants.widgets.GRID.type
        )) && (
        <Grid item={true} xs={12}>
          <TableContainer component={Paper} xs={6}>
            <Table
              className={classes.table}
              size="small"
              aria-label="a dense table"
            >
              <TableBody>
                <TableRow>
                  <TableCell align="center">
                    <FormControl
                      required
                      className={classes.formControlTableColumn}
                    >
                      <InputLabel id="filter-list">
                        {_.isEqual(
                          table.selectedWidgetInfo.type,
                          Constants.widgets.GRID.type
                        )
                          ? "Columns"
                          : "Filters"}
                      </InputLabel>
                      <Select
                        labelId="filter-select-required-label"
                        id="filter-select-required"
                        // value={selectedColumn}
                        onChange={evt => onFilterChange(evt)}
                        className={classes.selectEmpty}
                        label={"Select Filters"}
                        MenuProps={MenuProps}
                        disabled={!isAdmin}
                      >
                        {table.filters.map(filter => {
                          if (
                            selectedColumnSudoNames.findIndex(
                              cc => cc.key == filter
                            ) > -1
                          ) {
                            return null;
                          }
                          return (
                            <MenuItem key={Math.random()} value={filter}>
                              <ListItemText primary={filter} />
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell align="center">
                    <FormControl required className={classes.formControl}>
                      <TextField
                        value={columnSudoName}
                        required
                        id="standard-basic"
                        label="Sudo Name"
                        defaultValue=""
                        onChange={evt =>
                          onTextFieldChange(evt, "columnSudoName")
                        }
                        disabled={!isAdmin}
                      />
                    </FormControl>
                  </TableCell>
                  <TableCell align="center">
                    <FormControl
                      required
                      className={classes.formControlTableColumn}
                    >
                      <DoneIcon onClick={() => onSubmit()} />
                    </FormControl>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      )}

      {(_.isEqual(
        table.selectedWidgetInfo.type,
        Constants.widgets.PIE_CHART.type
      ) ||
      _.isEqual(
        table.selectedWidgetInfo.type,
        Constants.widgets.DONUT_CHART.type
      ) ||
        _.isEqual(
          table.selectedWidgetInfo.type,
          Constants.widgets.GRID.type
        )) && (
        <Grid item={true} xs={12}>
          <TableContainer component={Paper} md={6} sm={6} xs={12}>
            <Table
              className={classes.table}
              size="small"
              aria-label="a dense table"
            >
              <TableBody>
                {selectedColumnSudoNames &&
                  selectedColumnSudoNames.map((columnSudoName, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell align="center">
                          {columnSudoName.key}
                        </TableCell>
                        <TableCell align="center">
                          {columnSudoName.value}
                        </TableCell>

                        {_.isEqual(
                          table.selectedWidgetInfo.type,
                          Constants.widgets.GRID.type
                        ) && (
                          <TableCell align="center">
                            <FormControl
                              required
                              className={classes.formControlTableColumn}
                            >
                              <Radio
                                checked={selectedValue === columnSudoName.key}
                                onChange={onSelectColumnFilter}
                                value={columnSudoName.key}
                                name="radio-button-demo"
                                inputProps={{ "aria-label": "A" }}
                              />
                            </FormControl>
                            <FormControl
                              required
                              className={classes.formControlTableColumn}
                            >
                              {selectedValue === columnSudoName.key && (
                                <Select
                                  labelId="datasource-select-required-label"
                                  id="datasource-select-required"
                                  value={stateOrder}
                                  onChange={evt => onGridTypeOrderSelect(evt)}
                                  className={classes.selectEmpty}
                                  label={"Select Type"}
                                >
                                  {getChartTypeOrder().map(item => {
                                    return (
                                      <MenuItem
                                        key={Math.random()}
                                        value={item.value}
                                      >
                                        {item.key}
                                      </MenuItem>
                                    );
                                  })}
                                </Select>
                              )}
                            </FormControl>
                          </TableCell>
                        )}

                        <TableCell align="center">
                          {_.isEqual(
                            table.selectedWidgetInfo.type,
                            Constants.widgets.GRID.type
                          ) && (
                            <Grid item={true} md={2} sm={2} xs={12}>
                              <FormControl
                                required
                                className={classes.formControlTableColumn}
                              >
                                <InputLabel id="column-align-list">
                                  Column Align by
                                </InputLabel>
                                <Select
                                  labelId="column-align-select-required-label"
                                  id="column-align-select-required"
                                  value={
                                    columnSudoName.align
                                      ? columnSudoName.align
                                      : ""
                                  }
                                  onChange={evt =>
                                    onAlignSelectChange(index, evt)
                                  }
                                  className={classes.selectEmpty}
                                  label={"Select Align"}
                                  disabled={!isAdmin}
                                >
                                  {getChartColumnAligns().map(align => {
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
                          )}
                        </TableCell>
                        <TableCell align="center">
                          {_.isEqual(
                            table.selectedWidgetInfo.type,
                            Constants.widgets.GRID.type
                          ) && (
                            <Grid item={true} md={2} sm={2} xs={12}>
                              <FormControl
                                className={classes.formControlTableColumn}
                              >
                                <TextField
                                  value={
                                    columnSudoName.style
                                      ? columnSudoName.style
                                      : ""
                                  }
                                  id="standard-required-style"
                                  onChange={evt =>
                                    onColumnStyleChange(index, evt)
                                  }
                                  label="Column style"
                                />
                              </FormControl>
                          </Grid>
                          )}
                        </TableCell>
                        {/* {_.isEqual(
                          table.selectedWidgetInfo.type,
                          Constants.widgets.GRID.type
                        ) && (
                          <Grid item={true} xs={2} alignItems="center">
                            <Checkbox
                              checked={
                                columnSudoName.isShowColumnHeader
                                  ? columnSudoName.isShowColumnHeader
                                  : ""
                              }
                              onClick={evt => onHandleHeader(index, evt)}
                            />{" "}
                            Default
                          </Grid>
                        )} */}
                        {(_.isEqual(
                          table.selectedWidgetInfo.type,
                          Constants.widgets.PIE_CHART.type
                        ) || _.isEqual(
                          table.selectedWidgetInfo.type,
                          Constants.widgets.DONUT_CHART.type
                        )) && (
                          <TableCell align="center">
                            <FormControl
                              required
                              className={classes.formControlChartDataSource}
                            >
                              <TextField
                                value={
                                  columnSudoName.unitName
                                    ? columnSudoName.unitName
                                    : ""
                                }
                                required
                                id="standard-required-units"
                                onChange={evt =>
                                  onUnitNameSelectChange(index, evt)
                                }
                                label="Units"
                              />
                            </FormControl>
                            <Grid item={true} md={2} sm={2} xs={12}>
                              <FormControl
                                required
                                className={classes.formControlTableColumn}
                              >
                                <ColorPicker
                                  name="color"
                                  // defaultValue="#000"
                                  label="Line color"
                                  value={
                                    columnSudoName.color
                                      ? columnSudoName.color
                                      : ""
                                  }
                                  onChange={evt =>
                                    onColumnColorSelectChange(index, evt)
                                  }
                                />
                              </FormControl>
                            </Grid>
                          </TableCell>
                        )}

                        <TableCell align="center">
                          <FormControl
                            required
                            className={classes.formControlTableColumn}
                          >
                            <DeleteIcon
                              onClick={() => onDeleteSudoColumn(index)}
                            />
                          </FormControl>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      )}
    </Grid>
  );
};

export default AddTableInfo;
