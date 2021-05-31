import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Browser from '../views/Browser.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Browser',
    component: Browser
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/Settings.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
