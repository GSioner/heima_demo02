<template>
  <div class="main">
    <div class="txt">
      <p><span class="title">黑马</span><span class="blue">头条</span></p>
      <p>技术热点的追求者</p>
    </div>
    <van-button plain type="info" round class="btn" @click="toHomeView"
      >立即体验</van-button
    >
  </div>
</template>

<script>
export default {
  name: 'WelcomePage',
  methods: {
    // ^ --- 配置点击按钮后切换至首页HomeView版面
    toHomeView() {
      this.$router.push('/home/homeview')
    }
  }
}
</script>

<style scoped lang="less">
// ^ --- 通用属性
@blue: #3698fa;
.blue {
  color: @blue;
}
// ^ --- 欢迎页面样式配置
.main {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  background-image: url('@/assets/images/欢迎界面.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: bottom;

  .txt {
    text-align: center;

    p {
      font-size: 40px;
      color: #666666;
      font-weight: 200;
      margin-top: 30px;

      span {
        font-weight: 600;
        font-size: 50px;

        .title {
          color: black;
        }
      }
    }
  }

  .btn {
    height: 60px;
    width: 260px;
    font-size: 35px;
    margin-bottom: 60px;
    margin-top: 125px;
  }
}
</style>
