



import React from "react";
import classNames from "classnames";
import { DragSource } from "react-dnd";
import { connect } from "react-redux";
import { compose } from "redux";
import { addItem } from "../../../../redux/actions/formBuilderActions";

// type, spec and collect are the paramters to the DragSource HOC
const type = props => "items";

const spec = {
  beginDrag(props) {
    return {
      item: props.data.key
    };
  },
  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) return; // return if not dropped in the Preview component
    props.addItem(props.data.key);
  }
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
});

const ToolbarItem = props => {
  const { isDragging, connectDragSource, data } = props;

  const opacity = isDragging ? 0.5 : 1;
  const backgroundColor = isDragging ? "lightgray" : "white";

  return connectDragSource(
    <li
      className="list-group-item mb-1 toolbar-item"
      onClick={() => props.addItem(props.data.key)}
      style={{padding: "8px 0px", background:"#34373d", marginBottom:'10px', cursor:'pointer'}}
    >
      <i className={classNames(data.icon, "mr-3")} />
      {data.name}
    </li>
  );
};

export default compose(
  DragSource(type, spec, collect)
)(ToolbarItem);
