import React from "react";
import ClassroomLabel from "../components/RankingC/ClassroomLabel";
import ClassroomStudentsList from "../components/RankingC/ClassroomStudentsList";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
import { BrowserRouter as Router, Route, Link,Switch } from "react-router-dom";

import RankingDetailPage from "./RankingDetailPage";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1em",
  },

  stdListContainer: {
    marginTop: "2em",
  },
}));

const Ranking = () => {
  return (
    <div className="ranking-page">
      <Router>
        <Switch>
          <Route path="/teacher/ranking" exact component={RankingListPage} />
          <Route
            path="/teacher/rankingdetail/:id"
            exact
            component={(props) => (
              <RankingDetailPage stdPk={props.match.params.id} />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
};

export default Ranking;

const RankingListPage = () => {
  const classes = useStyles();
  const classroom = useSelector((state) => state.classroom.classroom);
  const students_list = classroom.students;

  const standard = classroom ? classroom.standard : "null";

  return (
    <div className={classes.root}>
      <ClassroomLabel standard={standard} />
      <div className={classes.stdListContainer}>
        <ClassroomStudentsList
          students_list={students_list}
          standard={standard}
        />
      </div>
    </div>
  );
};
