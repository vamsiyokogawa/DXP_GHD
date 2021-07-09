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
import {
	DatePick,
  Dropdown,
  TextInput,
  NumberInput,
  Buttons
} from "../FormBuilder/FormInputs";
import map from "lodash/map";
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
    formOption:{
      textTransform: 'capitalize',
      fontSize: '14px',
      padding: '7px',
      cursor:'pointer'
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
}));

const FormTemplate = ({data, onSubmit}) => {
  const [formData,setFormData] = useState({})
  const handleChange=(event)=>{
    formData[event.target.name] = event.target.value;
    setFormData(formData);
  }
  const classes = useStyles();
  const handlesubmit=()=>{
    onSubmit(formData);
  }
  
  return (
    <>
      {map(data, item => {
        const { element, startDate,label, endDate, name,className, options } = item;
        return (
          <>
            {element === "Dropdown" && (
              <Grid item={true} key={item.id} md={6} xs={12}>
                <FormControl
                  className={classes.formControlChartDataSource}
                >
                  <InputLabel id="datasource-list">{label}</InputLabel>
                  <Select 
                      name={name}
                      label={label}
                      onChange={handleChange}
                    >
                  <option value={null} />
                  {options.map(({ id, value }) => (
                    <option className={classes.formOption} key={id} value={value}>{value}</option>
                  ))}
                </Select>
              </FormControl>
              </Grid>
            )}
            {element === "TextInput" && (
              <Grid item={true} key={item.id} md={6} xs={12}>
                <FormControl
                  required
                  className={classes.formControlChartDataSource}
                >
                  {/* <InputLabel >{label}</InputLabel> */}
                  <TextField
                  name={name}
                  label={label}
                  onChange={handleChange}
                  className={className} 
                />
                </FormControl>
              </Grid>
            )}
            {element === "NumberInput" && (
              <Grid item={true} key={item.id} md={6} xs={12}>
                <FormControl
                  required
                  className={classes.formControlChartDataSource}
                >
                <TextField
                name={name}
                label={label}
                type={'number'}
                onChange={handleChange}
                className={className} 
              />
              </FormControl>
              </Grid>
            )}
            {element === "Date" && (
              <>
               <Grid item={true} key={item.id} md={6} xs={12}>
                  <FormControl
                    required
                    className={classes.formControlChartDataSource}
                  >
                   
                    <TextField
                    id="date"
                    type="datetime-local"
                    name={'startDate'}
                    label={"Start Date"}
                    onChange={value => handleChange(value)}
                    InputLabelProps={{
                      shrink: true
                    }}
                />
                </FormControl>
              </Grid>
              <Grid item={true} key={item.id}  md={6} xs={12}>
                <FormControl
                  required
                  className={classes.formControlChartDataSource}
                >
                  <TextField
                  id="date"
                  type="datetime-local"
                  name={'endDate'}
                  label={"End Date"}
                  onChange={value => handleChange(value)}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
                </FormControl>
             </Grid>
           </>
          )}
            {element === "Buttons" && (
              <Grid item={true} key={item.id} md={6} xs={12}>
                  <Button
                    size="small"
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={() => handlesubmit(item)}
                  >
                    {label}
                  </Button>
             </Grid>
            )}
        </>
       )
      })}  
    </>
  );
};

export default FormTemplate
