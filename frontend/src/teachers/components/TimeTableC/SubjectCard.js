import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { Grid, Typography, Paper } from "@material-ui/core";
import { getRandomColor } from "../../useFulFunctions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",

    padding: "0.5em 0.8em",
    borderRadius: "0.2em !important",
  },
}));

const SubjectCard = ({ semesterName, subject }) => {
  const color = getRandomColor();

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
      <Grid container>
        <Grid item>
          <Typography
            component="div"
            style={foregroundStyle}
            className="cardHeading"
          >
            {subject_name}
          </Typography>
        </Grid>
      </Grid>

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
