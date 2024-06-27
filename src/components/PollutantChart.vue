<template>
  <div ref="chartRef" style="width: 600px; height: 400px;"></div>
</template>

<script>
import * as echarts from 'echarts';
import axiosInstance from '@/axios';

export default {
  name: 'PollutantChart',
  props: {
    pollutantType: {
      type: String,
      required: true
    },
    chartTitle: {
      type: String,
      default: 'Pollutant Data Analysis'
    },
    barColor: {
      type: String,
      default: '#000000'
    }
  },
  data() {
    return {
      chart: null
    };
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.chartRef);
      this.chart.setOption({
        title: {
          text: this.chartTitle
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: [],
          name: 'Province'
        },
        yAxis: {
          type: 'value',
          name: `${this.pollutantType} Value`
        },
        series: [{
          data: [],
          type: 'bar',
          showBackground: true,
          itemStyle: {
            color: this.barColor
          },
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }]
      });
    },
    updateChart(data) {
      this.chart.setOption({
        xAxis: {
          data: data.map(item => item.province)
        },
        series: [{
          data: data.map(item => item[this.pollutantType.toLowerCase() + 'over'])
        }]
      });
    },
    fetchData() {
      axiosInstance.get('/admins/dataGroupByProvince')
      .then(response => {
        if(response.data.success) {
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
