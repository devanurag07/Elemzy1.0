import React, { useEffect, useState } from "react";
import { loadPendingLeaveRequests } from "../../actions/classroom";

import {
  Paper,
  Grid,
  Typography,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import { useSelector } from "react-redux";

// Icons
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import {
  acceptedLeaveRequest,
  rejectLeaveRequest,
} from "../../actions/teacherActions";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1.8em 4em",
    boxShadow: "0px 0px 2px 0px",
    borderRadius: "20px",
  },
  leaveRequestsInfo: {
    padding: "1em",
  },

  leaveRequestInfo: {
    // background: "red",
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    color: "white",
    fontSize: "1.2rem",
    fontFamily: "Poppins",
    fontWeight: "505",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const LeaveRequestsPage = ({ setClassroomHeader }) => {
  const [pendingLeaveRequests, setPendingLeaveRequests] = useState([]);
  const [leaveRequestsInfo, setLeaveRequestsInfo] = useState({});

  // Classroom Standard
  const standard = useSelector((state) => state.classroom.classroom.standard);
  setClassroomHeader(false);

  useEffect(() => {
    loadPendingLeaveRequests(setPendingLeaveRequests, setLeaveRequestsInfo);
  }, [""]);

  const classes = useStyles();

  const removeLeaveRequest = (leaveRequestId) => {
    // Removing Leave Request that has the id == leaveRequestId
    const newList = [
      ...pendingLeaveRequests.filter(
        (leave_request) => leave_request.id !== leaveRequestId
      ),
    ];
    setPendingLeaveRequests(newList);
    loadPendingLeaveRequests(setPendingLeaveRequests, setLeaveRequestsInfo);

    // loadPendingLeaveRequests()
  };

  return (
    <div className={classes.root}>
      <Grid container className={classes.leaveRequestsInfo}>
        <Grid item sm={4}>
          <Typography variant="h5">{standard}</Typography>
        </Grid>
        <Grid item sm={8}>
          <Grid container spacing={3}>
            <Grid item sm={3}>
              <div
                className={classes.leaveRequestInfo}
                style={{ background: "red" }}
              >
                {leaveRequestsInfo.no_of_pending_requests}
              </div>
            </Grid>
            <Grid item sm={3}>
              <div
                className={classes.leaveRequestInfo}
                style={{ background: "green" }}
              >
                {leaveRequestsInfo.no_of_completed_requests}
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {pendingLeaveRequests.map((leaveRequest) => {
        return (
          <LeaveRequestCard
            leaveRequest={leaveRequest}
            removeLeaveRequest={removeLeaveRequest}
          />
        );
      })}
    </div>
  );
};

export default LeaveRequestsPage;

const useStyles2 = makeStyles((theme) => ({
  root: {
    padding: "0.3em 1em",
    boxShadow: "none",
    background: "#87ceeb63",
    borderRadius: "10px",
    marginTop: "1em",

    "& .MuiGrid-item": {
      background: "none !important",
    },
  },

  leaveRequestFooter: {
    "& span": {
      fontSize: "0.8em",
      color: "black",
    },
  },

  rejectBtn: {
    color: "red",
  },
  acceptBtn: {
    color: "green",
  },
}));

const LeaveRequestCard = ({ leaveRequest, removeLeaveRequest }) => {
  const { student_name, from_date, to_date, reason_title } = leaveRequest;

  const classroomStandard = useSelector(
    (state) => state.classroom.classroom.standard
  );

  const classes = useStyles2();

  const cancelLeaveRequestBtn = () => {
    rejectLeaveRequest(leaveRequest.id, removeLeaveRequest);
  };

  const acceptLeaveRequestBtn = () => {
    acceptedLeaveRequest(leaveRequest.id, removeLeaveRequest);
  };

  return (
    <Paper className={classes.root}>
      <Grid container>
        <Grid item sm={8}>
          <Grid container>
            <Grid item sm={4}>
              <Typography variant="h6">{student_name}</Typography>
            </Grid>
            <Grid item sm={4}>
              <Typography variant="h6">{classroomStandard}</Typography>
            </Grid>
            <Grid item sm={4}>
              <Typography variant="h6">Reason</Typography>
            </Grid>
          </Grid>
          <Grid container className={classes.leaveRequestFooter}>
            <Grid item sm={8}>
              <Typography variant="p">
                Leave Request from {from_date} to {to_date}
              </Typography>
            </Grid>
            <Grid item sm={4}>
              <Typography variant="p">{reason_title}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={4}>
          <Grid container justify="flex-end">
            <Grid item sm={4}>
              <IconButton
                className={classes.rejectBtn}
                onClick={cancelLeaveRequestBtn}
              >
                <CancelIcon fontSize="large" />
              </IconButton>
            </Grid>
            <Grid item sm={4}>
              <IconButton
                className={classes.acceptBtn}
                onClick={acceptLeaveRequestBtn}
              >
                <CheckCircleIcon fontSize="large" />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
