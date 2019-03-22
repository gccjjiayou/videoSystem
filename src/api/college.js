import fetch from './fetch'

export function getAllColleges() {
    return fetch({
        url: '/college/listColleges',
        method: 'get'
    })
}
