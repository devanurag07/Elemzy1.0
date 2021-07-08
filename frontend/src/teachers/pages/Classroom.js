import { Grid, Typography } from "@material-ui/core";

import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import ClassroomNav from "../components/ClassroomC/ClassroomNav";

import ClassroomHeader from "../components/ClassroomHeader";
import DocumentsList from "../components/ClassroomC/DocumentsList";

import { Switch, Route } from "react-router-dom";

import AssignmentPage from "./ClassroomPages/AssignmentPage";
import NotesPage from "./ClassroomPages/NotesPage";
import DocumentPage from "./ClassroomPages/DocumentsPage";
import LeaveRequestsPage from "./ClassroomPages/LeaveRequestsPage";

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
  classheading: {
    fontSize: "1.8rem",
    color: "#ff6b00",
    padding: "1em 0.3em",
    fontFamily: "'Roboto Condensed'",
  },
}));

function Classroom() {
  const classes = useStyles();

  const [hasClassroomHeader, setClassroomHeader] = useState(true);

  return (
    <>
      <Grid container className={classes.root}>
        {/* <Grid item sm={2} className={classes.subjectDropdown}>
          <SubjectDropdown />
        </Grid> */}

        <Typography variant="h5" className={classes.classheading}>
          Classes
        </Typography>

        <Grid item sm={12} style={{ padding: "10px" }} justify="center">
          {hasClassroomHeader ? <ClassroomHeader /> : ""}
          <ClassroomNav style={{ marginTop: "1.4em" }} />

          <Switch>
            <Route path="/teacher/classroom/asssignmentList">
              <AssignmentPage setClassroomHeader={setClassroomHeader} />
            </Route>

            <Route path="/teacher/classroom/notes">
              <NotesPage setClassroomHeader={setClassroomHeader} />
            </Route>

            <Route path="/teacher/classroom/documents">
              <DocumentPage setClassroomHeader={setClassroomHeader} />
            </Route>

            <Route path="/teacher/classroom/leave">
              <Grid container justify="center" style={{ marginTop: "2em" }}>
                <Grid item sm={11}>
                  <LeaveRequestsPage setClassroomHeader={setClassroomHeader} />
                </Grid>
              </Grid>
            </Route>
          </Switch>
        </Grid>
      </Grid>
    </>
  );
}

export default Classroom;
