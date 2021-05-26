import React, { useState } from "react";
import {
  Paper,
  Typography,
  Grid,
  Icon,
  Button,
  IconButton,
} from "@material-ui/core";
import { useSelector } from "react-redux";

import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";

//Table Component Importing
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import TableFooter from "@material-ui/core/TableFooter";

// Dialog
import { useStyles } from "./styles/StudentsListStyles";

import GlobalStudentListDialog from "./GlobalStudentListDialog";

// Dispatch
import { useDispatch } from "react-redux";

// Actions import
import { addRemoveStudent } from "../../actions/classroom";

import { makeStyles, useTheme } from "@material-ui/core/styles";

function StudentsList() {
  const classes = useStyles();

  // States
  const classroomState = useSelector((state) => state.classroom.classroom);
  const dispatch = useDispatch();

  // For dialog box
  const [open, setOpen] = useState(false);

  // Perforing add remove of student from classroom
  const addRemoveStudentOnClick = (event, actionType) => {
    const std_obj = {
      type: actionType, 
      student_id: event.currentTarget.getAttribute("data-student_id"),
    };

    addRemoveStudent(std_obj);
  };

  //Pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const slicedStudents = classroomState.students.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // const slicedStudents=[1,2,3];
  // Inline style
  const ubuntuBold = { fontWeight: 405, fontFamily: "Ubuntu" };
  return (
    <div>
      <Paper className={classes.root}>
        <div className="stdlist-head">
          {/* Container head */}
          <Grid container>
            <Grid item sm={3}>
              <Typography variant="subtitle1" component="div" style={ubuntuBold}>
                My Class
              </Typography>
            </Grid>
            <Grid item sm></Grid>
            <Grid item>
              <Typography
                variant="subtitle1"
                component="div"
                style={ubuntuBold}
              >
                CLASS - {classroomState.standard}
              </Typography>
            </Grid>
          </Grid>

          {/* Students Table */}

          <Grid container>
            <Grid item sm>
              <Table className={classes.stdTable}>
                <TableHead>
                  <TableRow>
                    <TableCell>Student Name</TableCell>
                    <TableCell>Roll No</TableCell>
                    <TableCell>Father Name</TableCell>
                    <TableCell>Mob.</TableCell>
                    <TableCell>Del</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody className={classes.studentsListBody}>
                  {slicedStudents.map((student) => (
                    <>
                      <TableRow>
                        <TableCell className={classes.stdNameCell}>
                          {student.user.firstname}
                        </TableCell>

                        <TableCell size="small">01</TableCell>
                        <TableCell size="small">Devil</TableCell>
                        <TableCell size="small">01</TableCell>

                        {/* Remove btn */}

                        <TableCell size="small">
                          <IconButton
                            data-student_id={student.id}
                            onClick={(event) =>
                              addRemoveStudentOnClick(event, "remove_student")
                            }
                            className={classes.remove_btn}
                          >
                            <RemoveCircleOutlineIcon color="secondary" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    </>
                  ))}
                </TableBody>
                {/* <Pagination></Pagination> */}
                <TableFooter>
                  <TableRow></TableRow>
                </TableFooter>
              </Table>
            </Grid>
          </Grid>
        </div>

        <Grid container>
          <Grid item sm>
            <TablePagination
              rowsPerPageOptions={[5, 10]}
              colSpan={4}
              count={classroomState.students.length}
              rowsPerPage={rowsPerPage}
              page={page}
              labelRowsPerPage=""
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </Grid>

          <Grid item>
            <Button
              onClick={() => setOpen(true)}
              color="primary"
              variant="contained"
            >
              Add Student
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <GlobalStudentListDialog
        open={open}
        setOpen={setOpen}
        addRemoveStudentOnClick={addRemoveStudentOnClick}
      />
    </div>
  );
}

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

export default StudentsList;
