import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Input,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField
} from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewTemplate } from "../../../../redux/actions/templates.actions";
import * as Constants from "../../../../constants/Constants";
import { uuid } from "uuidv4";
import MapContainer from "../.../../../../../../src/components/common/MapContainer";

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 150,
    width: "100%"
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

function MapDialog({ open, setOpen, latLong }) {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="customized-dialog-title"
    >
      <DialogTitle id="customized-dialog-title" onClose={() => setOpen(false)}>
        Map
      </DialogTitle>
      <DialogContent dividers>
        <FormControl className={classes.formControl}>
          {/* <InputLabel id="column-list">Copy from Template</InputLabel> */}
          <MapContainer
            latLong={latLong}
            width={400}
            height={200}
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => setOpen(false)} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default MapDialog;
