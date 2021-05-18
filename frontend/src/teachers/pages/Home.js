import React from "react";
import {useSelector} from "react-redux";

import { Grid, Paper, Typography } from "@material-ui/core";

import StudentList from "../components/StudentsList";

import EducationSvg from "../components/icons/education 1.svg";
import {makeStyles} from "@material-ui/core/styles";
import { Statbox, MyClassroomStatbox } from "../components/Statbox";



const useStyles = makeStyles((theme) => ({
    // Handling Sidebar and Nav Width

    statContainer: {
      margin: "5px",
      height:"100%",
      marginBottom:"3px",
      [theme.breakpoints.up('md')]: {
          margin:"15px",
          marginBottom:"3px"
      },
      [theme.breakpoints.up('sm')]: {
          margin:"15px",
          marginBottom:"3px"
      },
    },
  
    teachersStatbox: {
      "& .MuiPaper-root": {
        background: "rgb(54,162,207)",
        background:
          "linear-gradient(281.33deg, rgb(47 220 220 / 75%) 0%, rgba(71, 209, 220, 0.970049) 39.98%, rgba(26, 188, 210, 0.987917) 96.37%), #C4C4C4;",
      },
    },
    classroomStatbox: {
      "& .MuiPaper-root": {
        background: "rgb(54,162,207)",
        background:
          "linear-gradient(281.33deg, rgba(49, 220, 138, 0.35) -52.45%, rgba(29, 245, 141, 0.35) -52.44%, #00CE6B 45.97%), #C4C4C4;",
      },
    },
  }));
  


function Home() {

    const classes=useStyles()
    const classroomState=useSelector(state=>state.classroom.classroom)

  return (
    <>
      <Grid container>
        <Grid xs={10} sm={5} lg className={classes.statContainer}>
          <Statbox
            header={"Students"}
            info={classroomState.students.length}
            footer={"All students of the school"}
            icon={EducationSvg}
          />
        </Grid>

        <Grid
          xs={10}
          sm={5}
          lg
          className={`${classes.statContainer} ${classes.teachersStatbox}`}
        >
          <Statbox
            header={"Teachers"}
            info={"80+"}
            footer={"All teachers of the school"}
            icon={EducationSvg}
            className={"hello"}
          />
        </Grid>

        <Grid
          xs={10}
          sm={5}
          lg
          className={`${classes.statContainer} ${classes.classroomStatbox}`}
        >
          <Statbox
            header={"Classrooms"}
            info={"75+"}
            footer={"The all classrooms of the school"}
            icon={EducationSvg}
          />
        </Grid>

        <Grid xs={10} sm={5} lg className={classes.statContainer}>
          <MyClassroomStatbox />
        </Grid>
      </Grid>

      <Grid container>
        <Grid item lg={6} sm={10} xs={10}>
          <StudentList />
        </Grid>
        <Grid item lg={6} sm={2} xs={2}>
          <Paper
            elevation={1}
            style={{
              margin: `8px 16px`,
              minHeight: "60vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant={"h4"}>NO STATS</Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
