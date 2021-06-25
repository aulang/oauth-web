import Vue from 'vue'
import VueRouter from 'vue-router'
import Authorize from '@/views/Authorize.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/authorize',
    name: 'authorize',
    component: Authorize,
    props: route => ({
      clientId: route.query.client_id,
      responseType: route.query.response_type,
      scope: route.query.scope,
      state: route.query.state,
      redirectUri: route.query.redirect_uri,
      codeChallenge: route.query.code_challenge
    })
  },
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/Index.vue')
  },
  {
    path: '/approval',
    name: 'approval',
    component: () => import('@/views/ApprovalScope.vue')
  },
  {
    path: '/locked',
    name: 'locked',
    component: () => import('@/views/AccountLocked.vue')
  },
  {
    path: '/change-pwd',
    name: 'changePwd',
    component: () => import('@/views/ChangePassword.vue')
  },
  {
    path: '/third-login',
    name: 'thirdLogin',
    component: () => import('@/views/ThirdLogin.vue')
  },
  {
    path: '/404',
    component: () => import('@/views/NotFound.vue'),
    hidden: true
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
