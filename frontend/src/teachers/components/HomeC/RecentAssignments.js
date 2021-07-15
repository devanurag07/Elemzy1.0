import React from "react";
import { useSelector } from "react-redux";
import AssignmentDetail from "../ClassroomC/AssignmentDetail";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import {
  getAssingmentColor,
  getRandomColor,
  SECONDARY_COLOR,
} from "../../useFulFunctions";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1em",
  },
  heading: {
    color: SECONDARY_COLOR,
  },
  assignmentContainer: {
    marginTop: "1em",
  },
}));

const RecentAssignments = () => {
  const recent_assignments = useSelector(
    (state) => state.classroom.dashboard_data.recent_assignments
  );

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h6" className={classes.heading}>
        Submission Status
      </Typography>
      {recent_assignments.map((assignment) => {
        return (
          <div className={classes.assignmentContainer}>
            <RecentAssignmentDetail assignment={assignment} />
          </div>
        );
      })}
    </div>
  );
};

export default RecentAssignments;

const useStyles2 = makeStyles((theme) => ({
  root: {},
  assignmentTitle: {
    fontSize: "0.8rem",
    fontFamily: "Poppins",
    fontWeight: "505",
  },
  assignmentPercContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    "& *": {
      fontSize: "0.8rem",
      fontFamily: "Poppins",
      fontWeight: "505",
    },
  },

  progressBarBg: {
    height: "10px",
    width: "100%",
    borderRadius: "10px",
    background: "#c5c5c5",
  },
}));

const RecentAssignmentDetail = ({ assignment }) => {
  const classes = useStyles2();

  const assinmentCompletePerc =
    (Number(assignment.no_of_students_submitted) /
      Number(assignment.total_students)) *
    100;

  return (
    <div className="recent_assignment">
      <Grid container justify="space-between" spacing={2}>
        <Grid item sm={8}>
          <Typography className={classes.assignmentTitle}>
            {assignment.title}
          </Typography>
        </Grid>
        <Grid item sm={3} className={classes.assignmentPercContainer}>
          <Typography
            component="p"
            style={{
              color: `${getAssingmentColor(assinmentCompletePerc)}`,
            }}
          >
            {assinmentCompletePerc}%
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
                background: `${getAssingmentColor(assinmentCompletePerc)}`,
                borderRadius: "10px",
              }}
            ></div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
