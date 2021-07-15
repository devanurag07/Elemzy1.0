import React from "react";
import { Grid, Typography, Paper, makeStyles } from "@material-ui/core";
import { MAIN_COLOR, SECONDARY_COLOR } from "../useFulFunctions";

const useStyles = makeStyles((theme) => ({
  root: {},
  welcomeDesc: {
    fontSize: "0.8rem",
    color: "gray",
  },
  welcomeText: {
    fontSize: "1.3rem",
  },
  welcomeUserName: {
    fontSize: "1.3rem",

    fontWeight: "505",
    fontFamily: "Poppins",
    color:SECONDARY_COLOR
  },
}));

const UserInfoBar = () => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item sm={4}>
        <Typography className={classes.welcomeText}>
          Hi, <span className={classes.welcomeUserName}>Anurag Shakya</span>
        </Typography>
        <Typography className={classes.welcomeDesc}>
          Lorem ipsum dolor sit amet.
        </Typography>
      </Grid>

      <Grid item sm></Grid>
      <Grid item sm={4}>
        <nav style={{ display: "flex" }}>
          <div className="nav-item">Search bar</div>
          <div className="nav-item">2</div>
          <div className="nav-item">4</div>
        </nav>
      </Grid>
    </Grid>
  );
};

export default UserInfoBar;
