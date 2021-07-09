import React, { Component } from 'react';
import {
  InputLabel
 } from "@material-ui/core";
class HeaderLabel extends Component {

  render() {
    const { label, required, readOnly } = this.props;
    return (
      
      <>
        <InputLabel id="lable" >
        {label}
                  </InputLabel>
      </>
    );
  }
}

HeaderLabel.defaultProps = {
  readOnly: false
}

export default HeaderLabel;