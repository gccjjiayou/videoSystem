import fetch from './fetch'

export function getSchoolInfo(schoolName, pageSize, pageNumber) {
  const params = {
    schoolName: schoolName,
    pageSize: pageSize,
    pageNumber: pageNumber,
  }
  return fetch({
    url: '/school/selectSchools',
    methods: 'get',
    params
  })
}