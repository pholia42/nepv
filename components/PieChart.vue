<template>
  <div ref="pieChart" class="pie-chart"></div>
</template>

<script>
import { ElMessage } from 'element-plus';
import * as echarts from 'echarts';
import axiosInstance from '@/axios';

export default {
  name: 'PieChart',
  data() {
    return {
      chart: null
    };
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.pieChart);
      this.chart.setOption({
        title: {
          text: '空气质量指数级别分布',
          left: 'center',
          top: 20,
          textStyle: {
            fontSize: 16,
            color: '#000' // 文字颜色设置为黑色
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: [], // 初始化时图例为空
          textStyle: {
            color: '#000' // 图例文字颜色调整为黑色
          }
        },
        series: [
          {
            name: 'AQI级别',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [], // 初始数据为空，将由 updateChart 方法填充
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            label: {
              normal: {
                textStyle: {
                  color: '#000' // 设置标签文字颜色为黑色
                }
              }
            }
          }
        ],
        color: ['#4992ff', '#7cffb2', '#fddd60', '#ff6e76', '#58d9f9', '#05c091'] // 设置饼图的颜色
      });
    },
    updateChart(data) {
      const translateGrades = {
        '一级污染': '优',
        '二级污染': '良',
        '三级污染': '轻度污染',
        '四级污染': '中度污染',
        '五级污染': '重度污染',
        '六级污染': '严重污染'
      };

      const chartData = data.map(item => ({
        name: translateGrades[item.ack_grade] || item.ack_grade,
        value: item.count
      }));

      this.chart.setOption({
        legend: {
          data: chartData.map(item => item.name) // 更新图例数据
        },
        series: [{
          data: chartData
        }]
      });
    },
    async fetchData() {
      const token = localStorage.getItem('token');
      try {
        const response = await axiosInstance.get('/admins/aqiGradeDistribution', {
          headers: { token: `${token}` }
        });
        if (response.data.success) {
          this.updateChart(response.data.data);
        } else {
          ElMessage.error('Failed to retrieve data: ' + response.data.errorMsg);
        }
      } catch (error) {
        console.error('Request error:', error);
      }
    }
  },
  mounted() {
    this.initChart();
    this.fetchData();
  }
};
</script>

<style scoped>
.pie-chart {
  width: 30vw;
  height: 30vh;
}
</style>