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
      const translateGrades = {
        '一级污染': '优',
        '二级污染': '良',
        '三级污染': '轻度污染',
        '四级污染': '中度污染',
        '五级污染': '重度污染',
        '六级污染': '严重污染'
      };

      const colorList = [
        '#00a65a', // 优
        '#f39c12', // 良
        '#00c0ef', // 轻度污染
        '#dd4b39', // 中度污染
        '#c33900', // 重度污染
        '#000000'  // 严重污染
      ];

      this.chart.setOption({
        title: {
          text: '空气质量指数级别分布',
          left: 'center',
          top: 20,
          textStyle: {
            fontSize: 16,
            color: '#000000'
          }
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '10%',
          left: 'center',
          textStyle: {
            color: '#fff'
          }
        },
        series: [
          {
            name: 'AQI级别', // 系列名称
            type: 'pie',
            radius: '50%',
            data: [], // 初始数据为空，将由 updateChart 方法填充
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ],
        graphic: colorList.map((color, index) => ({
          type: 'text',
          left: 10, // 图例位置
          top: `${index * 30 + 50}px`, // 每个图例的垂直间距
          style: {
            text: translateGrades[`${
              ['一级污染', '二级污染', '三级污染', '四级污染', '五级污染', '六级污染'][index]
            }`] || '未知等级',
            fill: color,
            font: 'bold 14px Microsoft YaHei, Arial, sans-serif',
            textBackgroundColor: 'rgba(255, 255, 255, 0.7)',
            padding: [2, 4]
          }
        }))
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
        name: translateGrades[item.ack_grade],
        value: item.count
      }));

      this.chart.setOption({
        legend: {
          data: chartData.map(item => item.name) // 动态设置图例数据
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
        ElMessage.error('Request error, please try again later');
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
  width: 33.33vw; /* 屏幕宽度的1/3 */
  height: 33.33vh; /* 屏幕高度的1/3 */
}
</style>
