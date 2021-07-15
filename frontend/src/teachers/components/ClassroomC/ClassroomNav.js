import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  makeStyles,
  Grid,
  Typography,
  MenuItem,
  Select,
} from "@material-ui/core";

import { Link } from "react-router-dom";
import { MAIN_COLOR, MAIN_COLOR_LIGHT } from "../../useFulFunctions";

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: "red",
  },

  selectedLink: {
    "& a": {
      textDecoration: "none",
      color: "white",
      fontSize: "1rem",
      backgroundColor: MAIN_COLOR,
      borderRadius: "10px",
      padding: "0.1rem 3rem",
      fontFamily: "'Poppins'",
      fontSize: "1.2rem",
    },
  },

  link: {
    "& a": {
      textDecoration: "none",
      color: "black",
      fontSize: "1rem",
      backgroundColor: MAIN_COLOR_LIGHT,
      borderRadius: "10px",

      padding: "0.1rem 3rem",
      fontFamily: "'Poppins'",
      fontSize: "1.2rem",
    },
  },

  headerTitle: {
    fontSize: "0.9em",
    color: "gray",
  },
}));

function ClassroomNav({ style }) {
  const classes = useStyles();

  const [selectedIdx, setSelectedIdx] = useState(-1);

  const handleLinkClick = (idx) => {
    setSelectedIdx(idx);
  };

  const isSelectedLink = (idx) => {
    return selectedIdx == idx;
  };

  return (
    <>
      <Grid
        container
        style={style}
        justify="space-between"
        className={classes.root}
        spacing={3}
      >
        <Grid
          item
          sm={3}
          className={isSelectedLink(1) ? classes.selectedLink : classes.link}
        >
          <Link
            to="/teacher/classroom/notes"
            onClick={() => handleLinkClick(1)}
          >
            Notes
          </Link>
        </Grid>
        <Grid
          item
          sm={3}
          className={isSelectedLink(2) ? classes.selectedLink : classes.link}
        >
          <Link
            to="/teacher/classroom/asssignmentList"
            onClick={() => handleLinkClick(2)}
          >
            Assignment
          </Link>
        </Grid>

        <Grid
          item
          sm={3}
          className={isSelectedLink(3) ? classes.selectedLink : classes.link}
        >
          <Link
            to="/teacher/classroom/documents"
            onClick={() => handleLinkClick(3)}
          >
            Documents
          </Link>
        </Grid>

        <Grid
          item
          sm={3}
          className={isSelectedLink(4) ? classes.selectedLink : classes.link}
        >
          <Link
            to="/teacher/classroom/leave"
            onClick={() => handleLinkClick(4)}
          >
            Leave Requests
          </Link>
        </Grid>
      </Grid>
    </>
  );
}

export default ClassroomNav;
