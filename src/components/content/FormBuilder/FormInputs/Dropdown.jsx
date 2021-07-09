import React, { Component } from 'react';
import HeaderLabel from './HeaderLabel';
import {
  InputLabel
 } from "@material-ui/core";
import {
  Select, withStyles, makeStyles,
 } from "@material-ui/core";
 
 const useStyles = makeStyles(theme => ({
  formOption:{
    textTransform: 'capitalize',
    fontSize: '14px',
    padding: '7px',
    cursor:'pointer'
},
formControlChartDataSource: {
  margin: theme.spacing(1),
  minWidth: "100%",

  [theme.breakpoints.down("sm")]: {
    minWidth: "100%"
  },
  [theme.breakpoints.up("md")]: {
    minWidth: "100%"
  },
  [theme.breakpoints.up("lg")]: {
    minWidth: "100%",
    maxWidth: "100%"
  }
},
}));

const Dropdown =(props)=> {
  
  const classes = useStyles();
  
  const  {
      meta,
      item,
      label,
      input,
      disabled,
      required,
      readOnly,
      className,
      generator,
      showError,
      defaultValue,

    } = props;


    const _props = generator ? {
      
      ...input,
      disabled: readOnly,
      value: defaultValue || input.value,
      onChange: e => {
        input.onChange(e.target.value)
      },
      style: {
        borderColor: meta.touched && required && meta.error ? "red" : ""
      },
    } : {}

    const options = generator ? props.options : props.item.options; 

    return (
      <>
        <InputLabel id="lable" style={{paddingLeft: "15px"}}>
          {item.label}
        </InputLabel>
        <Select 
          className={className} 
          disabled={disabled} 
          variant="outlined"
          label={item.label}
          {..._props}
        >
          <option value={null} />
          {options.map(({ id, value }) => (
            <option className={classes.formOption} key={id} value={id}>{value}</option>
          ))}
        </Select>
       
      </>
    );
}

export default Dropdown;