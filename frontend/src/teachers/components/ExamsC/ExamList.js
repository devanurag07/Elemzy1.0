import { Paper, Typography, Grid, makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const examListStyles = makeStyles((theme) => ({
  root: {
    // padding: "1em",
    padding: "0em 1em",
    boxShadow: "none",
  },
  examList: {
    // padding: "0em 1em",
    marginTop: "1em",
  },
  examCardContainer: {
    marginBottom: "1em",
  },

  examListHeading: {
    color: "#212121",
    fontWeight: "500",
    fontFamily: "Poppins",
    fontSize: "1.3em",
  },
}));

function ExamList() {
  const examsList = useSelector((state) => state.classroom.exams_list);

  const classes = examListStyles();

  return (
    <div>
      <Paper className={classes.root}>
        <Typography
          variant="subtitle1"
          component="div"
          color="textSecondary"
          className={classes.examListHeading}
        >
          Upcoming Exams
        </Typography>

        {/* {examsList.map((examObj) => {
          return <ExamCard examObj={examObj} />;
        })} */}

        <Grid container className={classes.examList}>
          {examsList.map((examObj) => {
            return (
              <Grid item sm={12} className={classes.examCardContainer}>
                <Typography
                  component="div"
                  color="textSecondary"
                  style={{ fontSize: "0.8em", fontWeight: "bold" }}
                >
                  {new Date(examObj.exam_date).toDateString()}
                </Typography>

                <ExamCard examObj={examObj} />
              </Grid>
            );
          })}
        </Grid>
      </Paper>
    </div>
  );
}

export default ExamList;

const ExamCard = ({ examObj }) => {
  // const { title } = examObj;

  const colors = [
    { foreground: "red", background: "#ff000036" },
    { foreground: "#e65c00", background: " #ffb380" },
    { foreground: "#e6005c", background: " #ff80b3" },
    { foreground: "#0052cc", background: " #80b3ff" },
    { foreground: "#3b00b3", background: " #aa80ff" },
  ];

  const randomIdx = Math.floor(Math.random() * colors.length);
  const color = colors[randomIdx];

  const examStyles = makeStyles((theme) => ({
    root: {
      padding: "1em",
      backgroundColor: `${color.background}`,
    },

    examTimeContainer: {
      display: "flex",
      fontSize: "0.8rem",
      flexDirection: "column",
      color: color.foreground,
    },

    examDateSubject: {
      display: "flex",
      fontSize: "0.8rem",
      flexDirection: "column",
      color: color.foreground,
    },

    examTitleDescription: {
      fontSize: "0.8rem",
      color: color.foreground,
    },
  }));

  const classes = examStyles();

  const { title, start_time, finish_time, description, exam_date } = examObj;

  return (
    <div>
      <Paper className={classes.root}>
        <Grid container justify="space-between">
          <Grid
            item
            sm
            justify="space-between"
            className={classes.examTimeContainer}
          >
            <Typography variant="p" component="div">
              {start_time.slice(0, 5)}
            </Typography>

            <Typography variant="p" component="div">
              {finish_time.slice(0, 5)}
            </Typography>
          </Grid>
          <Grid item sm={8} className={classes.examTitleDescription}>
            <Grid item>
              <Typography componet="div">{title}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="p" style={{ fontSize: "0.7rem" }}>
                {description}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            sm
            className={classes.examDateSubject}
            justify="space-between"
          >
            <Typography variant="p" component="div">
              {exam_date}
            </Typography>

            <Typography variant="p" component="div">
              English
            </Typography>
          </Grid>
          <Grid></Grid>
        </Grid>
      </Paper>
    </div>
  );
};
