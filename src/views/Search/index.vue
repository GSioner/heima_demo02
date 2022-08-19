<template>
  <div class="main">
    <!-- 顶部搜索栏 -->
    <div class="topBar">
      <form action="/">
        <van-search
          class="searchBar"
          v-model.lazy.trim="value"
          show-action
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @cancel="onCancel"
          @blur="clearInputWord"
          @input="onInput(value)"
          @focus="onFocus"
          background="#2793ff"
        />
      </form>
    </div>

    <!-- 联想搜索数据 -->
    <div class="suggestion" v-if="sugWordShow">
      <van-cell-group v-for="(k, i) in sugWord" :key="i" @click="onSearch(k)">
        <van-cell icon="search">
          <span slot="title" class="blue">{{
            new RegExp(`^${value}`).test(k) ? value : ''
          }}</span>
          <span slot="title">{{
            new RegExp(`^${value}`).test(k) ? k.slice(value.length) : k
          }}</span>
        </van-cell>
      </van-cell-group>
    </div>

    <!-- 历史记录 -->
    <div class="history" v-else-if="historyShow">
      <!-- 固定行单元格 -->
      <van-cell-group>
        <van-cell title="历史记录">
          <span
            slot="default"
            v-show="deleteShow"
            class="deleteAll"
            @click="$store.commit('search/DELETE_HISTORY_INFO', 'delete')"
            >全部删除</span
          >
          <span slot="default" @click="deleteShow = !deleteShow">{{
            deleteShow ? '完成' : '编辑'
          }}</span>
        </van-cell>
      </van-cell-group>

      <!-- 历史记录数据栏 -->
      <van-cell-group>
        <van-cell v-for="(k, i) in historyList" :key="i">
          <span slot="title" @click="onSearch(k)">{{ k }}</span>
          <van-icon
            name="close"
            slot="default"
            @click="$store.commit('search/DELETE_HISTORY_INFO', k)"
            v-show="deleteShow"
          />
        </van-cell>
      </van-cell-group>
    </div>

    <!-- 内容单元格 -->
    <div class="ContentTab" v-else>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ContentCell
          :dataList="k"
          v-for="k in searchList.results"
          :key="k.art_id"
        ></ContentCell>
      </van-list>
    </div>
  </div>
</template>

<script>
import ContentCell from '@/components/ContentCell.vue'
import { getToken, setToken } from '@/utils/Token.js'
export default {
  name: 'SearchModel',
  components: {
    ContentCell
  },
  data() {
    return {
      value: '',
      sugWordShow: false,
      deleteShow: false,
      historyShow: true,
      loading: false,
      finished: false,
      page: 1
    }
  },
  computed: {
    sugWord: {
      set(val) {
        return setToken('history', val)
      },
      get() {
        return this.$store.state.search.suggestionWord
      }
    },
    historyList() {
      try {
        return getToken('history')
      } catch (err) {
        return this.$store.state.search.historyList
      }
    },
    searchList() {
      return this.$store.state.search.searchList
    }
  },
  watch: {
    historyList: {
      handler() {},
      deep: true,
      immediate: true
    },
    searchList: {
      handler() {},
      deep: true,
      immediate: true
    },
    sugWord: {
      handler() {},
      deep: true,
      immediate: true
    }
  },
  methods: {
    // ^ --- 搜索框输入数据事件
    async onInput(val) {
      if (!this.value) return (this.historyShow = true)
      await this.$store.dispatch('search/GET_SUGGESTION_WORD_ACTION', {
        q: val
      })
      this.historyShow = false
      this.deleteShow = false
      if (!this.sugWord || !this.sugWord[0]) return (this.sugWordShow = false)
      this.sugWordShow = true
    },
    // ^ --- 搜索框执行搜索事件
    onSearch(val) {
      this.$store.commit('search/GET_HISTORY_INFO', val)
      this.value = val
      this.sugWordShow = false
      this.historyShow = false
      this.onLoad(val)
    },
    // ^ --- 搜索框取消事件
    onCancel() {
      this.$router.push('/home/homeview')
    },
    // ^ --- 搜索框失焦事件
    clearInputWord() {
      if (this.sugWordShow) this.sugWord = []
    },
    onFocus() {
      this.historyShow = true
    },
    // ^ --- 搜索关键字请求发送
    async onLoad(val) {
      await this.$store.dispatch('search/GET_SEARCH_RESULT_ACTION', {
        q: val,
        page: this.page,
        per_page: 20
      })
      if (this.searchList.results) {
        this.pag++
      } else {
        return (this.finished = true)
      }
      this.loading = true
      this.finished = false
    }
  },
  async created() {
    // await console.log(this.searchList)
  }
}
</script>

<style scoped lang="less">
.main {
  width: 100%;
  height: 100vh;
  background-color: #f5f7f9;
}
// ^ --- 顶部搜索按钮栏
.topBar {
  height: 100px;
  width: 100%;
}

// ^ --- 建议搜索关键字模块
.suggestion {
  margin-top: 10px;
}

// ^ --- 历史记录模块
.history {
  margin-top: 10px;

  .deleteAll {
    margin-right: 15px;
  }
}

// ^ --- 搜索结果内容展示
.ContentTab {
  padding-top: 10px;
}

// ^ --- 定制样式区
// * --- 搜索栏右侧'取消'字体颜色
/deep/ .van-search__action {
  color: white;
}

// * --- '取消'按钮点击背景色
/deep/ .van-search__action:active {
  background-color: #2793ff;
}

// * --- 搜索栏建议单元格头部蓝字显示
.blue {
  color: #f14c4c;
}
</style>
