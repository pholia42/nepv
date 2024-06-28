<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script>
import * as echarts from 'echarts';
import axiosInstance from '@/axios';
import chinaMapData from '@/assets/china.json'; // Ensure the path is correct

export default {
  name: 'ChinaMap',
  data() {
    return {
      mapChart: null,
    };
  },
  methods: {
    initMap() {
      echarts.registerMap('china', chinaMapData);
      this.mapChart = echarts.init(this.$refs.mapContainer);
      this.mapChart.setOption({
        title: {
          text: '空气质量等级分布',
          left: 'center',
          textStyle: {
            color: '#fff',
          },
        },
        tooltip: {
          trigger: 'item',
        },
        visualMap: {
          min: 0,
          max: 5,
          left: 'left',
          top: 'bottom',
          text: ['高', '低'],
          calculable: true,
          inRange: {
            color: ['#e0ffff', '#006edd'],
          },
          textStyle: {
            color: '#fff',
          },
        },
        series: [
          {
            name: '空气质量',
            type: 'map',
            mapType: 'china',
            roam: false,
            label: {
              show: true,
              color: '#fff',
            },
            data: [],
          },
        ],
      });
    },
    async fetchMapData() {
      const token = localStorage.getItem('token');
      try {
        const response = await axiosInstance.get('/admins/dataGroupByProvince', {
          headers: { token: `${token}` },
        });
        if (response.data.success) {
          const mapData = response.data.data.map(item => ({
            name: item.province,
            value: item.aqiover, // Assuming aqiover is the air quality index
          }));
          this.updateMap(mapData);
        } else {
          this.$message.error('Failed to retrieve data: ' + response.data.errorMsg);
        }
      } catch (error) {
        console.error('Request error:', error);
        this.$message.error('Request error, please try again later');
      }
    },
    updateMap(data) {
      this.mapChart.setOption({
        series: [
          {
            data,
          },
        ],
      });
    },
  },
  mounted() {
    this.initMap();
    this.fetchMapData();
  },
};
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 500px; /* Adjust height as needed */
}
</style>
