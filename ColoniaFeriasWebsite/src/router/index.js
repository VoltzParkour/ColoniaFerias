import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import AdminHome from '@/components/admin/Home'
import ColonyForm from '@/components/admin/ColonyForm'
import Colony from '@/components/admin/Colony'
import Cart from '@/components/client/Cart'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/admin',
      name: 'Admin',
      component: AdminHome
    },
    {
      path: '/colony_form',
      name: 'ColonyForm',
      component: ColonyForm
    },
    {
      path: '/colony',
      name: 'Colony',
      component: Colony
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    }
  ]
})
