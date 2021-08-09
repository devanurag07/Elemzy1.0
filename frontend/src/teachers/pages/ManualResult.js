import React, { useState, useRef } from "react";
import {
  makeStyles,
  Grid,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useSelector } from "react-redux";
import produce from "immer";
import { submitManualResult } from "../actions/teacherActions";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1em",
  },
  resultRows: {
    marginTop: "1em",
  },

  addBtn: {
    marginTop: "1em",
  },
}));

const ManualResult = ({ exam_id }) => {
  const [result_rows, setResultRows] = useState([]);
  const classes = useStyles();

  const [messages, setMessages] = useState({});

  const addRow = () => {
    const idx = result_rows.length + 1;
    setResultRows([...result_rows, { idx, student: "", marks: "" }]);
    console.log(result_rows);
  };

  const submitResult = () => {
    submitManualResult(
      {
        exam: exam_id,
        result_rows: result_rows,
      },
      setMessages
    );
  };

  return (
    <div className={classes.root}>
      <Typography variant="h6">Manual Results</Typography>
      <div className={classes.resultRows}>
        {result_rows.map((result_row) => {
          return (
            <ResultRow
              result_row={result_row}
              result_rows={result_rows}
              setResultRows={setResultRows}
              messages={
                messages[result_row.idx] ? messages[result_row.idx] : {}
              }
            />
          );
        })}
      </div>

      <Button
        variant="contained"
        color="primary"
        className={classes.addBtn}
        onClick={() => addRow()}
      >
        Add Row
      </Button>

      <Button
        variant="contained"
        color="primary"
        className={classes.addBtn}
        onClick={() => submitResult()}
      >
        Submit
      </Button>
    </div>
  );
};

export default ManualResult;

const useStyles2 = makeStyles((theme) => ({
  root: {
    // marginTop: "0.1em",

    "& .error": {
      color: "red",
      fontSize: "0.8em",
    },

    "& .success": {
      color: "green",
      fontSize: "0.8em",
    },
  },
}));

const ResultRow = ({ result_row, result_rows, setResultRows, messages }) => {
  const students = useSelector((state) => state.classroom.classroom.students);
  const inputRef = useRef(null);

  const classes = useStyles2();

  const onStudentChange = (student) => {
    const newRows = produce(result_rows, (draft) => {
      for (let res_row of draft) {
        if (res_row.idx == result_row.idx) {
          if (student == null) {
            res_row.student = null;
          } else {
            res_row.student = student.id;
          }
        }
      }
    });

    console.log(result_rows);
    setResultRows(newRows);
  };

  const onInputChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;

    const newRows = produce(result_rows, (draft) => {
      for (let res_row of draft) {
        if (res_row.idx == result_row.idx) {
          res_row[inputName] = inputValue;
        }
      }
    });

    setResultRows(newRows);
  };

  const hasError = (fieldname) => {
    if (messages["status"] == "errors") {
      const errors = messages["errors"][fieldname];
      if (errors != undefined) {
        return true;
      }
      return false;
    }
    return false;
  };

  const getErrMsg = (fieldname) => {
    if (hasError(fieldname)) {
      const errorMsg = messages["errors"][fieldname];
      return errorMsg;
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item>
          <Autocomplete
            id="combo-box-demo"
            options={students}
            getOptionLabel={(option) => option.name}
            style={{ width: 200 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Student"
                variant="outlined"
                error={hasError("student")}
                helperText={getErrMsg("student")}
                ref={inputRef}
              />
            )}
            onChange={(e, value) => onStudentChange(value)}
            size="small"
          />
        </Grid>
        <Grid item sm={2}>
          <TextField
            size="small"
            variant="outlined"
            value={result_row.marks}
            name="marks"
            error={hasError("marks")}
            helperText={getErrMsg("marks")}
            onChange={onInputChange}
          />
        </Grid>
      </Grid>
      <p className={messages.msg ? messages.status : ""}>
        {messages.msg ? messages.msg : ""}
      </p>
    </div>
  );
};
