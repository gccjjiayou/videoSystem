const superAdmin = {
  state: {
    school: null,
    classroom: '',
    teacher: '',
    course: '',
  },
  mutations: {
    SET_SCHOOL: (state, school) => {
      state.school = school
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

export default superAdmin