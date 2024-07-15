import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Index from '../views/Index.vue';

const routes = [
  {
    path: '/index',
    name: 'home',
    component: Index
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Login',
    component: Login
  },
];

const router = createRouter({
  history: createWebHistory('/nepv'), 
  routes
});

// 导航守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token) {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
