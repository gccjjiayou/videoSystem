import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'


require('es6-promise').polyfill()  //兼容低版本promise

//国际化
import VueI18n from 'vue-i18n'
//引入Element的语言包
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import esLocale from 'element-ui/lib/locale/lang/es'

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'en',
  message: {
    'en': enLocale,
    'zh': zhLocale,
    'es': esLocale
  }
})

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})

Vue.use(VueVideoPlayer)

Vue.config.productionTip = false  //设置为false以阻止vue在启动时生成生产提示

// 配置axios
Vue.prototype.$http = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
