import React, { useState,useEffect } from "react";
import { connect,useDispatch,useSelector } from "react-redux";
import uuid from "uuid/v4";
import { map, filter } from "lodash";
import {
  hideEditor,
  submitEditorState
} from "../../../../redux/actions/formBuilderActions";
import CloseIcon from '@material-ui/icons/Close';
import {
  Button,
  Grid,
  Radio,
  TextField,
  InputLabel,
  makeStyles
} from "@material-ui/core";
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

// toolbar options for the WYSIWYG Editor
const toolbar = {
  options: [
    "inline",
    "list",
    "textAlign",
    "fontSize",
    "link",
    "history"
  ],
  inline: {
    inDropdown: false,
    options: [
      "bold",
      "italic",
      "underline",
      "superscript",
      "subscript"
    ]
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
  formControlDropdown: {
    minWidth: "90%",

    [theme.breakpoints.down("sm")]: {
      minWidth: "90%",
    },
    [theme.breakpoints.up("md")]: {
      minWidth: "90%",
    },
    [theme.breakpoints.up("lg")]: {
      minWidth: "90%",
      maxWidth: "90%",
    }
  },
  btnFormControl:{
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));
const  FormEditor = () =>{
  const classes = useStyles();
  const dispatch = useDispatch();
  const editor = useSelector(state => state.formBuilderReducer.editorState);

  const [editorState,setEditor] = useState(editor || {});
  const [options,setOptions] = useState(editor.options || []);
  const [type,setType] = useState('submit');
  const [name,setName] = useState('');
  const [label,setLable] = useState(
    editorState.label || '');
  const [path,setPath] = useState('');
  const toggleField = field => {
    editorState[field] = true;
    setEditor(editorState)
  };
  const onFetchOptions=()=>{
    if(path){

    }
  }
  const addOption = (element) => {
    let option;
    switch(element) {
      case 'Tags': {
        option = {
          id: uuid(),
          label: "",
          value: ""
        };
        break;
      }
      case 'Checkboxes': {
        option = {
          id: uuid(),
          value: "",
          checked: false
        }
        break;
      }
      case 'RadioButtons': {
        option = {
          id: uuid(),
          label: "",
          value: "",
          checked: false
        }
        break;
      }
      default: {
        option = {
          id: uuid(),
          value: ""
        }
        break;
      }
    }
    console.log(option)
    const updateOptions =  [...options, option];
    
    setOptions(updateOptions)
  };
  const onSelectType=(evt)=>{
    setType(evt.target.value)
  }

  const removeOption = optionId => {
    let updatedOptions = [...options];
    if (options.length > 1) {
      updatedOptions = filter(
        options,
        option => option.id !== optionId
      );
    }
    setOptions(updatedOptions)
  };

  const handleChange = (value, optionId, field) => {
    let updatedOptions = [...options];
    updatedOptions = map(updatedOptions, option => {
      if (option.id === optionId) {
        option[field] = value;
        return option;
      }
      return option;
    });
   
    setOptions(updatedOptions)
  };

  const handleOptions = (name, value) => {
    console.log(name,value)
    editorState[name] = value;
    setEditor(editorState);
  };

  const handleChangeLable = (value) => {
    setLable(value);
  };

  // convert draftjs editorState to JS object before saving it in redux store
  const handleSubmit = () => {
    editorState.options = options;
    editorState.label = label
    if(editorState.type){
      editorState.type = type;
    }
    editorState.name = name;
    dispatch(submitEditorState(editorState));
    dispatch(hideEditor())
  };
  const onHideEditor = () =>{
    dispatch(hideEditor())
  }
  const {
    element,
    endDate,
    startDate,
  } = editorState;
    return (
      <Grid container md={12} spacing={2} style={{ paddingLeft:'15px' }}>
         <Grid item={true} sm={12} xs={12} md={12}  >
          <h3 className="mb-4">{element} Editor</h3>
          </Grid>
          {/* ------------- LABEL ------------- */}
          {element !== "Buttons" && (
          <>
            <Grid item={true} xs={12} md={6} >
              <FormControl
                  required
                  className={classes.formControlChartDataSource}
                >
                
             
                <TextField
                    name={'label'}
                    value={label}
                    variant="outlined"
                    label="Lable Name"
                    onChange={(evt)=> setLable(evt.target.value)}
                  />
                  </FormControl>
            </Grid>

            <Grid item={true} xs={12} md={6}  >
              <FormControl
                    required
                    className={classes.formControlChartDataSource}
                  >
                <TextField
                    name={'name'}
                    value={name}
                    label="Field Name"
                    variant="outlined"
                    onChange={(evt)=> setName(evt.target.value)}
                  />
                  </FormControl>
            </Grid>
           </>
          )}
  
          {/* ------------- DROPDOWN OPTIONS ------------- */}
          {element === "Dropdown" && (
            <>
            <Grid item={true} xs={12} md={12} >
              <h3>Options:</h3>
            </Grid>
            <Grid item={true} xs={12} md={11} >
              <FormControl
                  required
                  className={classes.formControlChartDataSource}
                >
                <TextField
                    value={path}
                    variant="outlined"
                    label="Url path"
                    onChange={(evt)=> setPath(evt.target.value)}
                  />
                  </FormControl>
            </Grid>
            <Grid item={true} xs={12} md={1} >
                <Button
                  size="large"
                  variant="contained"
                  onClick={onFetchOptions}
                  color="primary"
                  style={{height:"100%" ,width: "100%"}}
                >
                  Fetch
                </Button>
            </Grid>
            {map(options, ({ id, value }) => (
              <>
              <Grid item={true} xs={12} md={11}  >
              <FormControl
                  className={classes.formControlChartDataSource}
                >
                <TextField
                  label="Option"
                  value={value}
                  variant="outlined"
                  onChange={e =>
                    handleChange(e.target.value, id, "value")
                  }
                />
                </FormControl>
              </Grid>
              <Grid item={true} xs={12} md={1}  >
                  <Button
                    disabled={options.length === 1}
                    size="large"
                    variant="outlined"
                    style={{
                      cursor: `${
                        options.length === 1
                          ? "not-allowed"
                          : "pointer"
                      }`,
                      height:"100%"
                    }}
                    onClick={() => {
                      removeOption(id);
                    }}
                  >
                    <CloseIcon />
                  </Button>
              </Grid>
              </>
            ))}
            <Grid item={true} xs={12} md={12}  >
            <Button
              size="small"
            variant="contained"
            color="primary"
                onClick={addOption}
              >
              Add Option
            </Button>
          </Grid>
          </>
          )}     
          {/* ------------- DATE PICKER ------------- */}
          {element === "Date" && (
             <Grid item={true} sm={12} xs={12} md={12}  >
              <Grid item={true} xs={12} md={6}  >
                <FormControl
                  required
                  className={classes.formControlChartDataSource}
                >
                <TextField
                id="date"
                label="Start Date"
                type="datetime-local"
                variant="outlined"
                value={startDate || new Date()}
                onChange={value => handleOptions('startDate', value)}
                InputLabelProps={{
                  shrink: true
                }}
            />
            </FormControl>
              </Grid>
              <Grid item={true} xs={12} md={6}  >
              <FormControl
                  required
                  className={classes.formControlChartDataSource}
                >
               
                <TextField
                label="End Date"
                id="date"
                type="datetime-local"
                variant="outlined"
                value={endDate || new Date()}
                onChange={value => handleOptions('endDate', value)}
                InputLabelProps={{
                  shrink: true
                }}
              />
              </FormControl>
             </Grid>
           </Grid>
          )}
          {/* ------------- DATE PICKER ------------- */}
           {element === "Buttons" && (
             <>
             <Grid item={true} xs={12} md={6}>
             <FormControl
                  required
                  className={classes.formControlChartDataSource}
                >
                 {/* <InputLabel >{'Button Name'}</InputLabel> */}
               <TextField
                   name={'label'}
                   value={label}
                   label="Button Name"
                   variant="outlined"
                   onChange={(evt)=> setLable(evt.target.value)}
                 />
                </FormControl>
           </Grid>
            <Grid item={true} xs={12} md={6} >
            <InputLabel >{'Type:'}</InputLabel>
              <FormControl
                  className={classes.formControlChartDataSource}
                >
              <RadioGroup row aria-label="type" name="type" value={type} onChange={onSelectType}>
                <FormControlLabel value="filter" control={<Radio color="primary" />} label="Filter" />
                <FormControlLabel value="submit" control={<Radio color="primary" />} label="Submit" />
              </RadioGroup>
              </FormControl>
            </Grid>
            </>
          )}
          {/* ------------- SUBMIT AND CANCEL BUTTONS ------------- */}
          <Grid sm={12} xs={12} md={12} align="right" style={{marginBottom: "8px"}}>
            <FormControl className={classes.btnFormControl}>
              <Button
                size="small"
                variant="contained"
                onClick={onHideEditor}
                color="primary"
              >
                Cancel
              </Button>
              </FormControl>
              <FormControl style={{marginBottom: "8px"}}>
              <Button
                size="small"
                variant="contained"
                onClick={handleSubmit}
                color="primary"
              >
                Done
              </Button>
            </FormControl>
          </Grid>
            
          </Grid>
    );
}

export default FormEditor;
