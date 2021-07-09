import React, { Component,useState } from "react";
import { findDOMNode } from "react-dom";
import flow from "lodash/flow";
import { DragSource, DropTarget } from "react-dnd";
import isEqual from "lodash/isEqual";
import HeaderBar from "../FormInputs/HeaderBar";
import switchItems from "../FormInputs/switchItems";
import {
  Button,
  Checkbox,
  Dialog,
  Fab,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  Input,
  InputLabel,
  ListItemText,
  makeStyles,
  useTheme,
  MenuItem,
  Select,
  TextField,
  Typography,
  withStyles,
  Slider,
  Switch,
  FormControlLabel
} from "@material-ui/core";
const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index
    };
  }
};

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (isEqual(dragIndex, hoverIndex)) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(
      component
    ).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY =
      (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%
    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.dragItem(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
};
const useStyles = makeStyles(theme => ({
  formBuilder: {
      // backgroundColor: '#000 !important',
     '& .jumbotron':{
          backgroundColor: '#000 !important',
          '& .rdw-editor-toolbar, .rdw-editor-main':{
              backgroundColor: '#000 !important',
          },
          '& .list-group, .list-group-item ':{
              backgroundColor: '#000 !important',
          }
          
     }
     
  },
  formControlChartDataSource: {
    '& .MuiFormControl-root':{
      marginTop: '16px'
    },
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

const FormInputs = (props) => {
  const classes = useStyles();
  const [hover, setHover] =useState(false)

  const {
      id,
      item,
      removeItem,
      showEditor,
      isDragging,
      connectDragSource,
      connectDropTarget
    } = props;

    const opacity = isDragging ? 0 : 1;

    return (
      connectDragSource &&
      connectDropTarget &&
      connectDragSource(
        connectDropTarget(
          <div
            style={{ opacity, margin: 10, background:"#181b1f", border: "1px solid #333" }}
            onMouseOver={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <HeaderBar
                    item={item}
                    id={id}
                    removeItem={removeItem}
                    showEditor={showEditor}
                    isHovering={hover}
                  />
            <Grid item={true} xs={12} md={6}  >
              <FormControl
                    className={classes.formControlChartDataSource}
                  >
                  
              {switchItems(item)}
              </FormControl>
            </Grid>
          </div>
        )
      )
    );
}

export default flow(
  DragSource("item", cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })),
  DropTarget("item", cardTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  }))
)(FormInputs);
