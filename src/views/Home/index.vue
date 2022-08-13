<template>
  <div>
    <!-- APP展示各模块内容区域 -->
    <router-view></router-view>
    <!-- 底部切换按钮 -->
    <div class="footerBtn" @load="changeIcon">
      <p
        class="tag"
        @click="changeRouteURL('homeview')"
        :class="{ active: iconColor === 'homeview' }"
      >
        <van-icon
          class-prefix="icon-shouye iconfont"
          name="Home"
          size=".6rem"
        />
        <span>首页</span>
      </p>
      <p
        class="tag"
        @click="changeRouteURL('question')"
        :class="{ active: iconColor === 'question' }"
      >
        <van-icon
          class-prefix="icon-wenda iconfont"
          name="Question"
          size=".6rem"
        />
        <span>问答</span>
      </p>
      <p
        class="tag"
        @click="changeRouteURL('videomodel')"
        :class="{ active: iconColor === 'videomodel' }"
      >
        <van-icon
          class-prefix="iconfont icon-shipin"
          name="videoModel"
          size=".6rem"
        />
        <span>视频</span>
      </p>
      <p
        class="tag"
        @click="changeRouteURL('usercenter')"
        :class="{ active: iconColor === 'usercenter' }"
      >
        <van-icon class-prefix="iconfont icon-wode" name="My" size=".6rem" />
        <span>我的</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeModel',
  data() {
    return {
      iconColor: ''
    }
  },
  methods: {
    // ^ --- 底部按钮跳转链接
    changeRouteURL(url) {
      this.$router.push(`/home/${url}`)
      this.iconColor = url
    },
    changeIcon() {
      this.iconColor = this.$route.name
    }
  },
  created() {
    this.changeIcon()
  }
}
</script>

<style scoped lang="less">
// ^ --- 底部按钮样式
.footerBtn {
  align-items: center;
  box-sizing: border-box;
  padding: 0 60px;
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background-color: #fff;
  color: #707070;

  .tag {
    letter-spacing: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 20px;

    span {
      margin-top: 5px;
    }
  }
}

// ^ --- 底部按钮激活样式
.active {
  color: #3d9cfa;
}
</style>
