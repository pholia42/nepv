<template>
  <div class="card">
	<div class="clock-container">
      <Clock />
    </div>
    <h2 class="chart-title">全国空气质量分析</h2>
    <LineChart />
	<PieChart />
  </div>
</template>

<script>
import LineChart from '@/components/LineChart.vue';
import PieChart from '@/components/PieChart.vue';
import Clock from '@/components/Clock.vue';


export default {
  name: 'AirQualityChart',
  components: {
    LineChart,
	PieChart,
	Clock
  }
}
</script>

<style scoped>
.card {
  position: relative;
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

.clock-container {
  position: absolute; /* 使用绝对定位 */
  top: 20px; /* 根据需要调整 */
  right: 20px; /* 根据需要调整 */
}
</style>
