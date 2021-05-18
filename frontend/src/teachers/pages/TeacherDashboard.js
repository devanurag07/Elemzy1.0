import { Fragment } from "react";
import React from "react";
import Nav from "../components/Nav";
import { loadDashboardData } from "../actions/classroom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import Sidebar from "../components/Sidebar";
import TeacherActions from "../components/TeacherActions";

import { Grid, withWidth, Typography, Paper } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import "../css/style.scss";

import Home from "./Home";
import Classroom from "./Classroom";

const useStyles = makeStyles((theme) => ({
  // Handling Sidebar and Nav Width
  mainDiv: {
    marginLeft: "130px",
    marginTop: "50px",
  }
}));


export const TeacherDashboard = () => {

  const classRoomState = useSelector((state) => state.classroom);

  useEffect(() => {
    loadDashboardData();
  }, [""]);

  const classes = useStyles();

  return (
    <Fragment>

      <Nav />

      <Sidebar />

      <div className={classes.mainDiv}>

        {/* Home component */}

         <Classroom/>
         
      </div>

    </Fragment>
  );
};
