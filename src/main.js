import { createApp, reactive } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

const app = createApp(App);

// 初始化全局用户数据
const user = reactive({
  token: '',
  feedbackName: '',
  telId: ''
});

// 全局前置守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token && to.name !== 'Login') {
      ElMessage.warning('登录已过期，请重新登录');
      next({ name: 'Login' });
    } else {
      next(); 
    }
  } else {
    next(); 
  }
});

// 提供全局用户数据
app.provide('user', user);

app.use(store).use(router).use(ElementPlus).mount('#app');
