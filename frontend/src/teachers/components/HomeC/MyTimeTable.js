import React, { useEffect } from "react";
import { loadMyTimeTable } from "../../actions/teacherActions";

function MyTimeTable() {
  useEffect(() => {
    loadMyTimeTable();
  }, []);
  return <div>MyTimetable</div>;
}

export default MyTimeTable;
