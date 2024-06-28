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
      provinceCoverage: null, // 示例数据，可以在 fetchCoverageData() 中更新
      cityCoverage: null // 示例数据，可以在 fetchCoverageData() 中更新
    };
  },
  methods: {
    initProvinceCoverageGauge() {
      this.provinceCoverageChart = echarts.init(this.$refs.provinceCoverageGauge);
      this.provinceCoverageChart.setOption({
        title: {
          text: '全国省网格覆盖率(%)',
          left: 'center',
          top: 20,
          textStyle: {
            fontSize: 16,
            color: '#000000'
          }
        },
        series: [
          {
            type: 'gauge',
            detail: {
              formatter: '{value}%',
              fontSize: 20,
              color: '#67e0e3'
            },
            data: [{ value: this.provinceCoverage, name: '覆盖率' }],
            axisLine: {
              lineStyle: {
                width: 30,
                color: [
                  [0.5, '#91c7ae'],
                  [1, '#63869e']
                ]
              }
            },
            pointer: {
              width: 5
            },
            splitLine: {
              length: 30,
              lineStyle: {
                width: 2,
                color: '#000000'
              }
            },
            axisLabel: {
              color: '#000000'
            },
            axisTick: {
              length: 15,
              lineStyle: {
                color: '#000000'
              }
            }
          }
        ]
      });
    },
    initCityCoverageGauge() {
      this.cityCoverageChart = echarts.init(this.$refs.cityCoverageGauge);
      this.cityCoverageChart.setOption({
        title: {
          text: '全国大城市网格覆盖率(%)',
          left: 'center',
          top: 20,
          textStyle: {
            fontSize: 16,
            color: '#000000'
          }
        },
        series: [
          {
            type: 'gauge',
            detail: {
              formatter: '{value}%',
              fontSize: 20,
              color: '#fd666d'
            },
            data: [{ value: this.cityCoverage, name: '覆盖率' }],
            axisLine: {
              lineStyle: {
                width: 30,
                color: [
                  [0.3, '#fd666d'],
                  [0.7, '#fd9466'],
                  [1, '#67e0e3']
                ]
              }
            },
            pointer: {
              width: 5
            },
            splitLine: {
              length: 30,
              lineStyle: {
                width: 2,
                color: '#ffaaff'
              }
            },
            axisLabel: {
              color: '#ffaaff'
            },
            axisTick: {
              length: 15,
              lineStyle: {
                color: '#ffaaff'
              }
            }
          }
        ]
      });
    },
    updateGauges() {
      if (this.provinceCoverageChart) {
        this.provinceCoverageChart.setOption({
          series: [{ data: [{ value: this.provinceCoverage, name: '覆盖率' }] }]
        });
      }
      if (this.cityCoverageChart) {
        this.cityCoverageChart.setOption({
          series: [{ data: [{ value: this.cityCoverage, name: '覆盖率' }] }]
        });
      }
    },
    async fetchCoverageData() {
      const token = localStorage.getItem('token');
      try {
        const response = await axiosInstance.get('/admins/otherData', {
          headers: { token: `${token}` }
        });
        if (response.data.success) {
          this.updateChart(response.data.data);
        } else {
          this.$message.error('Failed to retrieve data: ' + response.data.errorMsg);
        }
      } catch (error) {
        console.error('Request error:', error);
        this.$message.error('Request error, please try again later');
      }
    },
    updateChart(data) {
      this.provinceCoverage = parseFloat(data.centerCityCoverage);
      this.cityCoverage = parseFloat(data.bigCityCoverage);
      this.updateGauges();
    }
  },
  mounted() {
    this.initProvinceCoverageGauge();
    this.initCityCoverageGauge();
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
  width: 20vw;
  height: 20vh;
}
</style>
