<template>
  <div class="main" @mouseover="toWelcome">
    <h1>黑马头条</h1>
    <p>有态度的技术分享</p>
  </div>
</template>

<script>
export default {
  name: 'WelcomePage02',
  methods: {
    //   ^ --- 配置点击后切换至欢迎页面
    toWelcome() {
      this.$router.push('/welcome')
    }
  }
}
</script>

<style scoped lang="less">
// ^ --- 欢迎首页样式制作
.main {
  background-color: #3c8ffb;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  background-image: url('@/assets/images/启动页.png');
  background-size: 520px 500px;
  background-repeat: no-repeat;
  background-position: center 250px;

  h1 {
    font-size: 60px;
    color: white;
  }

  p {
    font-size: 48px;
    color: #fefeff;
    font-weight: 200;
    margin-bottom: 260px;
    margin-top: 55px;
  }
}
</style>
