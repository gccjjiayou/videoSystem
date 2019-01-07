import fetch from './fetch'

export function getAllSchools() {
  return fetch({
    url: '/school/listSchool',
    method: 'get'
  })
}

export function getAllTeachers(schoolId) {
  const params = {
    schoolId: schoolId,
  }
  return fetch({
    url: '/school/listTeacherBySchoolId',
    method: 'get',
    params
  })
}

export function getAllClassroom(schoolId) {
  const params = {
    schoolId: schoolId
  }
  return fetch({
    url: '/school/listClassroomBySchoolId',
    method: 'get',
    params
  })
}

export function getAllCourse(teacherId) {
  const params = {
    teacherId: teacherId
  }
  return fetch({
    url: '/school/listCourseByTeacherId',
    method: 'get',
    params
  })
}