import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Typography,
  FormControl,
  Select,
  Input,
  TextField,
  InputLabel,
  Button,
  MenuItem,
  makeStyles,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import { createExam } from "../../actions/teacherActions";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    // marginTop: "5.3em",
    boxShadow: "none",
    // marginBottom:"1em",

    "& .MuiSelect-root": {
      minWidth: "120px",
    },

    "& .MuiSvgIcon-root": {
      color: "orange",
    },

    "& .MuiInput-underline:before": {
      border: "none",
    },

    "& .MuiInput-underline:hover:not(.Mui-disabled):before ": {
      borderBottom: "2px solid rgb(255 165 0)",
    },
  },

  selectContainer: {
    display: "flex",
    flexDirection: "column",
  },

  formHeading:{
    fontSize: '1.3em',
    fontFamily: 'Poppins',
    fontWeight: '505',
  }
}));

function AddExaminationForm() {
  const classes = useStyles();

  const clsrmState = useSelector((state) => state.classroom.classroom);
  const currentSemesters = useSelector((state) => state.classroom.semesters);

  // form data
  const [formData, setFormData] = useState({
    classroom: null,
    subject: null,
    start_time: null,
    finish_time: null,
    title: "",
    description: "",
    examp_help_text: "",
  });

  const handleFormFieldChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  // x- fORM DATA -x

  // Date time pickers


  const [selectedExamDate, setSelectedExamDate] = React.useState(undefined);

  const handleExamDateChange = (date) => {
    setSelectedExamDate(date);
    const examDate = date.toJSON().split("T")[0];
    const localExamDate=moment(date).add("5:30").toJSON().split('T')[0];

    setFormData({ ...formData, exam_date: localExamDate });
  };

  const [examStartTime, setExamStartTime] = React.useState(undefined);

  const handleExamStartTimeChange = (date) => {
    setExamStartTime(date);


    // const startTime = date.toJSON().split("T")[1];
    const localStartTime=moment(date).add("5:30").toJSON().split('T')[1];
    setFormData({ ...formData, start_time: localStartTime });
  };

  const [examEndTime, setExamEndTime] = React.useState(undefined);

  const handleExamEndTimeChange = (date) => {
    setExamEndTime(date);

    const localEndTime=moment(date).add("5:30").toJSON().split('T')[1];
    // const endTime = date.toJSON().split("T")[1];
    setFormData({ ...formData, finish_time: localEndTime });
  };

  ///x -- Date time PIckers --x/

  // Main Classroom
  const currentClsrm = {
    classroomInfo: clsrmState,
    semesters: currentSemesters,
  };

  // Secondary Classrooms
  const otherClassrooms = useSelector(
    (state) => state.classroom.secondaryClassrooms
  );

  const allClassrooms = otherClassrooms.concat([currentClsrm]);

  // State of select input
  const [selectedClsrm, setSelectedClsrm] = useState({
    classroomInfo: { id: -1 },
    semesters: [],
  });

  const [selectedSmstr, setSelectedSmstr] = useState({ subjects: [] });
  // console.log(allClassrooms);

  const crntSemesters = selectedClsrm.semesters;

  const handleClassroomChange = (e) => {
    const classroomId = e.target.value;
    const clsrmObj = allClassrooms.find(
      (classroom) => classroom.classroomInfo.id === classroomId
    );

    setSelectedClsrm(clsrmObj);
    setFormData({ ...formData, classroom: classroomId });
  };

  const handleSemesterChange = (e) => {
    const semesterPk = e.target.value;
    const smstrObj = crntSemesters.find(
      (semester) => semester.pk === semesterPk
    );

    if (smstrObj) {
      setSelectedSmstr(smstrObj);
    }
  };

  const crntSubjects = selectedSmstr.subjects;
  const [selectedSubject, setSelectedSubject] = useState(null);

  const handleSubjectChange = (e) => {
    const subjectId = e.target.value;
    setSelectedSubject(subjectId);
    setFormData({ ...formData, subject: subjectId });
  };

  useEffect(() => {
    if (allClassrooms.length >= 1) {
      const currentClsrmId = currentClsrm.classroomInfo.id;
      setSelectedClsrm(currentClsrm);
      setFormData({ ...formData, classroom: currentClsrmId });
    }
  }, [clsrmState, currentSemesters]);

  // Form Error handling
  const [formErrors, setFormErrors] = useState({});

  const hasFieldError = (fieldname) => {
    if (formErrors[fieldname]) {
      return true;
    }

    return false;
  };

  const getFieldErrorMsg = (fieldname) => {
    if (hasFieldError(fieldname)) {
      return formErrors[fieldname];
    }
    return "";
  };

  const handleSubmit = (e) => {
    createExam(formData, setFormErrors);
  };

  return (
    <Paper className={classes.root}>
      <Typography variant="subtitle2" className={classes.formHeading}>Add Examination</Typography>

      <Grid container justify="space-between" style={{ marginTop: "1em" }}>
        <Grid item sm={4} className={classes.selectContainer}>
          <FormControl>
            <InputLabel id="classroomLbl">Classroom</InputLabel>
            <Select
              labelId="classroomLbl"
              id="classroom_select"
              value={selectedClsrm.classroomInfo.id}
              placeholder="Classroom"
              onChange={handleClassroomChange}
              error={hasFieldError("classroom")}
            >
              {allClassrooms.map((classroom) => {
                const { standard, id } = classroom.classroomInfo;
                return <MenuItem value={id}>{standard}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Grid>

        <Grid item sm={4} className={classes.selectContainer}>
          <FormControl>
            <InputLabel id="semester_select_lbl">Semester</InputLabel>
            <Select
              labelId="semester_select_lbl"
              value={selectedSmstr.pk}
              placeholder="Semester"
              onChange={handleSemesterChange}
            >
              {crntSemesters.map((semester) => {
                return <MenuItem value={semester.pk}>{semester.name}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Grid>

        <Grid item sm={4} className={classes.selectContainer}>
          <FormControl>
            <InputLabel id="subject_select_lbl">Subject</InputLabel>
            <Select
              labelId="subject_select_lbl"
              value={selectedSubject}
              onChange={handleSubjectChange}
              error={hasFieldError("subject")}
            >
              {crntSubjects.map((subject) => {
                {
                  /* console.log(subject); */
                }
                return <MenuItem value={subject.pk}>{subject.name}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <Grid item sm={4}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Exam Date"
                  value={selectedExamDate}
                  onChange={handleExamDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  error={hasFieldError("exam_date")}
                  helperText={getFieldErrorMsg("exam_date")}
                />
              </Grid>
              <Grid item sm={4}>
                <KeyboardTimePicker
                  margin="normal"
                  id="time-picker"
                  label="Start TIme"
                  value={examStartTime}
                  onChange={handleExamStartTimeChange}
                  KeyboardButtonProps={{
                    "aria-label": "change time",
                  }}
                  error={hasFieldError("start_time")}
                  helperText={getFieldErrorMsg("start_time")}
                />
              </Grid>
              <Grid item sm={4}>
                <KeyboardTimePicker
                  margin="normal"
                  id="time-picker"
                  label="End Time"
                  value={examEndTime}
                  onChange={handleExamEndTimeChange}
                  KeyboardButtonProps={{
                    "aria-label": "change time",
                  }}
                  error={hasFieldError("finish_time")}
                  helperText={getFieldErrorMsg("finish_time")}
                />
              </Grid>
            </Grid>
          </MuiPickersUtilsProvider>
        </Grid>
      </Grid>

      <Grid container justify="space-between" style={{marginBottom:"10px"}}>
        <Grid item sm={6}>
          <FormControl>
            <TextField
              label="Exam Title"
              name="title"
              variant="outlined"
              onChange={handleFormFieldChange}
              error={hasFieldError("title")}
              helperText={getFieldErrorMsg("title")}
            />
          </FormControl>
        </Grid>
        {/* <Grid item sm={6}>
          <FormControl>
            <InputLabel id="file_label" />
            <Input type="file" />
          </FormControl>
        </Grid> */}
      </Grid>

      <Grid container justify="space-between">
        <Grid item sm={6}>
          <FormControl>
            <TextField
              multiline
              rows={4}
              variant="outlined"

              label="Exam Description"
              name="description"
              error={hasFieldError("description")}
              helperText={getFieldErrorMsg("description")}
              onChange={handleFormFieldChange}
            />
          </FormControl>
        </Grid>
        <Grid item sm={6}>
          <FormControl>
            <TextField
              multiline
              rows={4}
              variant="outlined"
              label="Exam Tips"
              name="exam_help_text"
              onChange={handleFormFieldChange}
              error={hasFieldError("exam_help_text")}
              helperText={getFieldErrorMsg("exam_help_text")}
            />
          </FormControl>
        </Grid>
      </Grid>
      <Grid container style={{ marginTop: "1em" }}>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Add Exam
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default AddExaminationForm;
