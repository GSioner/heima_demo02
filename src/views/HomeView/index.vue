<template>
  <div>
    <!-- 顶部搜索栏 -->
    <div class="topBar">
      <input type="text" class="searchInput" />
      <span class="searchTxt">搜索</span>
      <van-icon
        class-prefix="my-icon"
        name="search"
        class="iconfont icon-sousuo"
      />
    </div>

    <!-- 下层频道栏 -->
    <div class="channelBar">
      <!-- 右侧More按钮 -->
      <div class="iconMore">
        <van-icon
          class-prefix="my-icon"
          name="extra"
          class="iconfont icon-gengduo"
        />
      </div>
      <!-- 顶部滑动栏 -->
      <van-tabs v-model="active" swipeable animated>
        <van-tab
          v-for="k in userChannel"
          :title="k.name"
          :key="k.id"
          name="k.id"
        >
          <!-- 组件 --- 内容模块列表 -->
          <Content :artId="k.id"></Content>
          <!-- 组件 --- 内容模块列表 -->

        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import Content from '@/components/Content.vue'
export default {
  components: {
    Content
  },
  data() {
    return {
      searchVal: '',
      active: 2
    }
  },
  computed: {
    userChannel() {
      return this.$store.state.channel.userChannel
    }
  },
  async created() {
    await this.$store.dispatch('channel/GET_USER_CHANNEL_ACTION')
  }
}
</script>

<style scoped lang="less">
// ^ --- 顶部样式/搜索框样式
.topBar {
  height: 100px;
  width: 100%;
  background-color: #3296fa;
  position: relative;

  .searchInput {
    outline: 0;
    border: 0;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 64px;
    width: 555px;
    border-radius: 32px;
    background-color: #5babfb;
    text-indent: 0.5em;
  }

  .searchTxt {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 30px;
    color: #ffffffc6;
  }

  .icon-sousuo {
    position: absolute;
    left: 42%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 45px;
    color: #ffffffc6;
  }
}

// ^ --- 频道栏样式
.channelBar {
  position: relative;
  // ^ --- 频道栏顶部自定义样式设置
  /deep/ .van-tab {
    width: 190px;
    border: 1px solid #edeff3a0;
    border-right: 0;
    font-size: 28px;
  }
  /deep/ .van-tabs__nav--line {
    padding: 0;
  }
  /deep/ .van-tabs__line {
    width: 31px;
    height: 8px;
    background-color: #3296fa;
    border-radius: 3px;
    bottom: 12px;
  }
  /deep/ .van-tabs--line .van-tabs__wrap {
    padding-right: 80px;
  }

  // ^ --- 频道栏顶部右侧More图标样式
  .iconMore {
    width: 80px;
    height: 80px;
    background-color: #fff;
    z-index: 998;
    position: absolute;
    right: 0;
    top: 0;

    .icon-gengduo {
      font-size: 45px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
