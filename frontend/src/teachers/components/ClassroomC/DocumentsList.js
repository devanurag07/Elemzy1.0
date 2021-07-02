import React from "react";
import { Paper, Typography, Grid, makeStyles, Button } from "@material-ui/core";
import { loadDocuments } from "../../actions/teacherActions";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import path from "path";

const useStyles = makeStyles((theme) => ({
  root: {
    // background: "red",
    padding: "1em 1.5em",
    margin: "0.75em 0.4em",
    boxShadow: "none",
    height:"100%",
    minHeight:"none",
    background: "#ff990070",

    "& .document-title": {
      fontSize: "1rem",
      fontFamily: "Ubuntu",
      fontWeight: "505",
    },

    "& .document-title,.document-info": {
      marginBottom: "0.7rem",
    },

    "& .document-desc": {
      color: "gray",
      fontSize: "0.8rem",
    },

    "& .MuiButton-containedPrimary": {
      backgroundColor: "#2858FF",
    },

    "& .created-by.MuiTypography-root": {
      fontFamily: "Ubuntu",
      fontWeight: "505",
    },

    "& .document-filename a": {
      fontSize: "0.9rem",
      color: "gray",
      textDecoration: "underline",
    },
  },
}));

const Document = ({ title, description, filepath, created_by }) => {
  const classes = useStyles();

  const filepathChunks = filepath.split("/");
  // Getting filename by indexing last part of the url
  const filename = filepathChunks[filepathChunks.length - 1];

  return (
    <Paper className={classes.root}>
      <div className="document-title">
        <Typography variant="p">{title}</Typography>
      </div>

      <div className="document-info">
        <div className="document-desc">
          <Typography variant="p">{description}</Typography>
        </div>

        <div className="document-filename">
          <a href={filepath} download>
            {filename}
          </a>
        </div>
      </div>
    </Paper>
  );
};

const useStyles2 = makeStyles((theme) => ({
  root: {
    marginTop: "1em",
  },
}));

function DocumentsList() {
  const classes = useStyles2();
  const currentSubject = useSelector((state) => state.classroom.currentSubject);

  const subjectDocumentsLst = currentSubject.documents;

  useEffect(() => {
    const subject_pk = currentSubject.pk;

    if (subject_pk !== undefined) {
      loadDocuments(subject_pk);
    }
  }, [currentSubject.pk, currentSubject.workdate]);

  // Work date
  const workdate = currentSubject.workdate;

  return (
    <div>
      <Grid
        container
        className={classes.root}
        direction="row"
      >
        {subjectDocumentsLst.map((document) => {
          const documentCreatedAt = document.created_at.split("T")[0];

          if (workdate == documentCreatedAt) {
            return (
              <>
                <Grid item sm={3}>
                  <Document
                    title={document.title}
                    description={document.description}
                    filepath={document.document_file}
                    created_by={document.teacher_detail}
                  />
                </Grid>
              </>
            );
          }
        })}
      </Grid>
    </div>
  );
}

export default DocumentsList;
