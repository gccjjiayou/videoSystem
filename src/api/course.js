import fetch from "./fetch"

export function getAllCoursesByTeacherId(teacherId) {
    const params = {
        teacherId: teacherId
    }
    return fetch({
        url: '/course/listCourseByTeacherId',
        method: 'get',
        params
    })
}