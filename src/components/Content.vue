<template>
  <div>
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      immediate-check="false"
      success-text="刷新成功"
    >
      <van-list
        offset="50"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- ↓组件 --- 内容栏展示区↓ -->
        <ContentCell
          :dataList="k"
          v-for="(k, i) in articleList"
          :key="i"
          class="cell"
        ></ContentCell>
        <!-- ↑组件 --- 内容栏展示区↑ -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ContentCell from './ContentCell.vue'
export default {
  components: {
    ContentCell
  },
  props: {
    artId: Number
  },
  data() {
    return {
      loading: false,
      finished: false,
      refreshing: false,
      articleList: [],
      prevTime: new Date()
    }
  },
  methods: {
    // ^ --- 封装通用代码（请求数据、重赋值prevTime、创建参数变量对象）
    async sameFn(time = this.prevTime) {
      const data = {
        channel_id: +this.artId,
        timestamp: time
      }
      const res = await this.$store.dispatch(
        'article/GET_ARTICLE_INFOMATION_ACTION',
        data
      )
      this.prevTime = res.data.data.pre_timestamp
      this.finished = false
      return res.data.data
    },
    // ^ --- 懒加载刷新
    async onLoad(time) {
      if (!this.prevTime) {
        this.finished = true
        this.loading = true
      }
      this.loading = true
      const timeId = setTimeout(async () => {
        const res = await this.sameFn(time)
        this.articleList = [...this.articleList, ...res.results]
        this.loading = false
        clearTimeout(timeId)
      }, 500)
    },
    // ^ --- 下拉刷新
    async onRefresh() {
      // 清空列表数据
      this.finished = false
      this.articleList = []

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.refreshing = false
      this.onLoad(new Date())
    }
  },
  // ^ --- 初始化数据
  async created() {
    const res = await this.sameFn(new Date())
    this.articleList = res.results
    this.loading = true
  }
}
</script>

<style scoped></style>
