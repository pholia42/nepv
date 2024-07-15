<template>
  <div class="gauges-container">
    <div ref="provinceCoverageGauge" style="width: 300px; height: 300px;"></div>
    <div ref="cityCoverageGauge" style="width: 300px; height: 300px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import axiosInstance from '@/axios';

export default {
  name: 'CoverageGauges',
  data() {
    return {
      provinceCoverageChart: null,
      cityCoverageChart: null,
      provinceCoverage: 50, // 示例初始数据
      cityCoverage: 30 // 示例初始数据
    };
  },
  methods: {
    initGauges() {
      this.provinceCoverageChart = this.initGauge(this.$refs.provinceCoverageGauge, '全国省网格覆盖率(%)', '#67e0e3', this.provinceCoverage);
      this.cityCoverageChart = this.initGauge(this.$refs.cityCoverageGauge, '全国大城市网格覆盖率(%)', '#fd666d', this.cityCoverage);
    },
    initGauge(ref, titleText, color, coverage) {
      const chart = echarts.init(ref);
      chart.setOption({
        title: {
          text: titleText,
          left: 'center',
          top: 20,
          textStyle: {
            fontSize: 16,
            color: '#000000'
          }
        },
        series: [{
          type: 'gauge',
          detail: {
            formatter: '{value}%',
            fontSize: 20,
            color: color,
            fontWeight: 'bolder'
          },
          data: [{value: coverage, name: '覆盖率'}],
          axisLine: {
            lineStyle: {
              width: 30,
              color: [[coverage / 100, color], [1, '#ddd']]
            }
          },
          pointer: {
            width: 5,
            length: '70%'
          },
          axisLabel: {
            color: '#000000'
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          }
        }]
      });
      return chart;
    },
    updateGauges() {
      this.updateGauge(this.provinceCoverageChart, this.provinceCoverage, '#67e0e3');
      this.updateGauge(this.cityCoverageChart, this.cityCoverage, '#fd666d');
    },
    updateGauge(chart, coverage, color) {
      chart.setOption({
        series: [{
          data: [{value: coverage, name: '覆盖率'}],
          axisLine: {
            lineStyle: {
              color: [[coverage / 100, color], [1, '#ddd']]
            }
          }
        }]
      });
    },
    async fetchCoverageData() {
      const token = localStorage.getItem('token');
      try {
        const response = await axiosInstance.get('/admins/otherData', {
          headers: { token: `${token}` }
        });
        if (response.data.success) {
          this.provinceCoverage = parseFloat(response.data.data.centerCityCoverage);
          this.cityCoverage = parseFloat(response.data.data.bigCityCoverage);
          this.updateGauges();
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
    this.initGauges();
    this.fetchCoverageData();
  }
}
</script>

<style>
.gauges-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
}
.gauges-container > div {
  width: 300px;
  height: 300px;
}
</style>
