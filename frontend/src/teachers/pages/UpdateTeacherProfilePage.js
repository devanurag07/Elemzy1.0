import React, { useState } from "react";
import { DialogForm } from "../components/Form";
import {
  FormControl,
  TextField,
  Paper,
  Typography,
  Button,
  Grid,
  Input,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";

import { teacherProfileUpdate } from "../actions/teacherActions";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2em",
    "& .MuiPaper-root": {
      padding: "2em",
    },

    "& .MuiFormControl-root":{
      marginBottom:"1em"
    }
  },

  profilePic: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
  },
}));

function UpdateTeacherProfilePage() {
  const [isFormOpen, setFormOpen] = useState(false);
  const classes = useStyles();

  // LOading classTeacher info
  const classroom = useSelector((state) => state.classroom.classroom);

  const isUserInfoPresent = classroom.class_teacher ? true : false;

  const classTeacherInfo = isUserInfoPresent
    ? classroom.class_teacher.user
    : {};

  const classTeacherInitData = {
    firstname: classTeacherInfo["firstname"],
    lastname: classTeacherInfo["lastname"],
    email: classTeacherInfo["email"],
    phone_number: classTeacherInfo["phone_number"],
    profile_pic_url: classTeacherInfo["profile_pic"],
  };

  console.log(classTeacherInfo);

  const [classTeacherFormData, setClassTeacherFormData] =
    useState(classTeacherInitData);

  useEffect(() => {
    setClassTeacherFormData(classTeacherInitData);
    console.log("hellp changed");
    console.log(classTeacherInitData);
  }, [classTeacherInfo]);

  //Loaded

  //Handling errors

  const [formErrors, setFormErrors] = useState({});

  const hasFieldError = (fieldname) => {
    if (formErrors[fieldname]) {
      return true;
    }
    return false;
  };

  const getErrorMsg = (fieldname) => {
    if (hasFieldError(fieldname)) {
      return formErrors[fieldname];
    }
  };
  //   Errors done

  const onInputFieldChange = (e) => {
    setClassTeacherFormData({
      ...classTeacherFormData,
      [e.currentTarget.name]: e.currentTarget.value,
    });
    console.log(classTeacherFormData);
  };

  const onSubmitHandle = () => {
    const formdata = new FormData();

    for (let fieldname in classTeacherFormData) {
      const fieldvalue = classTeacherFormData[fieldname];
      formdata.append(fieldname, fieldvalue);
    }

    teacherProfileUpdate(formdata, setFormErrors);
  };

  const profilePicInputElem = useRef(null);

  const handleProfilePicChange = (e) => {
    const fileList = e.currentTarget.files;

    if (fileList) {
      const profilePic = fileList[0];
      const profile_pic_url = URL.createObjectURL(fileList[0]);

      setClassTeacherFormData({
        ...classTeacherFormData,
        profile_pic: profilePic,
        profile_pic_url: profile_pic_url,
      });
    }
  };

  return (
    <div className={classes.root}>
      <Grid container justify="center">
        <Grid item sm={8}>
          <Paper elevation={0}>
            <Grid container>
              <Grid item sm={2} className={classes.imgContainer}>
                <img
                  src={classTeacherFormData.profile_pic_url}
                  alt=""
                  className={classes.profilePic}
                  onClick={() => profilePicInputElem.current.click()}
                />
              </Grid>
              <Grid item sm></Grid>
              <Grid item sm={8}>
                <Typography component="div" variant="h6">
                  John Doe
                </Typography>

                <Typography component="div" variant="p" color="textSecondary">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
                  aspernatur dolores perspiciatis praesentium molestiae a hic in
                  eaque delectus ipsum!
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          <Paper>
            <Grid container>
              <Grid item sm={6}>
                <FormControl>
                  <label htmlFor="firstname">First Name</label>
                  <TextField
                    className="firstname"
                    name="firstname"
                    type="text"
                    value={classTeacherFormData.firstname}
                    onChange={onInputFieldChange}
                    error={hasFieldError("firstname")}
                    helperText={getErrorMsg("firstname")}
                  />
                </FormControl>
              </Grid>

              <Grid item sm={6}>
                <FormControl>
                  <label htmlFor="lastname">Last Name</label>
                  <TextField
                    className="lastname"
                    name="lastname"
                    type="text"
                    value={classTeacherFormData.lastname}
                    onChange={onInputFieldChange}
                    error={hasFieldError("lastname")}
                    helperText={getErrorMsg("lastname")}
                  />
                </FormControl>
              </Grid>

              <Grid item sm={6}>
                <FormControl>
                  <label htmlFor="email">Email</label>
                  <TextField
                    className="email"
                    name="email"
                    type="email"
                    value={classTeacherFormData.email}
                    onChange={onInputFieldChange}
                    error={hasFieldError("email")}
                    helperText={getErrorMsg("email")}
                  />
                </FormControl>
              </Grid>

              <Grid item sm={6}>
                <FormControl>
                  <label htmlFor="phone_number">Phone Number</label>
                  <TextField
                    className="phone_number"
                    name="phone_number"
                    type="text"
                    value={classTeacherFormData.phone_number}
                    onChange={onInputFieldChange}
                    error={hasFieldError("phone_number")}
                    helperText={getErrorMsg("phone_number")}
                  />
                </FormControl>
              </Grid>
            </Grid>

            <input
              type="file"
              accept="*png/jpg"
              style={{ display: "none" }}
              ref={profilePicInputElem}
              onChange={handleProfilePicChange}
            />

            <Button
              variant="contained"
              color="primary"
              onClick={onSubmitHandle}
            >
              Update
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default UpdateTeacherProfilePage;
