import fetch from "./fetch"

export function getAllClassrooms() {
    return fetch({
        url: '/classroom/listClassrooms',
        method: 'get'
    })
}
