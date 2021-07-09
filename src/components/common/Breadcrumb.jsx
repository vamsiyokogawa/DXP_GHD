import { Breadcrumbs, Link, makeStyles, Typography } from "@material-ui/core";
import { theme } from "highcharts";
import React from "react";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    highlight: {
        color: theme.palette.highlight ,
        fontWeight: 600,
        fontSize: 14
    },
}));

function Breadcrumb({ handleClick }) {
    const classes = useStyles();
    const breadcrumb = useSelector((state) => state.contentReducer.breadcrumb);
    console.log('breadcrumb', breadcrumb);

    return (
        <Breadcrumbs aria-label="breadcrumb">
            {breadcrumb.map((item, index) => {
                if (index !== breadcrumb.length - 1) {
                    return (
                        <Link
                            color="inherit"
                            onClick={() => handleClick(item)}
                            key={item.id}
                        >
                            {item.name}
                        </Link>
                    );
                } else {
                    return (
                        <Typography key={item.id} className={classes.highlight}>
                            {item.name}
                        </Typography>
                    );
                }
            })}
        </Breadcrumbs>
    );
}

export default Breadcrumb;
