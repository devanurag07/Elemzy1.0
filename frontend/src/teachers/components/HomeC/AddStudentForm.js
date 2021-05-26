import React, { useState } from "react";
import { DialogForm } from "../Form";
import {
  Button,
  FormControl,
  TextField,
  Select,
  MenuItem,
  Grid,
} from "@material-ui/core";
import { useSelector } from "react-redux";

import { createStudentObj } from "../../actions/teacherActions";

function AddStudentForm() {
  // These attributes should match with django model field names and also form field names
  const studentFormInitData = {
    firstname: "",
    lastname: "",
    roll_no: "",
    student_id: "",
    fathers_name: "",
    user: "",
  };

  const [formErrors, setFormErrors] = useState({});

  const [studentFormData, setStudentFormData] = useState(studentFormInitData);

  const [open, setOpen] = useState(false);

  const usersList = useSelector((state) => state.classroom.globalStudents);

  // Select user change handle
  const handleStudentUsrChange = (e) => {
    setStudentFormData({ ...studentFormData, user: e.target.value });

    const userObj = usersList.find((user) => user.id == e.target.value);
    const userFirstName = userObj.firstname;
    const userLastName = userObj.lastname;

    const firstname=userFirstName?userFirstName:"";
    const lastname=userLastName?userLastName:"";

    setStudentFormData({
      ...studentFormData,
      firstname: firstname,
      lastname: lastname,
      user: e.target.value,
    });

    console.log(userObj);
  };

  const onFieldValueChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setStudentFormData({
      ...studentFormData,
      [fieldName]: fieldValue,
    });

    console.log(studentFormData);
  };

  const onCreateBtnHandler = () => {
    createStudentObj(studentFormData, setFormErrors, onSuccess);
  };

  const hasFieldError = (fieldName) => {
    if (formErrors[fieldName] !== undefined) {
      return true;
    }
    return false;
  };

  const getErrorMsg = (fieldName) => {
    if (formErrors[fieldName] !== undefined) {
      const errMsg = formErrors[fieldName];
      return errMsg;
    }
  };

  const onSuccess = () => {
    setOpen(false);
    setStudentFormData(studentFormInitData);
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add Student
      </Button>

      <DialogForm
        open={open}
        setOpen={setOpen}
        onCreateBtnHandler={onCreateBtnHandler}
      >
        <Grid container>
          <Grid item sm={6}>
            <FormControl>
              <TextField
                label="First Name"
                name="firstname"
                onChange={onFieldValueChange}
                value={studentFormData.firstname}
                error={hasFieldError("firstname")}
                helperText={
                  hasFieldError("firstname") ? getErrorMsg("firstname") : ""
                }
              />
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <FormControl>
              <TextField
                label="Last Name"
                name="lastname"
                onChange={onFieldValueChange}
                value={studentFormData.lastname}
                error={hasFieldError("lastname")}
                helperText={
                  hasFieldError("lastname") ? getErrorMsg("lastname") : ""
                }
              />
            </FormControl>
          </Grid>

          <Grid item sm={6}>
            <FormControl>
              <TextField
                label="Roll No"
                name="roll_no"
                onChange={onFieldValueChange}
                value={studentFormData.roll_no}
                error={hasFieldError("roll_no")}
                helperText={
                  hasFieldError("roll_no") ? getErrorMsg("roll_no") : ""
                }
              />
            </FormControl>
          </Grid>

          <Grid item sm={6}>
            <FormControl>
              <TextField
                label="Father name"
                name="fathers_name"
                onChange={onFieldValueChange}
                value={studentFormData.fathers_name}
                error={hasFieldError("fathers_name")}
                helperText={
                  hasFieldError("fathers_name")
                    ? getErrorMsg("fathers_name")
                    : ""
                }
              />
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <FormControl>
              <TextField
                label="Student ID"
                name="student_id"
                onChange={onFieldValueChange}
                value={studentFormData.student_id}
                error={hasFieldError("student_id")}
                helperText={
                  hasFieldError("student_id") ? getErrorMsg("student_id") : ""
                }
              />
            </FormControl>
          </Grid>

          <Grid item sm={6}>
            <FormControl>
              <Select
                onChange={handleStudentUsrChange}
                value={studentFormData.user}
                error={hasFieldError("user")}
                helperText={hasFieldError("user") ? getErrorMsg("user") : ""}
              >
                {usersList.map((user) => {
                  return <MenuItem value={user.id}>{user.firstname}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogForm>
    </>
  );
}

export default AddStudentForm;
