<template>
  <van-cell-group>
    <van-cell class="topBar">
      <span slot="title" class="topTitle">
        <slot name="title"></slot>
      </span>
      <slot name="left">
        <van-icon name="arrow-left" slot="icon" @click="backIcon" />
      </slot>
      <slot name="right-icon">
        <van-icon name="ellipsis" slot="right-icon" />
      </slot>
    </van-cell>
  </van-cell-group>
</template>

<script>
export default {
  // ^ --- 回退按钮(<形状按钮)
  methods: {
    backIcon() {
      if (this.$route.query.backpage) {
        this.$router.push(this.$route.query.backpage)
      } else {
        this.$router.back()
      }
    }
  }
}
</script>

<style scoped lang="less">
// ^ --- 顶部蓝色盒子
.topBar {
  height: 100px;
  width: 100vw;
  background-color: #3296fa;
  font-size: 50px;
  color: white;
  justify-content: space-between;
  display: flex;
  align-items: center;

  .topTitle {
    display: block;
    width: 100%;
    height: 100%;
    text-align: center;
    font-size: 36px;
    line-height: 60px;
    color: white;
    flex: 1;
  }
}
</style>
