<template>
  <div class="login-container">
    <div class="title-container">
      <h2 class="login-title">东软环保公众监督平台</h2>
      <h3 class="login-subtitle">———— 决策者端 ————</h3>
    </div>
    <el-card class="login-card">
      <el-form :model="form" :rules="rules" ref="loginForm" label-width="100px" status-icon>
        <el-form-item label="登录编码" prop="adminsCode">
          <el-input v-model="form.adminsCode" placeholder="请输入管理员账号"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入登录密码"
            show-password>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref, inject} from 'vue';
import { ElMessage, ElForm, ElFormItem, ElInput, ElButton, ElCard, ElLink } from 'element-plus';
import axios from 'axios';
import axiosInstance from '@/axios'; 
import { useRouter } from 'vue-router';

const router = useRouter();
const user = inject('user');
const form = reactive({
  adminsCode: '',
  password: ''
});
const rules = reactive({
  telId: [
    { required: true, message: '请输入账号', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ]
});
const loginForm = ref(null); 

const onSubmit = async () => {
  // 检查手机号和密码是否为空
  if (!form.adminsCode.trim() || !form.password.trim()) {
    ElMessage.error('手机号或密码不能为空');
    return;
  }
	
  const isFormValid = await loginForm.value.validate();
  if (!isFormValid) return;

  try {
    console.log('Starting login request with:', form);
    const response = await axiosInstance.get('/login/admins', {
      params: {
        adminsCode: form.adminsCode,
        password: form.password
      },
      headers: {
        'Authorization': `Bearer ${process.env.VUE_APP_API_TOKEN}`
      }
    });

    if (response.status === 200) {
      if (response.data.success) {
        const token = response.data.data.token; 
        const feedbackName = response.data.data.name; 
        const adminsCode = response.data.data.id; 

        localStorage.setItem('token', token); 
        localStorage.setItem('feedbackName', feedbackName); 
        localStorage.setItem('adminsCode', adminsCode); 
		
        user.token = token;
        user.feedbackName = feedbackName;
        user.adminsCode = adminsCode;

        ElMessage.success('登录成功')
        router.push('/index');
      } else {
        ElMessage.error(response.data.errorMsg || '账号或密码不正确');
      }
    } else {
      ElMessage.error('请求失败，状态码：' + response.status);
    }
  } catch (error) {
    console.error('请求错误:', error.response ? error.response.data : error.message);
    ElMessage.error('登录失败，请稍后重试');
  }
};

</script>

<style scoped>
.login-container {
  background: url('@/assets/login.jpg') no-repeat center center;
  background-size: cover;
  height: 100vh;
  width: 100vw; 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
}

.title-container {
  text-align: center;
  margin-bottom: 20px;
}

.login-title {
  font-size: 24px;
  color: #ffffff;
  font-weight: bold;
  margin-bottom: 5px;
}

.login-subtitle {
  font-size: 18px;
  color: #edf4ff;
  margin-bottom: 20px;
}

.login-card {
  width: 350px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.el-form-item {
  margin-bottom: 20px;
}

.el-input__inner {
  border-radius: 5px;
}

.el-button {
  width: 100%;
  border-radius: 5px;
}

.el-button--primary {
  background-color: #009688;
  border-color: #009688;
}

.el-button--primary:hover {
  background-color: #00796b;
  border-color: #00796b;
}

.el-message {
  position: fixed;
  top: 20px;
  right: 20px;
}
</style>

