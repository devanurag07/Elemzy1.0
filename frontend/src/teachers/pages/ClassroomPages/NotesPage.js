import Notes from "../../components/ClassroomC/Notes";
import CreateNotesForm from "../../components/ClassroomC/CreateNotesForm";
import { Grid, makeStyles } from "@material-ui/core";

import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "1em",
    minHeight: "65vh",
    padding: "10px",
  },
  notesContainer: {
    boxShadow: "0px 1px 3px 0px",
    borderRadius: "1em",
  },
}));

function NotesPage({ setClassroomHeader }) {
  const classes = useStyles();

  setClassroomHeader(true);

  return (
    <Grid container className={classes.root} spacing={3}>
      <Grid item sm={9} className={classes.notesContainer}>
        <Notes />
      </Grid>
      <Grid item sm={3} justify="center" style={{ display: "flex" }}>
        <Grid item sm={9}>
          <CreateNotesForm />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default NotesPage;
