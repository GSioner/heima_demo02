<template>
  <div>
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      immediate-check="false"
      :success-text="refreshTxt"
    >
      <van-list
        offset="50"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <!-- ↓组件 --- 内容栏展示区↓ -->
        <ContentCell
          :dataList="k"
          :index="i"
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
  name: 'HomeView-List-Model',
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
      prevTime: new Date(),
      error: false,
      refreshTxt: ''
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
    onLoad(time) {
      try {
        if (!this.prevTime) {
          this.finished = true
          this.loading = true
        }
        this.loading = true
        const timeId = setTimeout(async () => {
          const res = await this.sameFn(time)
          this.articleList.push(...res.results)
          this.loading = false
          clearTimeout(timeId)
        }, 500)
      } catch (err) {
        this.error = true
        this.loading = true
      }
    },
    // ^ --- 下拉刷新
    async onRefresh() {
      try {
        this.finished = false
        this.articleList = []
        this.loading = true
        this.refreshing = false
        this.onLoad(new Date())
        this.refreshTxt = '数据刷新成功！'
      } catch (err) {
        this.refreshTxt = '刷新失败！'
        this.loading = true
      }
    }
  },
  // ^ --- 初始化数据
  async created() {
    const res = await this.sameFn(new Date())
    this.articleList = res.results
    this.loading = false
  }
}
</script>

<style scoped lang="less"></style>
