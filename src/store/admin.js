const admin = {
  state: {
    college: null,
    classroom: '',
    teacher: '',
    course: '',
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
    }
  }
}

export default admin