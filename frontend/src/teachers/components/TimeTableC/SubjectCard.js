import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { Grid, Typography, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: "1em",
  },
}));

const SubjectCard = ({ semesterName, subject }) => {
  const colors = [
    { foreground: "#e65c00", background: " #ffb380" },
    { foreground: "#e6005c", background: " #ff80b3" },
    { foreground: "#0052cc", background: " #80b3ff" },
    { foreground: "#3b00b3", background: " #aa80ff" },
  ];

  const randomIdx = Math.floor(Math.random() * colors.length);
  const color = colors[randomIdx];

  const classes = useStyles();

  const {
    name: subject_name,
    subject_teacher_detail: {
      user: { firstname },
    },
  } = subject;

  const foregroundStyle = { color: color.foreground };

  return (
    <Paper
      className={classes.root}
      style={{ backgroundColor: color.background }}
    >
      <Typography style={foregroundStyle} className="cardHeading">
        {subject_name}
      </Typography>
      <Grid container>
        <Grid item>
          <Typography
            variant="div"
            style={foregroundStyle}
            className="cardSecondaryText"
          >
            SEMESTER-{semesterName}
          </Typography>
        </Grid>

        <Grid item sm></Grid>
        <Grid item>
          <Typography
            variant="div"
            style={foregroundStyle}
            className="cardSecondaryText"
          >
            ST-{firstname}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SubjectCard;
