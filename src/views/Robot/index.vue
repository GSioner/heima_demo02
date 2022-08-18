<template>
  <div>
    <!-- 顶部盒子 -->
    <TopBar>
      <span slot="title">小智同学</span>
    </TopBar>
    <div class="time">{{ time }}</div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import TopBar from '@/components/TopBar.vue'
export default {
  components: {
    TopBar
  },
  data() {
    return {
      time: dayjs().format('HH:ss')
    }
  }
}
</script>

<style scoped lang="less">
.time {
  position: absolute;
  top: 120px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 30px;
  color: #d9d9d9;
}
</style>
