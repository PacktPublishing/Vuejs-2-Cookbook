import Vue from 'vue'
import Router from 'vue-router'
import Market from 'components/Market'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/STAR/LAMP'
    },
    {
      path: '/:symbol1/:symbol2',
      component: Market,
      props: true
    }
  ]
})
