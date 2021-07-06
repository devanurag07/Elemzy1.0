import React, { useState, useRef } from "react";
import { Grid, FormControl, Button, makeStyles } from "@material-ui/core";
import { uploadResult } from "../../actions/teacherActions";
import { createNotification } from "../../actions/classroom";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1em",
    background: "white",
  },

  documentName: {
    border: "2px solid ",
    padding: "0.2em",
    borderRadius: ".3em",
    fontFamily: "Poppins",
    fontWeight: "505",
    width: "100%",
  },

  uploadDocumentName: {
    fontSize: "1rem",
  },
  examErrorInfo: {
    color: "red",
  },
}));

const DocumentResultForm = ({ exam_id }) => {
  const classes = useStyles();

  const [documentFormData, setDocumentFormData] = useState({
    document: null,
  });

  const uploadDocumentRef = useRef(null);

  // handle upload document click
  const handleUploadDocumentClick = () => {
    uploadDocumentRef.current.click();
  };

  const onDocumentChange = (e) => {
    const files = e.target.files;

    if (files.length >= 1) {
      const document_file = files[0];
      setDocumentFormData({ ...documentFormData, document: document_file });
    } else {
      setDocumentFormData({ ...documentFormData, document: null });
    }
  };

  // Form Error Handling
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

  const onUploadBtnClick = () => {
    console.log(exam_id);
    if (exam_id !== -1) {
      uploadResult({ ...documentFormData, exam: exam_id }, setFormErrors);
    } else {
      createNotification("Please Select An Exam", { variant: "warning" });
    }
  };

  const documentFieldError = hasFieldError("document");
  const examFieldError = hasFieldError("exam");

  return (
    <div className="document_upload" className={classes.root}>
      <div className={classes.examErrorInfo}>
        {examFieldError ? "Result of this exam is already uploaded" : ""}
      </div>
      <Grid container spacing={2}>
        <Grid item sm={6}>
          <FormControl style={{ width: "100%" }}>
            <div className={classes.uploadDocumentName}>Upload Document</div>

            <Grid container spacing={2}>
              <Grid item sm={6}>
                <div
                  className={`${classes.documentName} `}
                  onClick={handleUploadDocumentClick}
                  name="document"
                >
                  {documentFormData.document
                    ? documentFormData.document.name
                    : "Select Document"}
                </div>
                {/* Document Field Error Msg Component */}
                <p style={{ color: "red", fontSize: "0.8em" }}>
                  {getFieldErrorMsg("document")}
                </p>

                <input
                  type="file"
                  ref={uploadDocumentRef}
                  style={{ display: "none" }}
                  onChange={onDocumentChange}
                />
              </Grid>

              <Grid item sm={6}>
                <FormControl>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={onUploadBtnClick}
                  >
                    Upload
                  </Button>
                </FormControl>
              </Grid>
            </Grid>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
};

export default DocumentResultForm;
