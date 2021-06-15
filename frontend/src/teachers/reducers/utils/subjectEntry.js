export const loadSubjectEntries = (state, action) => {
  const subjectEntries = action.payload;
  return { ...state, subject_entries: subjectEntries };
};

export const addSubjectEntry = (state, action) => {
  return {
    ...state,
    subject_entries: [...state.subject_entries, action.payload],
  };
};

export const loadMyTimeTable = (state,action)=>{

  return {...state,mytimetable:action.payload}
}
