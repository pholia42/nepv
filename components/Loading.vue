<template>
  <div class="full-screen-loading" v-if="visible">
    <div class="loading-animation">
      <img src="@/assets/load.gif" alt="Loading..."/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: Boolean
  }
};
</script>

<style scoped>
.full-screen-loading {
  position: fixed;
  top: 60px; /* 假设顶栏高度为60px */
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5); /* 半透明背景 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 确保覆盖其他内容 */
}

.loading-animation {
  width: 100px;
  height: 100px; /* 控制动画大小 */
}
</style>
