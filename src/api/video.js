import fetch from './fetch'

export function getVideo(sortType, sortOrientation, pageSize, pageNumber, collegeId, classroomId, courseId, teacherId, videoTitle, classId) {
  const params = {
    sortType: sortType,
    sortOrientation: sortOrientation,
    pageSize: pageSize,
    pageNumber: pageNumber,
    collegeId: collegeId,
    classroomId: classroomId,  
    courseId: courseId,
    teacherId: teacherId,
    videoTitle: videoTitle, 
    classId: classId   
  }
  return fetch({
    url: '/video/selectVideos',
    method: 'post',
    params
  })
}

export function getVideoDetail(videoId) {
  return fetch({
    url: '/video/detail/' + videoId,
    method: 'get',
  })
}

export function getHotVideos(collegeId) {
  const params = {
    collegeId: collegeId
  }
  return fetch({
    url: '/video/selectHotVideos',
    methods: 'get',
    params
  })
}

export function getTeacherOtherVideos(teacherId) {
  const params = {
    teacherId: teacherId
  }
  return fetch({
    url: '/video/selectVideosByTeacherId',
    method: 'get',
    params
  })
}
