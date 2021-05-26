import { DialogForm } from "../Form";
import React, { useState } from "react";
import { FormControl, TextField, Input } from "@material-ui/core";
import { createDocument } from "../../actions/teacherActions";
import { createNotification } from "../../actions/classroom";

import { useSelector } from "react-redux";

function DocumentForm({ open, setOpen }) {
  const documentInitData = {
    title: "",
    description: "",
  };

  const [formErrors, setFormErrors] = useState({});

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

  const [documentFormData, setDocumentFormData] = useState(documentInitData);
  const currentSubject = useSelector((state) => state.classroom.currentSubject);

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
    setOpen(false);
    setDocumentFormData(documentInitData);
  };

  return (
    <DialogForm
      open={open}
      setOpen={setOpen}
      title="Create Document"
      onCreateBtnHandler={onCreateBtnHandler}
    >
      <FormControl>
        <TextField
          label="Title"
          name="title"
          onChange={onTextFieldChange}
          error={hasFieldError("title")}
          helperText={getFieldErrorMsg("title")}
       
        />
      </FormControl>

      <FormControl>
        <TextField
          label="Description"
          name="description"
          onChange={onTextFieldChange}
       
          error={hasFieldError("description")}
          helperText={getFieldErrorMsg("description")}
       
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
       
        />
      </FormControl>
    </DialogForm>
  );
}

export default DocumentForm;
