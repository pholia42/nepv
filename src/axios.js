import axios from 'axios';
import { ElMessage } from 'element-plus';
import router from './router/index.js';

// 创建axios实例
const instance = axios.create({
  baseURL: 'http://ratidb.natappfree.cc/', // API基础URL
  timeout: 100000,
});

// 添加请求拦截器
instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token') || process.env.VUE_APP_API_TOKEN;
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response && error.response.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('feedbackName');
    localStorage.removeItem('telId');
    ElMessage.error('登录已过期，请重新登录');
    router.push('/');
  } else if (error.response && error.response.status === 403) {
    ElMessage.error('没有权限进行此操作');
  } else {
    ElMessage.error('请求错误，请稍后重试');
  }
  return Promise.reject(error);
});

export default instance;
