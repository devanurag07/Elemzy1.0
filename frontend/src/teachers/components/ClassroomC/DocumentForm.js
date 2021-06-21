import { DialogForm } from "../Form";
import React, { useState, useRef } from "react";
import { FormControl, TextField, Input } from "@material-ui/core";
import { createDocument } from "../../actions/teacherActions";
import { createNotification } from "../../actions/classroom";

import { useSelector } from "react-redux";
import { Grid, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      marginTop: "0.4em",
      width: "100%",
    },
  },
  formTitle: {
    color: "black",
    fontSize: "1.2rem",
  },
  uploadBtn: {
    background: "#ff6b00",

    "&:hover": {
      background: "white",
      border: "2px solid #ff6b00",
      color: "#ff6b00",
    },
  },

  selectDocument:{
    color: 'white',
    background: '#3a65ff',
    fontSize: '1.2rem',
    padding: '0.3em 0.9rem'
  }
}));

function DocumentForm() {
  const documentInitData = {
    title: "",
    description: "",
  };

  const [formErrors, setFormErrors] = useState({});
  const classes = useStyles();

  const [documentFormData, setDocumentFormData] = useState(documentInitData);
  const currentSubject = useSelector((state) => state.classroom.currentSubject);

  const inputFileRef = useRef(null);

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

  const onTextFieldChange = (e) => {
    setDocumentFormData({
      ...documentFormData,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const onDocumentFileChange = (e) => {
    const files = e.target.files;

    if (files.length >= 0) {
      setDocumentFormData({ ...documentFormData, document_file: files[0] });
    } else {
      setDocumentFormData({ ...documentFormData, document_file: "" });
    }
    // console.log(e.target.files);
  };

  const onCreateBtnHandler = () => {
    if (currentSubject.pk !== undefined) {
      createDocument(
        { ...documentFormData, subject: currentSubject.pk },
        setFormErrors,
        onCreateDocumentSucess
      );
    } else {
      createNotification("The subject is not selected", {
        variant: "warning",
      });
    }
  };

  const onCreateDocumentSucess = () => {
    setDocumentFormData(documentInitData);
    inputFileRef.current.value = "";
  };

  const onSelectDocClick = () => {
    inputFileRef.current.click();
  };

  const getDocumentFilename = () => {
    const document_file = documentFormData.document_file;
    if (document_file) {
      const filename = document_file.name;
      if (filename) {
        return filename.slice(0,30)+"...";
      }
      return null;
    }
    return null;
  };

  const documentFilename = getDocumentFilename();

  return (
    <form className={classes.root}>
      <div className={classes.formTitle}>Add Documents</div>
      <FormControl>
        <TextField
          label="Title"
          name="title"
          onChange={onTextFieldChange}
          error={hasFieldError("title")}
          helperText={getFieldErrorMsg("title")}
          value={documentFormData.title}
          variant="outlined"
          size="small"
        />
      </FormControl>

      <FormControl>
        <TextField
          label="Description"
          name="description"
          multiline
          rows={6}
          onChange={onTextFieldChange}
          error={hasFieldError("description")}
          helperText={getFieldErrorMsg("description")}
          value={documentFormData.description}
          variant="outlined"
          size="small"
        />
      </FormControl>

      <FormControl>
        {/* <Input
          type="file"
          color="primary"
          name="document_file"
          onChange={onDocumentFileChange}
          error={hasFieldError("document_file")}
          helperText={getFieldErrorMsg("document_file")}
          ref={inputFileRef}
        /> */}

        <input type="file" ref={inputFileRef} onChange={onDocumentFileChange} style={{display:"none"}}/>

        <div className={classes.selectDocument} onClick={onSelectDocClick}>
          {documentFilename ? documentFilename : "Select Document"}
        </div>

      </FormControl>
      <Grid container style={{ marginTop: "1em" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={onCreateBtnHandler}
          className={classes.uploadBtn}
        >
          Add Document
        </Button>
      </Grid>
    </form>
  );
}

export default DocumentForm;
