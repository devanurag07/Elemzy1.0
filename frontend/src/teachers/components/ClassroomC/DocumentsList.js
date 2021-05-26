import React from "react";
import { Paper, Typography, Grid, makeStyles, Button } from "@material-ui/core";
import {loadDocuments} from "../../actions/teacherActions";
import { useSelector } from "react-redux";
import { useEffect } from "react";


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

const Document = ({ title, description, filename }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <div className="document-title">
        <Typography variant="p">{title}</Typography>
      </div>

      <div className="document-info">
        <div className="document-desc">
          <Typography variant="p">{description}</Typography>
        </div>

        <div className="document-filename">{filename}</div>
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
            <Typography variant="p">-- Kailash Shakya</Typography>
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
  const currentSubject=useSelector(state=>state.classroom.currentSubject);


  useEffect(()=>{

    const subject_pk=currentSubject.pk;
    if(subject_pk!==undefined){
        loadDocuments(subject_pk);
    }

  },[currentSubject.pk])

  return (
    <div>
      <Grid
        container
        className={classes.root}
        direction="row"
        justify="space-around"
        alignItems="center"
      >
        <Grid item sm={5}>
          <Document
            title="PDF FILE OF SYLLABUS - 1"
            description="This is the description of the file you are going to downloada
i am not sure about what you thing wtf.But download this su fucking file"
            filename="syllabus-1.pdf"
          />
        </Grid>

        <Grid item sm={5}>
          <Document
            title="PDF FILE OF SYLLABUS - 1"
            description="This is the description of the file you are going to downloada
i am not sure about what you thing wtf.But download this su fucking file"
            filename="syllabus-1.pdf"
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default DocumentsList;
