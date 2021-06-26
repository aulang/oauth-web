import Vue from 'vue'
import VueRouter from 'vue-router'
import Authorize from '@/views/Authorize.vue'

import { redirect, sso } from '@/api/login'
import { thirdLogin } from '@/api/third_login'
import { getSSO, removeSSO } from '@/utils/auth'

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
    }),
    beforeEnter: (to, from, next) => {
      if (getSSO() && to.query.client_id) {
        // 单点登录
        sso({
          authId: getSSO(),
          redirectUri: to.query.redirect_uri,
          state: to.query.state
        }).then(response => {
          if (response.code === 0) {
            redirect(response.data);
            return;
          }
          removeSSO();
          next();
        });
      } else {
        next();
      }
    }
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
    path: '/change_pwd',
    name: 'changePwd',
    component: () => import('@/views/ChangePassword.vue')
  },
  {
    path: '/third_login',
    name: 'thirdLogin',
    component: () => import('@/views/ThirdLogin.vue'),
    beforeEnter: (to, from, next) => {
      if (to.query.code && to.query.state) {
        thirdLogin(to.query.code, to.query.state).then(response => {
          if (response.code === 0) {
            redirect(response.data);
            return;
          }
          next();
        })
      } else {
        next();
      }
    }
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
