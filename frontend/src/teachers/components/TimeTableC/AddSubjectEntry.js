import React, { useState } from "react";
import { PopUpForm } from "../Form";
import {
  Grid,
  Paper,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
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
import moment from "moment";
import { createSubjectEntry } from "../../actions/teacherActions";

const useStyles = makeStyles((theme) => ({
  selectContainer: {
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
}));

function AddSubjectEntry({ open, setOpen }) {
  //X- Form Data
  const formDataInit = {
    subject: "",
    start_time: null,
    finish_time: null,
  };

  const [formData, setFormData] = useState(formDataInit);

  //x-FORm DATA-X

  const semesters = useSelector((state) => state.classroom.semesters);
  const [selectedSemesterID, setSelectedSemesterID] = useState(-1);

  const handleSemesterChange = (e) => {
    setSelectedSemesterID(e.target.value);
  };

  const getSubjectsList = () => {
    for (let semester of semesters) {
      if (semester.pk === selectedSemesterID) {
        const subjectsList = semester.subjects;
        return subjectsList;
      }
    }

    return [];
  };

  const subjectsList = getSubjectsList();

  const handleSubjectChange = (e) => {
    const subjectId = e.target.value;
    setFormData({ ...formData, subject: subjectId });
  };

  const [subjectStartTime, setSubjectStartTime] = React.useState(undefined);
  const [subjectEndTime, setSubjectEndTime] = React.useState(undefined);

  const classes = useStyles();

  const handleStartTime = (date) => {
    setSubjectStartTime(date);

    const localDateTime = moment(date).add("5:30").toJSON().split("T")[1];
    setFormData({ ...formData, start_time: localDateTime });
  };
  const handleEndTime = (date) => {
    setSubjectEndTime(date);

    const localDateTime = moment(date).add("5:30").toJSON().split("T")[1];
    setFormData({ ...formData, finish_time: localDateTime });
  };

  //   Error handling
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

  //   Exit Error Handling

  const onCreateBtnHandler = () => [
    createSubjectEntry(formData, setFormErrors),
  ];

  return (
    <div className={classes}>
      <PopUpForm
        open={open}
        setOpen={setOpen}
        onCreateBtnHandler={onCreateBtnHandler}
      >
        <Grid container className={classes.selectContainer}>
          <Grid item sm={6}>
            <FormControl>
              <InputLabel id="semesterSelectLbl">Semester</InputLabel>
              <Select
                value={selectedSemesterID}
                onChange={handleSemesterChange}
                labelId="semesterSelectLbl"
              >
                {semesters.map((semester) => {
                  return (
                    <MenuItem value={semester.pk}>{semester.name}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>

          <Grid item sm={6}>
            <FormControl>
              <InputLabel id="subjectSelectLbl">Subject</InputLabel>
              <Select
                value={formData.subject}
                onChange={handleSubjectChange}
                labelId="subjectSelectLbl"
                error={hasFieldError("subject")}
              >
                {subjectsList.map((subject) => {
                  return <MenuItem value={subject.pk}>{subject.name}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container className={classes.selectContainer}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <Grid item sm={6}>
                <KeyboardTimePicker
                  margin="normal"
                  id="time-picker"
                  label="Start Time"
                  error={hasFieldError("start_time")}
                  helperText={getFieldErrorMsg("start_time")}
                  value={subjectStartTime}
                  onChange={handleStartTime}
                  KeyboardButtonProps={{
                    "aria-label": "change time",
                  }}
                />
              </Grid>

              <Grid item sm={6}>
                <KeyboardTimePicker
                  margin="normal"
                  id="time-picker"
                  label="Finish Time"
                  error={hasFieldError("finish_time")}
                  helperText={getFieldErrorMsg("finish_time")}
                  value={subjectEndTime}
                  onChange={handleEndTime}
                  KeyboardButtonProps={{
                    "aria-label": "change time",
                  }}
                />
              </Grid>
            </Grid>
          </MuiPickersUtilsProvider>
        </Grid>
      </PopUpForm>
    </div>
  );
}

export default AddSubjectEntry;
