import React from "react";
import { Paper, Grid, Typography, makeStyles } from "@material-ui/core";
import { getRandomColor } from "../../useFulFunctions";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0.5em 0.8em",
    borderRadius: "0.2em !important",
  },
}));

function SubjectEntry({ subjectEntry }) {
  const classes = useStyles();

  const color = getRandomColor();

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
