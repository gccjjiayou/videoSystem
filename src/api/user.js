import fetch from './fetch'

export function loginByWorkerCode(userInfo) {
  const params = {
    workerCode: userInfo.workerCode,
    password: userInfo.password
  }
  return fetch({
    url: '/user/login',
    method: 'post',
    params
  })
}

export function logout(workerCode) {
  const params = {
    workerCode: workerCode
  }
  return fetch({
    url: '/user/loginOut',
    method: 'post',
    params
  })
}