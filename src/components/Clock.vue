<template>
  <div class="clock">
    当前时间: {{ currentTime }}
  </div>
</template>

<script>
export default {
  name: 'Clock', // 组件的名称
  data() {
    return {
      currentTime: '', // 用于存储当前时间
    };
  },
  mounted() {
    this.updateTime(); // 组件挂载后立即更新时间
    this.timer = setInterval(() => this.updateTime(), 1000); // 每秒更新时间
  },
  beforeDestroy() {
    clearInterval(this.timer); // 组件销毁前清除定时器
  },
  methods: {
    updateTime() {
      this.currentTime = new Date().toLocaleTimeString(); // 更新当前时间
    }
  }
};
</script>

<style scoped>
.clock {
  font-size: 24px;
  font-family: 'Arial', sans-serif;
}
</style>