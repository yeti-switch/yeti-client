import VueRouter from 'vue-router'
import Login from '../components/Login'
import NotFound from '../components/NotFound'
import Cdrs from '../components/Cdrs'
import Rates from '../components/Rates'
import Home from '../components/Home'
import Accounts from '../components/Accounts'
import store from '../store/store'

const requiresAuth = (to, from, next) => {
  if(store.getters.isAuthenticated) {
    next()
    return 
  }
  next ('/login')
}

const requiresNotAuth = (to, from, next) => {
  if(!store.getters.isAuthenticated) {
    next()
    return
  }
  next ('/')
}

export default new VueRouter({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'home'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: requiresNotAuth,
    },
    {
      path: '/404',
      name: 'notfound',
      component: NotFound
    },
    {
      path: '/cdrs',
      name: 'cdrs',
      component: Cdrs,
      beforeEnter: requiresAuth,
    },
    {
      path: '/rates',
      name: 'rates',
      component: Rates,
      beforeEnter: requiresAuth,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      beforeEnter: requiresAuth,
    },
    {
      path: '/accounts',
      name: 'accounts',
      component: Accounts,
      beforeEnter: requiresAuth,
    },
    {
      path: '*',
      redirect: {
          name: 'notfound'
      }
    },
  ]
})