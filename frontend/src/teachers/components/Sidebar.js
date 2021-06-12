import React from "react";
import { Paper, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "150px",
    background: "red",
    position: "fixed",
    backgroundColor: "#5992E7",
    color: "white",

    "& .MuiListItemText-primary": {
      fontFamily: "Ubuntu",
      fontWeight: "505",
      fontSize: "1em",
    },

    "& a": {
      textDecoration: "none",
      color: "white",
    },
  },

  listItemLink: {
    textDecoration: "none",
  },
}));

const Sidebar = () => {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <Paper elevation={0} className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <Link to="/teacher/home">
          <ListItem
            button
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0)}
          >
            <ListItemText primary="Home" />
          </ListItem>
        </Link>

        <Link to="/teacher/classroom">
          <ListItem
            button
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1)}
          >
            <ListItemText primary="Classroom"></ListItemText>
          </ListItem>
        </Link>

        <Link to="/teacher/exams">
          <ListItem
            button
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(event, 2)}
          >
            <ListItemText primary="Exams"></ListItemText>
          </ListItem>
        </Link>

        <Link to="/teacher/profile">
          <ListItem
            button
            selected={selectedIndex === 3}
            onClick={(event) => handleListItemClick(event, 3)}
          >
            <ListItemText primary="Profile"></ListItemText>
          </ListItem>
        </Link>

        <Link to="/teacher/timetable">
          <ListItem
            button
            selected={selectedIndex === 4}
            onClick={(event) => handleListItemClick(event, 4)}
          >
            <ListItemText primary="TimeTable"></ListItemText>
          </ListItem>
        </Link>


      </List>
    </Paper>
  );
};

export default Sidebar;
