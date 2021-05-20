import React, { useState } from "react";
import { useSelector,useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import axios from "axios";

import {setCurrentSubject} from "../actions/classroom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  root: {
    "& .MuiGrid-item": {
      backgroundColor: "white",
      minHeight: "100vh",
    },


    "& .MuiListItemText-primary":{
      fontSize: "1em",
      fontWeight: "454",
      fontFamily: 'Ubuntu'
    }

  },
  
  semesterName:{
    fontSize:"0.8em"
  }
  
}));



function ListItemCollapse({ semesterName, subjects,  }) {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleClick = () => {
    setOpen(!open);
  };


  const setSubject = (id) =>{

    setCurrentSubject(id);

  }
  

  return (
    <>
      <ListItem button onClick={handleClick} className={classes.semesterName}>
        <ListItemText primary={semesterName} />

        {open ? <ExpandLess /> : <ExpandMore />}
      
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        
        <List component="div" disablePadding>
          
          {subjects.map((subject) => {

            return (
              <ListItem button className={classes.nested} id={subject.pk}
                  onClick={(e) => setSubject(e.currentTarget.id)}>
                
                <ListItemText
                  primary={subject.name}
                  
                />
              </ListItem>
          
            );
          })}
        
        </List>
      </Collapse>
    </>
  );
}

export default function SubjectDropdown() {
  const classes = useStyles();
  const selectedClassroom = useSelector((state) => state.classroom.currentClsrm);
  
  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          All Classrooms
        </ListSubheader>
      }
      className={classes.root}
    >
      {selectedClassroom.semesters.map((semester) => {
        return (
          <ListItemCollapse
            subjects={semester.subjects}
            semesterName={semester.name}
            setSemester={(item) => console.log("je")}
          />
        );
      })}

    </List>
  );
}
