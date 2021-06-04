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

import UpdateTeacherProfilePage from "./UpdateTeacherProfilePage"
import Home from "./Home";

import { Route } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  // Handling Sidebar and Nav Width
  mainDiv: {
    marginLeft: "100px",
    marginTop: "50px",
  },
}));

export const TeacherDashboard = () => {
  const classRoomState = useSelector((state) => state.classroom);

  useEffect(() => {
    loadDashboardData();
  }, [""]);

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


        <Route path="/teacher/profile" exact>
          <UpdateTeacherProfilePage />
        </Route>
        
      </div>
    </Fragment>
  );
};
