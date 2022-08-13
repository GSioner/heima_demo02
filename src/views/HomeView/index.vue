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
          <!-- 内容区块列表模块 -->
          <van-pull-refresh
            v-model="refreshing"
            @refresh="onRefresh"
            immediate-check="false"
          >
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <!-- ↓内容栏展示区↓ -->
              <van-cell-group>
                <van-cell>
                  <template #title>
                    <div class="rightIcon" v-if="false">
                      <span class="contentTitle">标题</span>
                      <van-image
                        src="https://img01.yzcdn.cn/vant/cat.jpeg"
                        class="contentImg"
                      />
                    </div>
                    <div class="bottomIcon" v-else>
                      <span class="contentTitle">标题</span>
                      <div class="imgList">
                        <van-image
                          src="https://img01.yzcdn.cn/vant/cat.jpeg"
                          class="contentImg"
                        />
                      </div>
                    </div>
                  </template>
                  <template #label>
                    <div class="content">
                      <p class="left">
                        <span class="red tag">置顶</span>
                        <span class="tag">作者</span>
                        <span class="tag">评论数</span>
                        <span class="tag">发布时间</span>
                      </p>
                      <van-icon name="cross" />
                    </div>
                  </template>
                </van-cell>
              </van-cell-group>
              <!-- ↑内容栏展示区↑ -->
            </van-list>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchVal: '',
      active: 2,
      list: [],
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  computed: {
    userChannel() {
      return this.$store.state.channel.userChannel
    }
  },
  methods: {
    onLoad() {},
    onRefresh() {
      // 清空列表数据
      this.finished = false

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
    }
  },
  async created() {
    await this.$store.dispatch('channel/GET_USER_CHANNEL_ACTION')
    console.log(this.userChannel)
  }
}
</script>

<style scoped lang="less">
// ^ --- 通用样式
.red {
  color: #ef7a7a;
}
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
    z-index: 9999;
    position: absolute;
    right: 0;
    top: 1%;

    .icon-gengduo {
      font-size: 45px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }

  // ^ --- 图片数量为1时
  .rightIcon {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    .content {
      flex: 1;
    }

    .contentImg {
      width: 230px;
      height: 150px;
    }
  }

  // ^ --- 图片数量为3时
  .bottomIcon {
    display: flex;
    flex-direction: column;

    .content {
      flex: 1;
    }

    .imgList {
      display: flex;
      justify-content: space-between;

      .contentImg {
        width: 225px;
        height: 150px;
      }
    }
  }

  // ^ --- label作者信息栏
  .content {
    display: flex;
    justify-content: space-between;
    font-size: 23px;

    .tag {
      margin-right: 32px;
    }
  }
  .contentTitle {
    font-size: 32px;
  }
}
</style>
