import { produce } from "immer";

// Adding subject
export const addSubject = (state, action) => {
  const newSubject = action.payload;

  const newState = produce(state, (draft) => {
    for (let semester of draft.semesters) {
      if (semester.pk === newSubject.semester) {
        semester.subjects.push(newSubject);
      }
    }
  });

  return newState;
};

// Selecting subject
export const setSelectedSubject = (state, action) => {
  const subject_id = action.payload;

  const newState = produce(state, (draft) => {
    for (let semester of draft.currentClsrm.semesters) {
      for (let subject of semester.subjects) {
        if (subject.pk === Number(subject_id)) {
          // Changing currentSubject to subject(obj which teacher have clicked on)
          draft.currentSubject = { ...draft.currentSubject, ...subject };
        }
      }
    }
  });

  return newState;
};
