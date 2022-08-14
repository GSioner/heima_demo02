<template>
  <div>
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
  </div>
</template>

<script>
export default {
  props: {
    artId: Number
  },
  data() {
    return {
      loading: false,
      finished: false,
      refreshing: false
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
    const data = {
      channel_id: this.artId,
      timestamp: new Date()
    }
    const articleResult = await this.$store.dispatch('article/GET_ARTICLE_INFOMATION_ACTION', data)
    console.log('articleResult: ', articleResult)
  }
}
</script>

<style scoped lang="less">
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
</style>
