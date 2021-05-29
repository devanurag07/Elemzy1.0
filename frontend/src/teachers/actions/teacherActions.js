import axios from "axios";
import { createNotification, getTokenConfig } from "./classroom";
import {
  ADD_SEMESTER,
  ADD_SUBJECT,
  API_URL,
  ADD_NOTES,
  LOAD_ASSIGNMENTS,
  ADD_STUDENT,
  SET_WORKDATE,
} from "./types";
import { returnErrors, createMessage } from "../../actions/messages";
import store from "../../store";
import { config } from "react-transition-group";

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

  axios
    .post(`${API_URL}/api/classroom/notes/`, data, config)
    .then((resp) => {
      if (resp.status == 201) {
        dispatch({
          type: ADD_NOTES,
          payload: resp.data,
        });

        console.log("Created \n", resp.data);
      }
    })
    .catch((err) => {
      // dispatch(createMessage("You can't create the notes for this class",err.response.status))
    });
};

export const loadAssignments = (subjectId) => {
  const config = getTokenConfig();
  const workDateStr=getWorkDate();


  axios
    .get(`${API_URL}/api/classroom/assignments?subject_pk=${subjectId}&workdate=${workDateStr}`, config)
    .then((resp) => {
      if (resp.status == 200) {
        dispatch({
          type: LOAD_ASSIGNMENTS,
          payload: resp.data,
        });
      }
    })
    .catch((err) => {
      createNotification("Can't load the assignments Try again...", {
        variant: "error",
      });
    });
};

export const createAssignment = (
  assignmentData,
  setFormErrors,
  setFormOpen,
  success
) => {
  const config = getTokenConfig();

  // Sending request to server with token config and assignment Data
  axios
    .post(`${API_URL}/api/classroom/assignments/`, assignmentData, config)
    .then((resp) => {
      if (resp.status == 200) {
        // Closing the form dialog
        setFormOpen(false);
        if (resp.data.isCreated) {
          // Addding assignment to state
          dispatch({
            type: "ADD_ASSIGNMENT",
            payload: resp.data.data,
          });

          // Clearing form and Notification stuff
          success();
        }
      }
    })
    .catch((err) => {
      if (err.response.status == 400) {
        // Setting the errors
        setFormErrors(err.response.data);
      } else if (err.response.status == 401) {
        const errMsg = err.response.data;
        createNotification(errMsg, {
          variant: "error",
        });
      }
    });
};

export const createStudentObj = (studentFormData, setFormErrors, success) => {
  const config = getTokenConfig();

  axios
    .post(`${API_URL}/api/classroom/students/`, studentFormData, config)
    .then((resp) => {
      if (resp.status == 201) {
        dispatch({
          type: ADD_STUDENT,
          payload: resp.data,
        });
        // Creating Notification
        createNotification("The student added to classroom", {
          variant: "success",
        });

        // Cleanup
        success();
      }
    })
    .catch((err) => {
      // Error handling
      if (err.response) {
        if (err.response.data.errors) {
          setFormErrors(err.response.data.errors);
        }
      }
    });
};

export const createDocument = (
  documentFormData,
  setFormErrors,
  onCreateSucess
) => {
  const config = getTokenConfig();

  const formData = new FormData();
  const documentTitle = documentFormData.title;
  const documentDescription = documentFormData.description;
  const documentSubject = documentFormData.subject;

  formData.append("title", documentTitle);
  formData.append("subject", documentSubject);
  formData.append("description", documentDescription);
  formData.append("document_file", documentFormData.document_file);

  axios
    .post(`${API_URL}/api/classroom/documents/`, formData, config)
    .then((resp) => {
      if (resp.status == 201) {
        const createdDocument = resp.data;
        dispatch({
          type: "ADD_DOCUMENT",
          payload: createdDocument,
        });

        onCreateSucess();
      }
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.data.errors) {
          if (err.response.status == 400) {
            const formErrors = err.response.data.errors;
            setFormErrors(formErrors);
          }
        }

        if (err.response.status == 401) {
          createNotification(err.response.data, {
            variant: "error",
          });
        }
      }
    });
};

export const loadDocuments = (subject_pk) => {
  const config = getTokenConfig();
  const workDateStr=getWorkDate();

  axios
    .get(`${API_URL}/api/classroom/documents?subject_pk=${subject_pk}&workdate=${workDateStr}`, config)
    .then((resp) => {
      if (resp.status == 200) {
        const documentsLst = resp.data;
        console.log(documentsLst);
        dispatch({
          type: "LOAD_DOCUMENTS",
          payload: documentsLst,
        });
      }
    });
};

// Setting work date

export const setWorkDate = (workdate) => {
  dispatch({
    type: SET_WORKDATE,
    payload: workdate,
  });
};


export const getWorkDate = ()=>{
  const workDateStr = store.getState().classroom.currentSubject.workdate;

  if(workDateStr!=undefined){

    return workDateStr;
  }else{
    return ''
  }
}