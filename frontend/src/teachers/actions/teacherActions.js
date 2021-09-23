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
import store from "../../store";

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

      if (resp.status == 201) {
        dispatch({
          type: ADD_SUBJECT,
          payload: subjectData,
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const createNotes = (data, setFormErrors) => {
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
      if (err.response.status == 400) {
        const respData = err.response.data;
        if (respData) {
          const formErrors = respData.errors;

          if (formErrors) {
            setFormErrors(formErrors);
          }
        }
      }
      // dispatch(createMessage("You can't create the notes for this class",err.response.status))
    });
};

export const loadAssignments = (subjectId) => {
  const config = getTokenConfig();
  const workDateStr = getWorkDate();

  axios
    .get(
      `${API_URL}/api/classroom/assignments/?subject_pk=${subjectId}&workdate=${workDateStr}`,
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

export const createAssignment = (assignmentData, setFormErrors, success) => {
  const config = getTokenConfig();

  // Sending request to server with token config and assignment Data
  axios
    .post(`${API_URL}/api/classroom/assignments/`, assignmentData, config)
    .then((resp) => {
      if (resp.status == 200) {
        // Closing the form dialog

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
        setFormErrors({});
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
      `${API_URL}/api/classroom/documents/?subject_pk=${subject_pk}&workdate=${workDateStr}`,
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

export const teacherProfileUpdate = (teacherProfileFormData, setFormErrors) => {
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
        window.location = window.location;
        createNotification("Profile Updated Successfully", {
          variant: "success",
        });
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
              createNotification("Form Errors", {
                variant: "error",
              });
            }
          }
        }
      }
      console.log(err.response.data);
    });
};

export const createExam = (formData, setFormErrors) => {
  const config = getTokenConfig();

  axios
    .post(`${API_URL}/api/classroom/exams/`, formData, config)
    .then((resp) => {
      if (resp.status === 201) {
        createNotification("Exam successfully created");
        setFormErrors({});

        const examObj = resp.data;
        dispatch({ type: "ADD_EXAM", payload: examObj });
      }
    })
    .catch((err) => {
      console.log(err);
      if (err.response.status === 400) {
        if (err.response.data) {
          const errors = err.response.data.errors;

          if (errors) {
            console.log(errors);
            setFormErrors(errors);
          }
        }
      } else {
        if (err.response.status === 401) {
          createNotification(err.response.data, { variant: "error" });
          setFormErrors({});
        }
      }
    });
};

export const createSubjectEntry = (formData, setFormErrors) => {
  const config = getTokenConfig();

  axios
    .post(`${API_URL}/api/classroom/timetable/`, formData, config)
    .then((resp) => {
      if (resp.status === 201) {
        createNotification("SubjectEntry successfully created");
        setFormErrors({});

        dispatch({
          type: "ADD_SUBJECT_ENTRY",
          payload: resp.data,
        });
      }
    })
    .catch((err) => {
      if (err.response.status === 400) {
        if (err.response.data) {
          const errors = err.response.data.errors;
          if (errors) {
            console.log(errors);
            setFormErrors(errors);
          }
        }
      }
    });
};

export const loadSubjectEntries = () => {
  const config = getTokenConfig();

  axios
    .get(`${API_URL}/api/classroom/timetable/`, config)
    .then((resp) => {
      const subjectEntries = resp.data;
      console.log(subjectEntries);
      dispatch({
        type: "LOAD_TIMETABLE",
        payload: subjectEntries,
      });
    })
    .catch((err) => {});
};

export const loadMyTimeTable = () => {
  const config = getTokenConfig();

  axios
    .get(`${API_URL}/api/classroom/mytimetable/`, config)
    .then((resp) => {
      const subjectEntries = resp.data;
      dispatch({
        type: "LOAD_MYTIMETABLE",
        payload: subjectEntries,
      });
    })
    .catch((err) => {});
};

export const loadRankingData = (std_pk, setRankingData) => {
  const config = getTokenConfig();

  axios
    .get(`${API_URL}/api/classroom/holisticranking/${std_pk}/`, config)
    .then((resp) => {
      if (resp.status == 200) {
        setRankingData(resp.data);
        console.log(resp.data);
      }
    });
};

export const approveDocument = async (rankingDocPk) => {
  const config = getTokenConfig();

  const data = {
    approved: true,
  };
  const resp = await axios.put(
    `${API_URL}/api/classroom/holisticranking/${rankingDocPk}/`,
    data,
    config
  );

  if (resp.status == 200) {
    return resp.data;
  }
  return {};
};

export const rejectDocument = async (rankingDocPk) => {
  const config = getTokenConfig();

  const data = {
    rejected: true,
  };
  const resp = await axios.put(
    `${API_URL}/api/classroom/holisticranking/${rankingDocPk}/`,
    data,
    config
  );

  if (resp.status == 200) {
    return resp.data;
  }
  return {};
};

export const uploadResult = (formData, setFormErrors) => {
  const config = getTokenConfig();

  // Preparing Form Data
  const formDataObj = new FormData();

  for (let field in formData) {
    const fieldValue = formData[field];

    formDataObj.append(field, fieldValue);
  }

  // Preparing Form Data Exit

  axios
    .post(`${API_URL}/api/classroom/uploadresult/`, formDataObj, config)
    .then((resp) => {
      if (resp.status == 201) {
        createNotification("The Result Successfully Uploaded", {
          variant: "success",
        });
      }
    })
    .catch((err) => {
      const response = err.response;
      if (response) {
        if (response.status == 400) {
          // handling formErrors
          console.log(response.data);
          const errors = response.data.errors;
          if (errors) {
            setFormErrors(errors);
          }
        } else if (response.status == 401) {
          // Handling unauthorized access
          createNotification(
            "You are not allowed to upload the results for exam",
            {
              variant: "error",
            }
          );
        }
      }
    });
};

export const rejectLeaveRequest = (leaveRequestId, removeLeaveRequest) => {
  const config = getTokenConfig();
  const data = {
    rejected: true,
  };

  axios
    .patch(
      `${API_URL}/api/classroom/leaverequests/${leaveRequestId}/`,
      data,
      config
    )
    .then((resp) => {
      if (resp.status == 200) {
        removeLeaveRequest(leaveRequestId);
        createNotification("Rejected", {
          variant: "success",
        });
      }
    });
};

export const acceptedLeaveRequest = (leaveRequestId, removeLeaveRequest) => {
  const config = getTokenConfig();
  const data = {
    accepted: true,
  };

  axios
    .patch(
      `${API_URL}/api/classroom/leaverequests/${leaveRequestId}/`,
      data,
      config
    )
    .then((resp) => {
      if (resp.status == 200) {
        removeLeaveRequest(leaveRequestId);
        createNotification("Accepted", {
          variant: "success",
        });
      }
    });
};

// #########################
// Manual Result

export const submitManualResult = (result_data, setMessages) => {
  const config = getTokenConfig();

  axios
    .post(`${API_URL}/api/classroom/manualresult/`, result_data, config)
    .then((resp) => {
      console.log(resp.data);
      if (resp.data) {
        const messages = resp.data.messages;

        if (messages) {
          setMessages(messages);
        }
      }
    });
};
