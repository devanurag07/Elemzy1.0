import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import { Grid } from "@material-ui/core";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    minHeight: "6vh",
    backgroundColor: "white",
    paddingLeft:"16px"
  },
}));

export default function ClassroomHeader() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Grid container>
            <Grid item>
              <ClassroomSelect />
            </Grid>

            <Grid item></Grid>
            <Grid item></Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}


const useStyles2=makeStyles((theme)=>({

  rootGridContainer:{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "space-between",

    "& .label" : {
      color:"black",
      marginRight:"20px"
    }
  }


}))


const ClassroomSelect = () => {
  const [classroomId, setClassroomId] = useState(0);

  const otherClassrooms = useSelector(
    (state) => state.classroom.secondaryClassrooms
  );

  const mainClassroom=useSelector((state)=>state.classroom.classroom)

  const handleChange = (e) => {
    setClassroomId(e.target.value);
    console.log(e.target.value);
  };


  const classes=useStyles2();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "SET_SELECTED_CLASSROOM",
      payload: classroomId,
    });
    
  }, [classroomId]);


  return (
    <>
      <FormControl>
        <Grid contianer className={classes.rootGridContainer}>
          <Grid item>
            <div className="label">Classrooom</div>
          </Grid>
          <Grid item>
            <Select
              id="classroomSelect"
              value={classroomId}
              onChange={handleChange}
            >
              {otherClassrooms.map((classroom) => {
                return (
                  <MenuItem value={classroom.classroomInfo.id}>
                    {classroom.classroomInfo.standard}
                  </MenuItem>
                );
              })}


            </Select>
          </Grid>
        </Grid>
      </FormControl>
    </>
  );
};
