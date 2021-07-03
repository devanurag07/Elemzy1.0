import React from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1em",
  },
  leaveRequestsPending: {
    width: "40px",
    height: "40px",
    background: "red",
    borderRadius: "50%",
    color: "white",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    fontSize: "1.4rem",
    fontFamily: "Poppins",
    fontWeight: "505",
  },
  leaveRequestsCompleted: {
    width: "40px",
    height: "40px",
    background: "green",
    borderRadius: "50%",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    fontSize: "1.4rem",
    fontFamily: "Poppins",
    fontWeight: "505",
  },
}));
const LeaveRequestsInfo = () => {
  const classes = useStyles();

  const leave_requests_info = useSelector(
    (state) => state.classroom.dashboard_data.leave_requests
  );

  return (
    <div className={classes.root}>
      <Typography variant="h6">Leave Requests</Typography>
      <Grid container spacing={1}>
        <Grid item>
          <div className={classes.leaveRequestsPending}>
            {leave_requests_info.completed_requests}
          </div>
        </Grid>
        <Grid item>
          <div className={classes.leaveRequestsCompleted}>
            {leave_requests_info.pending_requests}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default LeaveRequestsInfo;
