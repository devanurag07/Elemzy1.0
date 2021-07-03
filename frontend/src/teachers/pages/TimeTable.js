import { makeStyles, Paper, Grid, Button, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SubjectCardList from "../components/TimeTableC/SubjectCardList";
import AddSubjectEntry from "../components/TimeTableC/AddSubjectEntry";
import { SubjectForm } from "../components/Form";
import { loadSubjectEntries } from "../actions/teacherActions";
import SubjectEntries from "../components/TimeTableC/SujectEntries";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "93vh",
    minWidth: "80vw",
    backgroundColor: "white",
    padding: "2em",

    "& *": {
      fontFamily: "Poppins",
    },

    "& .MuiPaper-root": {
      boxShadow: "none",
      borderRadius: 0,
    },

    "& .cardHeading": {
      fontSize: "18px",
      fontWeight: 505,
    },

    "& .cardSecondaryText": {
      fontSize: "10px",
      fontWeight: "505",
    },
  },

  timeTableHeading: {
    fontWeight: 505,
    fontSize: "1.4rem",
  },

  btnContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

const TimeTable = () => {
  const classes = useStyles();

  const [subjectFormOpen, setSubjectFormOpen] = useState(false);
  const [subjectEntryFormOpen, setSubjectEntryFormOpen] = useState(false);

  useEffect(() => {
    loadSubjectEntries();
  }, [""]);

  return (
    <Paper className={classes.root}>
      <Grid container spacing={2}>
        <Grid item sm={6}>
          <Paper>
            <Grid container>
              <Grid item sm={4}>
                <Typography
                  component="div"
                  className={classes.timeTableHeading}
                >
                  TimeTable
                </Typography>
              </Grid>

              <Grid item sm></Grid>
              <Grid item sm={4} className={classes.btnContainer}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => setSubjectEntryFormOpen(true)}
                >
                  Add Entry
                </Button>
              </Grid>
            </Grid>
            <Grid container>
              <SubjectEntries />
              <AddSubjectEntry
                open={subjectEntryFormOpen}
                setOpen={setSubjectEntryFormOpen}
              />
            </Grid>
          </Paper>
        </Grid>

        <Grid item sm={6}>
          <Paper>
            <Grid container>
              <Grid item sm={4}>
                <Typography
                  component="div"
                  className={classes.timeTableHeading}
                >
                  Subjects
                </Typography>
              </Grid>

              <Grid item sm></Grid>
              <Grid item sm={4} className={classes.btnContainer}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => setSubjectFormOpen(true)}
                >
                  Add Subject
                </Button>
              </Grid>
            </Grid>

            <SubjectForm open={subjectFormOpen} setOpen={setSubjectFormOpen} />
            <SubjectCardList />
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TimeTable;
