import React from "react";
import { Paper, Grid, Typography, makeStyles } from "@material-ui/core";
import { getRandomColor } from "../../useFulFunctions";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0.2em",
    width: "100%",
    boxShadow: "none",
    marginTop: "1em",
    display: "flex",
  },
  entryTime: {
    fontSize: "0.8rem",
  },

  startTimeline: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    color: "gray",
  },
  cardTitle: {
    fontSize: "0.9rem",
  },
  classNameLabel: {
    fontSize: "0.8rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const MyTimeTableCard = ({ timetableEntry }) => {
  const classes = useStyles();

  const color = getRandomColor();
  return (
    <Grid container>
      <Grid item sm={2} className={classes.startTimeline}>
        <div className={classes.startTimeline}>
          {timetableEntry.start_time.slice(0, 5)}
        </div>
      </Grid>
      <Grid item sm={8}>
        <Paper
          className={classes.root}
          style={{ background: color.background, color: color.foreground }}
        >
          <Grid container>
            <Grid item sm={8}>
              <Typography className={classes.cardTitle}>
                {timetableEntry.subject_name}
              </Typography>
              <Typography className={classes.entryTime}>
                {timetableEntry.start_time.slice(0, 5)} -{" "}
                {timetableEntry.finish_time.slice(0, 5)}
              </Typography>
            </Grid>
            <Grid item sm></Grid>
            <Grid item sm={4} className={classes.classNameLabel}>
              Class - {timetableEntry.class_standard}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default MyTimeTableCard;
