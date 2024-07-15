<template>
  <div class="charts-container">
    <div ref="pm25ChartRef" class="chart" style="width: 600px; height: 300px;"></div>
    <div ref="so2ChartRef" class="chart" style="width: 600px; height: 300px;"></div>
    <div ref="coChartRef" class="chart" style="width: 600px; height: 300px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import axiosInstance from '@/axios';
import { debounce } from 'lodash';

export default {
  name: 'PollutantChart',
  data() {
    return {
      pm25Chart: null,
      so2Chart: null,
      co2Chart: null
    };
  },
  methods: {
    initChart(ref, chartTitle, barColor, dataKey) {
      const chart = echarts.init(this.$refs[ref], null, { renderer: 'canvas' });
      chart.setOption({
        title: {
          text: chartTitle,
          left: 'center',
          textStyle: {
            color: '#000000'
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: [],
          axisLabel: {
            color: '#00007f',
            interval: 0, // 显示所有标签
            rotate: 45  // 标签旋转45度，避免重叠
          },
          axisLine: {
            lineStyle: {
              color: '#4287f5'
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#00007f'
          },
          axisLine: {
            lineStyle: {
              color: '#4287f5'
            }
          },
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        series: [{
          data: [],
          type: 'bar',
          showBackground: true,
          itemStyle: {
            color: barColor
          },
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }]
      });
      chart.showLoading();
      return chart;
    },
    updateChart(chart, data, dataKey) {
      chart.setOption({
        xAxis: {
          data: data.map(item => item.province)
        },
        series: [{
          data: data.map(item => item[dataKey])
        }]
      });
      chart.hideLoading();
    },
    async fetchData() {
      const token = localStorage.getItem('token');
      try {
        const response = await axiosInstance.get('/admins/dataGroupByProvince', {
          headers: { token: `${token}` }
        });
        if (response.data.success) {
          const data = response.data.data;
          this.updateChart(this.pm25Chart, data, 'pm250over');
          this.updateChart(this.so2Chart, data, 'so2over');
          this.updateChart(this.co2Chart, data, 'co2over');
        } else {
          this.$message.error('Failed to retrieve data: ' + response.data.errorMsg);
        }
      } catch (error) {
        console.error('Request error:', error);
      }
    }
  },
  mounted() {
    this.pm25Chart = this.initChart('pm25ChartRef', '悬浮颗粒物 (PM2.5) 浓度超标累计', '#5470c6', 'pm25');
    this.so2Chart = this.initChart('so2ChartRef', '二氧化硫 (SO2) 浓度超标累计', '#91cc75', 'so2');
    this.co2Chart = this.initChart('coChartRef', '一氧化碳 (CO2) 浓度超标累计', '#fac858', 'co2over');
    this.fetchData();
  }
}
</script>

<style scoped>
.charts-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  padding: 20px;
}
.chart {
  margin-bottom: 20px;
}
</style>
