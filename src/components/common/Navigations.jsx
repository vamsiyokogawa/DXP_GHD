import {
    createStyles,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Icon,
    makeStyles,
} from "@material-ui/core";
import React,{useState,useRef,useImperativeHandle,forwardRef} from "react";
import { useHistory } from "react-router";
import AppsIcon from '@material-ui/icons/Apps';
import PeopleIcon from "@material-ui/icons/People";
import DashboardIcon from '@material-ui/icons/Dashboard';
import { useSelector ,useDispatch} from "react-redux";
import { ReactComponent as Templates } from "../../assets/navs/templates.svg";
import { ReactComponent as Roles } from "../../assets/navs/roles.svg";
import { ReactComponent as DataSources } from "../../assets/navs/data_source.svg";
import { ReactComponent as Tenants } from "../../assets/navs/tenants.svg";
import { ReactComponent as Users } from "../../assets/navs/users.svg";
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import TemplatesNavigation from "../content/templates/TemplatesNavigation";
import Menus from './Menus'
import 'react-pro-sidebar/dist/css/styles.css';

import * as Constants from "../../constants/Constants";
import { getBreadcrumb } from "../../constants/Utils";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
const useStyles = makeStyles((theme) =>
    createStyles({
        list: {
            // marginTop: "auto",
              '&.pro-sidebar > .pro-sidebar-inner': {
                
                background: `${theme.palette.bg.popperColor} !important`,
                '& .popper-inner':{
                    background: `${theme.palette.bg.popperColor}`,
                },
               },
               '& .pro-menu-item':{
                   '&:hover':{
                    //    backgroundColor:'#111217 !important'
                    background: theme.palette.bg.popperColor
                   },
               }
        },
        menuItem: {
            paddingLeft: 15,
            borderBottom:
                theme.palette.type === "light"
                    ? "1px solid #497fb2"
                    : "1px solid #525151",
            "& .MuiListItemIcon-root": {
                // minWidth: 30,
                background:'transparent',
            },
        },
        icon: {
            color: theme.palette.color.primary,
            height: 15,
            width: 15,
        },
    })
);

const Navigations = forwardRef((props, ref) => {
    const classes = useStyles();
    const history = useHistory();
    const path = useSelector((state) => state.commonReducer.path);
    const isAdmin = useSelector((state) => state.loginReducer.isAdmin);
    const showSidebar = useSelector((state) => state.commonReducer.showSidebar);
    
    const menuNavigations = useSelector(
        (state) => state.contentReducer.navigations
    );
    const [selectedNode, setSelectedNode] = useState("");
    const dispatch = useDispatch();
    const navigations = [
        {
            name: "Menus",
            path: "/home",
            icon: <AppsIcon />,
            fontSize:'large',
            isPublic: true,
            width: 30,
            height: 30
            
        },
        {
            name: "Template Management",
            path: "/templates",
            icon: <Templates />,
            isPublic: false,
        },
        {
            name: "Role Management",
            path: "/roles",
            icon: <Roles />,
            isPublic: false,
        },
        {
            name: "User Management",
            path: "/users",
            icon: <Users />,
            isPublic: false,
        },
        {
            name: "Data Source Management",
            path: "/datasources",
            icon: <DataSources />,
            isPublic: false,
        },
        {
            name: "Tenant Management",
            path: "/tenants",
            icon: <Tenants />,
            isPublic: false,
        },
        {
            name: "Role Menu Mapping",
            path: "/role-mapping",
            icon: <Users />,
            isPublic: false,
        },
    ];
    
    if(props.menus && props.menus.length > 0){
        navigations.map(item =>{
            if('/home' === item.path){
                return item.children = props.menus;
            } else if('/templates' === item.path){
                return item.children = props.menus;
            } else {
                return item.children = [];
            }
        })
    }

    const onTreeItemClick = (id) => {
        setSelectedNode(id);
        
        dispatch({
            type: Constants.EVT_DASHBOARDS_SET_SELECTED_ID,
            value: id,
        });

        const breadcrumb = getBreadcrumb(menuNavigations, id);
        dispatch({
            type: Constants.EVT_SET_NAVIGATIONS_BREADCRUMB,
            value: breadcrumb,
        });
        
    };
    // useImperativeHandle(ref, () => {
    //     return {
    //         onTreeItemClick: onTreeItemClick,
    //     };

    // });
    const handleClick = (item) => {
        dispatch({
            type: Constants.EVT_SHOW_SIDEBAR,
            value: false,
        });
        history.push(item.path)
    };
    return (
    <List className={classes.list}>
        <ProSidebar collapsed={!showSidebar} className={classes.list}  style={{background:'#181b20'}}>
            <Menu iconShape="square">
            {navigations.map((item) => {
                let needToShow = (isAdmin) ? true : ((item.isPublic) ? true : false);
                if (needToShow) {
                    return (item && item.children && item.children.length > 0) ?
                        <SubMenu key={item.path} title={item.name} icon={item.icon} selected={item.path === path} onClick={() => history.push(item.path)}>
                        {(item && item.path === '/home')? <Menus selectedNode={selectedNode} onTreeItemClick={onTreeItemClick} />:<TemplatesNavigation/> }
                    </SubMenu>
                    : <MenuItem icon={item.icon} onClick={() => handleClick(item)}>{item.name} </MenuItem>
                }
            })}
            
            </Menu>
        </ProSidebar>
    </List>
);
});

export default Navigations;
