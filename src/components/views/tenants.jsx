import {
    Button,
    Card,
    CardContent,
    Paper,
    Dialog,
    TextField,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    makeStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../common/Footer";
import Header from "../common/Header";
import * as Constants from "../../constants/Constants";
import { Add, Delete } from "@material-ui/icons";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { DataGrid } from "@material-ui/data-grid";
import roleService from "../../services/roleService";
import Checkbox from "@material-ui/core/Checkbox";
import Alert from "@material-ui/lab/Alert";
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

const Tenants = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const showSidebar = useSelector((state) => state.commonReducer.showSidebar);

    const onToggleTheme = (isDark) => {
        dispatch({
            type: Constants.EVT_COMMON_CHANGE_THEME,
            value: isDark,
        });
        setTimeout(() => {
            window.dispatchEvent(new Event("resize"));
        }, 500);
    };

    const [isEdit, setEdit] = useState(false);
    const [open, setOpen] = useState(false);
    const [tenantName, setTenantName] = useState("");
    const [tenantCode, setTenantCode] = useState("");
    const [status, setstatus] = useState(false);
    const [erroMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [selectionModel, setSelectionModel] = useState();
    const [tenants, setTenants] = useState([]);

    const editRow = (thisRow) => {
        setEdit(true);
        setTenantName(thisRow.tenantname);
        setTenantCode(thisRow.tenantcode);
        setstatus(thisRow.Status);
        setOpen(true);
    };

    const columns = [
        {
            field: "tenantname",
            headerName: "Tenant Name",
            width: 250,
        },
        {
            field: "tenantcode",
            headerName: "Tenant Code",
            width: 250,
        },
        {
            field: "Status",
            headerName: "Status",
            width: 200,
            type: "boolean",
        },
    ];

    const getTenants = () => {
        const requestBuilder = {
            url: Constants.API_URLS.GET_TENANT_LIST,
            request: {},
        };
        roleService(requestBuilder)
            .then((response) => {
                console.log("Response ", response);
                let tenants = [];
                response.data.forEach((data_source, index) => {
                    tenants.id = data_source.Role_ID;
                    tenants.push(data_source);
                });
                setTenants(tenants);
            })
            .catch((err) => {
                alert(err);
            });
    };

    useEffect(() => getTenants(), []);

    const onClickAddWidget = () => {
        setTenantName("");
        setTenantCode("");
        setstatus("");
        setOpen(true);
        setEdit(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const saveTenant = () => {
        const requestBuilder = {
            url: Constants.API_URLS.SAVE_DATA_SOURCE,
            request: {
                tenantname: tenantName,
                tenantcode: tenantCode,
                Status: status,
            },
        };
        roleService(requestBuilder)
            .then((response) => {
                if (response.data.status === "Success") {
                    setErrorMessage(null);
                    setSuccessMessage(response.data.Message);
                    setTenantName("");
                    setTenantCode("");
                    setstatus("");

                    setTimeout(() => {
                        setSuccessMessage(null);
                        setOpen(false);
                        getTenants();
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

    const updateTenant = () => {
        if (selectionModel !== null || selectionModel !== "undefined") {
            const requestBuilder = {
                url: Constants.API_URLS.SAVE_DATA_SOURCE,
                request: {
                    tenantid: selectionModel.toString(),
                    tenantname: tenantName,
                    tenantcode: tenantCode,
                    Status: status,
                },
            };
            roleService(requestBuilder)
                .then((response) => {
                    if (response.data.status === "Success") {
                        setSuccessMessage(response.data.Message);
                        setTimeout(() => {
                            setSuccessMessage(null);
                            getTenants();
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
        if (event.target.id === "TenantName") {
            setTenantName(event.target.value);
        } else if (event.target.id === "tenantCode") {
            setTenantCode(event.target.value);
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
                    tenantid: selectionModel.toString(),
                },
            };
            roleService(requestBuilder)
                .then((response) => {
                    if (response.data.status === "Success") {
                        setSuccessMessage(response.data.Message);
                        setTimeout(() => {
                            setSuccessMessage(null);
                            getTenants();
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
                <Header onToggleTheme={onToggleTheme} />
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
                            <h2>Tenant Management</h2>
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
                                    Add Tenant
                                </Button>
                                <Button
                                    size="small"
                                    style={{ marginLeft: "20px" }}
                                    variant="contained"
                                    color="primary"
                                    startIcon={<Delete />}
                                    onClick={onDeleteDataSource}
                                >
                                    Delete Tenant
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
                                            getRowId={(r) => r.tenantid}
                                            rows={tenants}
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
                    {isEdit ? "Update Tenant" : "Add Tenant"}
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
                            required
                            autoFocus
                            margin="dense"
                            id="TenantName"
                            label="Tenant Name"
                            type="text"
                            fullWidth
                            value={tenantName}
                            // value={(isEdit) ? name : null}
                            onChange={onChangeText}
                            helperText="Name must not be empty."
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
                                    Active Tenant
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
                            onClick={updateTenant}
                            color="primary"
                            disabled={
                                tenantName !== "" && tenantCode !== ""
                                    ? false
                                    : true
                            }
                        >
                            UPDATE
                        </Button>
                    ) : (
                        <Button
                            onClick={saveTenant}
                            color="primary"
                            disabled={
                                tenantName !== "" && tenantCode !== ""
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

export default Tenants;
