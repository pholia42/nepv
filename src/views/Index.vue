<template>
  <div class="card">
    <div class="clock-container">
      <Clock />
    </div>
    <div class="chart-title" style="grid-area: title;">全国空气质量分析</div>
    <div class="coverage-chart"><CoverageChart /></div>
    <div class="pie-chart"><PieChart /></div>
    <div class="line-chart"><LineChart /></div>
    <div class="pollutant-chart"><PollutantChart /></div>
    <div class="air-quality-stats"><AirQualityStats /></div>
	<div class="map"><Map /></div>
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
  }
}
</script>

<style scoped>
.card {
  display: grid;
  grid-template-areas:
    "title title title clock"
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
  margin: 20px;
}

.coverage-chart { grid-area: coverage; }
.pie-chart { grid-area: pie; }
.line-chart { grid-area: line; }
.pollutant-chart { grid-area: pollutant; }
.air-quality-stats { grid-area: stats; }
.clock-container { grid-area: clock; }
.map { grid-area: map; }

.chart-title {
  text-align: center;
  margin-bottom: 20px;
}
</style>
