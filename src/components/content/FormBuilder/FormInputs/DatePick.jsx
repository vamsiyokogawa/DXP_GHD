import React, { Component } from 'react';
import HeaderLabel from './HeaderLabel';
import {
  TextField
 } from "@material-ui/core";
const DatePick=(props)=> {
 
    const  {
      meta,
      item,
      input,
      label,
      required,
      readOnly,
      formInput,
      generator,
      showError,
      defaultValue,
    } = props;

    const _props = generator ? {
      value: defaultValue || input.value,
      onChange: val => input.onChange(val),
      disabled: readOnly,
    } : {
      value: new Date()
    }
    
    const renderDate = (startDate = null, endDate = null) => {
      switch(true) {
        case startDate !== null && endDate !== null:
          return <TextField
                        id="date"
                        type="datetime-local"
                        endDate={new Date(endDate)}
                        startDate={new Date(startDate)}
                        {..._props}
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
        case startDate !== null:
          return <TextField
              id="date"
              type="datetime-local"
              startDate={new Date(startDate)}
              {..._props}
              InputLabelProps={{
                shrink: true
              }}
            />

        case  endDate !== null:
          return <TextField
                  id="date"
                  type="datetime-local"
                  endDate={new Date(endDate)}
                  {..._props}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
        default:
          return <TextField
                id="date"
                type="datetime-local"
                {..._props}
                InputLabelProps={{
                  shrink: true
                }}
              />
      }
    }

    return (
      <>
        
          {generator 
            ? renderDate(formInput.startDate, formInput.endDate)
            : <TextField
            type="datetime-local"
            variant="outlined"
            label={item.label}
            {..._props}
            InputLabelProps={{
              shrink: true
            }}
          />}
        
      </>
    )
}

export default DatePick;