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
      // 使用nextTick确保DOM元素可用
      this.$nextTick(() => {
        if (this.$refs.lineChart) {  // 检查DOM元素是否可用
          this.chart = echarts.init(this.$refs.lineChart);
          this.setChartOptions();
        }
      });
    },
    setChartOptions() {
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
          data: this.getLast12Months(),
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
    getLast12Months() {
      const months = [];
      const date = new Date();
      date.setMonth(date.getMonth() - 11);  // 从当前月份回溯12个月
      for (let i = 0; i < 12; i++) {
        months.push(`${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`);
        date.setMonth(date.getMonth() + 1);
      }
      return months;
    },
    async fetchData() {
      const months = this.getLast12Months();
      const token = localStorage.getItem('token');
      try {
        const response = await axiosInstance.get('/admins/dateDistribution', {
          headers: { token: `${token}` }
        });
        if (response.data.success) {
          this.updateChart(response.data.data, months);
        } else {
          ElMessage.error('获取数据失败: ' + response.data.errorMsg);
        }
      } catch (error) {
        console.error('请求错误:', error);
        ElMessage.error('请求错误，请稍后再试');
      }
    },
    updateChart(data, months) {
      const formattedData = months.map(month => {
        const found = data.find(d => d.date === month);
        return found ? found.count : 0;
      });
      this.chart.setOption({
        xAxis: {
          data: months.map(month => month.split('-')[1] + '月')  // 显示“月份”
        },
        series: [{
          data: formattedData
        }]
      });
    }
  },
  mounted() {
    this.initChart();
    this.fetchData();
  }
}
</script>

<style scoped>
.line-chart {
  width: 25vw;
  height: 25vh;
}
</style>
