import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
    divClass: {
        position: 'absolute', 
        left: '50%', 
        top: '50%',
        transform: 'translate(-50%, -50%)'
    }
}));

function NoDataComponent() {
    const classes = useStyles();
    
    return (
        <div className={classes.divClass}>
            No data in response
        </div>
    );
}

export default NoDataComponent;
