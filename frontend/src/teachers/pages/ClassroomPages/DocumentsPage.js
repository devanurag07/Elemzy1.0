import DocumentsList from "../../components/ClassroomC/DocumentsList";
import DocumentForm from "../../components/ClassroomC/DocumentForm";
import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "1em",
    minHeight: "65vh",
    padding: "10px",
  },

  docsContainer: {
    boxShadow: "0px 1px 3px 0px",
    borderRadius: "1em",
  },
  uploadDocHeading: {
    fontSize: "1.2rem",
    fontWeight: "505",
    fontFamily: "Poppins",
  },
}));

function DocumentsPage({ setClassroomHeader }) {
  const classes = useStyles();
  setClassroomHeader(true);

  return (
    <Grid container className={classes.root} spacing={3}>
      <Grid item sm={3} style={{ display: "flex" }}>
        <Grid item sm={11}>
          <DocumentForm />
        </Grid>
      </Grid>
      <Grid item sm={9} className={classes.docsContainer}>
        <Typography className={classes.uploadDocHeading}>
          Uploaded Documents
        </Typography>
        <DocumentsList />
      </Grid>
    </Grid>
  );
}

export default DocumentsPage;
