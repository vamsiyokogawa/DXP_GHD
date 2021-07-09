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
import { useSelector } from "react-redux";
import Footer from "../common/Footer";
import Header from "../common/Header";
import * as Constants from "../../constants/Constants";
import { Add, Delete } from "@material-ui/icons";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { DataGrid } from "@material-ui/data-grid";
import roleService from "../../services/roleService";
import Checkbox from "@material-ui/core/Checkbox";
import Alert from "@material-ui/lab/Alert";
import MenuItem from "@material-ui/core/MenuItem";
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

const Users = () => {
    const classes = useStyles();
    const showSidebar = useSelector((state) => state.commonReducer.showSidebar);

    const [isEdit, setEdit] = useState(false);
    const [open, setOpen] = useState(false);
    const [userName, setUserName] = useState();
    const [userLoginID, setLoginID] = useState();
    const [userRoleName, setRoleName] = useState("");
    const [userStatus, setUserStatus] = useState(false);
    const [userPassword, setUserPassword] = useState();
    const [erroMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [selectionModel, setSelectionModel] = useState();

    const editRow = (thisRow) => {
        setUserName(thisRow.UserName);
        setLoginID(thisRow.LoginID);
        setRoleName(thisRow.RoleName);
        setUserStatus(thisRow.Status);
        setEdit(true);
        setOpen(true);
    };

    const columns = [
        {
            field: "LoginID",
            headerName: "User ID",
            width: 350,
        },
        {
            field: "UserName",
            headerName: "User Name",
            width: 350,
        },
        {
            field: "RoleName",
            headerName: "RoleName",
            width: 150,
        },
        {
            field: "Status",
            headerName: "Status",
            width: 200,
            type: "boolean",
        },
    ];

    const [users, setUsers] = useState([]);
    const getUsers = () => {
        const requestBuilder = {
            url: Constants.API_URLS.GET_USERS_LIST,
            request: null,
        };
        roleService(requestBuilder)
            .then((response) => {
                let users = [];
                response.data.forEach((user, index) => {
                    user.id = user.Role_ID;
                    users.push(user);
                });
                setUsers(users);
            })
            .catch((err) => {
                alert(err);
            });
    };

    useEffect(() => getUsers(), []);

    const onClickAddWidget = () => {
        setUserName("");
        setLoginID("");
        setRoleName("");
        setUserStatus("");
        setUserPassword("");
        setOpen(true);
        setEdit(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const saveUser = () => {
        const requestBuilder = {
            url: Constants.API_URLS.SAVE_USER,
            request: {
                UserName: userName,
                RoleName: userRoleName,
                LoginID: userLoginID,
                Status: userStatus,
                Password: userPassword,
            },
        };

        roleService(requestBuilder)
            .then((response) => {
                if (response.data.status === "Success") {
                    setErrorMessage(null);
                    setSuccessMessage(response.data.Message);
                    setUserName("");
                    setLoginID("");
                    setRoleName("");
                    setUserStatus("");
                    setUserPassword("");
                    setTimeout(() => {
                        setOpen(false);
                        getUsers();
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

    const onChangeText = (event) => {
        if (event.target.id === "userName") {
            setUserName(event.target.value);
        } else if (event.target.id === "userLoginID") {
            setLoginID(event.target.value);
        } else if (event.target.id === "userRoleName") {
            setRoleName(event.target.value);
        } else if (event.target.id === "userPassword") {
            setUserPassword(event.target.value);
        }
    };

    const changeStatus = () => {
        setUserStatus(!userStatus);
    };

    const changeUserRole = (e) => {
        setRoleName(e.target.value);
        console.log(e.target.value);
    };

    const updateUser = () => {
        if (selectionModel !== null || selectionModel !== "undefined") {
            const requestBuilder = {
                url: Constants.API_URLS.SAVE_USER,
                request: {
                    UserID: selectionModel.toString(),
                    UserName: userName,
                    RoleName: userRoleName,
                    LoginID: userLoginID,
                    Status: userStatus,
                    Password: userPassword,
                },
            };
            roleService(requestBuilder)
                .then((response) => {
                    if (response.data.status === "Success") {
                        setSuccessMessage(response.data.Message);
                        setTimeout(() => {
                            setSuccessMessage(null);
                            getUsers();
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

    /**
     * Delete User
     */

    const onDeleteUser = () => {
        if (selectionModel !== null) {
            const requestBuilder = {
                url: Constants.API_URLS.DELETE_USER,
                request: {
                    UserID: selectionModel.toString(),
                },
            };
            roleService(requestBuilder)
                .then((response) => {
                    if (response.data.status === "Success") {
                        setSuccessMessage(response.data.Message);
                        setTimeout(() => {
                            setSuccessMessage(null);
                            getUsers();
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
                            <h2>User Management</h2>

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
                                    Add User
                                </Button>
                                <Button
                                    style={{ marginLeft: "20px" }}
                                    size="small"
                                    variant="contained"
                                    color="primary"
                                    startIcon={<Delete />}
                                    onClick={onDeleteUser}
                                >
                                    Delete User
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
                                            getRowId={(r) => r.UserID}
                                            rows={users}
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
                {isEdit !== true ? (
                    <DialogTitle id="form-dialog-title">Add User</DialogTitle>
                ) : (
                    <DialogTitle id="form-dialog-title">
                        Update User
                    </DialogTitle>
                )}

                <DialogContent>
                    {erroMessage ? (
                        <Alert severity="error">{erroMessage}</Alert>
                    ) : null}
                    {successMessage ? (
                        <Alert severity="success">{successMessage}</Alert>
                    ) : null}
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        id="userName"
                        label="User Name"
                        type="text"
                        fullWidth
                        value={userName}
                        // value={(isEdit) ? userName : null}
                        onChange={onChangeText}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="userLoginID"
                        label="Login ID"
                        type="text"
                        fullWidth
                        value={userLoginID}
                        onChange={onChangeText}
                    />
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        id="userRoleName"
                        label="User Role"
                        type="text"
                        fullWidth
                        value={userRoleName}
                        onChange={changeUserRole}
                        select
                    >
                        <MenuItem value="Admin">Admin</MenuItem>
                        <MenuItem value="User">User</MenuItem>
                    </TextField>

                    <TextField
                        required
                        margin="dense"
                        id="userPassword"
                        label="User Password"
                        fullWidth
                        value={userPassword}
                        onChange={onChangeText}
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                margin="dense"
                                id="userStatus"
                                onChange={changeStatus}
                                checked={userStatus}
                                color="primary"
                            />
                        }
                        label={
                            <span style={{ fontSize: "1.0rem" }}>
                                Active User
                            </span>
                        }
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    {isEdit ? (
                        <Button
                            onClick={updateUser}
                            color="primary"
                            disabled={
                                userName !== "" ||
                                userRoleName !== "" ||
                                userLoginID !== ""
                                    ? false
                                    : true
                            }
                        >
                            UPDATE
                        </Button>
                    ) : (
                        <Button
                            onClick={saveUser}
                            color="primary"
                            disabled={
                                userName !== "" &&
                                userRoleName !== "" &&
                                userLoginID !== "" &&
                                userPassword !== ""
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

export default Users;
