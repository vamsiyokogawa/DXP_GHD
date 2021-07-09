import React, { Component } from "react";
import HeaderLabel from "./HeaderLabel";
import {
 Button
} from "@material-ui/core";
const Buttons =(props) => {
    const  {
      item
    } = props;
    return (
      <div>
        <Button
          size="small"
          type="submit"
          variant="contained"
          color="primary"
        >
          {item.label}
        </Button>
      
      </div>
    );
}

export default Buttons;
