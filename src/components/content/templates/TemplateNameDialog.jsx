import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Input,
    InputLabel,
    makeStyles,
    MenuItem,
    Select,
    TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewTemplate } from "../../../redux/actions/templates.actions";
import * as Constants from "../../../constants/Constants";
import { uuid } from "uuidv4";

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 150,
        width: "100%",
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function TemplateNameDialog({ open, setOpen }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [selectedTemplate, setSelectedTemplate] = useState();
    const templates = useSelector((state) => state.templatesReducer.templates);

    const onTemplateSelection = (e) => {
        setSelectedTemplate(e.target.value);
    };

    const handleSubmit = () => {
        const id = uuid();
        dispatch(addNewTemplate({ id, name }));
        dispatch({
            type: Constants.EVT_DASHBOARDS_ADD_NEW_DASHBOARD,
            value: { id, selectedId: selectedTemplate.id },
        });
        setOpen(false);
        setName("");
    };

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="customized-dialog-title"
        >
            <DialogTitle
                id="customized-dialog-title"
                onClose={() => setOpen(false)}
            >
                Add New Template
            </DialogTitle>
            <DialogContent dividers>
                <div style={{ width: 230, height: 70 }}>
                    <TextField
                        id="standard-basic"
                        label="Template Name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>

                <FormControl className={classes.formControl}>
                    <InputLabel id="column-list">Copy from Template</InputLabel>
                    <Select
                        labelId="columns-select-required-label"
                        id="columns-select-required"
                        onChange={(evt) => onTemplateSelection(evt)}
                        className={classes.selectEmpty}
                        label={"Select Template"}
                        input={<Input />}
                    >
                        {templates.map((template) => {
                            return (
                                <MenuItem key={template.id} value={template}>
                                    {template.name}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button
                    autoFocus
                    onClick={() => setOpen(false)}
                    color="primary"
                >
                    Cancel
                </Button>
                <Button autoFocus onClick={handleSubmit} color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default TemplateNameDialog;
