import React, { Component } from "react";
import HeaderLabel from "./HeaderLabel";
import {
  TextField
 } from "@material-ui/core";
const NumberInput =(props) => {
    const  {
      type,
      meta,
      label,
      item,
      input,
      readOnly,
      required,
      generator,
      className,
      showError,
      defaultValue,
    } = props;
   
    const _props = generator ? {
      ...input,
      disabled: readOnly,
      value: defaultValue || input.value,
      onChange: e => input.onChange(e.target.value),
      style: {
        borderColor: meta.touched && required && meta.error ? "red" : ""
      },
    } : {}
    
    return (
      <>
        
        <TextField
            {..._props}
            label={item.label}
            variant="outlined"
            className={className} 
          />
      </>
    );
}

export default NumberInput;
