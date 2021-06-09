import { Grid, makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Note from "./NotesC/Note";
import { loadSubjectNotes } from "../../actions/classroom";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiPaper-root": {
      // backgroundColor: "white",
      height: "100%",
      minHeight: "None",
      
    },
  },
}));

function Notes() {
  const classes = useStyles();

  const currentSubject = useSelector((state) => state.classroom.currentSubject);

  useEffect(() => {
    // Loading notes whenever currentSubject changes
    if (currentSubject.pk !== undefined) {
      loadSubjectNotes(currentSubject.pk);
    }
  }, [currentSubject.pk, currentSubject.workdate]);

  //   Getting notes
  const notes = currentSubject.notes;
  //   Rendering notes
  // Work date rendering notes only created at work date
  const workdate = currentSubject.workdate;
  if (notes !== undefined) {
    return (
      <Grid container className={classes.root}>
        {notes.map((note) => {
          const noteWorkdate = note.created_at.split("T")[0];

          if (workdate == noteWorkdate) {
            return (
              <Grid item sm={3} md={3} style={{margin:"0.5em 0.5em"}}>
                <Note title={note.name} description={note.description} />
              </Grid>
            );
          }
        })}
        {/* <Grid></Grid> */}
      </Grid>
    );
  } else {
    return <div></div>;
  }
}

export default Notes;
