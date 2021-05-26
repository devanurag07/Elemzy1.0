import { useDispatch } from "react";
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
import store from "../../store";

const CLASSROOM_URL = `${API_URL}/api/classroom`;
const STUDENTLIST_URL = `${API_URL}/api/studentslist`;

const dispatch = store.dispatch;

export const loadDashboardData = () => {
  const config = getTokenConfig();

  axios
    .get(CLASSROOM_URL, config)
    .then((resp) => {
      if (resp.status == 200) {
        dispatch({
          type: LOAD_CLASSROOM,
          payload: resp.data,
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
        dispatch({
          type: LOAD_TEACHERS,
          payload: resp.data,
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
        dispatch({
          type: "LOAD_STUDENTS",
          payload: response.data,
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

export const addRemoveStudent = async (std_obj) => {
  const config = getTokenConfig();

  if (std_obj.type == "add_student") {
    const response = await axios.put(CLASSROOM_URL, std_obj, config);

    if (response.status === 200) {
      dispatch({
        type: ADD_STUDENT,
        payload: response.data,
      });
    }
  } else if (std_obj.type == "remove_student") {
    const response = await axios.put(CLASSROOM_URL, std_obj, config);
    console.log(response.data);

    if (response.status === 200) {
      dispatch({
        type: REMOVE_STUDENT,
        payload: response.data,
      });
    }
  }
};

export const setCurrentSubject = async (subjectId) => {
  dispatch({
    type: SET_SUBJECT,
    payload: subjectId,
  });
};

export const loadSubjectNotes = (subjectId) => {
  const config = getTokenConfig();

  axios
    .get(
      `http://127.0.0.1:8000/api/classroom/notes?subject_pk=${subjectId}`,
      config
    )

    .then((resp) => {
      if (resp.status == 200) {
        dispatch({
          type: "LOAD_CURRENT_SUBJECT_NOTES",
          payload: { subjectId: subjectId, data: resp.data },
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
      dispatch({
        type: LOAD_OTHERCLASSROOMS_DATA,
        payload: resp.data,
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
