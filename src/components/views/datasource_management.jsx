import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    Button,
    Card,
    CardContent,
    Checkbox,
    FormControlLabel,
    Paper,
    Dialog,
    TextField,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    makeStyles,
} from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { Add, Delete } from "@material-ui/icons";
import Alert from "@material-ui/lab/Alert";
import Footer from "../common/Footer";
import Header from "../common/Header";
import * as Constants from "../../constants/Constants";
import roleService from "../../services/roleService";
import Navigations from "./../common/Navigations";
import "./styles/common.css";

const useStyles = makeStyles((theme) => ({
    sidebar: {
        backgroundColor: theme.palette.bg.sidebar,
    },
    mainContainer: {
        background: theme.palette.bg.container,
	    paddingLeft: "7px",
	    paddingRight: "7px",
    },
}));

const DataSources = () => {
    const classes = useStyles();
    const showSidebar = useSelector((state) => state.commonReducer.showSidebar);
    const selectedTenant = useSelector(
        (state) => state.commonReducer.selectedTenant
    );

    const [isEdit, setEdit] = useState(false);
    const [open, setOpen] = useState(false);
    const [name, setname] = useState("");
    const [url, setUrl] = useState("");
    const [tenantCode, setTenantCode] = useState("");
    const [status, setstatus] = useState(false);
    const [erroMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [selectionModel, setSelectionModel] = useState();
    const [dsCode, setDsCode] = useState("");
    const [data_sources, setDataSources] = useState([]);
    const [errorValidating, setErrorValidating] = useState(false);

    const editRow = (thisRow) => {
        setEdit(true);
        setname(thisRow.name);
        setUrl(thisRow.url);
        setTenantCode(thisRow.tenantcode);
        setstatus(thisRow.Status);
        setDsCode(thisRow.ds_code);
        setOpen(true);
    };

    const columns = [
        {
            field: "name",
            headerName: "Name",
            width: 250,
        },
        {
            field: "url",
            headerName: "Url",
            width: 250,
        },
        {
            field: "tenantcode",
            headerName: "Tenant Code",
            width: 250,
        },
        {
            field: "ds_code",
            headerName: "Data Source Code",
            width: 250,
        },
        {
            field: "Status",
            headerName: "Status",
            width: 200,
            type: "boolean",
        },
    ];

    const getDataSources = () => {
        const requestBuilder = {
            url: Constants.API_URLS.GET_DATA_SOURCE_LIST,
            request: { tenantcode: selectedTenant && selectedTenant.tenantcode },
        };
        roleService(requestBuilder)
            .then((response) => {
                console.log("Response ", response);
                let data_sources = [];
                response.data.forEach((data_source, index) => {
                    data_sources.id = data_source.Role_ID;
                    data_sources.push(data_source);
                });
                setDataSources(data_sources);
            })
            .catch((err) => {
                alert(err);
            });
    };

    useEffect(() => getDataSources(), []);

    const onClickAddWidget = () => {
        setname("");
        setUrl("");
        setTenantCode("");
        setstatus("");
        setDsCode("");
        setOpen(true);
        setEdit(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const saveDataSource = () => {
        const requestBuilder = {
            url: Constants.API_URLS.SAVE_DATA_SOURCE,
            request: {
                name: name,
                tenantcode: tenantCode,
                url: url,
                Status: status,
                ds_code: dsCode,
            },
        };
        roleService(requestBuilder)
            .then((response) => {
                if (response.data.status === "Success") {
                    setErrorMessage(null);
                    setSuccessMessage(response.data.Message);
                    setname("");
                    setUrl("");
                    setTenantCode("");
                    setstatus("");
                    setDsCode("");
                    setTimeout(() => {
                        setSuccessMessage(null);
                        setOpen(false);
                        getDataSources();
                    }, 1000);
                } else {
                    setSuccessMessage(null);
                    setErrorMessage(response.data.Message);
                }
            })
            .catch((err) => {
                alert(err);
            });
    };

    const updateDataSource = () => {
        if (selectionModel !== null || selectionModel !== "undefined") {
            const requestBuilder = {
                url: Constants.API_URLS.SAVE_DATA_SOURCE,
                request: {
                    datasourceid: selectionModel.toString(),
                    name: name,
                    tenantcode: tenantCode,
                    url: url,
                    Status: status,
                    ds_code: dsCode,
                },
            };
            roleService(requestBuilder)
                .then((response) => {
                    if (response.data.status === "Success") {
                        setSuccessMessage(response.data.Message);
                        setTimeout(() => {
                            setSuccessMessage(null);
                            getDataSources();
                        }, 1000);
                    } else {
                        alert(response.data.Message);
                    }
                })
                .catch((err) => {
                    alert(err);
                });
        }
    };

    const onChangeText = (event) => {
        if (event.target.id === "name") {
            setname(event.target.value);
        } else if (event.target.id === "url") {
            setUrl(event.target.value);
        } else if (event.target.id === "tenantCode") {
            setTenantCode(event.target.value);
        } else if (event.target.id === "dsCode") {
            setDsCode(event.target.value);
        }
    };

    const changeStatus = () => {
        setstatus(!status);
    };

    /**
     * Delete User
     */

    const onDeleteDataSource = () => {
        if (selectionModel !== null) {
            const requestBuilder = {
                url: Constants.API_URLS.DELETE_DATA_SOURCE,
                request: {
                    datasourceid: selectionModel.toString(),
                },
            };
            roleService(requestBuilder)
                .then((response) => {
                    if (response.data.status === "Success") {
                        setSuccessMessage(response.data.Message);
                        setTimeout(() => {
                            setSuccessMessage(null);
                            getDataSources();
                        }, 1000);
                    } else {
                        alert(response.data.Message);
                    }
                })
                .catch((err) => {
                    alert(err);
                });
        }
    };

    return (
        <Paper style={{ height: "100%", width: "100%" }}>
            <div className="app-container">
                <Header />
                <div className="app-content-container">
                    <div
                        className={
                            classes.sidebar +
                            (showSidebar
                                ? " app-nav-container"
                                : " app-nav-container-hide")
                        }
                    >
                        <Card style={{ height: "100%" }}>
                            <CardContent>
                                <Navigations />
                            </CardContent>
                        </Card>
                    </div>
                    <div
                        className={
                            classes.mainContainer + " app-workarea-container"
                        }
                    >
                        <div className="app-control-panel-container">
                            <h2>Data Source Management</h2>
                            <Grid
                                container
                                item={true}
                                xs={6}
                                alignItems="flex-end"
                                justify="flex-end"
                            >
                                <Button
                                    size="small"
                                    variant="contained"
                                    color="primary"
                                    startIcon={<Add />}
                                    onClick={onClickAddWidget}
                                >
                                    Add Data Source
                                </Button>
                                <Button
                                    size="small"
                                    style={{ marginLeft: "20px" }}
                                    variant="contained"
                                    color="primary"
                                    startIcon={<Delete />}
                                    onClick={onDeleteDataSource}
                                >
                                    Delete Data Source
                                </Button>
                            </Grid>
                        </div>
                        <div className="scrollable-container">
                            <Card variant="outlined">
                                {successMessage ? (
                                    <Alert severity="success">
                                        {successMessage}
                                    </Alert>
                                ) : null}
                                <CardContent>
                                    <div
                                        style={{
                                            height: 400,
                                            width: "100%",
                                        }}
                                    >
                                        <DataGrid
                                            getRowId={(r) => r.datasourceid}
                                            rows={data_sources}
                                            columns={columns}
                                            pageSize={5}
                                            selectionModel={selectionModel}
                                            onSelectionModelChange={(
                                                selection
                                            ) => {
                                                const newSelectionModel =
                                                    selection.selectionModel;
                                                if (
                                                    newSelectionModel.length > 1
                                                ) {
                                                    const selectionSet =
                                                        new Set(selectionModel);
                                                    const result =
                                                        newSelectionModel.filter(
                                                            (s) =>
                                                                !selectionSet.has(
                                                                    s
                                                                )
                                                        );
                                                    setSelectionModel(result);
                                                } else {
                                                    setSelectionModel(
                                                        newSelectionModel
                                                    );
                                                }
                                            }}
                                            onRowSelected={(e) =>
                                                editRow(e.data)
                                            }
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                            <Footer />
                        </div>
                    </div>
                </div>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    {isEdit ? "Update Data Source" : "Add Data Source"}
                </DialogTitle>
                <DialogContent>
                    {erroMessage ? (
                        <Alert severity="error">{erroMessage}</Alert>
                    ) : null}
                    {successMessage ? (
                        <Alert severity="success">{successMessage}</Alert>
                    ) : null}
                    <form Validate>
                        <TextField
                            error={errorValidating}
                            required
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            type="text"
                            fullWidth
                            value={name}
                            // value={(isEdit) ? name : null}
                            onChange={onChangeText}
                            helperText="Name must not be empty."
                        />
                        <TextField
                            required
                            margin="dense"
                            id="url"
                            label="Data Source Url"
                            type="text"
                            fullWidth
                            value={url}
                            onChange={onChangeText}
                        />
                        <TextField
                            required
                            margin="dense"
                            id="tenantCode"
                            label="Tenant Code"
                            type="text"
                            fullWidth
                            value={tenantCode}
                            onChange={onChangeText}
                        />

                        <TextField
                            required
                            margin="dense"
                            id="dsCode"
                            label="Data Source Code"
                            type="text"
                            fullWidth
                            value={dsCode}
                            onChange={onChangeText}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    margin="dense"
                                    id="status"
                                    onChange={changeStatus}
                                    checked={status}
                                    color="primary"
                                />
                            }
                            label={
                                <span style={{ fontSize: "1.2rem" }}>
                                    Active Data Source
                                </span>
                            }
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    {isEdit ? (
                        <Button
                            onClick={updateDataSource}
                            color="primary"
                            disabled={
                                name !== "" ||
                                tenantCode !== "" ||
                                url !== "" ||
                                dsCode !== ""
                                    ? false
                                    : true
                            }
                        >
                            UPDATE
                        </Button>
                    ) : (
                        <Button
                            onClick={saveDataSource}
                            color="primary"
                            disabled={
                                name !== "" &&
                                tenantCode !== "" &&
                                url !== "" &&
                                dsCode !== ""
                                    ? false
                                    : true
                            }
                        >
                            SAVE
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default DataSources;
