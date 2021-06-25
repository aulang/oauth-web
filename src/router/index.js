import Vue from 'vue'
import VueRouter from 'vue-router'
import Authorize from '@/views/Authorize.vue'

Vue.use(VueRouter)

const routes = [
  {
    // /authorize?client_id=5f37d9f4c4155cda795f8fe5&response_type=code&redirect_uri=https%3A%2F%2Faulang.cn%2Fsite%2Findex&state=123456&code_challenge=jZae727K08KaOmKSgOaGzww_XVqGr_PKEgIMkjrcbJI
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
    path: '/index',
    name: 'index',
    component: () => import('../views/Index.vue')
  },
  {
    path: '/approval',
    name: 'approval',
    component: () => import('../views/ApprovalScope.vue')
  },
  {
    path: '/locked',
    name: 'locked',
    component: () => import('../views/AccountLocked.vue')
  },
  {
    path: '/change-pwd',
    name: 'changePwd',
    component: () => import('../views/ChangePassword.vue')
  },
  {
    path: '/third-login',
    name: 'thirdLogin',
    component: () => import('../views/ThirdLogin.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
