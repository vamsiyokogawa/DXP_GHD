import { Backdrop, CircularProgress, makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
    },
}));

function Loader({ loader }) {
    const classes = useStyles();
    const open = useSelector((state) => state.commonReducer.loader);

    return (
        <Backdrop className={classes.backdrop} open={loader || open}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}

export default Loader;
