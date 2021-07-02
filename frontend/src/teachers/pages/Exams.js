import React from "react";
import AddExaminationForm from "../components/ExamsC/AddExaminationForm";
import ExamList from "../components/ExamsC/ExamList";
import { Grid, makeStyles } from "@material-ui/core";
import ClassroomHeader from "../components/ClassroomHeader";


const useStyles=makeStyles((theme)=>({

  root:{
    margin:"1em",
  }
}))

function Exams() {

  const classes=useStyles();

  return (
    <div>
      <Grid container >
        <Grid item sm={12}>
          <ClassroomHeader />
        </Grid>
      </Grid>
      <Grid container style={{minHeight:"80vh",background:"white",marginTop:"0.5m",padding:"2em"}} justify="space-between">
        <Grid item sm={6} md={5} lg={3}>
          <ExamList />
        </Grid>
        {/* <Grid item sm={0} md={3} lg={2}></Grid> */}
        <Grid item sm={6} >
          <AddExaminationForm />
        </Grid>
      </Grid>
    </div>
  );
}

export default Exams;
