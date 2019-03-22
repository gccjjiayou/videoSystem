import Vue from 'vue'
import store from './store'
import App from './App.vue'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import VueBus from './api/eventBus'
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'videojs-flash'
// import 'vue-video-player/src/custom-theme.css'


require('es6-promise').polyfill()  //兼容低版本promise

//全局注册组件
Vue.use(ElementUI)

Vue.use(VueVideoPlayer)

Vue.use(VueBus)

Vue.config.productionTip = false  //设置为false以阻止vue在启动时生成生产提示

// 配置axios
Vue.prototype.$http = axios
axios.defaults.baseURL = "http://192.168.12.141:8080/sys"
// axios.defaults.baseURL = "http://47.106.107.145/EducationSystem/sys"
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
