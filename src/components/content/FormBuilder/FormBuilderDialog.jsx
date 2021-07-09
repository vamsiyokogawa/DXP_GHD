import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
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
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import CloseIcon from "@material-ui/icons/Close";
import uuid from "uuid/v4";
// import { FormBuilder } from "cb-react-forms";
import Builder from ".";
import {addNewTemplate} from "../../../redux/actions/formTemplate.actions";
import {removeEditorState} from "../../../redux/actions/formBuilderActions";
const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
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
       
    },
    formControlChartDataSource: {
      //margin: theme.spacing(1),
      minWidth: "100%",
      marginBottom:"10px",
  
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

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const FormBuilderDialog = props => {
  const { onCloseDialog } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const previewItems = useSelector(state => state.formBuilderReducer.previewItems);
  const editorVisible = useSelector(state => state.formBuilderReducer.editorVisible);
  const [name,setName] = useState(null)
  const theme = useTheme();
  const items = [
    {
      key: "Dropdown",
      name: "Dropdown",
      icon: "far fa-caret-square-down",
      static: true,
      content: 'Placeholder Text...'
    },
    {
      key: "TextInput",
      name: "Text Input",
      icon: "fa fa-font"
    },
    {
      key: "Buttons",
      name: "Buttons",
      type: 'submit'
    },
    {
      key: "NumberInput",
      name: "Number Input",
      icon: "fa fa-plus"
    },
    
    {
      key: "Date",
      name: "Date",
      icon: "fa fa-calendar"
    }
  ];
  const onSubmit= () =>{
    if(!name || previewItems.length === 0){
      return;
    }
    const obj = {
      id: uuid(),
      template: previewItems,
      name
    }
    dispatch(addNewTemplate(obj))
    dispatch(removeEditorState())
    onCloseDialog()
  }
  const onClose=()=>{
    dispatch(removeEditorState())
    onCloseDialog()
  }
  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={true}
      fullWidth
      maxWidth="md"
      disableBackdropClick={true}
    >
      <DialogTitle id="customized-dialog-title" onClose={onClose}>
        {'Flexible Form'}
      </DialogTitle>

      <DialogContent dividers>
        <Grid container  >
          <Grid items={true} sm={12} md={12} xs={12} style={{margin:"10px 0px"}}>
            <FormControl
              required
              className={classes.formControlChartDataSource}
            >
              <TextField
                value={name}
                required
                id="standard-required-title"
                onChange={evt => setName(evt.target.value)}
                label={"Form Title"}
                variant="outlined"
              />
             
            </FormControl>
          </Grid>
          <Grid items={true} sm={12} md={12} xs={12} >
              <Builder  items={items} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        { !editorVisible && 
        <Button
          size="small"
          variant="contained"
          onClick={onSubmit}
          color="primary"
        >
          Submit
        </Button>
        }
      </DialogActions>
    </Dialog>
  );
};

export default FormBuilderDialog;
