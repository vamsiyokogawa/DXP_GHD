import React, { Component } from "react";
import HeaderLabel from "./HeaderLabel";
import {
  TextField
 } from "@material-ui/core";
const TextInput=(props)=> {
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
      
    } : {}
    
    return (
      <>
          <TextField
            id="text-field"
            variant="outlined"
            label={item.label}
            className={className} 
            {..._props}
          />
        </>
    );
}
export default TextInput;
