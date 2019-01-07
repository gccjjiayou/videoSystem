import axios from 'axios';
import { Message } from 'element-ui'

// 创建axios实例
const axiosInstance = axios.create({
  // baseURL: "http://192.168.12.28:8080/sys",  // api的base_url
  baseURL: "http://47.106.107.145/EducationSystem/sys",
  timeout: 5000,  // 请求超时时间
  withCredentials: true,  // 跨域请求中携带cookie
})

// request拦截器
axiosInstance.interceptors.request.use(
  config => {
    // Do something before request is sent
    return config
  },
  error => {
    //Do something with request error
    Promise.reject(error)
  }
)

// response拦截器
axiosInstance.interceptors.response.use(
  response => {
    if(response.data.responseCode !== 'OK') {
      Message.error(response.data.result)
    }
    return response
  },
  error => {
    Message.error(error.message)
    Promise.reject(error)
  }
)

export default axiosInstance;