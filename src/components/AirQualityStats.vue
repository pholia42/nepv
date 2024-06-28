<template>
  <div class="stats-container">
    <div class="stat-item">
      <i class="icon user-icon"></i>
      <div class="stat-value">{{ totalTests }}</div>
      <div class="stat-label">空气质量检测总数量</div>
    </div>
    <div class="stat-item">
      <i class="icon good-icon"></i>
      <div class="stat-value">{{ goodTests }}</div>
      <div class="stat-label">空气质量良好数量</div>
    </div>
    <div class="stat-item">
      <i class="icon bad-icon"></i>
      <div class="stat-value">{{ badTests }}</div>
      <div class="stat-label">空气质量异常数量</div>
    </div>
  </div>
</template>

<script>
import axiosInstance from '@/axios';

export default {
  name: 'AirQualityStats',
  data() {
    return {
      totalTests: 0,
      goodTests: 0,
      badTests: 0
    };
  },
  methods: {
    async fetchStats() {
      const token = localStorage.getItem('token');
      try {
        const response = await axiosInstance.get('/admins/otherData', {
          headers: { token: `${token}` }
        });
        if (response.data.success) {
          this.totalTests = response.data.data.total;
          this.goodTests = response.data.data.goodNum;
          this.badTests = this.totalTests - this.goodTests;
        } else {
          this.$message.error('Failed to retrieve data: ' + response.data.errorMsg);
        }
      } catch (error) {
        console.error('Request error:', error);
        this.$message.error('Request error, please try again later');
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
.user-icon::before {
  content: "\f007"; /* 使用 FontAwesome 图标 */
  color: #1e90ff;
}
.good-icon::before {
  content: "\f06b"; /* 使用 FontAwesome 图标 */
  color: #1e90ff;
}
.bad-icon::before {
  content: "\f21e"; /* 使用 FontAwesome 图标 */
  color: #1e90ff;
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
