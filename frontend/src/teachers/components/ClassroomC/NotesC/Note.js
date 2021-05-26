import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Paper} from "@material-ui/core";

const useStyles = makeStyles({
  root:{
    margin:"0.3em",
    fontFamily:"Ubuntu",
    minHeight:"10vh",
    padding:"1em",
    marginTop:"1em"
  },
  noteTitle:{
    textTransform:"capitalize",
    // fontWeight:"200",
    fontSize:"1.2rem",
    color:"black",
    marginBottom:"0.5em"
  },
  description:{
    fontSize:"0.9em"
  }
});



export default function Note({title,description}) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
      
   
    <Paper elevation={1} className={classes.root}>

      <Typography component="div" variant="subtitle1" className={classes.noteTitle}>
          {title}
      </Typography>

      <Typography component="div" variant="subtitle2" className={classes.description}>
          {description}
      </Typography>
    
    </Paper>
  );

}
