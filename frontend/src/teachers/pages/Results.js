import React, { useState, useRef } from "react";
import {
  Grid,
  FormControl,
  Select,
  Paper,
  InputLabel,
  Button,
  makeStyles,
  TextField,
  MenuItem,
  Input,
} from "@material-ui/core";

import { ClassroomSelect, SemesterSelect } from "../components/ClassroomHeader";
import { useSelector } from "react-redux";

import produce from "immer";
import DocumentResultForm from "../components/ResultsC/DocumentResultForm";
import ManualResultForm from "../components/ResultsC/ManualResultForm";
import { MAIN_COLOR, MAIN_COLOR_LIGHT } from "../useFulFunctions";
import ManualResult from "./ManualResult";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1em",
    "& .MuiPaper-root": {
      boxShadow: "none",
    },

    "& .MuiSelect-root": {
      minWidth: "120px",
    },

    "& .MuiSvgIcon-root": {
      color: MAIN_COLOR,
    },

    "& .MuiInput-underline:before": {
      border: "none",
    },
  },
}));

function Results() {
  const classes = useStyles();

  const exam_list = useSelector((state) => state.classroom.exams_list);

  const [selectedExamId, setSelectedExamId] = useState(-1);

  const handleExamChange = (e) => {
    const exam_id = e.target.value;
    setSelectedExamId(exam_id);
  };

  return (
    <div className="results_page">
      <Paper className={classes.root}>
        <Grid container>
          <Grid item sm={3}>
            <ClassroomSelect />
          </Grid>
          <SemesterSelect />

          <Grid item sm={3}>
            <FormControl>
              <InputLabel className="exam_select">Exam</InputLabel>
              <Select
                labelId="exam_select"
                value={selectedExamId}
                onChange={handleExamChange}
              >
                {exam_list.map((exam) => {
                  return <MenuItem value={exam.id}>{exam.title}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      <DocumentResultForm exam_id={selectedExamId} />

      <ManualResult exam_id={selectedExamId} />
    </div>
  );
}

export default Results;
