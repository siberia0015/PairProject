import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Articles from '@/views/Articles'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/articles',
      name: 'Articles',
      component: Articles
    }
  ]
})
