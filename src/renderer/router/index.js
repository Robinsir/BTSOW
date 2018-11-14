import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'search',
    component: require('@/view/search/index').default
  },
  {
    path: '/login',
    name: 'login',
    component: require('@/view/login/index').default
  },
  {
    path: '*',
    redirect: '/'
  }
  ]
})
