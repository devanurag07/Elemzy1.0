import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  makeStyles,
  Grid,
  Typography,
  MenuItem,
  Select,
} from "@material-ui/core";

import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: "red",
  },

  links: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",

    "& a": {
      textDecoration: "none",
      color: "white",
      fontSize: "1rem",
      padding: "0.5rem 1rem",
      backgroundColor: "orange",
      borderRadius: "10px",
    },
  },

  headerTitle: {
    fontSize: "0.9em",
    color: "gray",
  },
}));

function SubjectHeader({style}) {
  const classes = useStyles();

  return (
    <>
      <Grid container style={style} justify="space-around" className={classes.root}>
        <Grid item sm={3} className={classes.links}>
          <Link to="/teacher/classroom/notes">Notes</Link>
        </Grid>
        <Grid item sm={3} className={classes.links}>
          <Link to="/teacher/classroom/asssignmentList">Assignment</Link>
        </Grid>

        <Grid item sm={3} className={classes.links}>
          <Link to="/teacher/classroom/documents">Documents</Link>
        </Grid>

        <Grid item sm={3} className={classes.links}>
          <Link to="/teacher/classroom/leave">Leave Requests</Link>
        </Grid>

        
      </Grid>
    </>
  );
}

export default SubjectHeader;
