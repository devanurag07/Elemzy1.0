import React from "react";
import { makeStyles, Grid, Typography, Button } from "@material-ui/core";

import { Link } from "react-router-dom";
import {
  MAIN_COLOR,
  MAIN_COLOR_LIGHT,
  SECONDARY_COLOR,
} from "../../useFulFunctions";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1em",
    boxShadow: "0px 0px 1px 0px",
  },
  stdListHeading: {
    color: SECONDARY_COLOR,
    marginBottom: "1em",
  },

  stdRow: {
    boxShadow: "0px 0px 2px 0px",
    padding: "0.8em",
    borderRadius: "10px",
    marginTop: "1em",

    "& .MuiGrid-item": {
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
    },

    "& .student-detail": {
      fontFamily: "Poppins",
      fontWeight: "400",
      fontSize: "1.2rem",
    },

    "& .student-standard": {
      padding: "0.2em 1.2em",
      background: MAIN_COLOR,
      color: "white",
      borderRadius: "20px",
    },
  },

  viewBtn: {
    background: "green",
    borderRadius: "20px",
    fontWeight: "bold",

    "&:hover": {
      background: "white",
      color: "green",
      border: "2px solid green",
    },
  },
}));

function ClassroomStudentsList({ students_list, standard }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.stdListHeading} variant="h5">
        Students List
      </Typography>

      {students_list.map((student) => {
        return (
          <Grid container className={classes.stdRow}>
            <Grid item sm={3}>
              <Typography variant="subtitle1" className="student-detail">
                {student.name}
              </Typography>
            </Grid>
            <Grid item sm={3}>
              <Typography
                variant="h5"
                className="student-detail  student-standard"
              >
                {standard}
              </Typography>
            </Grid>

            <Grid item sm={3}>
              <Typography variant="h5" className="student-detail">
                20/06/2020
              </Typography>
            </Grid>

            <Grid item sm={3}>
              <Link to={`/teacher/rankingdetail/${student.id}`}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  className={classes.viewBtn}
                >
                  View
                </Button>
              </Link>
            </Grid>
          </Grid>
        );
      })}
    </div>
  );
}

export default ClassroomStudentsList;
