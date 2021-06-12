import { makeStyles, Paper } from '@material-ui/core'
import React from 'react'


const useStyles=makeStyles((theme)=>({
    root:{
        minHeight:'95vh',
        minWidth:"80vw",
        backgroundColor:'white'
    }
}))


function TimeTable() {

    const classes=useStyles();
    
    return (
        <Paper className={classes.root}>
            TimeTablea
        </Paper>
    )
}

export default TimeTable
