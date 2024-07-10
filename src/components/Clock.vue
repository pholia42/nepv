<template>
  <div class="clock">
    当前时间: {{ currentTime }}
  </div>
</template>

<script>
export default {
  name: 'Clock',
  data() {
    return {
      currentTime: '', // 存储当前时间字符串
    };
  },
  mounted() {
    this.updateTime(); // 组件挂载后立即调用，确保立即显示时间
    this.timer = setInterval(this.updateTime, 1000); // 设置定时器，每秒更新时间
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 清理定时器，防止内存泄漏
    }
  },
  methods: {
    updateTime() {
      this.currentTime = new Date().toLocaleTimeString(); // 使用toLocaleTimeString获取格式化的时间
    }
  }
};
</script>

<style scoped>
.clock {
  font-size: 18px;
  font-family: 'Arial', sans-serif;
  color: #333;
}
</style>
