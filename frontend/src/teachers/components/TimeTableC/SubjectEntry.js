import React from "react";
import { Paper, Grid, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1em",
  },
}));

function SubjectEntry({ subjectEntry }) {
  const classes = useStyles();

  const colors = [
    { foreground: "#e65c00", background: " #ffb380" },
    { foreground: "#e6005c", background: " #ff80b3" },
    { foreground: "#0052cc", background: " #80b3ff" },
    { foreground: "#3b00b3", background: " #aa80ff" },
  ];

  const randomIdx = Math.floor(Math.random() * colors.length);
  const color = colors[randomIdx];

  const backgroundStyle = { background: color.background };
  const foregroundStyle = { color: color.foreground };

  return (
    <Paper className={classes.root} style={backgroundStyle}>
      <Grid container>
        <Grid item>
          <Typography
            component="div"
            style={foregroundStyle}
            className="cardHeading"
          >
            {subjectEntry.subject_name}
          </Typography>
        </Grid>
        <Grid item sm></Grid>
        <Grid item>
          <Typography
            component="div"
            style={foregroundStyle}
            className="cardSecondaryText"
          >
            {subjectEntry.semester_name}
          </Typography>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item>
          <Typography
            component="div"
            style={foregroundStyle}
            className="cardSecondaryText"
          >
            FROM &nbsp;
            {subjectEntry.start_time.slice(0, 5)} TO &nbsp;
            {subjectEntry.finish_time.slice(0, 5)}
          </Typography>
        </Grid>
        <Grid item sm></Grid>
        <Grid item>
          <Typography
            component="div"
            style={foregroundStyle}
            className="cardSecondaryText"
          >
            ST-{subjectEntry.teacher_name}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default SubjectEntry;
