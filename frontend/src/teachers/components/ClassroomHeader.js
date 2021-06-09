import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Grid } from "@material-ui/core";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useDispatch, useSelector } from "react-redux";

import { setCurrentSubject } from "../actions/classroom";

import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import { setWorkDate } from "../actions/teacherActions";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    minHeight: "6vh",
    backgroundColor: "white",
    paddingLeft: "16px",
    color: "black",
    paddingTop: "10px",

    "& .MuiSelect-root": {
      minWidth: "120px",
    },

    "& .MuiSvgIcon-root": {
      color: "orange",
    },

    "& .MuiInput-underline:before": {
      border: "none",
    },
  },
}));

export default function ClassroomHeader() {
  const classes = useStyles();

  const currentClassroom = useSelector((state) => state.classroom.currentClsrm);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Grid container justify="space-around">
            <Grid item sm={2}>
              <ClassroomSelect />
            </Grid>

            <SemesterSelect />

            <Grid item sm={2}>
              <SelectWorkDate />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const ClassroomSelect = () => {
  const otherClassrooms = useSelector(
    (state) => state.classroom.secondaryClassrooms
  );

  const mainClassroom = useSelector((state) => state.classroom.classroom);

  const [classroomId, setClassroomId] = useState();

  const handleChange = (e) => {
    const classroomId = e.target.value;
    setClassroomId(classroomId);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "SET_SELECTED_CLASSROOM",
      payload: classroomId,
    });
  }, [classroomId]);

  useEffect(() => {
    setClassroomId(mainClassroom.id);
  }, [mainClassroom.id]);

  return (
    <>
      <FormControl>
        <InputLabel id="classroomSelect">Classroom</InputLabel>

        <Select
          id="classroomSelect"
          labelId="classroomSelect"
          value={classroomId}
          onChange={handleChange}
          placeholder="Classroom"
        >
          <MenuItem value={mainClassroom.id}>{mainClassroom.standard}</MenuItem>

          {otherClassrooms.map((classroom) => {
            return (
              <MenuItem value={classroom.classroomInfo.id}>
                {classroom.classroomInfo.standard}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </>
  );
};

const SemesterSelect = () => {
  // current Selected Classroom Semesters
  let currentClassroom = useSelector((state) => state.classroom.currentClsrm);

  const semestersList = currentClassroom.semesters
    ? currentClassroom.semesters
    : [];

  const [selectedSemesterId, setSelectedSemesterId] = useState(0);

  const handleSemesterChange = (e) => {
    setSelectedSemesterId(e.target.value);
  };

  const getSubjectsList = () => {
    const selectedSemester = semestersList.find(
      (semester) => semester.pk == selectedSemesterId
    );

    if (selectedSemester) {
      const selectedSemesterSubjects = selectedSemester.subjects
        ? selectedSemester.subjects
        : [];

      return selectedSemesterSubjects;
    }

    return [];
  };

  const [selectedSubjectId, setSelectedSubjectId] = useState([0]);

  const handleSubjectChange = (e) => {
    const subjectId = e.target.value;
    setSelectedSubjectId(subjectId);
  };
  // Selecting Subject whenever the subject changes
  useEffect(() => {
    setCurrentSubject(selectedSubjectId);
  }, [selectedSubjectId]);

  const subjectsList = getSubjectsList();

  return (
    <>
      <Grid item sm={2}>
        <FormControl>
          <InputLabel id="semesterSelect">Semester</InputLabel>
          <Select labelId="semesterSelect" onChange={handleSemesterChange}>
            {semestersList.map((semester) => {
              return <MenuItem value={semester.pk}>{semester.name}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </Grid>

      <Grid item sm={2}>
        <FormControl>
          <InputLabel id="subjectSelect">Subject</InputLabel>
          <Select labelId="subjectSelect" onChange={handleSubjectChange}>
            {subjectsList.map((subject) => {
              return <MenuItem value={subject.pk}>{subject.name}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </Grid>
    </>
  );
};

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
    const date = new Date();
    handleDateChange(date);
  }, [""]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
    </MuiPickersUtilsProvider>
  );
}
