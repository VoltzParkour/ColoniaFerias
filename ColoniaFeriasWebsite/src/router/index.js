import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import AdminHome from '@/components/admin/Home'
import ColonyForm from '@/components/admin/ColonyForm'
import AdminAddForm from '@/components/admin/AdminAddForm'
import AdminSelectPlans from '@/components/admin/AdminSelectPlans'
import Colony from '@/components/admin/Colony'
import Login from '@/components/login/login'
import Cart from '@/components/client/Cart'
import * as firebase from 'firebase'


Vue.use(Router)

//export default new Router({
let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/admin',
      name: 'Admin',
      component: AdminHome,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/colony_form',
      name: 'ColonyForm',
      component: ColonyForm,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin_add_form',
      name: 'AdminAddForm',
      component: AdminAddForm,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin_select_plans',
      name: 'AdminSelectPlans',
      component: AdminSelectPlans,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/colony',
      name: 'Colony',
      component: Colony
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    }
  ]
})

 router.beforeEach((to, from, next) => {
   let currentUser = firebase.auth().currentUser;
   let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

   if (requiresAuth && !currentUser) next('login')
//   else if (!requiresAuth && currentUser) next('admin')
   else next()
 })

export default router
