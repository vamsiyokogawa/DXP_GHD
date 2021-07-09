import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Clock from "../../../../assets/clock.svg";
import MapDialog from "./MapDialog";

export const MapLabelRedirectWidget = props => {
  const { widgetConfig } = props;
  const { widget_id, title, googleLatLong, backgroundColor, link } = widgetConfig;

  // const { onCloseDialog } = props;
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  // const backgroundImage = (widgetConfig.image != '') ? widgetConfig.image : Clock;
  const backgroundImage = (widgetConfig.image != '') ? widgetConfig.image : '';
  const setOpacity = widgetConfig.imageOpacity || 0.1;

  const useStyles = makeStyles(theme => ({
    // labelWrapper: {
    //   height: "100%",
    //   backgroundColor: backgroundColor || theme.palette.bg.widget,
    //   "&>div>div": {
    //     top: "0 !important"
    //   },
    //   "&>div>div>div>div": {
    //     borderRadius: 5
    //   }
    // },
    labelWrapper: {
      height: "100%",
      backgroundColor: backgroundColor || theme.palette.bg.widget,
      fontFamily: theme.root.fontFamily,
           textAlign: "center"
    },
    image: {
      height: "30%",
      opacity: setOpacity,
      margin: "auto",
      display: "block",
      marginTop: "0%",
      float: "left",
      minHeight:"40px",
    },
    textContainercontent: {
      textAlign: "center",
      position: "absolute",
      top: '30%',
      width: "100%",
      padding: '8px 0px 8px 0px',
      color: widgetConfig.labelTextColor || theme.palette.textColor,            
      
  },
    textContainer: {
      position: "absolute",
      textAlign: "right",
      bottom: 15,
    
      width: "100%",
      opacity: "1",
  },
    title: {
      fontWeight: 400,
      color: "#a3a4a6"
    },
    cursor: {
      cursor: "pointer"
    },
    labelClass: {
      textAlign: "center",
      fontSize: '20px',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      
  }
  
  }));

  const classes = useStyles();
  const openLink = () => {
    setAddDialogOpen(true);
  };
  return  (
   
    <>
    <div
      key={widget_id}
      // className={classes.labelWrapper + " " + (link ? classes.cursor : "")}
      className={classes.labelWrapper}
      onClick={openLink}
     
    >  
   <div className={classes.textContainer}  style={
                        {
                            // background: (backgroundImage)? `url(${backgroundImage}) no-repeat`: `url(${Clock}) no-repeat`,
                            background: (backgroundImage)? `url(${backgroundImage}) center no-repeat`: ``,
                             //backgroundSize:"cover",
                            backgroundPosition:'center',
                            opacity: setOpacity,
                            height: '60%',
                            backgroundSize: 'contain',
                            margininbottom: '15px',

                        }
                    }>
                    </div>

                    <div className={classes.textContainercontent}>
                                              <div className={classes.labelClass}>
                           {title}
                        </div>
                      
                    </div>
                
   
    
      </div>
    
      <MapDialog
                open={addDialogOpen}
                setOpen={setAddDialogOpen}
                latLong={googleLatLong}
                width={400}
                height={200}
            />
    </>
  );
};
