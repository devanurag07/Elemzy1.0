import React, { useState, useRef } from "react";
import {
  Grid,
  FormControl,
  Select,
  TextField,
  MenuItem,
  InputLabel,
  makeStyles,
} from "@material-ui/core";

import { useSelector } from "react-redux";
import produce from "immer";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1em",
  },
  tableCell: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1rem",
    fontFamily: "Poppins",
    fontWeight: 505,
  },
}));

const ManualResultForm = ({ exam_id }) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    exam: exam_id,
    rows: [
      {
        idx: 0,
        marks: 0,
        max_marks: 0,
        student: -1,
      },
    ],
  });

  return (
    <>
      <div className={classes.root}>
        Enter result manually Exam Id={exam_id}
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Student Name</TableCell>
                <TableCell align="center" colSpan={1}>
                  Marks
                </TableCell>
                <TableCell align="center">
                  <FormControl>
                    {/* <InputLabel>Out Of</InputLabel> */}
                    <TextField variant="outlined" size="small" label="Out OF" />
                  </FormControl>
                </TableCell>
                <TableCell align="center">Subject</TableCell>
                <TableCell align="center">Test</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {formData.rows.map((rowData) => {
                return (
                  <ManualResultRow
                    rowData={rowData}
                    setFormData={setFormData}
                    formData={formData}
                  />
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

const useStyles2 = makeStyles((theme) => ({
  root: {},
  tableCell: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1rem",
    fontFamily: "Poppins",
    fontWeight: 505,
  },
}));
const ManualResultRow = ({ rowData, formData, setFormData }) => {
  let classroom = useSelector(
    (state) => state.classroom.currentClsrm.classroom
  );

  const students_list = classroom.students ? classroom.students : [];

  const handleStudentChange = (e) => {
    const newFormData = produce(formData, (draft) => {
      for (let dataRow of draft.rows) {
        if (dataRow.idx === rowData.idx) {
          dataRow.student = e.target.value;
        }
      }
    });

    setFormData(newFormData);
  };

  const classes = useStyles2();
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        <FormControl style={{ width: "100%" }}>
          <Select
            labelId={`student_${rowData.idx}`}
            variant="outlined"
            size="small"
            value={rowData.student}
            onChange={handleStudentChange}
          >
            {students_list.map((student) => {
              return <MenuItem value={student.id}>{student.name}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </TableCell>

      <TableCell align="center">
        <TextField variant="outlined" size="small"/>
      </TableCell>
      <TableCell align="center">100</TableCell>
      <TableCell align="center">Enlgish</TableCell>
      <TableCell align="center">Exam</TableCell>
    </TableRow>
  );
};

export default ManualResultForm;
