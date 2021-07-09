import React from "react";
import { DropTarget } from "react-dnd";
import { connect } from "react-redux";
import { compose } from "redux";
import isEmpty from "lodash/isEmpty";
import {
  removeItem,
  dragItem,
  showEditor
} from "../../../../redux/actions/formBuilderActions";
import FormInputs from "./SortableFormInputs";
import { useDispatch, useSelector } from "react-redux";
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
// DropTarget parameters
const type = () => "items";

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  hovered: monitor.isOver(),
  item: monitor.getItem()
});

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
     
  }
}));

const Preview = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const previewItems = useSelector(state => state.formBuilderReducer.previewItems);
    const {
      hovered,
      onSubmit,
      connectDropTarget
    } = props;
    const onRemoveItem=(id)=>{
      dispatch(removeItem(id));
    }
    const onShowEditor=(item)=>{
      dispatch(showEditor(item));
    }
    const onDragItem=(item)=>{
      dispatch(dragItem(item));
    }
    const border = hovered ? "2px dashed #2185c7" : "1px solid #55575c" ;

    return connectDropTarget(
      <div style={{ height: "100%" }} className="mt-3">
        <div style={{ height: "100%" }}>
          <div
            className="jumbotron bg-default"
            style={{ border, minHeight: "55vh", paddingLeft:'0px', marginLeft: "4px" }}
          >
            {isEmpty(previewItems) && (
              <h3 className="list-group-item bg-light text-center text-muted" style={{paddingLeft:'15px'}}>
                Select / Drop an item from Toolbox
              </h3>
            )}

            {!isEmpty(previewItems) &&
              previewItems.map((item, i) => (
                <FormInputs
                  index={i}
                  item={item}
                  id={item.id}
                  key={item.id}
                  dragItem={onDragItem}
                  removeItem={onRemoveItem}
                  showEditor={onShowEditor}
                />
              ))}
          </div>
        </div>
      </div>
    );
  }
export default compose(
  DropTarget(type, {}, collect)
)(Preview);
