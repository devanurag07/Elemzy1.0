import { produce } from "immer";

// Loading main classroom 
export const loadClassroom = (state, action) => {
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


// Change classroom from main to secondary or secondary to main
export const setSelectedClassroom = (state, action) => {
  // Changing the semesters to the selected classroom semester

  const classroomId = action.payload;

  const newState = produce(state, (draft) => {
    // Setting classroom to default main classroom
    if (state.classroom.id !== undefined) {
      if (state.classroom.id === classroomId) {
        const selectedSemesters = state.semesters;

        draft.currentClsrm = {
          classroom: state.classroom,
          semesters: selectedSemesters,
        };

        return draft;
      }
    }

    // Checking if secondaryClassroom id matches to selected CLassroom Id
    for (let secondaryClsrm of draft.secondaryClassrooms) {
      if (secondaryClsrm.classroomInfo.id === classroomId) {
        // Getting the semesters
        const selectedSemesters = secondaryClsrm.semesters;

        // Setting currentClassroom data to secondaryClsrm
        draft.currentClsrm = {
          classroom: secondaryClsrm.classroomInfo,
          semesters: selectedSemesters,
        };

        return draft;
      }
    }
  });

  return newState;
};

// Loading secondary classrooms data
export const loadOtherClassroomsData = (state, action) => {
  const otherClsrmData = action.payload;

  const newState = produce(state, (draft) => {
    draft.secondaryClassrooms = otherClsrmData;
  });

  return newState;
};

// Loading school teachers list 
export const loadTeachers = (state, action) => {
  const newState = produce(state, (draft) => {
    draft.teachers = action.payload;
  });

  return newState;
};


// Adding student to classroom
export const addStudent = (globalStudents, classroomStudents, studentObj) => {
  // Adding student to students list based on id of studentObj

  // studentObj => {"user_profile":user_obj,"student_profile":studentOBj}

  let isStudentExist = false;

  // Checking if added student present in Classroom Students by comparing id
  for (let student of classroomStudents) {
    if (
      student.id === studentObj.id &&
      student.user_detail.id === studentObj.user_detail.id
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
  const newGlobalStudents = globalStudents.filter(
    (student) => student.id !== studentObj.user_detail.id
  );

  return {
    globalStudents: [...newGlobalStudents],
    classroomStudents: [...classroomStudents],
  };
};


// Removing student
export const removeStudent = (
  globalStudents,
  classroomStudents,
  studentObj
) => {
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
