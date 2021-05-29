import { Grid } from "@material-ui/core";

import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import SubjectDropdown from "./SubjectDropdown";
import { CreateNotesForm } from "../components/Form";
import CreateAssignmentForm from "../components/ClassroomC/CreateAssignmentForm";
import SubjectHeader from "../components/ClassroomC/SubjectHeader";

import { Button, Typography } from "@material-ui/core";

import ClassroomHeader from "../components/ClassroomHeader";
import Notes from "../components/ClassroomC/Notes";
import AssignmentList from "../components/ClassroomC/AssignmentList";
import DocumentsList from "../components/ClassroomC/DocumentsList";
import DocumentForm from "../components/ClassroomC/DocumentForm";

import { Switch, Link, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiGrid-item": {
      backgroundColor: "white",
      // minHeight: "100vh",
    },
  },
  // <Dropdwon></Dropdwon>
  subjectDropdown: {
    minHeight: "100vh",
  },
}));

function Classroom() {
  const classes = useStyles();
  const [formOpen, setFormOpen] = useState(false);

  const currentSubject = useSelector((state) => state.classroom.currentSubject);

  return (
    <>
      <ClassroomHeader />

      <Grid container className={classes.root}>
        <Grid item sm={2} className={classes.subjectDropdown}>
          <SubjectDropdown />
        </Grid>

        <Grid item sm={8} style={{ padding: "10px" }}>
          <SubjectHeader />

          <Switch>
            <Route path="/teacher/classroom/asssignmentList">
              <AssignmentList />

              <CreateAssignmentForm open={formOpen} setOpen={setFormOpen} />
            </Route>

            <Route path="/teacher/classroom/notes">
              <Notes />

              <CreateNotesForm
                open={formOpen}
                setOpen={setFormOpen}
                title={"Create Notes"}
              />
            </Route>

            <Route path="/teacher/classroom/documents">
              <DocumentsList />
              <DocumentForm open={formOpen} setOpen={setFormOpen} />
            </Route>


          </Switch>
        </Grid>

        <Grid item sm={2}>
          <Grid container style={{ marginTop: "1em" }}>
            <Grid item sm></Grid>
            <Grid>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setFormOpen(true)}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Classroom;
