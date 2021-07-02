import React from "react";
import { Paper, Grid, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "Poppins",
    padding: "1.3em",
    boxShadow: "none",

    margin: "1em 0em",

    "& .assignmentTitle": {
      textTransform: "uppercase",
      fontWeight: 405,
    },

    "& .assignmentQuestions": {
      paddingLeft: "1em",
      paddingTop: "1px",

      "& .assignmentQuestion": {
        fontSize: "0.8rem",
        fontWeight: 405,
        color: "gray",
      },
    },
    "& .teacherName": {
      fontSize: "1em",
      fontWeight: 405,
    },
  },

  noOfQuestions: {
    color: "#2E4ADC",
    fontSize: "1em",
    fontWeight: "405",
  },

  subInfo: {
    fontSize: "0.9rem",
    color: "gray",
  },

  progressBarBg: {
    height: "10px",
    width: "100%",
    borderRadius: "10px",
    background: "#c5c5c5",
  },
  progressBar: {},
}));

function AssignmentDetail({ assignment }) {
  const classes = useStyles();

  const assinmentCompletePerc =
    (Number(assignment.no_of_students_submitted) /
      Number(assignment.total_students)) *
    100;

  return (
    <Paper className={classes.root}>
      <Grid container justify="space-between">
        <Grid item sm={4}>
          <Typography component="div" className="assignmentTitle">
            {assignment.title}
          </Typography>
        </Grid>
        <Grid item sm={3} className={classes.subInfo}>
          <Typography component="p">
            {assignment.no_of_students_submitted}/{assignment.total_students} -
            Submitted
          </Typography>
        </Grid>

        <Grid item sm={3}>
          <Typography component="p" className={classes.subInfo}>
            {assinmentCompletePerc}% Completed
          </Typography>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item sm={12}>
          <div className={classes.progressBarBg}>
            <div
              className="bar"
              style={{
                height: "10px",
                width: `${assinmentCompletePerc}%`,
                background: "#52cc52",
                borderRadius: "10px",
              }}
            ></div>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default AssignmentDetail;
