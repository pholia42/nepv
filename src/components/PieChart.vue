<template>
  <div ref="pieChart" style="width: 600px; height: 400px;"></div>
</template>

<script>
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
            color: '#fff'
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
            name: 'AQI级别',
            type: 'pie',
            radius: '50%',
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      });
    },
    updateChart(data) {
      this.chart.setOption({
        series: [
          {
            data: data
          }
        ]
      });
    },
    fetchData() {
      axiosInstance.get('/path-to-your-api/pie-chart-data')
        .then(response => {
          if (response.data.success) {
            this.updateChart(response.data.data);
          } else {
            console.error('Error fetching data:', response.data.errorMsg);
          }
        })
        .catch(error => {
          console.error('Error:', error);
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
/* 自定义组件样式 */
</style>
