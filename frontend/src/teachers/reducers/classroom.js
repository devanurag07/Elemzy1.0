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
  LOAD_CURRENT_SUBJECT_NOTES,
  LOAD_ASSIGNMENTS,
  SET_WORKDATE,
} from "../actions/types";
import { produce } from "immer";
// import { loadAssignments } from "../actions/teacherActions";

import {
  loadClassroom,
  setSelectedClassroom,
  loadOtherClassroomsData,
  addStudent,
  removeStudent,
  loadTeachers
} from "./utils/classroom";

import {
  loadCrntSbjctNotes,
  addNotes,
  loadAssignments,
  addAssignment,
  loadDocuments,
  addDocument,
  setWorkDate,
} from "./utils/others";

import { loadSemesters, addSemester } from "./utils/semester";

import { addSubject, setSelectedSubject } from "./utils/subject";

const initialState = {
  // Main classroom data of teacher
  classroom: {
    students: [],
  },

  // School students list - main classroom students = gloabl students list (Select Component)
  globalStudents: [],
  // Main classroom semesters
  semesters: [],
  // School Teachers List - Select Component
  teachers: [],

  // Selected subject
  currentSubject: {
    assignments: [], // Assignments of subject
    documents: [], // Documents of subject
  },

  // Selected classroom
  currentClsrm: {
    semesters: [], // Semesters of Selected Classroom
    classroom: [], // Classroom data like students list
  },

  // This contains the list of other classrooms - teacher can teach
  secondaryClassrooms: [],

  notificaions: [],
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
      return loadTeachers(state, action);
    }

    case ADD_SUBJECT: {
      return addSubject(state, action);
    }

    case SET_SUBJECT: {
      return setSelectedSubject(state, action);
    }

    case LOAD_CURRENT_SUBJECT_NOTES:
      return loadCrntSbjctNotes(state, action);

    case ADD_NOTES: {
      return addNotes(state, action);
    }

    case LOAD_OTHERCLASSROOMS_DATA: {
      return loadOtherClassroomsData(state, action);
    }

    case SET_SELECTED_CLASSROOM: {
      // Changing the semesters to the selected classroom semester
      console.log(action);
      return setSelectedClassroom(state, action);
    }

    case LOAD_ASSIGNMENTS: {
      return loadAssignments(state, action);
    }

    case "ADD_ASSIGNMENT": {
      return addAssignment(state, action);
    }

    case "ADD_NOTIFICATION": {
      return {
        ...state,
        notificaions: [...state.notificaions, action.payload],
      };
    }

    case "CLEAR_NOTIFICATIONS": {
      return { ...state, notificaions: [] };
    }

    case "LOAD_DOCUMENTS": {
      return loadDocuments(state, action);
    }

    case SET_WORKDATE: {
      return setWorkDate(state, action);
    }
    case "ADD_DOCUMENT": {
      return addDocument(state, action);
    }

    default:
      return state;
  }
};
