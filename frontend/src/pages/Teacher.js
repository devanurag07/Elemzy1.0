import React,{Fragment} from "react";
import {useSelector} from "react-redux";
import {Typography,createMuiTheme,ThemeProvider} from "@material-ui/core";
import axios from "axios";
import {TeacherDashboard} from "../teachers/pages/TeacherDashboard";

// Applying default theme
const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "Poppins"
    ].join(','),
  },

});


theme.typography.subtitle1 = {
  fontSize: '1em',
  '@media (min-width:600px)': {
    fontSize: '1.2rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.3rem',
  },
};


theme.typography.subtitle2 = {
  fontSize: '0.8rem',
  '@media (min-width:600px)': {
    fontSize: '1em',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.2em',
  },
};

function Teacher() {

    // Getting the auth state
    const authState=useSelector((state)=>state.auth);

    // if the user is not authenticated
    // if(!(authState.isAuthenticated===true && authState.user.is_teacher===true)){
    //     return (
    //         <Fragment>
    //             <h2>Not Authenticated as Teacher</h2>
    //         </Fragment>
    //     )
    // }

    return (
      <ThemeProvider theme={theme}>
        <div>
        
          <Fragment>
            <TeacherDashboard/>
          </Fragment>
        </div>
      </ThemeProvider>
    )
}
  

export default Teacher;

  