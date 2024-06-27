import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Index from '../views/Index.vue'

const routes = [
  {
    path: '/index',
    name: 'home',
    component: Index
  }, {
    path: '/',
    name: 'Login',
    component: Login
  }, 
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router