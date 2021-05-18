import { useDispatch } from "react";
import {
  LOAD_CLASSROOM,
  LOAD_TEACHERS,
  ADD_STUDENT,
  REMOVE_STUDENT,
  LOAD_SEMESTERS,
} from "./types";

import axios from "axios";
import store from "../../store";

const CLASSROOM_URL = "http://127.0.0.1:8000/api/classroom";
const STUDENTLIST_URL = "http://127.0.0.1:8000/api/studentslist";

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
    .get("http://127.0.0.1:8000/api/classroom/semester/", config)
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
    .get("http://127.0.0.1:8000/api/teacherslist", config)
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

export const setCurrentSubject = async (id) => {
  dispatch({
    type: "SET_SUBJECT",
    payload: id,
  });

  const config = getTokenConfig();

  axios
    .get(`http://127.0.0.1:8000/api/classroom/notes?subject_pk=${id}`, config)
    .then((resp) => {
      if (resp.status == 200) {
        dispatch({
          type: "LOAD_CURRENT_SUBJECT_NOTES",
          payload: resp.data,
        });
      }
    });
};
