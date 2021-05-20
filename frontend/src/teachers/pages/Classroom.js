import { Grid } from "@material-ui/core";

import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import SubjectDropdown from "./SubjectDropdown";
import Note from "../components/Note";
import { useSelector } from "react-redux";

import Paper from "@material-ui/core/Paper";
import { NotesForm } from "../components/Form";
import { Button } from "@material-ui/core";

import ClassroomHeader from "../components/ClassroomHeader";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiGrid-item": {
      backgroundColor: "white",
      // minHeight: "100vh",
    },
  },
  dropdown: {
    minHeight: "100vh",
  },

  notesContainer: {
    "& .MuiPaper-root": {
      // backgroundColor: "white",
      height: "100%",
      minHeight: "None",
    },
  },
}));

function Classroom() {
  const classes = useStyles();

  const classroomState = useSelector((state) => state.classroom);
  const currentSubject = useSelector((state) => state.classroom.currentSubject);

  const [notesFormOpen, setNotesFormOpen] = useState(false);

  let notes = <div></div>;

  if (currentSubject) {
    if (currentSubject.notes) {
      notes = (
        <>
          <Grid container className={classes.notesContainer}>
            {currentSubject.notes.map((note) => {
              return (
                <Grid item sm={4}>
                  <Note title={note.name} description={note.description} />
                </Grid>
              );
            })}
          </Grid>
        </>
      );
    }
  }

  return (
    <>
    <ClassroomHeader/>
    
      <Grid container className={classes.root}>
        <Grid item sm={2} className={classes.dropdown}>
          <SubjectDropdown />
        </Grid>

        <Grid item sm={8}>
          {notes}
        </Grid>

        <Grid item sm>
          <Grid container style={{ marginTop: "1em" }}>
            <Grid item sm></Grid>
            <Grid>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setNotesFormOpen(true)}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <NotesForm
          open={notesFormOpen}
          setOpen={setNotesFormOpen}
          title={"Create Subject"}
        />
      </Grid>
    </>
  );
}

export default Classroom;
