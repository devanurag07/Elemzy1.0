import React from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import SubjectCard from "./SubjectCard";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "2em",
  },

  subjectCardListItem: {
    marginBottom: "1em",
    width:'100%'
  },
}));

function SubjectCardList() {
  const semesters = useSelector((state) => state.classroom.semesters);

  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      {semesters.map((semester) => {
        return (
          <Grid item sm={12}>
            <Grid container>
              {semester.subjects.map((subject) => {
                return (
                  <div className={classes.subjectCardListItem}>
                  <SubjectCard
                    subject={subject}
                    semesterName={semester.name}
                    
                  />
                  </div>
                );
              })}
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default SubjectCardList;
