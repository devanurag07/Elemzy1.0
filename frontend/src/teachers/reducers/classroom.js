import {
  LOAD_CLASSROOM,
  ADD_STUDENT,
  LOAD_STUDENTS,
  LOAD_SEMESTERS,
  REMOVE_STUDENT,
  ADD_SEMESTER,
  ADD_SUBJECT,
  LOAD_TEACHERS,
  ADD_NOTES,

  SET_SUBJECT,
  SET_SELECTED_CLASSROOM,
  LOAD_OTHERCLASSROOMS_DATA,
  LOAD_CURRENT_SUBJECT_NOTES



} from "../actions/types";
import { produce } from "immer";

const initialState = {
  classroom: {
    students: [],
  },
  globalStudents: [],
  semesters: [],
  teachers: [],
  currentSubject: null,
  currentClsrm: {
    semesters: [],
    classroom: [],
  },
  secondaryClassrooms: [],
};

const loadClassroom = (state, action) => {
  const loadedClassroom = action.payload;

  if (Object.keys(loadedClassroom).length >= 2) {
    return {
      ...state,
      classroom: { ...loadedClassroom },
      currentClsrm: {
        classroom: { ...loadedClassroom },
        ...state.currentClsrm,
      },
    };
  }

  return { ...state, classroom: { ...loadedClassroom } };
};

const addSemester = (state, action) => {
  const newSemester = {
    name: action.payload.name,
    pk: action.payload.pk,
    subjects: [],
  };

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

const loadSemesters = (state, action) => {
  const newState = produce(state, (draft) => {
    draft.semesters = action.payload;
    draft.currentClsrm = { ...draft.currentClsrm, semesters: action.payload };
  });

  return newState;
};

const addSubject = (state, action) => {
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

const setSubject = (state, action) => {
  const subject_id = action.payload;

  for (let semester of state.currentClsrm.semesters) {
    for (let subject of semester.subjects) {
      if (subject.pk === Number(subject_id)) {
        // Changing currentSubject to subject(obj which teacher have clicked on)
        const newState = produce(state, (draft) => {
          draft.currentSubject = subject;
        });

        return newState;
      }
    }
  }
};

const setSelectedClassroom = (state, action) => {
  // Changing the semesters to the selected classroom semester

  const classroomId = action.payload;

  const newState = produce(state, (draft) => {
    for (let secondaryClsrm of draft.secondaryClassrooms) {
      console.log(secondaryClsrm.id);
      console.log(classroomId);

      if (secondaryClsrm.classroomInfo.id === classroomId) {
        const selectedSemesters = secondaryClsrm.semesters;
        draft.currentClsrm = {
          classroom: secondaryClsrm.classroomInfo,
          semesters: selectedSemesters,
        };
      }
    }
  });

  return newState;
};

const loadOtherClassroomsData = (state, action) => {
  const otherClsrmData = action.payload;

  const newState = produce(state, (draft) => {
    draft.secondaryClassrooms = otherClsrmData;
  });

  return newState;
};

const loadTeachers = (state, action) => {
  const newState = produce(state, (draft) => {
    draft.teachers = action.payload;
  });

  return newState;
};

const loadCrntSbjctNotes = (state,action) => {
  if (state.currentSubject !== null) {
    const newState = produce(state, (draft) => {
      draft.currentSubject.notes = action.payload;
    });

    return newState;
  }
};

const addNotes = (state, action) => {

  const notesObj = action.payload;

  const newState = produce(state, (draft) => {
    console.log(draft.currentSubject);
    console.log(notesObj);
    if (Number(draft.currentSubject.pk) === Number(notesObj.subject)) {
      draft.currentSubject.notes.push(notesObj);
    }
  });

  return newState;
};



export const classRoomReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CLASSROOM:
      return loadClassroom(state, action);

    case LOAD_STUDENTS:
      // Loading global students
      return { ...state, globalStudents: action.payload };

    case ADD_STUDENT: {
      const addedStudent = action.payload;
      const { classroomStudents, globalStudents } = addStudent(
        state.globalStudents,
        state.classroom.students,
        addedStudent
      );

      return {
        ...state,
        globalStudents: [...globalStudents],
        classroom: { ...state.classroom, students: [...classroomStudents] },
      };
    }

    case REMOVE_STUDENT: {
      const removedStudent = action.payload;
      const { classroomStudents, globalStudents } = removeStudent(
        state.globalStudents,
        state.classroom.students,
        removedStudent
      );

      return {
        ...state,
        globalStudents: [...globalStudents],
        classroom: { ...state.classroom, students: [...classroomStudents] },
      };
    }

    case ADD_SEMESTER: {
      return addSemester(state, action);
    }

    case LOAD_SEMESTERS: {
      return loadSemesters(state, action);
    }

    case LOAD_TEACHERS: {
      return loadTeachers(state,action)
    }

    case ADD_SUBJECT: {
      return addSubject(state, action);
    }

    case SET_SUBJECT: {
      return setSubject(state, action);
    }

    case LOAD_CURRENT_SUBJECT_NOTES:

      return loadCrntSbjctNotes(state,action)

    case ADD_NOTES: {

      return addNotes(state,action)

    }

    case LOAD_OTHERCLASSROOMS_DATA: {
     return loadOtherClassroomsData(state,action)
    }

    case SET_SELECTED_CLASSROOM: {
      // Changing the semesters to the selected classroom semester

      return setSelectedClassroom(state, action);
    }

    default:
      return state;
  }
};

const addStudent = (globalStudents, classroomStudents, studentObj) => {
  // Adding student to students list based on id of studentObj

  // studentObj => {"user_profile":user_obj,"student_profile":studentOBj}

  let isStudentExist = false;

  // Checking if added student present in Classroom Students by comparing id
  for (let student of classroomStudents) {
    if (
      student.id === studentObj.id &&
      student.user.id === studentObj.user.id
    ) {
      isStudentExist = true;
      break;
    }
  }

  // if student does not exist add it to the list
  if (!isStudentExist) {
    classroomStudents.push(studentObj);
  }

  // filtering or Removing student from global students list
  const newGlobalStudents = globalStudents.filter((student) => {
    if (student.id === studentObj.id) {
      return false;
    }

    return true;
  });

  return {
    globalStudents: [...newGlobalStudents],
    classroomStudents: [...classroomStudents],
  };
};

const removeStudent = (globalStudents, classroomStudents, studentObj) => {
  // Removing student from students list based on id of studentObj

  // studentObj => {"user_profile":user_obj,"student_profile":studentOBj}

  let isStudentExist = false;

  for (let student of globalStudents) {
    if (student.id === studentObj.id) {
      isStudentExist = true;
    }
  }
  // if not exists push it or add it adding to GLobal List
  if (!isStudentExist) {
    globalStudents.push(studentObj);
  }

  // Filtering so the list will have all items except studentObj

  // removing from clasrooom students list
  const newClassroomStudents = classroomStudents.filter((student) => {
    if (student.id === studentObj.id) {
      return false;
    }

    return true;
  });

  return {
    classroomStudents: [...newClassroomStudents],
    globalStudents: [...globalStudents],
  };
};
