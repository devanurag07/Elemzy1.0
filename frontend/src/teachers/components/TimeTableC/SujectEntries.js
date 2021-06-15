import React from "react";
import { useSelector } from "react-redux";
import SubjectEntry from "./SubjectEntry";
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "2em",
  },
  subjectEntryItem: {
    marginBottom: "1em",
  },
}));

function SujectEntries() {
  const subjectEntries = useSelector(
    (state) => state.classroom.subject_entries
  );

  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      {subjectEntries.map((subjectEntry) => {
        return (
          <Grid item sm={12} className={classes.subjectEntryItem}>
            <SubjectEntry subjectEntry={subjectEntry} />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default SujectEntries;
