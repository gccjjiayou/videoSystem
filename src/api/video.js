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

export function getVideoInfo(sortType, sortOrientation, pageSize, pageNumber, schoolId, classroomId, teacherId, courseId, videoTitle) {
  const params = {
    sortType: sortType,
    sortOrientation: sortOrientation,
    pageSize: pageSize,
    pageNumber: pageNumber,
    schoolId: schoolId,
    classroomId: classroomId,
    teacherId: teacherId,
    courseId: courseId,
    videoTitle: videoTitle,    
  }
  return fetch({
    url: '/video/selectVideos',
    method: 'post',
    params
  })
}

export function getVideoDetail(videoId) {
  const params = {
    videoId: videoId
  }
  return fetch({
    url: '/video/detail',
    method: 'get',
    params
  })
}