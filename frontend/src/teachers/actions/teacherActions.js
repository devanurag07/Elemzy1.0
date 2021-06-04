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

// Creating the semester
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

// Creating subject
export const createSubject = (data) => {
  const config = getTokenConfig();

  axios
    .post(`${API_URL}/api/classroom/subject/`, data, config)
    .then((resp) => {
      const subjectData = resp.data;

      dispatch({
        type: ADD_SUBJECT,
        payload: subjectData,
      });
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
        const noteData = resp.data;
        dispatch({
          type: ADD_NOTES,
          payload: noteData,
        });
      }
    })
    .catch((err) => {
      // dispatch(createMessage("You can't create the notes for this class",err.response.status))
    });
};

export const loadAssignments = (subjectId) => {
  const config = getTokenConfig();
  const workDateStr = getWorkDate();

  axios
    .get(
      `${API_URL}/api/classroom/assignments?subject_pk=${subjectId}&workdate=${workDateStr}`,
      config
    )
    .then((resp) => {
      if (resp.status == 200) {
        const assignmentsList = resp.data;
        dispatch({
          type: LOAD_ASSIGNMENTS,
          payload: assignmentsList,
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
          const assignmentData = resp.data.data;
          dispatch({
            type: "ADD_ASSIGNMENT",
            payload: assignmentData,
          });

          // Clearing form and Notification stuff
          success();
        }
      }
    })

    .catch((err) => {
      if (err.response.status == 400) {
        // Setting the errors
        const errorsData = err.response.data;
        setFormErrors(errorsData);
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
        const addedStudentData = resp.data;

        dispatch({
          type: ADD_STUDENT,
          payload: addedStudentData,
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
  const workDateStr = getWorkDate();

  axios
    .get(
      `${API_URL}/api/classroom/documents?subject_pk=${subject_pk}&workdate=${workDateStr}`,
      config
    )
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

export const getWorkDate = () => {
  const workDateStr = store.getState().classroom.currentSubject.workdate;

  if (workDateStr != undefined) {
    return workDateStr;
  } else {
    return "";
  }
};

export const teacherProfileUpdate = (teacherProfileFormData,setFormErrors) => {
  const config = getTokenConfig();

  axios
    .patch(
      `${API_URL}/api/teacherProfileUpdate`,
      teacherProfileFormData,
      config
    )
    .then((resp) => {
      if (resp.status == 200) {
        console.log("updated");
        window.location=window.location;
        createNotification("Profile Updated Successfully",{
          variant:"success"
        })
      }
    })
    .catch((err) => {
      if (err.response.status == 400) {
        if (err.response) {
          const responseData = err.response.data;

          if (responseData) {
            const errors = responseData.errors;
            if (errors) {
              setFormErrors(errors);
              createNotification("Form Errors",{
                variant:"error"
              })
            }
          }
        }
      }
      console.log(err.response.data);
    });
};
