import Notes from "../../components/ClassroomC/Notes";
import CreateNotesForm from "../../components/ClassroomC/CreateNotesForm";
import { Grid, makeStyles } from "@material-ui/core";

import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "1em",
    minHeight:"65vh",
  },
}));

function NotesPage() {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item sm={9}>
        <Notes />
      </Grid>
      <Grid item sm={3}>
        <CreateNotesForm />
      </Grid>
    </Grid>
  );
}

export default NotesPage;
