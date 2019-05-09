import fetch from './fetch'

export function getAllGradesByCourseId(courseId) {
    const params = {
        courseId: courseId
    }
    return fetch({
        url: '/classes/listClassesByCourseId',
        method: 'get',
        params
    })
}