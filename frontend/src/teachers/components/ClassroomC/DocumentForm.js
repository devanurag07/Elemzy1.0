import { DialogForm } from "../Form";
import React, { useState ,useRef} from "react";
import { FormControl, TextField, Input } from "@material-ui/core";
import { createDocument } from "../../actions/teacherActions";
import { createNotification } from "../../actions/classroom";

import { useSelector } from "react-redux";
import { Grid, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formTitle: {
    color: "black",
    fontSize: "1rem",
  },
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

  const inputFileRef=useRef(null);

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
    inputFileRef.current.value='';
    console.log(documentInitData);
  };



  return (
    <form>
      <div className={classes.formTitle}>Create Document</div>
      <FormControl>
        <TextField
          label="Title"
          name="title"
          onChange={onTextFieldChange}
          error={hasFieldError("title")}
          helperText={getFieldErrorMsg("title")}
          value={documentFormData.title}
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
        />
      </FormControl>

      <FormControl>
        <Input
          type="file"
          color="primary"
          name="document_file"
          onChange={onDocumentFileChange}
          error={hasFieldError("document_file")}
          helperText={getFieldErrorMsg("document_file")}
          ref={inputFileRef}
        />
      </FormControl>
      <Grid container style={{ marginTop: "1em" }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={onCreateBtnHandler}
          size="small"
        >
          Create
        </Button>
      </Grid>
    </form>
  );
}

export default DocumentForm;
