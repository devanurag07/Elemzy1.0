import React, { useEffect } from "react";
import { Paper, Grid, Typography, makeStyles } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { useSelector } from "react-redux";
import { loadAssignments } from "../../actions/teacherActions";

const useStyles = makeStyles((theme) => ({
  root: {
    // boxShadow: `0px -1px 8px -2px rgba(0,0,0,0.75);`,
    padding: "0px 30px",
    paddingTop: "1em",
    minHeight: "90vh",
  },
  assignmentListHeader: {
    letterSpacing: "1px",
    fontWeight: "505",
  },
}));

function AssignmentList() {
  const assignments = useSelector(
    (state) => state.classroom.currentSubject.assignments
  );

  const classes = useStyles();

  const currentSubject = useSelector((state) => state.classroom.currentSubject);

  useEffect(() => {
    if (currentSubject.pk !== undefined) {
      loadAssignments(currentSubject.pk);
      console.log("hey");
    }
  }, [currentSubject.pk]);

  return (
    <>
      <Paper className={classes.root}>
        <Typography
          variant="subtitle1"
          className={classes.assignmentListHeader}
        >
          Assignments List
        </Typography>
        <List>
          {assignments.map((assignment) => {
            return (
              <>
                <ListItem>
                  <ListItemText>{assignment.title}</ListItemText>
                </ListItem>
                <Divider />
              </>
            );
          })}
        </List>
      </Paper>
    </>
  );
}

export default AssignmentList;
