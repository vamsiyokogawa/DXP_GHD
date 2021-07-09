import React from "react";
import ToolbarItem from "../ToolbarItem/ToolbarItem";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  dragItem,
  addItem
} from "../../../../redux/actions/formBuilderActions";
import {
  Grid,
} from "@material-ui/core";
const Toolbar = ({ items }) => {
  const dispatch = useDispatch();
    
  const onAddItem=(key)=>{
    dispatch(addItem(key));
  }
  
  return (
  <Grid >
    <h3
      style={{ height: "50px", margin: 0 }}
    >
      Toolbox
    </h3>
    <ul className="list-group">
      {items.map(item => (
        <ToolbarItem data={item} addItem={onAddItem} key={item.key} />
      ))}
    </ul>
  </Grid>);
}

export default Toolbar;
