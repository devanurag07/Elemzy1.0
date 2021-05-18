import React from "react";
import { Paper, Grid, Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    background:
      "linear-gradient(281.33deg, rgba(0, 102, 255, 0.42) 0%, #08A8ED 98.42%), #C4C4C4",
    padding: "10px 15px",
    color: "white",
  },
  studentsInfoContainer: {
    display: "flex",
    flexDirection: "column",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop:"0"
  },
  myClassrom:{
    background: "linear-gradient(281.33deg, rgba(255, 15, 101, 0.9) 0%, #F21616 98.42%), #C4C4C4",
    padding: "10px 15px",
    color: "white",
  
    "& .MuiGrid-item":{
        textAlign:"center",
        borderLeft:"2px solid"
    }
}
}));

export function Statbox({ header, info, footer, icon }) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Grid container>
        <Typography variant="h6">{header}</Typography>
      </Grid>

      <Grid container className={classes.studentsInfoContainer}>
        <Grid item>
          <Typography variant="h4">{info}</Typography>
        </Grid>
        <Grid item sm></Grid>
        <Grid item>
          <img src={icon} style={{ height: "50px" }} alt="" />
        </Grid>
      </Grid>
      <Grid container>
        <Typography variant="subtitle2">{footer}</Typography>
      </Grid>
    </Paper>
  );
}

 export const MyClassroomStatbox = () => {

    const classes=useStyles()

  return (

    <Paper className={classes.myClassrom}>
      <div className="header">
        <Typography variant="h6">My Classroom</Typography>
      </div>

      <Grid container className={classes.studentsInfoContainer} spacing={2}>

        <Grid item xs={4} style={{border:"None"}}>
          <Typography variant="subtitle1" component="div">
            Students
          </Typography>
          <Typography component="div" variant="h4">
            200
          </Typography>
        </Grid>
        <Grid item xs={4} >
          <Typography variant="subtitle1" component="div">
            Teachers
          </Typography>
          <Typography component="div" variant="h4">
            8
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle1" component="div">
            Classrooms
          </Typography>
          <Typography component="div" variant="h4">
            6
          </Typography>
        </Grid>
    
      </Grid>
    
    </Paper>
  );
};
