import React, { useState } from "react";
import _ from "lodash";
import {
    FormControl,
    makeStyles,
    FormControlLabel,
    Switch,
    Grid
} from "@material-ui/core";
import ColorPicker from "material-ui-color-picker";

const useStyles = makeStyles((theme) => ({
    highlight: {
        color: theme.palette.highlight ,
        fontWeight: 600,
        fontSize: 14
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: '46%',
        [theme.breakpoints.down(767)]: {
            minWidth: '100%'
          },
          [theme.breakpoints.up('md')]: {
            minWidth: '46%'
          },
          [theme.breakpoints.up('lg')]: {
            minWidth: 150,
          }
    },
}));

export const LabelColorComponent = props => {
   
    const classes = useStyles();
    const colorObject = props.colorComponent;
    let labelColorData = [];

    if(props.isChecked) {
        labelColorData = props.colorObjectProp;
    } else {
        _.map(colorObject, (object) => {
            labelColorData[object.key] = object.field;
        });
    }
    
    const [selectColor, setSelectColor] = useState(labelColorData);
    const [isChecked, setIsChecked] = useState(props.isChecked || false);

    const onColorChangeHandler = (color, field) => {
        setSelectColor({ ...selectColor, [field]: color});
        props.colorObjectHandler(selectColor);
    }

    const onHandleChecked = e => {
        setIsChecked(e.target.checked);
        props.isColorCheckedEvent(e.target.checked);
    }

    return (
        <Grid container alignItems="center" spacing={1}>
            <Grid item={true} xs={12} >
                <FormControlLabel
                    control={
                    <Switch
                        checked={isChecked}
                        onChange={onHandleChecked}
                        name="checkedB"
                        
                    />
                    }
                    label="Show Label Background Color"
                />
            </Grid>

            {isChecked && colorObject.map((object, index) => {
                return <Grid item={true} xs={12} md={3} sm={3} key={index}>
                    <FormControl
                        className={classes.formControl}
                        key={index}
                    >
                        <ColorPicker
                            key={index}
                            name="color"
                            defaultValue={object.field}
                            label={object.key}
                            value={selectColor[object.key]}
                            onChange={(val) => onColorChangeHandler(val, object.key)}
                        />
                    </FormControl>
                </Grid>
            })}
        </Grid>
    );
}