import {produce} from "immer";

export const loadCrntSbjctNotes = (state, action) => {
  const notesData = action.payload;
  // Checking if the currentSubject is not null
  if (state.currentSubject !== null) {
    if (state.currentSubject.pk == notesData.subjectId) {
      const newState = produce(state, (draft) => {
        draft.currentSubject.notes = notesData.data;
      });

      return newState;
    }
  }
};

export const addNotes = (state, action) => {
  const notesObj = action.payload;

  const newState = produce(state, (draft) => {
    if (Number(draft.currentSubject.pk) === Number(notesObj.subject)) {
      const hasNoteObjToSubject = draft.currentSubject.notes.includes(notesObj);
      if (!hasNoteObjToSubject) {
        draft.currentSubject.notes.push(notesObj);
      }
    }
  });

  return newState;
};

export const loadAssignments = (state, action) => {
  const newState = produce(state, (draft) => {
    draft.currentSubject.assignments = action.payload;
  });

  return newState;
};

export const addAssignment = (state, action) => {
  const newState = produce(state, (draft) => {
    // Adding assignment
    draft.currentSubject.assignments.push(action.payload);
  });
  console.log("Add assignment");

  console.log(action.payload);
  return newState;
};

export const loadDocuments = (state, action) => {
  const newState = produce(state, (draft) => {
    const documentsList = action.payload;
    draft.currentSubject.documents = documentsList;
  });

  return newState;
};

export const addDocument = (state, action) => {
  const newState = produce(state, (draft) => {
    const createdDocument = action.payload;

    if (draft.currentSubject.pk == createdDocument.subject) {
      draft.currentSubject.documents.push(createdDocument);
    }
  });

  return newState;
};

export const setWorkDate = (state, action) => {
  const workdate = action.payload;

  return {
    ...state,

    currentSubject: {
      ...state.currentSubject,
      workdate: workdate,
    },
  };
};
