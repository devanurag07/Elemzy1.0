import AssignmentList from "../../components/ClassroomC/AssignmentList";
import CreateAssignmentForm from "../../components/ClassroomC/CreateAssignmentForm";
import { Grid } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "1em",

    minHeight:"65vh",
  },
}));

function AssignmentPage() {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid item sm={9}>
        <AssignmentList />
      </Grid>
      <Grid item sm={3}>
        <CreateAssignmentForm />
      </Grid>
    </Grid>
  );
}

export default AssignmentPage;
