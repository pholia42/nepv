<template>
  <div>
    <div class="top-bar">
      <el-icon @click="goBack" class="logout-icon"><ArrowLeft /></el-icon>
      <div class="chart-title">全国空气质量分析</div>
      <div class="clock-container">
        <Clock />
      </div>
    </div>
    <div class="card">
      <div class="coverage-chart"><CoverageChart /></div>
      <div class="pie-chart"><PieChart /></div>
      <div class="line-chart"><LineChart /></div>
      <div class="pollutant-chart"><PollutantChart /></div>
      <div class="air-quality-stats"><AirQualityStats /></div>
      <div class="map"><Map /></div>
    </div>
  </div>
</template>

<script>
import Clock from '@/components/Clock.vue';  
import CoverageChart from '@/components/CoverageGauges.vue';
import LineChart from '@/components/LineChart.vue';
import PieChart from '@/components/PieChart.vue';
import PollutantChart from '@/components/PollutantChart.vue';
import AirQualityStats from '@/components/AirQualityStats.vue';
import Map from '@/components/Map.vue';
import { useRoute, useRouter } from 'vue-router';
import { debounce } from 'lodash';

export default {
  name: 'AirQualityChart',
  components: {
    Clock,
    CoverageChart,
    LineChart,
    PieChart,
    PollutantChart,
    AirQualityStats,
    Map
  },
  setup() {
    const router = useRouter();
    return {
      goBack() {
        localStorage.clear();
        router.push('/');
      }
    };
  },
 methods: {
    handleResize() {
    }
  },
  mounted() {
    window.addEventListener('resize', debounce(this.handleResize, 300));
  },
  beforeDestroy() {
    window.removeEventListener('resize', debounce(this.handleResize, 300));
  }
}
</script>

<style scoped>
.top-bar {
  width: 100%;
  height: 60px; /* 可以根据需要调整高度 */
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

.logout-icon {
  color: #000000;
  cursor: pointer;
  margin-left: 20px; /* 确保图标在最左侧 */
  position: absolute; /* 使图标固定在顶部条的左侧 */
}

.chart-title {
  text-align: center;
  font-size: 1.5rem; /* 增加标题字体大小 */
  flex-grow: 1; /* 让标题占据多余空间并居中 */
}

.clock-container {
  margin-right: 20px; /* 确保时钟在最右侧 */
}

.card {
  display: grid;
  grid-template-areas:
    "coverage map map pollutant"
    "pie map map pollutant"
    "line stats stats pollutant";
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto auto auto;
  position: relative;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  padding: 20px;
  margin-top: 80px; /* 增加顶部间隙以显示顶部条 */
}

.coverage-chart { grid-area: coverage; }
.pie-chart { grid-area: pie; }
.line-chart { grid-area: line; }
.pollutant-chart { grid-area: pollutant; }
.air-quality-stats { grid-area: stats; }
.map { grid-area: map; }
</style>
