import React, { useState } from "react";
import _ from "lodash";
import {
    FormControl,
    makeStyles,
    useTheme,
    withStyles,
    Menu,
    MenuItem,
    ListItemIcon,
    IconButton,
    ListItemText
} from "@material-ui/core";
import {
    ExpandMoreSharp,
    NotificationImportant
} from "@material-ui/icons/";

const useStyles = makeStyles((theme) => ({
    iconColor: {
        ...theme.palette.pumpDropdown.icon,
        '& .MuiListItemText-primary': {
            color: theme.palette.color.iconColor
        }
    },
    expandIcon: {
        padding: "0px",
        color: theme.palette.color.iconColor,
        marginTop: '-3px',
    }
}));


export const DropDowmMenuComponent = props => {
   
    const classes = useStyles();
    const [openTableItem, setOpenTableItem] = React.useState(null);
    const widgetId = props.content.widget_id;
    const checkSelectedTypeField = (typeof props.content.dataType !== 'undefined') ?  props.content.dataType : 'KPI1';
    const dataTableObject = [{
            id:1,
            text: 'Pump Data',
            key: 'KPI1'
        },
        {
            id:2,
            text: 'Alert',
            key: 'Alert'
        }, 
        {
            id:3,
            text: 'Sensor status',
            key: 'sensorstatus'
        }
    ]

    const handleTableChangeSelection = (event, widget) => {
        setOpenTableItem(event.currentTarget);
    };
    
    const handleTableonClose = (event, widget) => {
        setOpenTableItem(null);
    };

    const StyledMenu = withStyles(theme => ({
        paper: theme.palette.pumpDropdown.head
    }))(props => (
        <Menu
            elevation={0}
            getContentAnchorEl={null}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "center"
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "center"
            }}
            {...props}
        />
    ));

    const StyledMenuItem = withStyles(theme => ({
        root: {
            "&:focus": {
                backgroundColor: theme.palette.bg.headerwidget,
                "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                color: theme.palette.common.white
                }
            }
        }
    }))(MenuItem);

    const onLinkClick = (type, title) => {
        props.content.dataType = type;
        props.onDropDownChangeHandler(props.content.dataType, widgetId, props.content, title);
        setOpenTableItem(null);
    }
    
    return (
        <FormControl
        required
        className={classes.formControlChartDataSource}
        >
            <IconButton
            aria-label="close"
            className={`${classes.closeButton} ${classes.expandIcon}`}
            onClick={handleTableChangeSelection}
            >
                <ExpandMoreSharp fontSize={"inherit"} />
            </IconButton>

            <StyledMenu
                id="item-dropdown"
                key="item-dropdown"
                anchorEl={openTableItem}
                keepMounted
                open={Boolean(openTableItem)}
                onClose={handleTableonClose}
                className={classes.boxBorder}
            >   
                {dataTableObject.map((object, index) => {
                 
                return object.key !== checkSelectedTypeField ? 
                 <StyledMenuItem
                    key={index}
                    onClick={() => onLinkClick(object.key, object.text)}
                >
                    {/* <ListItemIcon className={classes.iconColor}>
                        <NotificationImportant fontSize={"inherit"} />
                    </ListItemIcon> */}

                    <ListItemText className={classes.iconColor} variant="inherit">
                        {object.text} 
                    </ListItemText>
                </StyledMenuItem>
                : ''})}
            </StyledMenu>
        </FormControl>
    )
}