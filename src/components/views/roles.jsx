import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
import { DataGrid } from "@material-ui/data-grid";
import { Add, Delete } from "@material-ui/icons";
import Alert from "@material-ui/lab/Alert";
import Footer from "../common/Footer";
import Header from "../common/Header";
import roleService from "../../services/roleService";
import * as Constants from "../../constants/Constants";
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
const Roles = () => {
    const classes = useStyles();
    const showSidebar = useSelector((state) => state.commonReducer.showSidebar);

    const [isEdit, setEdit] = useState(false);
    const [roleId, setRoleId] = useState(false);
    const [roles, setRoles] = useState([]);
    const [open, setOpen] = useState(false);
    const [roleName, setRoleName] = useState();
    const [roleCode, setRoleCode] = useState();
    const [erroMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [selectionModel, setSelectionModel] = useState();

    /**
     * Fetch Roles
     */
    const columns = [
        {
            field: "Action",
            headerName: "Action",
            width: 90,
            disableClickEventBubbling: true,
            renderCell: (params) => {
                const onClick = () => {
                    const api = params.api;
                    const fields = api
                        .getAllColumns()
                        .map((c) => c.field)
                        .filter((c) => c !== "__check__" && !!c);
                    const thisRow = {};
                    fields.forEach((f) => {
                        thisRow[f] = params.getValue(f);
                    });
                    setRoleName(thisRow.Role_Name);
                    setRoleCode(thisRow.Role_code);
                    setEdit(true);
                    setOpen(true);
                    // return alert(JSON.stringify(thisRow, null, 4));
                };
                return <Button onClick={onClick}>Edit</Button>;
            },
        },
        {
            field: "Role_ID",
            headerName: "Role ID",
            width: 100,
        },
        {
            field: "Role_Name",
            headerName: "Role Name",
            width: 150,
        },
        {
            field: "Role_code",
            headerName: "Role Code",
            width: 120,
        },
        {
            field: "Status",
            headerName: "Status",
            type: "boolean",
            width: 90,
        },
    ];

    const getRoles = () => {
        const requestBuilder = {
            url: Constants.API_URLS.GET_ROLES_LIST,
            request: null,
        };
        roleService(requestBuilder)
            .then((response) => {
                let roles = [];
                response.data.forEach((role, index) => {
                    role.id = role.Role_ID;
                    roles.push(role);
                });
                setRoles(roles);
            })
            .catch((err) => {
                alert(err);
            });
    };
    useEffect(() => getRoles(), []);

    /**
     * Add new role dialog
     */

    const onClickAddWidget = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const saveRole = () => {
        const requestBuilder = {
            url: Constants.API_URLS.SAVE_ROLE,
            request: {
                RoleName: roleName,
                RoleCode: roleCode,
            },
        };
        if (isEdit) {
            requestBuilder.request.Role_ID = roleId;
        }
        roleService(requestBuilder)
            .then((response) => {
                if (response.data.status === "Success") {
                    setErrorMessage(null);
                    setSuccessMessage(response.data.Message);
                    setRoleName("");
                    setRoleCode("");
                    setTimeout(() => {
                        setOpen(false);
                        getRoles();
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

    const onChnageText = (event) => {
        if (event.target.id === "roleName") {
            setRoleName(event.target.value);
            return;
        }
        if (event.target.id === "roleCode") {
            setRoleCode(event.target.value);
            return;
        }
    };

    /**
     * Delete Role
     */
    const onDeleteRoles = () => {
        if (selectionModel !== null) {
            const requestBuilder = {
                url: Constants.API_URLS.DELETE_ROLE,
                request: {
                    RoleID: selectionModel.toString(),
                },
            };
            roleService(requestBuilder)
                .then((response) => {
                    if (response.data.status === "Success") {
                        alert(response.data.Message);
                        getRoles();
                    } else {
                        alert(response.data.Message);
                    }
                })
                .catch((err) => {
                    alert(err);
                });
            return;
        }
        alert("Please Select Roles");
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
                            <h2>Role Management</h2>
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
                                    Add Role
                                </Button>
                                <Button
                                    style={{ marginLeft: "20px" }}
                                    size="small"
                                    variant="contained"
                                    color="primary"
                                    startIcon={<Delete />}
                                    onClick={onDeleteRoles}
                                >
                                    Delete Role
                                </Button>
                            </Grid>
                        </div>
                        <div className="scrollable-container">
                            <Card variant="outlined">
                                <CardContent>
                                    <div
                                        style={{
                                            height: 400,
                                            width: "100%",
                                        }}
                                    >
                                        <DataGrid
                                            rows={roles}
                                            columns={columns}
                                            pageSize={5}
                                            checkboxSelection
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
                                            disableSelectionOnClick
                                            disableColumnSelector
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
                    {isEdit ? "Update Role" : "Add Role"}
                </DialogTitle>
                <DialogContent>
                    {erroMessage ? (
                        <Alert severity="error">{erroMessage}</Alert>
                    ) : null}
                    {successMessage ? (
                        <Alert severity="success">{successMessage}</Alert>
                    ) : null}
                    <TextField
                        autoFocus
                        margin="dense"
                        id="roleName"
                        label="Role Name"
                        type="text"
                        fullWidth
                        value={roleName}
                        onChange={onChnageText}
                    />
                    <TextField
                        margin="dense"
                        id="roleCode"
                        label="Role Code"
                        type="text"
                        fullWidth
                        value={roleCode}
                        onChange={onChnageText}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={saveRole} color="primary">
                        {isEdit ? "Update" : "Save"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default Roles;
