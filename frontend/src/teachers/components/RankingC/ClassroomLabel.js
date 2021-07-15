import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { MAIN_COLOR, SECONDARY_COLOR } from "../../useFulFunctions";

const useStyles = makeStyles((theme) => ({
  root: {},

  pageHeading: {
    color: SECONDARY_COLOR,
  },
  classroomLabel: {
    borderRadius: "10px",
    display: "inline-block",
    padding: "0.0em 0.8em",
    border: "1px solid",
    fontWeight: "400",
    marginTop: "0.3em",
    fontSize: "1.1em",
  },
  standardLabel: {
    display: "inline-block",
    padding: "0.0em 1em",
    background: MAIN_COLOR,
    color: "white",
    marginTop: "0.5em",
    borderRadius: "10px",
  },
}));

function ClassroomLabel({ standard }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.pageHeading} variant="h5">
        Holistic Ranking
      </Typography>
      <Typography
        className={classes.classroomLabel}
        variant="h6"
        component="div"
      >
        Classroom
      </Typography>
      <br />
      <Typography className={classes.standardLabel} variant="h6">
        {standard}
      </Typography>
    </div>
  );
}

export default ClassroomLabel;
