import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { loadMyTimeTable } from "../../actions/teacherActions";
import { Paper, Grid, Typography, makeStyles } from "@material-ui/core";
import MyTimeTableCard from "./MyTimeTableCard";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1em",
    boxShadow: "none",
  },
  myTimeTableHeading: {
    fontSize: "1.2rem",
    fontFamily: "Poppins",
    fontWeight: "505",
  },
  tableContainer: {
    marginTop: "2em",
  },
}));

function MyTimeTable() {
  const myTimeTable = useSelector((state) => state.classroom.mytimetable);

  const classes = useStyles();
  useEffect(() => {
    loadMyTimeTable();
    console.log("LOading");
  }, [""]);

  return (
    <Paper className={classes.root}>
      <Typography variant="h5" className={classes.myTimeTableHeading}>
        TimeTable
      </Typography>

      <Grid container className={classes.tableContainer}>
        {myTimeTable.map((timetableEntry) => {
          return <MyTimeTableCard timetableEntry={timetableEntry} />;
        })}
      </Grid>
    </Paper>
  );
}

export default MyTimeTable;
