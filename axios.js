import axios from 'axios';
import { ElMessage } from 'element-plus';
import router from './router/index.js';
import { debounce } from 'lodash';

// 创建axios实例
const instance = axios.create({
  baseURL: 'http://8.130.91.244:8800/', // API基础URL
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

// 防抖处理的错误消息
const debouncedErrorMessage = debounce((message) => {
  ElMessage.error(message);
}, 300, {
  leading: true,
  trailing: false
});

// 添加响应拦截器
instance.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response && error.response.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('feedbackName');
    localStorage.removeItem('telId');
    debouncedErrorMessage('登录已过期，请重新登录');
    router.push('/');
  } else if (error.response && error.response.status === 403) {
    debouncedErrorMessage('没有权限进行此操作');
  } else {
    debouncedErrorMessage('请求错误，请稍后重试');
  }
  return Promise.reject(error);
});

export default instance;
