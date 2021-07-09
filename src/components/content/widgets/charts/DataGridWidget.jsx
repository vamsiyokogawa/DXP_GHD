import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import * as Utils from "../../../../constants/Utils";
import { CircularProgress } from "@material-ui/core";
import { useInterval } from "../../../../hooks/useInterval";
import { useFetchChartData } from "../../../../hooks/useFetchChartData";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import orange from "../../../../assets/orange.png";
import green from "../../../../assets/green.png";
import red from "../../../../assets/red.png";
import white from "../../../../assets/white.png";
import * as mui from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";
import { Link } from "@material-ui/core";
import { Router, Route, Switch } from "react-router-dom";
import FormTemplate from "../FormTemplate";
import DataSources from '../../../views/datasource_management';
export const DataGridWidget = props => {
  const { widgetConfig } = props;
  const isShowHeader = widgetConfig.isShowTableHedaer;
  const {
    backgroundColor,
    refreshInterval,
    storeObject,
    templatePosition,
    formTemplate
  } = widgetConfig;
  const [isShowTableHeader, setisShowTableHeader] = useState(
    widgetConfig.isShowTableHedaer
  );
  let dataObject = {
    rows: [],
    columns: []
  };
  let selection = widgetConfig.dataType || "KPI1";

  const [sortObj, setSortObj] = useState(
    storeObject || {
      field: "Name",
      sort: "asc"
    }
  );

  useEffect(() => {
    setSortObj(storeObject);
  }, [storeObject]);

  const useStyles = makeStyles(theme => ({
    dataGridWrapper: {
      fontFamily: theme.root.fontFamily,
      color: theme.palette.textColor,
      height: "calc(100% - 30px)",
      backgroundColor: backgroundColor || theme.palette.bg.widget,
      whiteSpace: "normal",
      width: "100%",
      margin: "0 auto",
      "& ::-webkit-scrollbar-thumb": {
        background: theme.palette.bg.scrollColor
      },
      "& ::-webkit-scrollbar-track": {
        background: theme.palette.bg.trackColor
      },
      "& .MuiTablePagination-root": {
        color: theme.palette.color.chartLabelColor
      }
    },
    textColors: {
      color: theme.palette.textColor
    },
    setTopPadding: {
      top: isShowTableHeader ? "56px !important" : "0px !important"
    },
    tablePapper: {
      width: "100%",
      height: "95%",
      margin: "0 !important",
      "& .MuiTableCell-body": theme.palette.tableBodyObject,
      "& .MuiTableCell-head": theme.palette.tableHeadObject
    },
    tableBorder: {
      padding: "10px 16px !important"
    },

    paginationClass: {
      paddingLeft: "20px !important",
      "& .MuiTablePagination-toolbar": {
        justifyContent: "space-between"
      },
      "& .MuiTablePagination-spacer": {
        flex: "0",
        display: "none"
      }
    },
    cellClass: {
      color: theme.palette.tableCellColor,
      padding: "10px 16px !important"
    },
    centerRow: {
      textAlign: "center !important"
    },
    leftRow: {
      textAlign: "left !important"
    },
    rightRow: {
      justifyContent: "flex-end !important",
      textAlign: "right !important"
    },

    root: {
      "& .MuiPaper-root": {
        margin: "0px !important"
      },

      "& .centerRow": {
        justifyContent: "center !important"
      },
      "& .leftRow": {
        justifyContent: "left !important"
      },
      "& .rightRow": {
        justifyContent: "flex-end !important",
        textAlign: "right !important"
      },
      color: theme.palette.textColor,
      WebkitFontSmoothing: "auto",
      letterSpacing: "normal",
      "& .MuiPaginationItem-root": {
        borderRadius: 0
      }
    },
    tableRow: {
      background: theme.palette.tableRowBgColor,
      "&:hover": {
        background: theme.palette.tableRowHover
      }
    }
  }));

  const classes = useStyles();
  const { data, loading, setData } = useFetchChartData(widgetConfig);

  const { tables } = widgetConfig;
  useInterval(requestData, refreshInterval * 1000);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onChangeHandle = event => {};
  async function requestData() {
    // refresh logic goes here
    try {
      // calling api and getting formatted data
      const newData = await Utils.getChartData(widgetConfig);
      // chart related plotting logic goes here
      setData(newData);
    } catch (error) {
      console.error(error);
    }
  }

  if (data && widgetConfig.kpiTable) {
    dataObject = data[selection];
  } else if (data) {
    dataObject = data[tables[0].tableName];
  }

  if (!dataObject) {
    dataObject = {
      rows: [],
      columns: []
    };
  }

  if (dataObject) {
    dataObject.columns.map((column, index) => {
      column.order =
        column["field"] === sortObj["field"] ? sortObj["sort"] : "";
      column.active = column["field"] === sortObj["field"];
    });
  }

  const handleRedirect = () => {
    console.log('redirect');
    window.location.assign('/roles');
  }

  const getDataResponse = (row, field, type = "") => {
    let data = "";
    if (field == "Colour" || field == "color") {
      // if(field == 'Colour') {
      if (row[field] === "red") {
        data = <img src={red} alt="red" />;
      }
      if (row[field] === "green") {
        data = <img src={green} alt="green" />;
      }
      if (row[field] === "orange") {
        data =  <img src={orange} alt="orange" />;
      }
      if (row[field] === null) {
        data = <img src={white} alt="white" />;
      }
    } else if (type == "date") {
      data = Utils.convertEpocToDateFormat(row[field]);
    } else if (field == "status") {
      if (row[field] === "green") {
        data = <img src={green} alt="green" />;
      }
    } else if (type == "icon") {
      data = React.createElement(mui[row[field]]);
    } else if (field == "header") {
      data = <div dangerouslySetInnerHTML={{ __html: row[field] }} />;
    } else {
      data = typeof row[field] === "number" ? row[field] : row[field];
    }

    return data;
  };

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);

    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });

    return stabilizedThis.map(el => el[0]);
  }

  const onSortClick = property => event => {
    const isAsc = sortObj["field"] === property && sortObj["sort"] === "asc";

    setSortObj({
      field: property,
      sort: isAsc ? "desc" : "asc"
    });
  };

  const onFormSubmit = value => {};
  const renderTableContent = (column, row, index) => {
    let style = column.style ? column.style : {};
    if (row.row_color) {
      style = { ...style, backgroundColor: `${row.row_color}` };
    }

    return (
      <TableCell
        key={index}
        style={style}
        className={`${classes.cellClass} ${classes.tableBorder} ${
          classes[column.headerAlign]
        }`}
      >
        {getDataResponse(row, column.field, column.fieldType || "")}
      </TableCell>
    );
  };

  return (
    <>
      {loading ? (
        <div className="loader-container">
          <CircularProgress color="inherit" />
        </div>
      ) : (
        dataObject && (
          <div className={classes.dataGridWrapper}>
            {formTemplate &&
              formTemplate.template &&
              templatePosition === "Top" && (
                <Grid container md={12} xs={12} spacing={1}>
                  <FormTemplate
                    data={formTemplate.template}
                    onSubmit={onFormSubmit}
                  />
                </Grid>
              )}
            <TableContainer component={Paper} className={classes.tablePapper}>
              <Table className={classes.tableBorder} aria-label="a dense table">
                {isShowHeader ? (
                  <TableHead>
                    <TableRow>
                      {dataObject.columns.map((column, index) => (
                        <TableCell
                          style={column.style ? column.style : null}
                          key={index}
                          className={`${classes.TableCellBorder} ${
                            classes[column.headerAlign]
                          }`}
                        >
                          <TableSortLabel
                            key={index}
                            active={column.active}
                            direction={column.order}
                            onClick={onSortClick(column["field"])}
                          >
                            {column.headerName}
                          </TableSortLabel>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                ) : (
                  ""
                )}

                <TableBody>
                  {stableSort(
                    dataObject.rows,
                    getComparator(sortObj["sort"], sortObj["field"])
                  )
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow key={index} className={classes.tableRow}>
                        {dataObject.columns.map((column, index) =>
                          renderTableContent(column, row, index)
                        )}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>

              {formTemplate &&
                formTemplate.template &&
                templatePosition === "Bottom" && (
                  <Grid
                    container
                    alignItems="flex-start"
                    xs={12}
                    style={{ margin: "5px 0px 5px 6px" }}
                    spacing={1}
                  >
                    <FormTemplate
                      data={formTemplate.template}
                      onSubmit={onFormSubmit}
                    />
                  </Grid>
                )}
            </TableContainer>

            <TablePagination
              className={classes.paginationClass}
              className={classes.paginationClass}
              rowsPerPageOptions={5}
              component="div"
              count={dataObject.rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </div>
        )
      )}
    </>
  );
};
