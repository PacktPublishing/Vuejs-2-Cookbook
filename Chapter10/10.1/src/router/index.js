import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'components/Hello'
// import Massive from 'components/Massive'

Vue.use(Router)

const Massive = resolve =>
  require(['../components/Massive.vue'], resolve)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/massive',
      name: 'Massive',
      component: Massive
    }
  ]
})
