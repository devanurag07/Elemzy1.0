export const loadExams = (state, action) => {
  const examList = action.payload;
  return { ...state, exams_list: examList };
};

export const addExam = (state, action) => {
  const examObj = action.payload;

  const examObjClsrmID = examObj.classroom;
  const examObjSubjectID = examObj.subject;

  const currentClsrmID = state.currentClsrm.classroom.id;
  const currentSubjectID = state.currentSubject.pk;

  if (
    (currentClsrmID === examObjClsrmID) &
    (currentSubjectID === examObjSubjectID)
  ) {
    return { ...state, exams_list: [...state.exams_list, examObj] };
  }

  return state;
};
