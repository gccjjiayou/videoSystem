import fetch from "./fetch"

export function getAllTeachersByCollegeId(collegeId) {
    const params = {
        collegeId: collegeId,
    }
    return fetch({
        url: '/teacher/listTeacherByCollegeId',
        method: 'get',
        params
    })
}