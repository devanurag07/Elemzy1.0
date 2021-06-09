import React, { useState } from "react";
import { useSelector } from "react-redux";
import QuestionForm from "./QuestionForm";
import { produce } from "immer";
import { createAssignment } from "../../actions/teacherActions";
import { createNotification } from "../../actions/classroom";

import {
  Button,
  TextField,
  FormControl,
  Grid,
  makeStyles,
} from "@material-ui/core";

import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiPaper-root": {
      width: "56%",
    },

    "& .MuiFormControl-root": {
      marginBottom: "0.4em",
    },

    "& .info": {
      color: "gray",
    },
  },

  formTitle: {
    fontSize: "1.2rem",
    color: "black",
  },
}));

const CreateAssignmentForm = () => {
  const currentSubject = useSelector((state) => state.classroom.currentSubject);
  const currentClassroom = useSelector((state) => state.classroom.currentClsrm);

  // Styling
  const classes = useStyles();

  // Form data
  const initialData = {
    title: "" /*Assignment Title*/,
    deadline: new Date().toJSON(),

    // Adding a question empty field this state will be used to render Question component
    questions: [
      {
        key: 0,
        question: "",
        answer: "",
        choices: [
          // Each object will render choice form object
          {
            key: 0,
            title: "",
          },
        ],
      },
    ],
    // To hold validation errors
    errors: {},
  };

  const [assignmentFormData, setAssignmentFormData] = useState(initialData);

  const addQuestion = () => {
    // Adding a question empty field this state will be used to render Question component
    const newAssignmentsData = produce(assignmentFormData, (draft) => {
      // Pushing question state object
      draft.questions.push({
        key: draft.questions.length,
        question: "",
        answer: "",
        choices: [{ key: 0, title: "" }],
      });
    });

    setAssignmentFormData(newAssignmentsData);
  };

  const setFormErrors = (errData) => {
    // Seting form error+

    setAssignmentFormData({
      ...assignmentFormData,
      errors: errData,
    });
  };

  const assignmentCreateSucess = () => {
    // Clearing the form
    setAssignmentFormData(initialData);
    createNotification("Assignment Successfully Created ", {
      variant: "success",
    });
  };

  const onCreateBtnHandler = () => {
    if (currentSubject.pk !== undefined) {
      // Creating assignment

      createAssignment(
        { ...assignmentFormData, subject: currentSubject.pk },
        setFormErrors,
        assignmentCreateSucess
      );
    } else {
      createNotification("Please select a subject :)", { variant: "warning" });
    }
  };

  const handleTitleChange = (e) => {
    setAssignmentFormData({
      ...assignmentFormData,
      title: e.currentTarget.value,
    });
  };

  const handleDateChange = (date) => {
    const deadline_date = new Date(date).toJSON();

    setAssignmentFormData({ ...assignmentFormData, deadline: deadline_date });
  };

  const currentSubjectName = currentSubject.name
    ? currentSubject.name
    : "No Subject Selected";
  const currentClassStandard = currentClassroom.classroom.standard
    ? currentClassroom.classroom.standard
    : "No Class Selected";

  const hasAssignmentTitleError = assignmentFormData.errors.assignmentErrors
    ? true
    : false;
  const assignmentTitleErrMsg = hasAssignmentTitleError
    ? assignmentFormData.errors.assignmentErrors.title
    : "";

  return (
    <form
      onCreateBtnHandler={onCreateBtnHandler}
      title={"Create Assignment"}
      className={classes.root}
    >
      <div className={classes.formTitle}>Create Assignment</div>
      <div className="info" style={{ paddingTop: "10px" }}>
        Subject : {currentSubjectName}
        <div></div>
        Classroom : {currentClassStandard}
      </div>

      <FormControl>
        <TextField
          required
          label="Assignment Name"
          name="title"
          value={assignmentFormData.title}
          onChange={handleTitleChange}
          error={hasAssignmentTitleError}
          helperText={assignmentTitleErrMsg}
        />
      </FormControl>

      {assignmentFormData.questions.map((question) => (
        <QuestionForm
          questionFormData={question}
          data={assignmentFormData}
          setData={setAssignmentFormData}
        />
      ))}

      <Grid container>
        <FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={addQuestion}
            size="small"
          >
            Add Question
          </Button>
        </FormControl>
      </Grid>

      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="MM/dd/yyyy"
          value={new Date(assignmentFormData.deadline)}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider>

      <FormControl>
        <Button variant="outlined" color="primary" onClick={onCreateBtnHandler}>
          Create
        </Button>
      </FormControl>
    </form>
  );
};

export default CreateAssignmentForm;
