import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { uuid } from "uuidv4";
import {
    Button,
    Card,
    CardContent,
    makeStyles,
    Paper,
} from "@material-ui/core";
import "./css/Home.css";
import "./css/Navigator.css";

import Header from "./Header";
import Menus from "./Menus";
import Navigations from "./Navigations";
import WidgetContainer from "../content/WidgetContainer";
import TextInputDialog from "./TextInputDialog";
import Footer from "./Footer";

import * as Constants from "../../constants/Constants";

const useStyles = makeStyles((theme) => ({
    plusBtn: {
        //margin: "5px 7px",
        padding: "5px",
        color: "#d8d9da",
        //border: "1px solid #c7d0d9",
        fontSize: "12px",
        backgroundColor: theme.palette.bg.buttonPrimary,
        minWidth: "35px",
    },
    flexBox: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
    },
    sidebar: {
        backgroundColor: theme.palette.bg.sidebar,
    },
    mainContainer: {
        background: theme.palette.bg.container,
	    paddingLeft: "7px",
	    paddingRight: "7px",
       
    }
}));

const Home = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const navigationsRef = useRef(null);

    const [openAddMenu, setOpenAddMenu] = useState(false);

    const isAdmin = useSelector((state) => state.loginReducer.isAdmin);

    const showSidebar = useSelector((state) => state.commonReducer.showSidebar);

    const isLogged = useSelector((state) => state.loginReducer.isLogged);

    const selectedDashboard = useSelector(
        (state) => state.dashboardsReducer.selectedDashboard
    );
    const navigations = useSelector(
        (state) => state.contentReducer.navigations
    );


    const handleAddNewMenu = (name, selectedTemplate) => {
        setOpenAddMenu(false);

        const id = uuid();
        const navigation = {
            ...Constants.new_navigation,
            name,
            id,
            parent_id: null,
            children: [],
            level: 1,
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

    useEffect(() => {
        if (isLogged) {
            history.push("/home");
        } else {
            history.push("/");
        }
    }, [isLogged]);


    return (
        <>
            <Paper style={{ height: "100%", width: "100%" }}>
                <div className="app-container">
                    <Header navRef={navigationsRef} />
                    <div className="app-content-container">
                        <div
                            className={
                                classes.sidebar +
                                (showSidebar
                                    ? " app-nav-container"
                                    : " app-nav-container-hide")
                            }
                            // style={{ 'display': (showSidebar)? 'none': 'block' }}
                        >
                            <Card style={{ height: "100%" }}>
                                <CardContent className={classes.flexBox}>
                                    {/* <Menus
                                        ref={navigationsRef}
                                        className={classes.menus}
                                    /> */}

                                    <Navigations ref={navigationsRef} menus={navigations}/>
                                </CardContent>
                            </Card>
                        </div>

                        <div className={classes.mainContainer + " app-workarea-container"}>
                            <div className="scrollable-container">
                            {/* <div id="myNav" class="overlay">
                            <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
                                <div class="overlay-content"> */}
                                    <WidgetContainer />
                                {/* </div>
                            </div>                                 */}
                                <Footer />
                            </div>
                        </div>
                    </div>
                </div>
            </Paper>
            <TextInputDialog
                open={openAddMenu}
                setOpen={setOpenAddMenu}
                handleAdd={handleAddNewMenu}
            />
        </>
    );
};

export default Home;
