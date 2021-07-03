import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { Grid, Paper, Typography } from "@material-ui/core";

import StudentList2 from "../components/HomeC/StudentsList2";
import MyTimeTable from "../components/HomeC/MyTimeTable";

import EducationSvg from "../components/icons/education 1.svg";
import { makeStyles } from "@material-ui/core/styles";
import { Statbox, MyClassroomStatbox } from "../components/HomeC/Statbox";
import UserInfoBar from "../components/UserInfoBar";
import { loadDashboardData } from "../actions/classroom";
import LeaveRequestsInfo from "../components/HomeC/LeaveRequestsInfo";
import RecentAssignments from "../components/HomeC/RecentAssignments";
import UpcomingExams from "../components/HomeC/UpcomingExams";

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

  useEffect(() => {
    loadDashboardData();
  }, ["input"]);

  return (
    <>
      <UserInfoBar />
      <Grid container>
        <Grid item sm={4}>
          <MyTimeTable />
        </Grid>

        <Grid item sm={4}>
          <Grid item sm={11}>
            <LeaveRequestsInfo />
            <RecentAssignments />
          </Grid>
        </Grid>

        <Grid item sm={4} style={{ padding: "1em" }} justify="center">
          <Grid item sm={8}>
            <div className="upcomingEvents" style={{ minHeight: "30vh" }}>
              <Typography variant="h6">Upcoming Events</Typography>
            </div>
            <UpcomingExams />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
