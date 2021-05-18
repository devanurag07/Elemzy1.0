import React from 'react'
import {Paper,Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";


const useStyles=makeStyles((theme)=>({
    root:{
        height:"100vh",
        width:"130px",
        background:"red",
        position:"fixed",
        backgroundColor:"#5992E7",
        padding:"15px",
        color:"white",

        "& .MuiTypography-subtitle1":{
            fontFamily: 'Ubuntu',
            fontWeight: "505"
        }
    }

}));

function Sidebar() {

    const classes=useStyles();

    return (

        <Paper elevation={0} className={classes.root}>
            
            <Typography variant="subtitle1" component="div">
                HOME
            </Typography>
            <Typography variant="subtitle1" component="div">
                CLASSROOM
            </Typography>
            <Typography variant="subtitle1" component="div">
                ATTENDENCE
            </Typography>

        </Paper>    

    )
}

export default Sidebar
