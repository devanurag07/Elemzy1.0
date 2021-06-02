import React from 'react'
import {Paper,Grid,Typography,makeStyles} from "@material-ui/core";


const useStyles=makeStyles(theme=>({

    root:{
        fontFamily:"Poppins",
        padding:'1.3em',
        boxShadow: "0px 1px 14px 2px rgba(0, 0, 0, 0.25)",
        margin:"1em 0em",

        "& .assignmentTitle":{
            textTransform: 'uppercase',
            fontWeight: 405
        },

        "& .assignmentQuestions":{
            paddingLeft:"1em",
            paddingTop:"1px",

            "& .assignmentQuestion":{
                fontSize: '0.8rem',
                fontWeight: 405,
                color: 'gray',
              
            }
        },
        "& .teacherName":{
            fontSize:"1em",
            fontWeight:405
        }
    },

    noOfQuestions:{
        color:"#2E4ADC",
        fontSize:"1em",
        fontWeight:"405",

    }
}))

function AssignmentDetail({assignment}) {

    const classes=useStyles();

    return (
        <Paper  className={classes.root}>
            <Typography component="div" className="assignmentTitle">
                {assignment.title}
            </Typography>

            <Typography className={classes.noOfQuestions}>
                {assignment.no_of_questions} Questions
            </Typography>

            <div className="assignmentQuestions">
                {assignment.questions.map((question,index)=>{

                    return (
                        <>
                            <Typography className="assignmentQuestion">
                               {index}. {question.question}
                            </Typography>
                        </>
                    )
                })}
            </div>

            <Grid container className="created-by">
                <Grid item sm></Grid>
                <Grid item sm={2}>
                    <Typography variant="p" className="teacherName">
                        -- {assignment.teacher_name}
                    </Typography>
                </Grid>

            </Grid>

        </Paper>
    )
}

export default AssignmentDetail;
