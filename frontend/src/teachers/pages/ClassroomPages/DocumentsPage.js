import DocumentsList from "../../components/ClassroomC/DocumentsList";
import DocumentForm from "../../components/ClassroomC/DocumentForm";
import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "1em",

    minHeight:"65vh",
  },
}));


function DocumentsPage() {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid item sm={9}>
        <DocumentsList />
      </Grid>
      <Grid item sm={3}>
        <DocumentForm />
      </Grid>
    </Grid>
  );
}

export default DocumentsPage;
