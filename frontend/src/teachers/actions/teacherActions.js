import axios from "axios";
import { getTokenConfig } from "./classroom";
import { ADD_SEMESTER, ADD_SUBJECT, API_URL,ADD_NOTES } from "./types";
import store from "../../store";

const dispatch = store.dispatch;

export const createSemester = async (data) => {
  const config = getTokenConfig();
  console.log(data);

  const response = await axios.post(
    `${API_URL}/api/classroom/semester/`,
    data,
    config
  );

  if (response.status == 200) {
    dispatch({
      type: ADD_SEMESTER,
      payload: response.data,
    });
  }
};

export const createSubject = (data) => {
  const config = getTokenConfig();
  console.log(data);

  axios
    .post(`${API_URL}/api/classroom/subject/`, data, config)
    .then((resp) => {
      console.log(resp);
      dispatch({
        type: ADD_SUBJECT,
        payload: resp.data,
      });

      console.log("Dispatched Add Subject");
    })
    .catch((error) => {
      console.log(error);
    });
};

export const createNotes = (data) => {
  const config = getTokenConfig();

  axios.post(`${API_URL}/api/classroom/notes/`,data,config).then((resp) => {
    if (resp.status == 201) {
        dispatch({
            type:ADD_NOTES,
            payload:resp.data
        })

        console.log("Created \n", resp.data)
    }
  });
};


