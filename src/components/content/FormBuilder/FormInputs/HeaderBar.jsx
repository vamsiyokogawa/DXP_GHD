import React, {Component} from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import  {EditOutlined} from "@material-ui/icons";
import {
  AppBar,
  Button,
  FormControl,        
  MenuItem,
  Select,
  Toolbar,
  Typography,
  Menu,
  IconButton,
  TextField,
  Grid,
  useTheme,
  makeStyles,
} from "@material-ui/core";

const HeaderBar = (props) =>{
  const theme = useTheme();
  const useStyles = makeStyles((theme) => ({
    
    addWidgetButton: {
      width: "auto",
      padding: "7px  !important",
      minWidth: "auto",
      marginRight: 8,
      borderRadius:'3px'
  },

  floatright: {float:"right", }
  
        
   
    


  }));
  const classes = useStyles();
    const {item, removeItem, id, showEditor, isHovering} = props;
    const opacity = isHovering ? 1 : 0;
    
    return (
      <>
        
      <Grid container style={{
                      opacity, backgroundColor: theme.palette.bg.container,
                      padding:"5px 0px  5px 0px"
                    }}>
        <Grid item={true} xs={12} md={9} style={{textAlign: 'left', padding:'5px 0px 0px 10px',  }}>
          {item.element}
        </Grid>

        <Grid item={true} xs={12} md={3} align={"right"}>
        <Button
                                  size="small"
                                  variant="contained"
                                  color="primary"
                                  onClick={() => showEditor(item)}
                                  className={classes.addWidgetButton}
                                  title="Refresh Dashboard"
                              >
                              <EditOutlined />
                              </Button>

      
                                  <Button
                                  size="small"
                                  variant="contained"
                                  color="primary"
                                  onClick={() => removeItem(id)}
                                  className={classes.addWidgetButton}
                                  title="Refresh Dashboard"
                              >
                              <DeleteIcon />
                              </Button>

      </Grid>
      </Grid>   
      </>
    );
}

export default HeaderBar;
