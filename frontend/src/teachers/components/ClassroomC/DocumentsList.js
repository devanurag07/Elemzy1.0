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
    boxShadow: "0px 1px 14px 2px rgba(0, 0, 0, 0.25)",
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

    "& .document-filename": {
      fontSize: "0.9rem",
      color: "#0065ff",
      textDecoration: "underline",
    },
  },
}));

const Document = ({ title, description, filepath,created_by }) => {
  const classes = useStyles();

  const filepathChunks=filepath.split("/");
  // Getting filename by indexing last part of the url
  const filename=filepathChunks[filepathChunks.length-1];

  return (
    <Paper className={classes.root}>
      <div className="document-title">
        <Typography variant="p">{title}</Typography>
      </div>

      <div className="document-info">
        <div className="document-desc">
          <Typography variant="p">{description}</Typography>
        </div>

        <div className="document-filename"><a href={filepath} download>{filename}</a></div>
      </div>

      <Grid container>
        <Grid item>
          <div className="download-btn">
            <Button variant="contained" color="primary" size="small">
              Download
            </Button>
          </div>
        </Grid>
        <Grid item sm></Grid>
        <Grid item>
          <div className="created-by">
            <Typography variant="p">-- {created_by.user.firstname} {created_by.user.lastname}</Typography>
          </div>
        </Grid>
      </Grid>
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
  }, [currentSubject.pk]);

  return (
    <div>
      <Grid
        container
        className={classes.root}
        direction="row"
        justify="space-around"
        alignItems="center"
      >
        {subjectDocumentsLst.map((assignment) => {

          return (
            <>
              <Grid item sm={5}>
                <Document
                  title={assignment.title}
                  description={assignment.description}
                  filepath={assignment.document_file}
                  created_by={assignment.teacher_detail}
                />
              </Grid>
            </>
          );
        })}
      </Grid>
    </div>
  );
}

export default DocumentsList;
