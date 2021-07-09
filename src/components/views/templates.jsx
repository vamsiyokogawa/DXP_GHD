import {
    Button,
    Card,
    CardContent,
    makeStyles,
    Paper,
} from "@material-ui/core";
import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../common/Footer";
import Header from "../common/Header";
import WidgetContainer from "../content/WidgetContainer";
import * as Constants from "../../constants/Constants";
import TemplatesNavigation from "../content/templates/TemplatesNavigation";
import { Add, Save } from "@material-ui/icons";
import { saveTemplatesStructure } from "../../redux/actions/templates.actions";
import Navigations from "../common/Navigations";
import TemplatesInputDialog from '../content/templates/TemplatesInputDialog';
import { uuid } from "uuidv4";
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

const Templates = () => {    
    const classes = useStyles();
    const dispatch = useDispatch();

    const showSidebar = useSelector((state) => state.commonReducer.showSidebar);
    const templates = useSelector((state) => state.templatesReducer.templates);  
    useEffect(() => {
        if (templates.length) {
            dispatch({
                type: Constants.EVT_DASHBOARDS_SET_SELECTED_ID,
                value: templates[0].id,
            });
        }
    }, [templates]);
    const [addDialogOpen, setAddDialogOpen] = useState(false);

    const onClickAddWidget = () => {
        let new_widget = { ...Constants.new_widget };

        dispatch({
            type: Constants.EVT_OPEN_CONFIG,
            value: new_widget,
        });
    };
    const onClickAddConfig = () => {
        setAddDialogOpen(true);
    };

    const handleSaveTemplateClick = () => {
        dispatch(saveTemplatesStructure());
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
                            <CardContent className="columnflexBox">
                                {/* <TemplatesNavigation /> */}
                                <Navigations menus={templates}/>
                            </CardContent>
                        </Card>
                    </div>

                    <div
                        className={
                            classes.mainContainer + " app-workarea-container"
                        }
                    >
                        <div className="app-control-panel-container flex-end">
                            <Button
                                size="small"
                                variant="contained"
                                color="primary"
                                onClick={onClickAddConfig}
                                startIcon={<Save />}
                                className="save-template-btn"
                            >
                                Datasource Configration
                            </Button>
                            <Button
                                size="small"
                                variant="contained"
                                color="primary"
                                onClick={handleSaveTemplateClick}
                                startIcon={<Save />}
                                className="save-template-btn"
                            >
                                Save Template
                            </Button>
                            <Button
                                size="small"
                                variant="contained"
                                color="primary"
                                startIcon={<Add />}
                                onClick={onClickAddWidget}
                            >
                                Add Widget
                            </Button>
                        </div>
                        <div className="scrollable-container">
                            <WidgetContainer />
                            <Footer />
                        </div>
                        <TemplatesInputDialog                           
                            open={addDialogOpen}
                            setOpen={setAddDialogOpen}                                                        
                            data={addDialogOpen}                                                        
                        />
                    </div>
                </div>
            </div>
        </Paper>
    );
};

export default Templates;
