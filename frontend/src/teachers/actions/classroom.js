import { useDispatch } from "react";
import store from "../../store";

import {
  LOAD_CLASSROOM,
  LOAD_TEACHERS,
  ADD_STUDENT,
  REMOVE_STUDENT,
  LOAD_SEMESTERS,
  API_URL,
  SET_SUBJECT,
  SET_SELECTED_CLASSROOM,
  LOAD_OTHERCLASSROOMS_DATA,
  LOAD_CURRENT_SUBJECT_NOTES,
} from "./types";

import axios from "axios";
import { getWorkDate } from "./teacherActions";

// Global variables
const CLASSROOM_URL = `${API_URL}/api/classroom`;
const STUDENTLIST_URL = `${API_URL}/api/studentslist`;
// Global disptach function
const dispatch = store.dispatch;

export const loadDashboardData = () => {
  const config = getTokenConfig();

  // Loading classroom data
  axios
    .get(CLASSROOM_URL, config)
    .then((resp) => {
      if (resp.status == 200) {
        const mainClassroomData = resp.data;

        dispatch({
          type: LOAD_CLASSROOM,
          payload: mainClassroomData,
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });

  // Loading semesters
  axios
    .get(`${API_URL}/api/classroom/semester`, config)
    .then((resp) => {
      if (resp.status === 200) {
        dispatch({
          type: LOAD_SEMESTERS,
          payload: resp.data,
        });
      }
    })
    .catch((error) => {
      //Handling errors
    });

  // Loading teachers
  axios
    .get(`${API_URL}/api/teacherslist`, config)
    .then((resp) => {
      if (resp.status === 200) {
        const teachersList = resp.data;

        dispatch({
          type: LOAD_TEACHERS,
          payload: teachersList,
        });
      }
    })
    .catch((error) => {
      //Handling errors
    });

  // lOAD STUDENTS LISt
  axios
    .get(STUDENTLIST_URL, config)
    .then((response) => {
      if (response.status === 200) {
        const globalStudentsList = response.data;
        dispatch({
          type: "LOAD_STUDENTS",
          payload: globalStudentsList,
        });
      }
    })
    .catch((error) => {
      //Handling errors
    });

  // Getting the other classrooms data
  getOtherClassroomsData();
};

export const getTokenConfig = () => {
  const authState = store.getState().auth;

  const token = authState.token;
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // If token, add to headers config
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  } else {
    let localtoken = localStorage.getItem("token");
    if (localtoken) config.headers["Authorization"] = `Token ${localtoken}`;
  }

  return config;
};

export const setCurrentSubject = (subjectId) => {
  dispatch({
    type: SET_SUBJECT,
    payload: subjectId,
  });
};

// Loading current SUbject notes
export const loadSubjectNotes = (subjectId) => {
  const config = getTokenConfig();

  const workDateStr = getWorkDate();

  axios
    .get(
      `http://127.0.0.1:8001/api/classroom/notes?subject_pk=${subjectId}&workdate=${workDateStr}`,
      config
    )

    .then((resp) => {
      if (resp.status == 200) {
        const currentSubjectNotesData = {
          subjectId: subjectId,
          data: resp.data,
        };

        dispatch({
          type: "LOAD_CURRENT_SUBJECT_NOTES",
          payload: currentSubjectNotesData,
        });
      }
    })
    .catch((err) => {
      createNotification("Can't load the notes Try again...", {
        variant: "error",
      });
    });
};

// Loading otherClassrooms data the teacher is handling being the Subject Teacher
export const getOtherClassroomsData = () => {
  const config = getTokenConfig();

  axios.get(`${API_URL}/api/otherClassrooms`, config).then((resp) => {
    if (resp.status == 200) {

      const otherClassroomsData= resp.data;

      dispatch({
        type: LOAD_OTHERCLASSROOMS_DATA,
        payload:otherClassroomsData,
      });
    }
  });
};

// For creating notifications
export const createNotification = (msg, options) => {
  dispatch({
    type: "ADD_NOTIFICATION",
    payload: {
      message: msg,
      options: options,
    },
  });
};
