<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script>
import * as echarts from 'echarts';
import axiosInstance from '@/axios';
import chinaMapData from '@/assets/china.json';
import { debounce } from 'lodash';

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
	  this.mapChart.showLoading();// 显示加载动画
      try {
        const response = await axiosInstance.get('/admins/dataGroupByProvince', {
          headers: { token: `${token}` },
        });
		this.mapChart.hideLoading(); // 隐藏加载动画
        if (response.data.success) {
          const mapData = response.data.data.map(item => ({
            name: item.province,
            value: item.aqiover,
          }));
          this.updateMap(mapData);
        } else {
          this.$message.error('Failed to retrieve data: ' + response.data.errorMsg);
        }
      } catch (error) {
		this.mapChart.hideLoading(); // 隐藏加载动画
        console.error('Request error:', error);
        //this.$message.error('Request error, please try again later');
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
  height: 500px; 
}
</style>
