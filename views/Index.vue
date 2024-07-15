<template>
  <div class="layout-container">
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
.layout-container {
  display: grid;
  grid-template-areas:
    "top-bar top-bar top-bar top-bar top-bar top-bar"
    "coverage coverage map map map pollutant"
    "pie pie map map map pollutant"
    "line line map map map pollutant"
    "line line stats stats stats pollutant"
    ". . . . . pollutant";
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: auto repeat(5, auto);
  gap: 20px;
  padding: 20px;
}

.top-bar {
  grid-area: top-bar;
  width: 100%;
  height: 60px;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.logout-icon {
  color: #000000;
  cursor: pointer;
  margin-left: 20px;
}

.chart-title {
  text-align: center;
  font-size: 1.5rem;
  flex-grow: 1;
}

.clock-container {
  margin-right: 20px;
}

.card {
  display: contents;
}

.coverage-chart { grid-area: coverage; }
.pie-chart { grid-area: pie; }
.line-chart { grid-area: line; }
.pollutant-chart { grid-area: pollutant; }
.air-quality-stats { grid-area: stats; }
.map { grid-area: map; }
</style>
