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
      component: () => import('@/views/video')

    },
    {
      path: '/video/videoDetail/:videoId',
      name: 'videoDetail',
      component: () => import('@/views/videoDetail')
    },
    {
      path: '/rank',
      name: 'rank',
      component: () => import('@/views/rank')
    },
    {
      path: '/assessment',
      name: 'assessment',
      component: () => import('@/views/assessment')
    },
    {
      path: '/videoLive',
      name: 'videoLive',
      component: () => import('@/views/videoLive'),
    },
    {
      path: '/personal',
      name: 'personal',
      component: () => import('@/views/personal')
    }
  ]
})
