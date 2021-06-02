import {produce} from "immer";

// Adding semester
export const addSemester = (state, action) => {
  const newSemester = {
    name: action.payload.name,
    pk: action.payload.pk,
    subjects: [],
  };

  // If semester already exists don't do anything
  for (let semester of state.semesters) {
    if (semester.pk === newSemester.pk) {
      return state;
    }
  }

  const newState = produce(state, (draft) => {
    draft.semesters.push(newSemester);
  });

  return newState;
};


// Loading semesters
export const loadSemesters = (state, action) => {
  const newState = produce(state, (draft) => {
    draft.semesters = action.payload;
    draft.currentClsrm = { ...draft.currentClsrm, semesters: action.payload };
  });

  return newState;
};
