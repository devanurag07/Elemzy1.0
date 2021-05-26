import { DialogForm } from "../Form";
import React, { useState } from "react";
import { FormControl, TextField, Input } from "@material-ui/core";
import { createDocument } from "../../actions/teacherActions";
import { useSelector } from "react-redux";

function DocumentForm({ open, setOpen }) {
  const documentInitData = {
    title: "",
    description: "",
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
      createDocument({...documentFormData,subject:subject_pk});
    }
  };

  return (
    <DialogForm open={open} setOpen={setOpen} title="Create Document">
      <FormControl>
        <TextField label="Title" name="title" onChange={onTextFieldChange} />
      </FormControl>

      <FormControl>
        <TextField
          label="Description"
          name="description"
          onChange={onTextFieldChange}
        />
      </FormControl>

      <FormControl>
        <Input
          type="file"
          color="primary"
          name="document_file"
          onChange={onDocumentFileChange}
        />
      </FormControl>
    </DialogForm>
  );
}

export default DocumentForm;
