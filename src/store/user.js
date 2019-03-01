import { loginByWorkerCode, logout } from '@/api/user'
import { Message } from 'element-ui'

const user = {
  state: {
    workerCode: '',
    hasLogin: false || (sessionStorage.getItem('hasLogin') === 'true'),
    showVideoLive: false || (sessionStorage.getItem('showVideoLive') === 'true'),
  },
  mutations: {
    SET_WORKERCODE: (state, workerCode) => {
      state.workerCode = workerCode
    },
    LOGOUT: state => {
      state.workerCode = ''
      state.hasLogin = false
    },
    SET_LOGIN: state => {
      state.hasLogin = true
    },
    SHOW_VIDEOLIVE: state => {
      state.showVideoLive = true
    }
  },
  actions: {
    // 工号登录
    Login({ commit }, userInfo) {
      // userInfo: { workerCode: '', password: ''}
      return new Promise((resolve, reject) => {
        loginByWorkerCode(userInfo).then(response => {
          if(response.data.responseCode === 'OK') {
            commit('SET_WORKERCODE', userInfo.workerCode)
            commit('SET_LOGIN')
            resolve()
          } else {
            Message.error(response.data.result)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout({ commit }, workerCode) {
      return new Promise((resolve, reject) => {
        logout(workerCode).then(response => {
          commit('LOGOUT')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
  } 
}

export default user