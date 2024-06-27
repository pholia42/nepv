<template>
  <div ref="lineChart" class="line-chart"></div>
</template>

<script>
import { ElMessage } from 'element-plus';
import * as echarts from 'echarts';
import axiosInstance from '@/axios'; 

export default {
  name: 'LineChart',
  data() {
    return {
      chart: null
    };
  },
  methods: {
    initChart() {
      console.log('Initializing chart...');
      this.chart = echarts.init(this.$refs.lineChart);
      this.chart.setOption({
        title: {
          text: '12个月内空气质量超标趋势',
          left: 'center',
          top: 20,
          textStyle: {
            fontSize: 16,
            color: '#000'
          }
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(0,0,0,0.7)',
          borderColor: '#4287f5',
          borderWidth: 1,
          textStyle: {
            color: '#fff'
          }
        },
        xAxis: {
          type: 'category',
          data: [],
          name: '月份',
          nameTextStyle: {
            color: '#000'
          },
          axisLabel: {
            color: '#000'
          },
          axisLine: {
            lineStyle: {
              color: '#4287f5'
            }
          }
        },
        yAxis: {
          type: 'value',
          name: '超标次数',
          nameTextStyle: {
            color: '#000'
          },
          axisLabel: {
            color: '#000'
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
        series: [
          {
            data: [],
            type: 'line',
            smooth: true,
            lineStyle: {
              color: '#4287f5',
              width: 2
            },
            itemStyle: {
              color: '#4287f5'
            },
            areaStyle: {
              color: 'rgba(66, 135, 245, 0.2)'
            },
            markPoint: {
              data: [
                { type: 'max', name: 'Max' },
                { type: 'min', name: 'Min' }
              ]
            }
          }
        ]
      });
    },
    updateChart(data) {
      console.log('Updating chart with data:', data);
      this.chart.setOption({
        xAxis: {
          data: data.map(item => item.date)
        },
        series: [
          {
            data: data.map(item => item.count)
          }
        ]
      });
    },
    async fetchData() {
      const token = localStorage.getItem('token');
      //console.log('Testing with token:', token);
      try {
        const response = await axiosInstance.get('/admins/dateDistribution', {
          headers: { token: `${token}` }
        });
        //console.log('Server response:', response);
        if (response.data.success) {
         // console.log('Success', response.data.data);
          this.updateChart(response.data.data);
        } else {
            ElMessage.error('Failed to retrieve data: ' + response.data.errorMsg);
        }
      } catch (error) {
            console.error('Request error:', error);
            ElMessage.error('Request error, please try again later');
      }
    }
  },
  mounted() {
    console.log('Component mounted, fetching data...');
    this.initChart();
    this.fetchData();
  }
}
</script>

<style scoped>
.line-chart {
  width: 33.33vw; /* 屏幕宽度的1/3 */
  height: 33.33vh; /* 屏幕高度的1/3 */
}
</style>
