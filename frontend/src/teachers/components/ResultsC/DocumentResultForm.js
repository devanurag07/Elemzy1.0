import React, { useState, useRef } from "react";
import { Grid, FormControl, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1em",
    background:'white'
  },

  documentName: {
    border: "2px solid ",
    padding: "0.2em",
    borderRadius: ".3em",
    fontFamily:"Poppins",
    fontWeight:'505',
    width: "100%",
  },

  uploadDocumentName :{
      fontSize:'1rem'
  }
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

  return (
    <div className="document_upload" className={classes.root}>
      <Grid container spacing={2}>
        <Grid item sm={6}>
          <FormControl style={{ width: "100%" }}>
            <div className={classes.uploadDocumentName} >
              Upload Document
            </div>

            <Grid container spacing={2}>
              <Grid item sm={6}>
                <div className={classes.documentName}  onClick={handleUploadDocumentClick}>
                  {documentFormData.document
                    ? documentFormData.document.name
                    : "Select Document"}
                </div>
                <input
                  type="file"
                  ref={uploadDocumentRef}
                  style={{ display: "none" }}
                  onChange={onDocumentChange}
                />
              </Grid>

              <Grid item sm={6}>
                <FormControl>
                  <Button variant="outlined" color="primary" size="small">
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
