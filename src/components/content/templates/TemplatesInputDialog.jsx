import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    TextField,
} from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import * as Constants from "../../../constants/Constants";
import { uuid } from "uuidv4";

function TemplatesInputDialog(props) {    
    const Datasource = useSelector(
        (state) => {
            if (state.dashboardsReducer.selectedDashboard) {
                return state.dashboardsReducer.selectedDashboard.datasource
            } else {
                return [];
            }
        }
    );         
    const dispatch = useDispatch();
    const {open,setOpen,data} = props;    
    const [selectedTemplate, setSelectedTemplate] = useState([]);
    const [name, setName] = useState("");    
    const [DatasourceId, setDatasourceId] = useState("");
    const [update, setupdate] = useState(false);
    const [addorupdate, setaddorupdate] = useState(false);
    const [url, setUrl] = useState(""); 

    const deleteElement = (datasource_id) => {
        dispatch({
            type: Constants.EVT_DASHBOARDS_ON_REMOVE_DATASOURCE,
            value: datasource_id
          });
        setaddorupdate(false);                                         
    };
    const editElement = (i,id) => {                
        setDatasourceId(id);
        setupdate(true);
        setaddorupdate(true);        
        const data = Datasource[i];        
        if (data) {
            setName(data.name)           
            setUrl(data.url)           
        } 
    };
    const saveTemplateInfo = () => {                           
        let eventName;   
        let obj = {};     
        obj.name = name;
        obj.url = url;                  
        if (addorupdate) {
            obj.datasource_id = DatasourceId;            
            eventName = Constants.EVT_DASHBOARDS_ON_UPDATE_DATASOURCE;
        } else {
            obj.datasource_id = uuid();            
            eventName = Constants.EVT_DASHBOARDS_ON_ADD_DATASOURCE;
        }                      
        selectedTemplate.push(obj);  
        setSelectedTemplate(selectedTemplate);                      
        dispatch({
          type: eventName,
          value: { ...selectedTemplate }
        });                        
        onClose();
        return;
    };
    const onClose = () => {
        setDatasourceId('');
        setaddorupdate(false)
        setupdate(false)
        setSelectedTemplate([])
        setName("")           
        setUrl("")
    }
    return (
        <>
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="customized-dialog-title">
            <DialogTitle
                id="customized-dialog-title"
                onClose={() => setOpen(false)}>
               { addorupdate ? 'Edit Configration' : 'Add New Configration' }
            </DialogTitle>
            <FormControl>
            <DialogContent dividers>
                <div style={{ width: 230, height: 70 }}>
                    <TextField
                        id="standard-basic"
                        label="Name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>
                <div style={{ width: 230, height: 70 }}>
                    <TextField
                        id="standard-basic"
                        label="Url"
                        value={url}
                        onChange={(event) => setUrl(event.target.value)}
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <Button
                    autoFocus
                    onClick={() => setOpen(false)}
                    color="primary"
                >
                    Cancel
                </Button>                
                <Button autoFocus onClick={saveTemplateInfo} color="primary">
                   { addorupdate ? "Update" : "Add" }
                </Button> 
            </DialogActions>            
            <DialogContent dividers>
            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                <TableHead>
                      <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Url</TableCell>
                      <TableCell>Action</TableCell>                      
                      </TableRow>
                </TableHead>
                <TableBody>                   
                { 
                Datasource && Datasource.length > 0 ? 
                    Datasource.map((column,index) => {                      
                    return ( <TableRow key={index}>
                        <TableCell>{column.name}</TableCell>
                        <TableCell>{column.url}</TableCell>
                        <TableCell>
                    <button className="btn btn-prinary" onClick={()=>editElement(index,column.datasource_id)}>Edit</button>&nbsp;
                            <button onClick={()=>deleteElement(column.datasource_id)} className="btn btn-prinary">Delete</button>
                        </TableCell>                        
                    </TableRow>)
                }) : <TableRow>
                    <TableCell colSpan="3">No recors</TableCell>
                </TableRow>
                }
                </TableBody>
                </Table>
            </TableContainer>
            </DialogContent>
            </FormControl>
          </Dialog>
        </>
    );
}

export default TemplatesInputDialog;
