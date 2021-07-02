import React from "react";
import { useSelector } from "react-redux";

import { Grid, Paper, Typography } from "@material-ui/core";

import StudentList2 from "../components/HomeC/StudentsList2";
import MyTimeTable from "../components/HomeC/MyTimeTable";

import EducationSvg from "../components/icons/education 1.svg";
import { makeStyles } from "@material-ui/core/styles";
import { Statbox, MyClassroomStatbox } from "../components/HomeC/Statbox";

const useStyles = makeStyles((theme) => ({
  // Handling Sidebar and Nav Width

  statContainer: {
    // margin: "5px",
    height: "100%",
    marginBottom: "3px",
  },

  teachersStatbox: {
    "& .MuiPaper-root": {
      // background: "rgb(54,162,207)",
      // background:
      //   "linear-gradient(281.33deg, rgb(47 220 220 / 75%) 0%, rgba(71, 209, 220, 0.970049) 39.98%, rgba(26, 188, 210, 0.987917) 96.37%), #C4C4C4;",
    },
  },
  classroomStatbox: {
    "& .MuiPaper-root": {
      // background: "rgb(54,162,207)",
      // background:
      //   "linear-gradient(281.33deg, rgba(49, 220, 138, 0.35) -52.45%, rgba(29, 245, 141, 0.35) -52.44%, #00CE6B 45.97%), #C4C4C4;",
    },
  },
}));

function Home() {
  const classes = useStyles();
  const classroomState = useSelector((state) => state.classroom.classroom);

  return (
    <>
      <Grid container>
        <Grid item sm={4}>
          <MyTimeTable />
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
