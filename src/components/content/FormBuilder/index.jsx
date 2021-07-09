import React from 'react';
import PropTypes from 'prop-types';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { compose } from "redux";
import { connect ,useDispatch,useSelector} from 'react-redux';
import FormEditor from './FormEditor';
import Toolbar from './Toolbar';
import Preview from './Preview';
import {
  Grid,
} from "@material-ui/core";
const Builder = ({
  onSubmit,
  items
}) => {
  const dispatch = useDispatch();
  const editorVisible = useSelector(state => state.formBuilderReducer.editorVisible);
  return (
    // <Grid container md={12} spacing={1}  >
      <>
      {
        editorVisible ? 
        <Grid xs={12} md={12} spacing={2} style={{ width: '100%',height: '100%', border: "1px solid #55575c"}}>
          <FormEditor/> </Grid>:
         <Grid container md={12} spacing={1}  >
          <Grid xs={12} md={9} spacing={2} >
              <Preview 
                onSubmit={onSubmit} 
              />
          </Grid>
          <Grid xs={12} style={{textAlign: 'center', paddingLeft: '33px'}} md={3} spacing={2}>
            <Toolbar 
                items={items} 
            />
          </Grid>
          </Grid>
        
      } 
    </>
  )
}

Builder.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	items: PropTypes.array
};

export default compose(
  DragDropContext(HTML5Backend)
)(Builder);