import AssignmentList from "../../components/ClassroomC/AssignmentList";
import CreateAssignmentForm from "../../components/ClassroomC/CreateAssignmentForm";
import { Grid } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "1em",
    minHeight: "65vh",
    padding: "10px",
  },
  assignmentsContainer: {
    boxShadow: "0px 1px 3px 0px",
    borderRadius: "1em",
  },
}));

function AssignmentPage() {
  const classes = useStyles();
  return (
    <Grid container className={classes.root} spacing={3}>
      <Grid item sm={9} className={classes.assignmentsContainer}>
        <AssignmentList />
      </Grid>
      <Grid item sm={3} justify="center" style={{ display: "flex" }}>
        <Grid item sm={9}>
          <CreateAssignmentForm />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default AssignmentPage;
