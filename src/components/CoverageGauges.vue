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
      provinceCoverage: 0,
      cityCoverage: 0
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
            fontSize: 16
          }
        },
        series: [
          {
            type: 'gauge',
            detail: {
              formatter: '{value}%',
              fontSize: 20
            },
            data: [{ value: this.provinceCoverage, name: '覆盖率' }],
            axisLine: {
              lineStyle: {
                width: 30,
                color: [
                  [0.3, '#67e0e3'],
                  [0.7, '#37a2da'],
                  [1, '#fd666d']
                ]
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
            fontSize: 16
          }
        },
        series: [
          {
            type: 'gauge',
            detail: {
              formatter: '{value}%',
              fontSize: 20
            },
            data: [{ value: this.cityCoverage, name: '覆盖率' }],
            axisLine: {
              lineStyle: {
                width: 30,
                color: [
                  [0.3, '#67e0e3'],
                  [0.7, '#37a2da'],
                  [1, '#fd666d']
                ]
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
    fetchCoverageData() {
      axiosInstance.get('/admins/dataGroupByProvince')
        .then(response => {
          if (response.data.success) {
            const data = response.data.data;
            const totalProvinces = data.length;
            const provinceCoverageCount = data.filter(item => item.aqiover > 0).length;
            const cityCoverageCount = data.filter(item => item.aqiover > 0 && this.isCity(item.province)).length;
            
            this.provinceCoverage = (provinceCoverageCount / totalProvinces) * 100;
            this.cityCoverage = (cityCoverageCount / totalProvinces) * 100;
            this.updateGauges();
          } else {
            console.error('Error fetching data:', response.data.errorMsg);
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    },
    isCity(province) {
      const cities = ['北京', '上海', '广州', '深圳', '天津', '重庆'];
      return cities.includes(province);
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
}
</style>
