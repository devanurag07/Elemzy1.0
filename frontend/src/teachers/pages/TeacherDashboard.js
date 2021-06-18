import { Fragment } from "react";
import React from "react";
import Nav from "../components/Nav";
import { loadDashboardData } from "../actions/classroom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import Sidebar from "../components/Sidebar";
import { makeStyles } from "@material-ui/core/styles";
import "../css/style.scss";
import Classroom from "./Classroom";
import Notifications from "../components/Notifications";

import UpdateTeacherProfilePage from "./UpdateTeacherProfilePage";
import Home from "./Home";
import Exams from "./Exams";
import TimeTable from "./TimeTable";
import Results from "./Results";

import { Route } from "react-router-dom";
import { loadExams } from "../actions/classroom";

const useStyles = makeStyles((theme) => ({
  // Handling Sidebar and Nav Width
  mainDiv: {
    marginLeft: "150px",
    marginTop: "50px",
  },
}));

export const TeacherDashboard = () => {
  useEffect(() => {
    loadDashboardData();
  }, [""]);

  const currentSubject = useSelector((state) => state.classroom.currentSubject);

  useEffect(() => {
    const selectedSubjectId = currentSubject.pk;
    if (selectedSubjectId) {
      loadExams(selectedSubjectId);
    }
  }, [currentSubject.pk]);

  const classes = useStyles();

  return (
    <Fragment>
      <Notifications />
      <Nav />

      <Sidebar />

      <div className={classes.mainDiv}>
        <Route path="/teacher/home">
          {/* Home component */}
          <Home />
        </Route>

        <Route path="/teacher/classroom">
          <Classroom />
        </Route>

        <Route path="/teacher/exams">
          <Exams />
        </Route>

        <Route path="/teacher/timetable">
          <TimeTable />
        </Route>

        <Route path="/teacher/results">
          <Results />
        </Route>

        <Route path="/teacher/profile" exact>
          <UpdateTeacherProfilePage />
        </Route>
      </div>
    </Fragment>
  );
};
