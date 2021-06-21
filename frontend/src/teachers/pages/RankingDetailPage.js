import { makeStyles, Typography, Grid, Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  approveDocument,
  loadRankingData,
  rejectDocument,
} from "../actions/teacherActions";
import produce from "immer";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1em",
  },
  holisticHeading: {
    color: "#ff6b00",
  },
  rankingDetailContainer: {
    padding: "2em",
    marginTop: "2em",
    boxShadow: "0px 0px 1px 0px",
    borderRadius: "20px",
  },
  documentNameContainer: {
    marginTop: "1em",
  },
  documentDescContainer: {
    marginTop: "1em",
    minHeight: "20vh",
  },

  viewDocBtn: {
    background: "#fb8710",
    "&:hover": {
      background: "#e4790b",
    },
  },

  approveBtn: {
    background: "#4fb105",
    "&:hover": {
      background: "#2e6902",
    },
  },

  rejectBtn: {
    background: "#f50017",
    "&:hover": {
      background: "#c30618",
    },
  },
}));

function RankingDetailPage({ stdPk }) {
  const classes = useStyles();

  const students_list = useSelector(
    (state) => state.classroom.classroom.students
  );

  let selectedStudent = students_list.find(
    (student) => student.id === Number(stdPk)
  );

  // undefined check
  selectedStudent = selectedStudent ? selectedStudent : {};

  const [rankingDocs, setRankingDocs] = useState([]);

  useEffect(() => {
    loadRankingData(stdPk, setRankingDocs);
  }, ["input"]);

  const [rankingDoc, setRankingDoc] = useState({});

  const approveDocumentHandle = async () => {
    if (rankingDoc.id) {
      const newRankingRow = await approveDocument(rankingDoc.id);
      updateRow(newRankingRow);
    }
  };

  const updateRow = (newRankingRow) => {
    const newRankingData = produce(rankingDocs, (draft) => {
      for (let rankingRow of draft) {
        if (rankingRow.id === newRankingRow.id) {
          for (let attr in rankingRow) {
            rankingRow[attr] = newRankingRow[attr];
          }
        }
      }
    });

    setRankingDocs(newRankingData);
    setRankingDoc(newRankingRow);
  };

  const rejectDocumentHandle = async () => {
    if (rankingDoc.id) {
      const newRankingRow = await rejectDocument(rankingDoc.id);
      updateRow(newRankingRow);
    }
  };

  return (
    <div className={classes.root}>
      <Typography variant="h5" className={classes.holisticHeading}>
        Holistic Ranking
      </Typography>

      <div className={classes.rankingDetailContainer}>
        <Grid container>
          <Grid item sm={6}>
            <div className="selected_document">
              <Typography variant="h5">
                {selectedStudent.name} {10}
              </Typography>

              <Grid container className={classes.documentNameContainer}>
                <Grid item sm={6}>
                  <Typography variant="body1">{rankingDoc.name}</Typography>
                </Grid>
                <Grid item sm={6}>
                  <Typography variant="body1">{rankingDoc.category}</Typography>
                </Grid>
              </Grid>

              <Typography
                variant="body2"
                className={classes.documentDescContainer}
              >
                {rankingDoc.description}
              </Typography>

              <Grid container spacing={3}>
                <Grid item sm={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.viewDocBtn}
                  >
                    View Document
                  </Button>
                </Grid>
                <Grid item sm={3}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.approveBtn}
                    onClick={approveDocumentHandle}
                  >
                    Approve
                  </Button>
                </Grid>
                <Grid item sm={3}>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.rejectBtn}
                    onClick={rejectDocumentHandle}
                  >
                    Reject
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item sm={6}>
            Graph
          </Grid>
        </Grid>

        <Grid container style={{ marginTop: "2em" }}>
          <Typography variant="h5">Previous Requests</Typography>
          {rankingDocs.map((rankingDoc) => {
            return (
              <RankingDocumentRow
                rankingDoc={rankingDoc}
                onClick={() => setRankingDoc(rankingDoc)}
              />
            );
          })}
        </Grid>
      </div>
    </div>
  );
}

export default RankingDetailPage;

const useStyles2 = makeStyles((theme) => ({
  root: {
    padding: "1em",
    boxShadow: "0px 0px 1px 0px",
    borderRadius: "10px",
    marginTop: "1em",
    background: "#f5ebef",

    "& .MuiGrid-item": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",

      "& p": {
        textAlign: "center",
      },

      "& div": {
        textAlign: "center",
      },
    },
  },
  docName: {
    fontSize: "1.2rem",
    fontFamily: "Poppins",
    fontWeight: "505",
  },
  docDesc: {
    fontSize: "1rem",
    fontFamily: "Poppins",
    fontWeight: "505",
  },
  docCategory: {
    fontSize: "1rem",
    fontFamily: "Poppins",
    fontWeight: "505",
  },

  statusLabel: {
    padding: "0.3em 0.2em",
    background: "green",
    borderRadius: "20px",
    fontSize: "1.1rem",
    color: "white",
  },
}));

const RankingDocumentRow = ({ rankingDoc, onClick }) => {
  const pending = rankingDoc.pending;
  const approved = rankingDoc.approved;
  const rejected = pending ? false : !approved;

  const classes = useStyles2();

  const getDocumentStatus = () => {
    if (approved) {
      return (
        <Typography
          className={classes.statusLabel}
          style={{ background: "green" }}
          component="div"
        >
          Approved
        </Typography>
      );
    } else if (rejected) {
      return (
        <Typography
          className={classes.statusLabel}
          style={{ background: "red" }}
          component="div"
        >
          Rejected
        </Typography>
      );
    } else if (pending) {
      return (
        <Typography
          className={classes.statusLabel}
          style={{ background: "gray" }}
          component="div"
        >
          Pending
        </Typography>
      );
    }
  };
  return (
    <Grid container className={classes.root} onClick={onClick}>
      <Grid item sm={2}>
        <Typography className={classes.docName}>{rankingDoc.name}</Typography>
      </Grid>
      <Grid item sm={2}>
        <Typography className={classes.docCategory}>
          {rankingDoc.category}
        </Typography>
      </Grid>
      <Grid item sm={4}>
        <Typography className={classes.description}>
          {rankingDoc.description}
        </Typography>
      </Grid>
      <Grid item sm={2}>
        <Typography>{rankingDoc.created_date}</Typography>
      </Grid>
      <Grid item sm={2}>
        {getDocumentStatus()}
      </Grid>
    </Grid>
  );
};
