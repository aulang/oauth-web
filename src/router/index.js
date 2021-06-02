import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/Index.vue')
  },
  {
    path: '/authorize',
    name: 'authorize',
    component: () => import('../views/Authorize.vue'),
    props: route => ({
      clientId: route.query.client_id,
      responseType: route.query.response_type,
      scope: route.query.scope,
      redirectUri: route.query.redirect_uri,
      state: route.query.state
    })
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
    path: '/changepwd',
    name: 'changepwd',
    component: () => import('../views/ChangePassword.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
