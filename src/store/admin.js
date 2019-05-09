const admin = {
  state: {
    college: null,
    classroom: '',
    teacher: '',
    course: '',
    grade: ''
  },
  mutations: {
    SET_COLLEGE: (state, college) => {
      state.college = college
    },
    SET_CLASSROOM: (state, classroom) => {
      state.classroom = classroom
    },
    SET_TEACHER: (state, teacher) => {
      state.teacher = teacher
    },
    SET_COURSE: (state, course) => {
      state.course = course
    },
    SET_GRADE: (state, grade) => {
      state.grade = grade
    },
  }
}

export default admin