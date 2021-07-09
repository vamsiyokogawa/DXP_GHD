import React, { useState } from "react";
import { useSelector } from "react-redux";
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

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 150,
        width: "100%",
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function TextInputDialog({ open, setOpen, handleAdd }) {
    const classes = useStyles();

    const templates = useSelector((state) => state.templatesReducer.templates);

    const [name, setName] = useState("");
    const [selectedTemplate, setSelectedTemplate] = useState();
    const handleSubmit = () => {
        handleAdd(name, selectedTemplate);
        setName("");
    };

    const onTemplateSelection = (e) => {
        setSelectedTemplate(e.target.value);
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
                Add New item
            </DialogTitle>
            <DialogContent dividers>
                <div style={{ width: 230, height: 70 }}>
                    <TextField
                        id="standard-basic"
                        label="Menu Name"
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

export default TextInputDialog;
