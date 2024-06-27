<template>
  <div class="card">
    <h2 class="chart-title">全国空气质量分析</h2>
    <LineChart />
  </div>
</template>

<script>
import LineChart from '@/components/LineChart.vue'; // 确保路径正确

export default {
  name: 'AirQualityChart',
  components: {
    LineChart
  }
}
</script>

<style scoped>
.card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  padding: 20px;
  margin: 20px;
}

.chart-title {
  text-align: center;
  margin-bottom: 20px;
}
</style>
