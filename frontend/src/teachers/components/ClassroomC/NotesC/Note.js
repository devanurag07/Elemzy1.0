import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Paper } from "@material-ui/core";
import { MAIN_COLOR } from "../../../useFulFunctions";

const useStyles = makeStyles({
  root: {
    fontFamily: "Ubuntu",
    minHeight: "10vh",
    padding: "1em",
    boxShadow: "none",
    background: MAIN_COLOR,
    color: "white",
  },
  noteTitle: {
    textTransform: "capitalize",
    // fontWeight:"200",
    fontSize: "1.2rem",
    color: "white",
    marginBottom: "0.2em",
  },
  description: {
    fontSize: "0.9em",
    color: "white",
  },
});

export default function Note({ title, description }) {
  const classes = useStyles();

  return (
    <Paper elevation={1} className={classes.root}>
      <Typography
        component="div"
        variant="subtitle1"
        className={classes.noteTitle}
      >
        {title}
      </Typography>

      <Typography
        component="div"
        variant="subtitle2"
        className={classes.description}
      >
        {description}
      </Typography>
    </Paper>
  );
}
