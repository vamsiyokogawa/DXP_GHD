import React, {
    useState,
    useEffect,
    forwardRef,
    useImperativeHandle,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { uuid } from "uuidv4";
import _ from "lodash";
import { List, makeStyles, createStyles, Paper, Button } from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

import ConfirmDialog from "./ConfirmDialog";
import MenuItem from "./MenuItem";
import TextInputDialog from "./TextInputDialog";
import * as Constants from "../../constants/Constants";
import { getBreadcrumb } from "../../constants/Utils";
import "./css/Navigator.css";

const useStyles = makeStyles((theme) =>
    createStyles({
        appMenu: {
            width: "100%",
            padding: 0,
            flex: 1,
            overflow: "auto",
            minHeight: "auto",
            margin: "0px"
        },
        menuItemIcon: {
            color: "#97c05c",
        },
        root: {
            padding: "2px 4px",
            display: "flex",
            alignItems: "center",
            marginRight: 10,
            marginLeft: 10,
            marginTop: 10,
            marginBottom:10,
            backgroundColor: theme.palette.bg.header,
            borderRadius: '5px',
            '& .MuiListItem-root,.Mui-selected': {
                color: '#003d88',
                // backgroundColor:'#181b20 !important',
                // overflowX:'hidden !important'
            },
            
            
            '&.search-dropdown':{
                background: theme.palette.bg.sidebar,
                boxShadow:'unset',
            },
        },
        searchInput: {
            marginLeft: theme.spacing(1),
            flex: 1,
            fontSize: 16,
            color: theme.palette.color.primary,
        },
        iconButton: {
            padding: 10,
            color: theme.palette.color.primary,
        },
        menuItem: {},
    })
);

const Menus = (props, ref) => {
    const classes = useStyles();

    const showSidebar = useSelector((state) => state.commonReducer.showSidebar);
    const dashboardId = useSelector((state) => state.dashboardsReducer.selectedDashboardId);
    const isAdmin = useSelector((state) => state.loginReducer.isAdmin);

    const navigations = useSelector(
        (state) => state.contentReducer.navigations
    );

    // const [selectedNode, setSelectedNode] = useState("");
    const [parentNode, setParentNode] = useState(null);
    const [openAddMenu, setOpenAddMenu] = useState(false);
    const [confimOpen, setConfimOpen] = useState(false);
    const [focusedNode, setFocusedNode] = useState(null);
    const [searchKey, setSearchKey] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        if (navigations && navigations.length && !dashboardId) {
            getExpandedNodes(navigations);
        }
    }, [navigations]);
    const getExpandedNodes = (navigations) => {
        let prevNav = null;
        let current = navigations[0];
 
        while (current) {
            current.expanded = true;
            prevNav = current;
            current = current.children && current.children[0];
        }

        onTreeItemClick(prevNav.id);
    };

    const onTreeItemClick = (id) => {
        props.onTreeItemClick(id)
        // dispatch({
        //     type: Constants.EVT_DASHBOARDS_SET_SELECTED_ID,
        //     value: id,
        // });

        // const breadcrumb = getBreadcrumb(navigations, id);
        // console.log(breadcrumb)
        // dispatch({
        //     type: Constants.EVT_SET_NAVIGATIONS_BREADCRUMB,
        //     value: breadcrumb,
        // });
    };

    const handleAddIconClick = (e, node) => {
        e.stopPropagation();
        setParentNode(node);
        setOpenAddMenu(true);
    };

    const handleAddNewMenu = (name, selectedTemplate) => {
        setOpenAddMenu(false);

        const id = uuid();
        const navigation = {
            ...Constants.new_navigation,
            name,
            id,
            parent_id: parentNode.id,
            children: [],
            level: Number(parentNode.level) + 1,
        };

        dispatch({
            type: Constants.EVT_ADD_NAVIGATION,
            value: navigation,
        });

        dispatch({
            type: Constants.EVT_DASHBOARDS_ADD_NEW_DASHBOARD,
            value: { id, selectedId: selectedTemplate.id },
        });
    };

    const handleDeleteClick = (e, node) => {
        console.log()
        e.stopPropagation();

        setFocusedNode(node);
        setConfimOpen(true);
    };

    const handleConfirmAgreee = () => {
        setConfimOpen(false);
        if (focusedNode) {
            dispatch({
                type: Constants.EVT_DELETE_NAVIGATION,
                value: focusedNode.id,
            });
        }
    };

    const handleConfirmClose = () => {
        setConfimOpen(false);
    };

    const onSearchText = (event) => {
        let searchKey = event.target.value;
        setSearchKey(searchKey);
    };

    const dfs = (node, term, foundIDS) => {
        // Implement your search functionality
        let isMatching =
            node.name &&
            node.name.toLowerCase().indexOf(term.toLowerCase()) > -1;

        if (Array.isArray(node.children)) {
            node.children.forEach((child) => {
                const hasMatchingChild = dfs(child, term, foundIDS);
                isMatching = isMatching || hasMatchingChild;
            });
        }

        // We will add any item if it matches our search term or if it has a children that matches our term
        if (isMatching && node.id) {
            foundIDS.push(node.id);
        }

        return isMatching;
    };

    const filter = (data, matchedIDS) => {
        return data
            .filter((item) => matchedIDS.indexOf(item.id) > -1)
            .map((item) => ({
                ...item,
                expanded: true,
                children: item.children
                    ? filter(item.children, matchedIDS)
                    : [],
            }));
    };

    const search = (term) => {
        if (_.isEmpty(term)) {
            return navigations;
        }

        // We wrap data in an object to match the node shape
        const dataNode = {
            children: navigations,
        };

        const matchedIDS = [];
        // find all items IDs that matches our search (or their children does)
        dfs(dataNode, term, matchedIDS);

        // filter the original data so that only matching items (and their fathers if they have) are returned
        return filter(navigations, matchedIDS);
    };

    const loadMenu = () => {
        return search(searchKey).map((item, index) => (
            <MenuItem
                node={item}
                key={index}
                selectedNode={props.selectedNode}
                onItemClick={onTreeItemClick}
                handleAddIconClick={handleAddIconClick}
                handleDeleteClick={handleDeleteClick}
            />
        ));
    };

    const onClickAddNavigation = () => {
        setOpenAddMenu(true);
    };
   
    return navigations ? (
        <>
            {isAdmin && _.isEmpty(search(searchKey))  && (
                <div
                    className="app-control-panel-container"
                    style={{
                        padding: !showSidebar
                            ? 0
                            : "auto",
                    }}
                >
                    <Button
                        size="small"
                        variant="contained"
                        onClick={onClickAddNavigation}
                        color="primary"
                        className={classes.plusBtn}
                    >
                        +
                    </Button>
                </div>
            )}        
            <Paper className={classes.root + " search-dropdown"}>
                <InputBase
                    className={classes.searchInput}
                    placeholder="Search..."
                    onChange={onSearchText}
                    value={searchKey}
                    inputProps={{ "aria-label": "Search..." }}
                />
                <IconButton
                    type="submit"
                    className={classes.iconButton}
                    aria-label="search"
                >
                    <SearchIcon />
                </IconButton>
            </Paper>

            <List component="nav" className={classes.appMenu}>
                {loadMenu()}
            </List>
            <TextInputDialog
                open={openAddMenu}
                setOpen={setOpenAddMenu}
                handleAdd={handleAddNewMenu}
            />
            <ConfirmDialog
                open={confimOpen}
                title={"Are you sure you want to delete this Navigation item?"}
                handleConfirmAgreee={handleConfirmAgreee}
                handleConfirmClose={handleConfirmClose}
            />
        </>
    ) : null;
}

export default Menus;
