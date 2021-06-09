import { Button, TextField, FormControl } from "@material-ui/core";

import { createNotification } from "../../actions/classroom";

import React, { useState } from "react";
import { useSelector } from "react-redux";

import { createNotes } from "../../actions/teacherActions";
import { makeStyles } from "@material-ui/core";

const useStyles=makeStyles(theme=>({


    formTitle:{
        fontSize:"1.2rem",
        color:'black'
    }
}))

const CreateNotesForm = () => {


    const classes=useStyles();

  const initialData = {
    name: "",
    description: "",
  };

  const [data, setData] = useState(initialData);
  const currentSubject = useSelector((state) => state.classroom.currentSubject);

  // Input change handling
  const onChangeHandler = (e) => {
    setData({
      ...data,
      [e.currentTarget.name]: e.currentTarget.value,
      subject: currentSubject.pk,
    });
  };

  const onCreateBtnHandler = () => {
    if (currentSubject !== null) {
      const notesSubject = currentSubject.pk;

      setData({ ...data, subject: notesSubject });
      // data.subject=notesSubject;

      createNotes(data);
    } else {
      createNotification("The subject is not selected", {
        variant: "warning",
      });
    }
  };

  return (
    <form onCreateBtnHandler={onCreateBtnHandler}>
      <div className={classes.formTitle}>Create Notes</div>
      <FormControl>
        <TextField
          id="note_name"
          label="Title"
          name="name"
          value={data.name}
          onChange={onChangeHandler}
        />
      </FormControl>

      <FormControl>
        <TextField
          id="note_description"
          label="Description"
          name="description"
          multiline

          rows={10}
          value={data.description}
          onChange={onChangeHandler}
        />
      </FormControl>

      <FormControl style={{ marginTop: "1em" }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={onCreateBtnHandler}
          size="small"
        >
          Create
        </Button>
      </FormControl>
    </form>
  );
};

export default CreateNotesForm;
