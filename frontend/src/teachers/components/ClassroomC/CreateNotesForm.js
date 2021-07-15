import { Button, TextField, FormControl } from "@material-ui/core";

import { createNotification } from "../../actions/classroom";

import React, { useState } from "react";
import { useSelector } from "react-redux";

import { createNotes } from "../../actions/teacherActions";
import { makeStyles } from "@material-ui/core";
import { MAIN_COLOR } from "../../useFulFunctions";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      marginTop: "0.4rem",
      width: "100%",
    },
  },
  formTitle: {
    fontSize: "1.3rem",
    color: "black",
    fontWeight: "505",
  },
  createNoteBtn: {
    background: MAIN_COLOR,

    "&:hover": {
      background: "white",
      border: `2px solid ${MAIN_COLOR}`,
      color: MAIN_COLOR,
    },
  },
}));

const CreateNotesForm = () => {
  const classes = useStyles();
  const initialData = {
    name: "",
    description: "",
    chapter_no: null,
  };

  const [data, setData] = useState(initialData);
  const [formErrors, setFormErrors] = useState({});

  const currentSubject = useSelector((state) => state.classroom.currentSubject);

  // Input change handling
  const onChangeHandler = (e) => {
    setData({
      ...data,
      [e.currentTarget.name]: e.currentTarget.value,
      subject: currentSubject.pk,
    });
  };

  // Form Error Handling
  const hasFieldError = (fieldname) => {
    const fieldErrorMsg = formErrors[fieldname];

    if (fieldErrorMsg !== undefined) {
      return true;
    }
    return false;
  };

  const getFieldErrorMsg = (fieldname) => {
    const hasError = hasFieldError(fieldname);
    if (hasError) {
      const errorMsg = formErrors[fieldname];
      return errorMsg;
    }

    return "";
  };

  const onCreateBtnHandler = () => {
    if (currentSubject !== null) {
      const notesSubject = currentSubject.pk;
      setData({ ...data, subject: notesSubject });
      // data.subject=notesSubject;
      createNotes(data, setFormErrors);
    } else {
      createNotification("The subject is not selected", {
        variant: "warning",
      });
    }
  };

  return (
    <form className={classes.root}>
      <div className={classes.formTitle}>Upload Notes</div>
      <FormControl>
        <TextField
          id="note_name"
          label="Title"
          name="name"
          helperText={getFieldErrorMsg("name")}
          value={data.name}
          onChange={onChangeHandler}
          error={hasFieldError("name")}
          variant="outlined"
          size="small"
        />
      </FormControl>

      <FormControl>
        <TextField
          id="note_chapterno"
          label="Chapter No"
          name="chapter_no"
          error={hasFieldError("chapter_no")}
          helperText={getFieldErrorMsg("chapter_no")}
          value={data.chapter_no}
          variant="outlined"
          onChange={onChangeHandler}
          size="small"
        />
      </FormControl>

      <FormControl>
        <TextField
          id="note_description"
          label="Description"
          name="description"
          error={hasFieldError("description")}
          helperText={getFieldErrorMsg("description")}
          variant="outlined"
          multiline
          rows={10}
          value={data.description}
          onChange={onChangeHandler}
          size="small"
        />
      </FormControl>

      <FormControl style={{ marginTop: "1em" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={onCreateBtnHandler}
          size="small"
          className={classes.createNoteBtn}
        >
          Create
        </Button>
      </FormControl>
    </form>
  );
};

export default CreateNotesForm;
