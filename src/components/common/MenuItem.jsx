import { useEffect, useState } from "react";
import {
    Collapse,
    createStyles,
    Divider,
    Icon,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import * as Constants from "../../constants/Constants";
import SiteLogo from "../../assets/site.png"; 
import FactoryLogo from "../../assets/factory.png"; 
import PumpLogo from "../../assets/pump.png";
import CompanyLogo from "../../assets/company.png";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardArrowDown, KeyboardArrowRight, NoEncryption } from "@material-ui/icons";
import { ProSidebar, Menu, SubMenu } from 'react-pro-sidebar';
const useStyles = makeStyles((theme) =>
    createStyles({
        menuItemCenter: {
            padding:'15px 20px 15px 35px !important',
            borderRadius:'0 !important',
            borderTop:'1px solid transparent',
            borderBottom:'1px solid transparent',
       
           '&:hover':{
            borderTop:'1px double #313237',
            borderBottom:'1px solid  #313237',
                "& span": {
                    color:'#fff',
                },
           },

        },
       
        menuItemIcon: {
            color: "#97c05c",
            minWidth: "30px",
            marginLeft:'0px',
            zIndex:99,
            marginRight:'14px',
        },
        list: {
            paddingLeft: "10px",
            background: theme.palette.bg.popperColor
        },
        MuiListItem:{
            padding:'15px 22px 15px 30px !important',
            borderRadius:'0 !important',
            overflowX:'hidden !important',
           
        },
        typography: {
            'root':{
            color:'#b0aeb9 !important',
            fontSize:'15px !important',
        },
        },
        listItemText: {
          marginLeft:0,
            "& span": {
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                color:'#b0aeb9',
                fontSize:'15px',
            },
            "& ul.p": {
                display: "none",
            },
        },

        arrowIcon: {
            paddingLeft: 8,
            position: "absolute",
            right: 20,
            zIndex:99,
            "& .MuiSvgIcon-root": {
                fontSize: 20,
                verticalAlign: "bottom",
            },
        },
    })
);

const MenuItem = (props) => {
    const classes = useStyles();
    const {
        node,
        selectedNode,
        onItemClick,
        handleAddIconClick,
        handleDeleteClick,
    } = props;

    const isAdmin = useSelector((state) => state.loginReducer.isAdmin);

    const showSidebar = useSelector((state) => state.commonReducer.showSidebar);

    const dispatch = useDispatch();

    const { name, level, id, children = [], expanded } = node;
    const isExpandable = children && children.length > 0;
    const [open, setOpen] = useState(expanded);

    useEffect(() => {
        if (open !== expanded) setOpen(expanded);
    }, [expanded]);

    const toggleMenu = (e) => {
        e.stopPropagation();
        setOpen(!open);
    };

    const handleClick = () => {
        // if (!showSidebar) {
            dispatch({
                type: Constants.EVT_SHOW_SIDEBAR,
                value: false,
            });
        // }

         onItemClick(id);
    };

    const getIconByLevel = (nodeType) => {
        switch (nodeType) {
            case Constants.navigationType.NODE_1.level:
                // return CompanyLogo;
                return "https://reactjsimagelib.blob.core.windows.net/assets/company.png";
            case Constants.navigationType.NODE_2.level:
                // return SiteLogo;
                return "https://reactjsimagelib.blob.core.windows.net/assets/site.png";
            case Constants.navigationType.NODE_3.level:
                // return FactoryLogo;
                return "https://reactjsimagelib.blob.core.windows.net/assets/factory.png";
            case Constants.navigationType.NODE_4.level:
                // return PumpLogo;
                return "https://reactjsimagelib.blob.core.windows.net/assets/pump.png";
            default:
                // return FactoryLogo;
                return "https://reactjsimagelib.blob.core.windows.net/assets/other.png";
        }
    };

    const MenuItemRoot = (
        
        <ListItem 
            button
            className={
                classes.menuItemCenter+ " list-item"
            }
            selected={id === selectedNode}
            onClick={handleClick}
        >
            {isExpandable && (
                <div className={classes.arrowIcon} onClick={toggleMenu}>
                    {open ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
                </div>
            )}

            <ListItemIcon className={classes.menuItemIcon}>
                <img
                    src={getIconByLevel(level)}
                    alt={level}
                    height={30}
                    width={30}
                />
            </ListItemIcon>
         
                    <ListItemText
                        primary={name}
                        className={classes.listItemText}
                    />
                    {isAdmin && (
                        <div className="controls">
                            <Icon
                                className="delete-btn"
                                onClick={(e) => handleDeleteClick(e, node)}
                            >
                                <DeleteIcon />
                            </Icon>
                            <Icon
                                className="add-btn"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleAddIconClick(e, node);
                                }}
                            >
                                <AddIcon />
                            </Icon>
                        </div>
                    )}
        </ListItem>
    );

    const MenuItemChildren = isExpandable ? (
        <Collapse in={open} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding className={classes.list}>
                {children.map((item, index) => (
                    <MenuItem
                        node={item}
                        key={index}
                        selectedNode={selectedNode}
                        onItemClick={onItemClick}
                        showSidebar={showSidebar}
                        handleAddIconClick={handleAddIconClick}
                        handleDeleteClick={handleDeleteClick}
                    />
                ))}
            </List>
        </Collapse>
    ) : null;

    return (
        <>
            {MenuItemRoot}
            {MenuItemChildren}
        </>
    );
};

export default MenuItem;
