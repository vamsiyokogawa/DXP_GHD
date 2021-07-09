import React, { useState,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
    AppBar,
    Button,
    FormControl,        
    MenuItem,
    Select,
    Toolbar,
    Typography,
    Menu,
    IconButton,
    TextField,
    Grid
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { makeStyles } from "@material-ui/core/styles";
import "./css/Header.css";

import WidgetConfigDialog from "../content/widgets/WidgetConfigDialog";
import FormBuilderDialog from "../content/FormBuilder/FormBuilderDialog";
import * as Constants from "../../constants/Constants";
import Logo from "../../assets/logo.png";
import { ReactComponent as Save } from "../../assets/save.svg";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Add,Refresh } from "@material-ui/icons";
import Breadcrumb from "./Breadcrumb";
import * as Utils from "../../constants/Utils";
import { color } from "highcharts";
import FileCopyOutlined from '@material-ui/icons/FileCopyOutlined';
const useStyles = makeStyles((theme) => ({
    header: {
        backgroundColor: theme.palette.bg.header,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 150,
        background: theme.palette.bg.sidebar,
        [theme.breakpoints.down("xs")]: {
            minWidth: 'calc(100% - 30px)',
            marginLeft:'22px !important'
          }
    },
    drowDownList: {
        "& .MuiSelect-outlined": {
            padding: "6px 35px 6px 10px",
            color: theme.palette.color.iconColor,
            fontSize:'14px',
            border:`1px solid  ${theme.palette.bg.borderColor2} !important` ,
            "&:hover":{
                border:`1px double  ${theme.palette.bg.borderColor2Hover} !important`,
               
            },
            "& ~ .MuiOutlinedInput-notchedOutline" :{
               
                border: 'none !important'
            },
            
        },
        "&.MuiInput-underline:before":
         {
            borderBottom:`1px solid  ${theme.palette.bg.borderColor2} !important` ,
        },
        "& .MuiSelect-icon": {
            top: "calc(50% - 9px)",
        },
        
      
    },
    menuButton:{
            display:'none',
            [theme.breakpoints.down('1025')]: {
                display:'inline-block',
                },

    },
    rangeList: {
        width: 258,
        minWidth: 300,
        margin: '0px auto',
        top:'0px !important',
        right: '0px !important'

    },
    themeFormControl: {
        margin: theme.spacing(1),
        minWidth: "50px",
        background: theme.palette.bg.sidebar
    },
    themeFormOption:{
        textTransform: 'capitalize',
        fontSize: '14px',
        padding: '7px',
        cursor:'pointer'
    },
    themeDropDownList: {
        "& .MuiSelect-outlined": {
            padding: "5px 30px 5px 7px",
            textTransform: 'capitalize',
            color: theme.palette.color.primary,
            border:`1px solid  ${theme.palette.bg.borderColor2} !important` ,
            "&:hover":{
                border:`1px double  ${theme.palette.bg.borderColor2Hover} !important`,
               
            },
            "& ~ .MuiOutlinedInput-notchedOutline" :{
               
                border: 'none !important'
            },
           
        },
        "& .MuiSelect-icon": {
            top: "calc(50% - 9px)",
        },
       
    },
        
   
    title: {
        flexGrow: 1,
        margin: '8px 8px 8px 15px',
        '& .MuiBreadcrumbs-separator':{
            color:theme.palette.bg.separator,
        }
    },
    logoContainer: {
        background: theme.palette.bg.sidebar,
        "&:hover": {
            background: theme.palette.bg.header,
        },
    },
    saveButton: {
        width: "auto",
        padding: "5px !important",
        minWidth: "auto",
        borderRadius:'3px'
    },
    editLogoClass: {
        position: "absolute",
        left: 25,
        top: 10,
    },
    addWidgetButton: {
        width: "auto",
        padding: "7px  !important",
        minWidth: "auto",
        marginRight: 8,
        borderRadius:'3px'
    },
    rangeBtn: {
        width: "auto",
        margin: 9,
        padding: "5px !important",
        minWidth: "auto",
    },
    rangePicker: {
        position: "absolute",
        right: "404px",
        background: theme.palette.bg.header,
        color: "#000",
        top: "16px",
        display: "flex",
        height: "218px"
    },
    textFields: {
        fontSize: "14px"
    },
    datePickerField: {
        backgroundColor: theme.palette.bg.header,
        // border:"1px solid `${theme.palette.bg.dropDownColor}`",
    },
    dropdownStyle: {
        border:`1px solid ${theme.palette.bg.dropDownColor}`,
    },
    
}));
const intervals = [
    'off',
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
const Header = ({navRef }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    
    const [editLogo, setEditLogo] = useState(false);
    const [isFilePicked, setFilePicked] = useState(false);
    const [pickedFile, setPickedFile] = useState();

    const isAdmin = useSelector((state) => state.loginReducer.isAdmin);
    
    const loggedInUser = useSelector((state) => state.loginReducer.loggedInUser);

    const tenants = useSelector((state) => state.commonReducer.tenants);
    const darkMode = useSelector((state) => state.commonReducer.darkMode);
   
    const selectedTenant = useSelector(
        (state) => state.commonReducer.selectedTenant
    );
    const isMenu = useSelector((state) => state.commonReducer.path === '/home');
    const showSidebar = useSelector((state) => state.commonReducer.showSidebar);
   

    const isOpen = useSelector((state) => state.contentReducer.isOpenConfig);
    const [isOpenForm, setOpenForm] = useState(false);
    const selectedWidget = useSelector(
        (state) => state.contentReducer.selectedWidget
    );
    const [refreshInterval, setRefreshInterval] = useState();
    const dashboard = useSelector(
        (state) => state.dashboardsReducer.selectedDashboard
    );
    const [dateSelection, setDateSelection] = useState(
        ""
    );
    const currentDate = new Date();
    const prevDate = new Date(new Date().setDate(currentDate.getDate() - 1));

    const [startDate, setStartDate] = useState(prevDate);
    const [endDate, setEndDate] = useState(currentDate);
    const [showDateRange, setShowDateRange] = useState(false);
    const [selectTheme, setSelectedTheme] = useState(darkMode);
    const [openDropdown, setOpenDropdown] = React.useState(false);

    /**
     * Profile menu
     */
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleCloseDrop = () => {
        setOpenDropdown(false);
    };
    const handleOpenDrop = () => {
        setOpenDropdown(true);
    };
    const handleDateMenuClose = () => {
        setShowDateRange(null);
    };
    const handleThemeClick = (event) => {
        setSelectedTheme(event.currentTarget);
    };
    /**
     * Profile menu ends
     */

    const handleTenantChange = (event) => {
        dispatch({
            type: Constants.EVT_COMMON_SET_SELECTED_TENANT,
            value: event.target.value,
        });

        dispatch({
            type: Constants.EVT_GET_MENU_ON_TENANT_CHANGE,
            value: event.target.value,
        });
    };

    const closeAddEditWidgetDialog = () => {
        dispatch({
            type: Constants.EVT_OPEN_CONFIG,
            value: selectedWidget,
        });
    };
    const closeAddFormDialog = () => {
       setOpenForm(false)
    };

    const onLogoutHandler = () => {
        console.log('logout');
        dispatch({
            type: Constants.EVT_LOGOUT,
        });
        history.push("/");
        // window.location.href = window.location.origin + "/login/Login.html";
    };

    const onClickAddWidget = () => {
        let new_widget = { ...Constants.new_widget };

        dispatch({
            type: Constants.EVT_OPEN_CONFIG,
            value: new_widget,
        });
    };
    const onClickAddForm = () => {
        setOpenForm(true)
    };
    const onClickRefeshDashboard = () => {
        setDateSelection('Range');
        dispatch({
            type: Constants.EVT_GET_MENU_ON_TENANT_CHANGE,
            value:  { tenantcode: tenants[0].tenantcode, RoleName: loggedInUser.role},
        });
    };
    const onShowNavigClick = () => {
        dispatch({
            type: Constants.EVT_SHOW_SIDEBAR,
            value: !showSidebar,
        });

        setTimeout(() => {
            window.dispatchEvent(new Event("resize"));
        }, 1000);
    };

    const onSwicthTheme = (event) => {
        setSelectedTheme(event.target.value)
        dispatch({
            type: Constants.EVT_COMMON_CHANGE_THEME,
            value: event.target.value,
        });
        setTimeout(() => {
            window.dispatchEvent(new Event("resize"));
        }, 500);
    };

    const changeNavigationSelection = (item) => {
        navRef.current.onTreeItemClick(item.id);
    };
    const saveMenuInfo = () => {
        dispatch({
            type: Constants.EVT_SAVE_NAVITIONS_SAGA,
        });
    };
    const updateWidgetDashboard = (range,startDate,endDate) =>{
        if(dashboard){
            dashboard.widgets.forEach((widget) => {
                widget.dateSelection = range;
                widget.startDate = startDate;
                widget.endDate = endDate
                let eventName = Constants.EVT_DASHBOARDS_ON_UPDATE_WIDGET;
                dispatch({
                    type: eventName,
                    value: { ...widget },
                });
            });
        }
    }
    const handleDateSelectionChange = (event) => {
        setDateSelection(event.target.value)
        if("Range" !== event.target.value){
            const { startDate, endDate } = Utils.getDatesForRange(event.target.value);
            setStartDate(startDate);
            setEndDate(endDate);
            updateWidgetDashboard(event.target.value,startDate,endDate);
            setShowDateRange(false)
        }
        if("Range" === event.target.value){
            setOpenDropdown(true)
            setShowDateRange(true)
        }
        
    };
    const applyDateRangeHandle = () => {
        setOpenDropdown(false)
        setShowDateRange(false)
        updateWidgetDashboard(dateSelection,startDate,endDate);
    };
    
    const navigateBetweenMenuAndTemplates = () => {
        if (isMenu) {
            history.push("/templates");
        } else {
            history.push("/home");
        }
    };

    const onLogoHovered = (isHovered) => {
        if (isHovered) {
            setEditLogo(true);
            return;
        }
        setEditLogo(false);
    };

    const setNewLogo = (event) => {
        setFilePicked(true);
        setEditLogo(false);
        setPickedFile(URL.createObjectURL(event.target.files[0]));
    };

    const navigateToScreen = (path) => {
        history.push(path);
    };
    const onRefreshIntervalChange = event => {
        setRefreshInterval(event.target.value);
      };
    // if(!dashboardData){
    //     setDashboardData(dashboard)
    // }
    return (
        <div className="add-template-container">
            {/* <div className="template-selection-container">*/}
            <AppBar position="static" className={classes.header}>
                <Toolbar>
                <div className="logo-side">
                    <div
                        className={classes.logoContainer + " logo-container"}
                        onMouseEnter={() => onLogoHovered(true)}
                        onMouseLeave={() => onLogoHovered(false)}
                    >
                        {isFilePicked === true ? (
                            <img src={pickedFile} alt="logo 2" height="37" />
                        ) : (
                            <img src={Logo} alt="logo" height="37" />
                        )}
                        {editLogo ? (
                            <FormControl
                                className={[
                                    classes.formControlChartDataSource,
                                    classes.editLogoClass,
                                ]}
                            >
                                <input
                                    color="primary"
                                    accept="image/*"
                                    type="file"
                                    onChange={setNewLogo}
                                    id="icon-button-file"
                                    style={{ display: "none" }}
                                />
                                <label htmlFor="icon-button-file">
                                    <IconButton
                                        variant="contained"
                                        aria-label="upload picture"
                                        component="span">
                                        <PhotoCamera />
                                    </IconButton>
                                </label>
                            </FormControl>
                        ) : null}
                    </div>
                    
                    <Typography variant="v1" style={{color:'#fff'}} className={classes.drawerMenu}>
                       {/* <label className="dashboard-title"> Dashboard </label> */}
                        {isMenu && (
                            <IconButton
                                edge="end"
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="menu"
                                onClick={() => onShowNavigClick()}
                            >
                                <MenuIcon />
                            </IconButton>
                        )}
                    </Typography>
                </div>
                    <Typography variant="v6" className={classes.title + ' syn-company'}>
                    {(history.location &&
                        history.location.pathname &&
                      history.location.pathname === '/home' )?
                        <Breadcrumb className={classes.breadcrumbItem}
                            handleClick={changeNavigationSelection}
                        />:<></>
                    }
                   </Typography>
                    
                  
                   
                    <FormControl className={classes.formControl + ' first-chld'}>
                        <Select
                            className={`${classes.drowDownList} ${classes.datePickerField}`}
                            labelId="tenant-dropdown-list"
                            id="tenant-dropdown-list"
                            value={selectedTenant}
                            onChange={handleTenantChange}
                            variant="outlined"
                        >
                      
                            {tenants
                                ? tenants.map((item) => {
                                      return (
                                          
                                          <MenuItem
                                              key={item.tenantcode}
                                              value={item}
                                          >
                                              {item.tenantname}
                                          </MenuItem>
                                        );
                                  })
                                : null}

                        </Select>
                    </FormControl>

                   
                    <FormControl
                        className={classes.formControl}
                    >
                        <Select
                            className={`${classes.drowDownList} ${classes.datePickerField}`}
                            labelId="date-selection-required"
                            id="date-selection-required"
                            variant="outlined"
                            open={openDropdown}
                            onClose={handleCloseDrop}
                            onOpen={handleOpenDrop}
                            value={dateSelection}
                            onChange={(evt) =>
                                handleDateSelectionChange(evt)
                            }
                        >
                                {Constants.DATE_RANGES.map(
                                    (range) => {
                                        return (
                                            <MenuItem
                                                key={range}
                                                value={range}
                                            >
                                                {range}
                                            </MenuItem>
                                        );
                                    }
                                )}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl + ' first-chld'}>                     
                        <Select
                        labelId="refresh-interval-select-required-label"
                        id="refresh-interval-required"
                        value={refreshInterval ? refreshInterval : null}
                        onChange={onRefreshIntervalChange}
                        className={`${classes.drowDownList} ${classes.datePickerField}`}
                        label={"Refresh Interval"}
                        disabled={!isAdmin}
                        >
                        {intervals.map(interval => {
                            return <MenuItem value={interval}>{interval}</MenuItem>;
                        })}
                        </Select>                        
                    </FormControl>
                   
                    {showDateRange  && (
                        <Grid direction="row" 
                            justify="center"
                            alignItems="center"
                            className={`${classes.rangePicker} ${classes.datePickerField}`}
                        >
                             <FormControl
                                className={classes.formControl}>
                                <TextField
                                    id="date"
                                    label="Start date"
                                    type="datetime-local"
                                    className={classes.textFields}
                                    value={startDate}
                                    onChange={(evt) => {
                                        setStartDate(
                                            evt.target.value
                                        );
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </FormControl>
                            <FormControl
                                className={classes.formControl}
                            >
                                <TextField
                                    id="date"
                                    label="End date"
                                    type="datetime-local"
                                    className={classes.textFields}
                                    value={endDate}
                                    onChange={(evt) =>
                                        setEndDate(
                                            evt.target.value
                                        )
                                    }
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </FormControl>                                                
                            <Button className={classes.rangeBtn}
                                size="small"
                                variant="contained"
                                color="primary"
                                onClick={applyDateRangeHandle}
                                title="Refresh Dashboard"
                            >Apply</Button>
                        </Grid>
                    )}
 <div className="mobile-ui">
                    {isAdmin  && (
                        <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            onClick={onClickRefeshDashboard}
                            className={classes.addWidgetButton}
                            title="Refresh Dashboard"
                        >
                        <Refresh />
                        </Button>
                    )}
                    {isAdmin  && (
                        <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            onClick={onClickAddWidget}
                            className={classes.addWidgetButton}
                            title="Add Widget"
                        >
                        <Add />
                        </Button>
                    )}
                    {isAdmin  && (
                        <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            onClick={onClickAddForm}
                            className={classes.addWidgetButton}
                            title="Add Flexible Form"
                        >
                        <FileCopyOutlined/>
                        </Button>
                    )}
                    {isMenu && isAdmin && (
                        <Button
                            size="small"
                            variant="contained"
                            onClick={() => saveMenuInfo()}
                            color="primary"
                            className={classes.saveButton}
                            title="Save Navigations"
                        >
                            <Save fill="#ccc" />
                        </Button>
                    )}
                    <FormControl
                        className={
                            classes.themeFormControl
                        }
                    >
                        <Select
                            className={classes.themeDropDownList}
                            id="theme-select"
                            value={selectTheme}
                            onChange={(evt) =>
                                onSwicthTheme(evt)
                            }
                            variant="outlined"
                        >
                          
                                {Constants.THEMES.map(
                                    (theme) => {
                                        return (
                                            <option value={theme} className={classes.themeFormOption}>{theme}</option>

                                        );
                                    }
                                )}
                         

                        </Select>
                    </FormControl>
                    {/* <Switch
                        checked={darkMode}
                        onChange={() => onSwicthTheme()}
                    /> */}
                     
                    <Button
                        size="small"
                        variant="contained"
                        onClick={handleClick}
                        color="primary"
                        aria-haspopup="true" 
                        className={classes.addWidgetButton}
                        title="Save Navigations">
                        <AccountCircleIcon fill="#ccc" />
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}>
                        <MenuItem onClick={() => navigateToScreen('/profile')}>
                            Profile
                        </MenuItem>
                        <MenuItem onClick={onLogoutHandler}>
                            Logout
                        </MenuItem>

                    </Menu>
               </div>
                </Toolbar>
                
            </AppBar>

            {isOpen ? (
                <WidgetConfigDialog
                    widgetConfig={selectedWidget}
                    onCloseDialog={closeAddEditWidgetDialog}
                />
            ) : null}
                        {isOpenForm ? (
                <FormBuilderDialog
                    onCloseDialog={closeAddFormDialog}
                />
            ) : null}
        </div>
    );
};

export default Header;
