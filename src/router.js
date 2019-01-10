import Vue from 'vue'
import Router from 'vue-router'
import { Message } from 'element-ui';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home'),
      meta: {requireAuth: true}, // 需要登录的用户才能看到
    },
    {
      path: '/video',
      name: 'video',
      component: () => import('@/views/video'),

    },
    {
      path: '/video/videoDetail/:videoId',
      name: 'videoDetail',
      component: () => import('@/views/videoDetail'),
    }
  ]
})

// Router.beforeEach((to, from, next) => {
//   let isLogin = sessionStorage.getItem('isLogin') === 'true' //session只能保存字符串，所以保存的是'true'
//   if(!isLogin && to.matched.some(item => {
//     return item.meta.requireAuth
//   })) {
//     Message.error('未登录')
//     next('/')  // 返回首页
//   } else {
//     next()  // 不需要认证就正常执行
//   }
// })
