import React from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { getRandomColor, SECONDARY_COLOR } from "../../useFulFunctions";

const UpcomingExams = () => {
  const upcoming_exams = useSelector(
    (state) => state.classroom.dashboard_data.upcoming_exams
  );

  return (
    <div>
      <Typography variant="h6" style={{ color: SECONDARY_COLOR }}>
        Upcoming Exams
      </Typography>
      {upcoming_exams.map((exam) => {
        return <UpcomingExamDetail exam={exam} />;
      })}
    </div>
  );
};

export default UpcomingExams;

const useStyles2 = makeStyles((theme) => ({
  root: { borderRadius: "0.3em" },
  exam_times: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",

    alignItems: "center",
  },
  examTitle: {
    fontSize: "1rem",
    fontFamily: "Poppins",
    fontWeight: "505",
  },
  timeText: {
    fontSize: "0.8rem",
    fontFamily: "Poppins",
    // fontWeight: "505",
  },
  examDescription: {
    fontSize: "0.8rem",
  },
}));

const UpcomingExamDetail = ({ exam }) => {
  const classes = useStyles2();

  const color = getRandomColor();

  return (
    <Grid
      container
      className={classes.root}
      style={{
        background: color.background,
        color: color.foreground,
        marginTop: "1em",
      }}
      spacing={3}
    >
      <Grid item sm={2}>
        <div className={classes.timeText} style={{ marginBottom: "0.6em" }}>
          {exam.start_time.slice(0, 5)}
        </div>
        <div className={classes.timeText}>{exam.finish_time.slice(0, 5)}</div>
      </Grid>
      <Grid item sm={10}>
        <Typography className={classes.examTitle}>{exam.title}</Typography>
        <Typography className={classes.examDescription}>
          {exam.description.slice(0, 10)}
        </Typography>
      </Grid>
    </Grid>
  );
};
