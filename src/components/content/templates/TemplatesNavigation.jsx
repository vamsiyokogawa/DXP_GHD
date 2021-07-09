import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Button,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    makeStyles,
} from "@material-ui/core";
import { AddOutlined, DeleteOutlined } from "@material-ui/icons";
import "../css/templates-navigation.css";
import { deleteTemplate } from "../../../redux/actions/templates.actions";
import TemplateNameDialog from "./TemplateNameDialog";
import ConfirmDialog from "../../common/ConfirmDialog";
import * as Constants from "../../../constants/Constants";

const useStyles = makeStyles((theme) => ({
    listItem: {
        cursor: "pointer",
        '& span':{
            color:'#b0aeb9 !important',
            fontSize:'15px !important',
            fontWeight:'normal !important',
            
        },
        '&:hover':{
            "& span": {
                color:'#fff !important',
            },
       },
    },
}));

function TemplatesNavigation() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { templates } = useSelector((state) => state.templatesReducer);

    const selectedDashboardId = useSelector(
        (state) => state.dashboardsReducer.selectedDashboardId
    );

    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const handleListItemClick = (id) => {
        dispatch({
            type: Constants.EVT_DASHBOARDS_SET_SELECTED_ID,
            value: id,
        });
    };

    const handleAddTemplateClick = () => {
        setAddDialogOpen(true);
    };

    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setDeleteConfirmOpen(true);
    };

    const handleConfirmAgreee = () => {
        dispatch(deleteTemplate(deleteId));
        setDeleteConfirmOpen(false);
    };

    const handleConfirmClose = () => {
        setDeleteConfirmOpen(false);
    };

    return (
        <>
            <List component="nav">
                {templates &&
                    templates.map((template) => (
                        <ListItem
                            selected={selectedDashboardId === template.id}
                            key={template.id}
                            onClick={() => handleListItemClick(template.id)}
                            className={classes.listItem}
                        >
                            <ListItemText primary={template.name} />
                            <ListItemSecondaryAction>
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={() =>
                                        handleDeleteClick(template.id)
                                    }
                                >
                                    <DeleteOutlined />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
            </List>
            <div className="btn-container">
                <Button
                    variant="contained"
                    color="default"
                    startIcon={<AddOutlined />}
                    onClick={handleAddTemplateClick}
                >
                    Add Template
                </Button>
            </div>
            <TemplateNameDialog
                open={addDialogOpen}
                setOpen={setAddDialogOpen}
            />
            <ConfirmDialog
                open={deleteConfirmOpen}
                title={"Are you sure you want to delete Template?"}
                handleConfirmAgreee={handleConfirmAgreee}
                handleConfirmClose={handleConfirmClose}
            />
        </>
    );
}

export default TemplatesNavigation;
