<template>
  <div class="stats-container" v-if="dataLoaded" v-loading="isLoading">
    <div class="stat-item">
      <el-icon class="icon"><user /></el-icon>
      <div class="stat-value">{{ totalTests }}</div>
      <div class="stat-label">空气质量检测总数量</div>
    </div>
    <div class="stat-item">
      <el-icon class="icon"><sunny /></el-icon>
      <div class="stat-value">{{ goodTests }}</div>
      <div class="stat-label">空气质量良好数量</div>
    </div>
    <div class="stat-item">
      <el-icon class="icon"><drizzling /></el-icon>
      <div class="stat-value">{{ badTests }}</div>
      <div class="stat-label">空气质量异常数量</div>
    </div>
  </div>
</template>

<script>
import axiosInstance from '@/axios';
import { User, Sunny, Drizzling } from '@element-plus/icons-vue';
import { ElLoading } from 'element-plus';

export default {
  name: 'AirQualityStats',
  components: {
    User,
    Sunny,
    Drizzling
  },
  directives: {
    loading: ElLoading.directive
  },
  data() {
    return {
      totalTests: 0,
      goodTests: 0,
      badTests: 0,
      isLoading: false,
      dataLoaded: false
    };
  },
  methods: {
    async fetchStats() {
      this.isLoading = true;
      const token = localStorage.getItem('token');
      try {
        const response = await axiosInstance.get('/admins/otherData', {
          headers: { token: `${token}` }
        });
        if (response.data.success) {
          this.totalTests = response.data.data.total;
          this.goodTests = response.data.data.goodNum;
          this.badTests = this.totalTests - this.goodTests;
          this.dataLoaded = true;
        } else {
          this.$message.error('Failed to retrieve data: ' + response.data.errorMsg);
        }
      } catch (error) {
        console.error('Request error:', error);
        this.$message.error('Request error, please try again later');
      } finally {
        this.isLoading = false;
      }
    }
  },
  mounted() {
    this.fetchStats();
  }
}
</script>


<style scoped>
.stats-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #ffffff;
  padding: 20px;
  color: #000000;
}
.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.icon {
  font-size: 40px;
  margin-bottom: 10px;
}
.stat-value {
  font-size: 24px;
  font-weight: bold;
}
.stat-label {
  font-size: 16px;
  color: #aaa;
}
</style>
