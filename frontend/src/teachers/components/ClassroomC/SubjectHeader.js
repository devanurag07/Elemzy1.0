import React,{useEffect} from "react";
import { useSelector } from "react-redux";
import {
  makeStyles,
  Grid,
  Typography,
  MenuItem,
  Select,
} from "@material-ui/core";

import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import { Link } from "react-router-dom";

import { setWorkDate } from "../../actions/teacherActions";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "red",
  },

  links: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",

    "& a": {
      textDecoration: "none",
      color: "blue",
      fontSize: "1rem",
    },
  },

  headerTitle: {
    fontSize: "0.9em",
    color: "gray",
  },
}));

function SubjectHeader() {
  const classes = useStyles();

  const currentSubject = useSelector((state) => state.classroom.currentSubject);

  const getSubjectTeacherInfo = () => {
    if (currentSubject.subject_teacher !== undefined) {
      return currentSubject.subject_teacher.user;
    }
    return null;
  };

  const subjectTeacher = getSubjectTeacherInfo();

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item sm={3} style={{ padding: "0em 2em" }}>
          <Typography variant="subtitle2" className={classes.headerTitle}>
            Subject
          </Typography>

          <Typography variant="subtitle2">{currentSubject.name}</Typography>
        </Grid>
        <Grid item sm className={classes.links}>
          <Link to="/teacher/classroom/notes">Notes</Link>

          <Link to="/teacher/classroom/asssignmentList">Assignment</Link>
          <Link to="/teacher/classroom/documents">Documents</Link>
        </Grid>

        <Grid item sm={3} style={{ padding: "0em 0.8em", textAlign: "center" }}>
          <Typography variant="subtitle2" className={classes.headerTitle}>
            Subject Teacher
          </Typography>
          {subjectTeacher && (
            <Typography variant="subtitle2">
              {subjectTeacher.firstname} {subjectTeacher.lastname}
            </Typography>
          )}
        </Grid>
      </Grid>

      <SelectWorkDate />
    </>
  );
}

export default SubjectHeader;

function SelectWorkDate() {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date().toJSON());

  const handleDateChange = (date) => {
    setSelectedDate(date);

    // Getting "dateTtime" - 2014-07-18T23:30:30  = [2014-07-18,23:30:30][0]
    const timezoneOffset = date.getTimezoneOffset() * 60000;
    const dateStr = new Date(date - timezoneOffset).toJSON().split("T")[0];
    setWorkDate(dateStr);
  };

  useEffect(() => {
    const date=new Date();
    const timezoneOffset = date.getTimezoneOffset() * 60000;
    const dateStr = new Date(date - timezoneOffset).toJSON().split("T")[0];
    setWorkDate(dateStr);

  }, [""]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Workdate"
          format="MM-dd-yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
