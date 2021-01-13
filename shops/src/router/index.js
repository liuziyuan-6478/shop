import Vue from 'vue'
import Router from 'vue-router'
import Goodlist from './../views/Goodlist.vue'

Vue.use(Router)

export default new Router({
  // mode:'history',
  // mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'Goodlist',
      component: Goodlist,
    }
  ]
})
