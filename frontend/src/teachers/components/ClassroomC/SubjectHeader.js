import React from "react";
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
    backgroundColor: "red",
  },

  links: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",

    "& a": {
      textDecoration: "none",
      color: "blue",
      fontSize: "1rem",
    },
  },

  headerTitle: {
    fontSize: "0.9em",
    color: "gray",
  },
}));

function SubjectHeader() {
  const classes = useStyles();

  const currentSubject = useSelector((state) => state.classroom.currentSubject);

  const getSubjectTeacherInfo = () => {
    if (currentSubject.subject_teacher !== undefined) {
      return currentSubject.subject_teacher.user;
    }
    return null;
  };

  const subjectTeacher = getSubjectTeacherInfo();

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item sm={3} style={{ padding: "0em 2em" }}>
          <Typography variant="subtitle2" className={classes.headerTitle}>
            Subject
          </Typography>

          <Typography variant="subtitle2">{currentSubject.name}</Typography>
        </Grid>
        <Grid item sm className={classes.links}>
          <Link to="/teacher/classroom/notes">Notes</Link>

          <Link to="/teacher/classroom/asssignmentList">Assignment List</Link>
        </Grid>
        <Grid item sm={3} style={{ padding: "0em 0.8em", textAlign: "center" }}>
          <Typography variant="subtitle2" className={classes.headerTitle}>
            Subject Teacher
          </Typography>
          {subjectTeacher && (
            <Typography variant="subtitle2">
              {subjectTeacher.firstname} {subjectTeacher.lastname}
            </Typography>
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default SubjectHeader;
