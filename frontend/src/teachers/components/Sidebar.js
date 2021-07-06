import { makeStyles } from "@material-ui/core";
import React from "react";
import { Grid, Typography, Paper } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    padding: "1em",
    position: "fixed",
    top: "0",

    "& .MuiListItem-button": {
      paddingLeft: "0px",
    },
    "& .MuiListItemIcon-root": {
      minWidth: "35px",
    },
    "& .MuiList-root": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
    },

    "& a": {
      color: "gray",
      textDecoration: "none",

      "&:hover": {
        textDecoration: "none",
      },
    },
  },
  mainLogo: {
    color: "#ff6b00",
    boxShadow: "none",
  },
}));

// Hello
function Sidebar() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item sm={10}>
          <Paper className={classes.mainLogo}>
            <Typography variant="h5">Elemzy</Typography>
            <Typography variant="p">Teachers Portal</Typography>
          </Paper>
        </Grid>
      </Grid>
      <Grid container style={{ minHeight: "70vh" }}>
        <List component="nav" aria-label="main mailbox folders">
          <Link to="/teacher/dashboard" path>
            <SideBarItem itemText="Dasboard" itemIcon={<InboxIcon />} />
          </Link>

          <Link to="/teacher/classroom">
            <SideBarItem itemText="Classes" itemIcon={<InboxIcon />} />
          </Link>

          <Link to="/teacher/ranking">
            <SideBarItem itemText="Ranking" itemIcon={<InboxIcon />} />
          </Link>

          <Link to="/teacher/exams">
            <SideBarItem itemText="Exams" itemIcon={<InboxIcon />} />
          </Link>

          <Link to="/teacher/events">
            <SideBarItem itemText="Events" itemIcon={<InboxIcon />} />
          </Link>

          <Link to="/teacher/results">
            <SideBarItem itemText="Results" itemIcon={<InboxIcon />} />
          </Link>

          <Link to="/teacher/profile">
            <SideBarItem itemText="Profile" itemIcon={<InboxIcon />} />
          </Link>

          <Link to="/teacher/timetable">
            <SideBarItem itemText="TimeTable" itemIcon={<InboxIcon />} />
          </Link>
        </List>
      </Grid>
    </div>
  );
}

export default Sidebar;

const SideBarItem = ({ itemText, itemIcon }) => {
  return (
    <>
      <ListItem button>
        <ListItemIcon>{itemIcon}</ListItemIcon>
        <ListItemText primary={itemText} />
      </ListItem>
    </>
  );
};
