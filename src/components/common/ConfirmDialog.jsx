import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@material-ui/core";
import React from "react";

function ConfirmDialog(props) {
    const {
        open,
        title,
        agreeText = "Agree",
        disagreeText = "Disagree",
        handleConfirmClose,
        handleConfirmAgreee,
    } = props;
    return (
        <Dialog
            open={open}
            onClose={handleConfirmClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Alert"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {title}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleConfirmClose} color="primary">
                    {disagreeText}
                </Button>
                <Button onClick={handleConfirmAgreee} color="primary" autoFocus>
                    {agreeText}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmDialog;
