import {
    Button,
    Card,
    CardContent,
    Paper,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    makeStyles,
    Select,
    FormControl,
    FormLabel
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Footer from "../common/Footer";
import Header from "../common/Header";
import { Add, Delete } from "@material-ui/icons";
import { DataGrid } from "@material-ui/data-grid";
import Alert from "@material-ui/lab/Alert";
import MenuItem from "@material-ui/core/MenuItem";
import Navigations from "./../common/Navigations";
import "./styles/common.css";
import * as Constants from "../../constants/Constants";
import roleService from "../../services/roleService";
import _ from "lodash";

const useStyles = makeStyles((theme) => ({
    sidebar: {
        backgroundColor: theme.palette.bg.sidebar,
    },
    mainContainer: {
        background: theme.palette.bg.container,
	    paddingLeft: "7px",
	    paddingRight: "7px",
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    drowDownList: {
        "& .MuiSelect-outlined": {
            padding: "4px",
            border: "1px solid " + theme.palette.color.primary,
            color: theme.palette.color.primary,
        },
        "& .MuiSelect-icon": {
            top: "calc(50% - 9px)",
        },
    },
}));

const RoleMenuMapping = () => {
    const classes = useStyles();
    const showSidebar = useSelector((state) => state.commonReducer.showSidebar);

    const [mappedItems, setMappedItems] = useState([]);
    const [tenants, setTenants] = useState([]);
    const [tenantCode, setTenantCode] = useState([]);
    const [roles, setRoles] = useState([]);
    const [roleId, setRoleId] = useState();
    const [open, setOpen] = useState(false);
    const [selectedTenantCode, setSelectedTenantCode] = useState();
    const [selectedRoleCode, setSelectedRoleCode] = useState();
    const [selectedMenuId, setSelectedMenuId] = useState();
    const [erroMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [tenantMenuList, setTenantMenuList] = useState([]);
    const [selectionModel, setSelectionModel] = useState();

    const getMappedItems = (tenantCode, roleCode) => {
        const requestBuilder = {
            url: Constants.API_URLS.GET_ROLE_MENU_MAPPING,
            request: {
                Tenanat_code: tenantCode,
                RoleCode: roleCode
            }
        };
        roleService(requestBuilder)
        .then((response) => {
            console.log("Response is ", JSON.stringify(response));
            let mappedItems = [];
            response.data.forEach((mappedItem, index) => {
                mappedItem.id = mappedItem.Role_ID;
                mappedItems.push(mappedItem);
            });
            setMappedItems(mappedItems);
        })
        .catch((err) => {
            alert(err);
        });
    };

    const saveMenuMapping = () => {
        const requestBuilder = {
            url: Constants.API_URLS.SAVE_ROLE_MENU_MAPPING,
            request: {
                RoleCode: selectedRoleCode,
                Tenanat_code: selectedTenantCode,
                MenuID: selectedMenuId
            }
        };
        roleService(requestBuilder)
        .then((response) => {
            console.log("Reponse is "+JSON.stringify(response));
            alert(response.data.Message);
            if(response.data.status === "Success") {
                setOpen(false);
                getMappedItems(selectedTenantCode, selectedRoleCode);
            }
        })
        .catch((err) => {
            alert(err);
        });
    };

    const deleteMenuMapping = () => {
        if(_.isNull(selectionModel)) {
            return;
        }
        if(selectionModel.length > 0){
            selectionModel.forEach((selectedFunction, index) => {
                const requestBuilder = {
                    url: Constants.API_URLS.DELETE_ROLE_MEU_MAPPING,
                    request: {
                        "FunctionID": selectedFunction
                    }
                };
                roleService(requestBuilder)
                .then((response) => {
                    if(index === (selectionModel.length - 1)) {
                        alert(response.data.Message);
                        getMappedItems(tenantCode, roleId);
                    }
                })
                .catch((err) => {
                    alert(err);
                });
            })
        } else {
            const requestBuilder = {
                url: Constants.API_URLS.DELETE_ROLE_MEU_MAPPING,
                request: {
                    "FunctionID": selectionModel.toString()
                }
            };
            roleService(requestBuilder)
            .then((response) => {
                alert(response.data.Message);
                getMappedItems(tenantCode, roleId);
            })
            .catch((err) => {
                alert(err);
            });
        }
        
    };

    const getTenants = () => {
        const requestBuilder = {
            url: Constants.API_URLS.GET_TENANT_LIST,
            request: null
        };
        roleService(requestBuilder)
        .then((response) => {
            // console.log("Tenants ", JSON.stringify(response));
            setTenants(response.data);
        })
        .catch((err) => {
            alert(err);
        });
    };

    const getRoles = (tenantCode) => {
        const requestBuilder = {
            url: Constants.API_URLS.GET_ROLES_LIST,
            request: {
                Tenanat_code: tenantCode
            }
        };
        roleService(requestBuilder)
        .then((response) => {
            setRoles(response.data);
        })
        .catch((err) => {
            alert(err);
        });
    };

    const getMenuTenants = (tenantCode) => {
        const requestBuilder = {
            url: Constants.API_URLS.GET_MENU_TENANTS,
            request: {
                tenantcode: tenantCode
            }
        };
        roleService(requestBuilder)
        .then((response) => {
            console.log("Response is ", JSON.stringify(response));
            setTenantMenuList(response.data);
        })
        .catch((err) => {
            alert(err);
        });
    };

    const onHandleChange = (event, type) => {
        if(type === 'tenants') {
            setTenantCode(event.target.value);
            getRoles(event.target.value);
            return;
        }
        if(type === 'tenantList') {
            setSelectedTenantCode(event.target.value);
            if(open) {
                getMenuTenants(event.target.value);
            }
            getRoles(event.target.value);
            return;
        }
        if(type === 'roles') {
            setRoleId(event.target.value);
            if(!open) {
                getMappedItems(tenantCode, event.target.value);
            }
            return;
        }
        if(type === 'roleList') {
            setSelectedRoleCode(event.target.value);
            return;
        }
        if(type === 'menuList') {
            setSelectedMenuId(event.target.value);
            return;
        }
    }

    const columns = [{
        field: "TenanatName",
        headerName: "Tenanat Name",
        width: 150,
    },  {
        field: "RoleName",
        headerName: "Role Name",
        width: 150,
    },  {
        field: "MenuName",
        headerName: "Menu Name",
        width: 150,
    }];

    const onClickAddWidget = () => {
        setOpen(true);
    };

    useEffect(() => getTenants(), []);

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
                        }>
                        <div className="app-control-panel-container">
                            <h2>Role Menu Mapping</h2>
                            <Grid
                                container
                                xs={12}>
                                <Grid
                                    item={true}
                                    xs={6}
                                    alignItems="center"
                                    justify="flex-start">
                                    <FormControl 
                                        className={classes.formControl}>
                                        <Select variant='outlined'
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={tenantCode}
                                            className={classes.drowDownList}
                                            onChange={(event) => onHandleChange(event, "tenants")}>
                                            {
                                                tenants.map(tenant => {
                                                    const { tenantcode, tenantname } = tenant;
                                                    return (
                                                        <MenuItem value={tenantcode}>
                                                            {tenantname}
                                                        </MenuItem>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                    <FormControl 
                                        className={classes.formControl}>
                                        <Select variant='outlined'
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={roleId}
                                            className={classes.drowDownList}
                                            onChange={(event) => onHandleChange(event, "roles")}>
                                            {
                                                roles.map(role => {
                                                    const { Role_code, Role_Name } = role;
                                                    return (
                                                        <MenuItem value={Role_code}>
                                                            {Role_Name}
                                                        </MenuItem>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid
                                    item={true}
                                    xs={6}
                                    alignItems="center"
                                    justify="flex-end"
                                    display="inline-flex">
                                    <Button
                                        size="small"
                                        variant="contained"
                                        color="primary"
                                        startIcon={<Add />}
                                        onClick={onClickAddWidget}>
                                        Map Role
                                    </Button>
                                    <Button
                                        style={{ marginLeft: "20px" }}
                                        size="small"
                                        variant="contained"
                                        color="primary"
                                        startIcon={<Delete />}
                                        onClick={deleteMenuMapping}>
                                        Delete
                                    </Button>
                                </Grid>
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
                                            getRowId={(r) => r.FunctionID}
                                            rows={mappedItems}
                                            columns={columns}
                                            pageSize={5}
                                            checkboxSelection
                                            onSelectionModelChange={(newSelection) => {
                                                setSelectionModel(newSelection.selectionModel);
                                            }}
                                            selectionModel={selectionModel}
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
                onClose={() => setOpen(false)}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Role Mapping</DialogTitle>
                <DialogContent>
                    {erroMessage ? (
                        <Alert severity="error">{erroMessage}</Alert>
                    ) : null}
                    {successMessage ? (
                        <Alert severity="success">{successMessage}</Alert>
                    ) : null}
                    <div
                        style={{
                            width: 400,
                            height: 300,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: 'column',
                        }}>
                        <Grid
                            xs={12}>
                            <FormControl 
                                className={classes.formControl}>
                                <FormLabel>
                                    Select Tenant
                                </FormLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedTenantCode}
                                    className={classes.drowDownList}
                                    onChange={(event) => onHandleChange(event, "tenantList")}>
                                    {
                                        tenants.map(tenant => {
                                            const { tenantcode, tenantname } = tenant;
                                            return (
                                                <MenuItem value={tenantcode}>
                                                    {tenantname}
                                                </MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid
                            xs={12}>
                            <FormControl 
                                className={classes.formControl}>
                                <FormLabel>
                                    Select Role
                                </FormLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedRoleCode}
                                    className={classes.drowDownList}
                                    onChange={(event) => onHandleChange(event, "roleList")}>
                                    {
                                        roles.map(role => {
                                            const { Role_code, Role_Name } = role;
                                            return (
                                                <MenuItem value={Role_code}>
                                                    {Role_Name}
                                                </MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid
                            xs={12}>
                            <FormControl 
                                className={classes.formControl}>
                                <FormLabel>
                                    Select Menu
                                </FormLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedMenuId}
                                    className={classes.drowDownList}
                                    onChange={(event) => onHandleChange(event, "menuList")}>
                                    {
                                        tenantMenuList.map(tenantMenu => {
                                            const { MenuID, MenuName } = tenantMenu;
                                            return (
                                                <MenuItem value={MenuID}>
                                                    {MenuName}
                                                </MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={() => setOpen(false)} 
                        color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={saveMenuMapping}
                        color="primary">
                        SAVE
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default RoleMenuMapping;
