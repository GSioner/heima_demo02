<template>
  <div>
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
          @keyup.enter="onSearch(value)"
          @blur="clearInputWord"
          @input="onInput(value)"
          @focus="historyShow = true"
          background="#2793ff"
          clearable
        />
      </form>
    </div>

    <!-- 联想搜索数据 -->
    <div class="suggestion" v-show="sugWordShow">
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
    <div class="history" v-show="historyShow">
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
          <span slot="title">{{ k }}</span>
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
    <div class="ContentTab">
      <ContentCell
        :dataList="k"
        v-for="k in searchList.results"
        :key="k.art_id"
      ></ContentCell>
    </div>
  </div>
</template>

<script>
import ContentCell from '@/components/ContentCell.vue'
import { getToken } from '@/utils/Token.js'
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
      historyShow: true
    }
  },
  computed: {
    sugWord: {
      set(val) {
        return val
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
  methods: {
    // ^ --- 搜索框输入数据事件
    async onInput(val) {
      this.historyShow = false
      this.deleteShow = false
      if (!this.value) return (this.sugWordShow = false)
      await this.$store.dispatch('search/GET_SUGGESTION_WORD_ACTION', {
        q: val
      })
      if (!this.sugWord || !this.sugWord[0]) return (this.sugWordShow = false)
      this.sugWordShow = true
    },
    // ^ --- 搜索框执行搜索事件
    onSearch(val) {
      this.$store.commit('search/GET_HISTORY_INFO', val)
      this.value = ''
      this.sugWordShow = false
      this.historyShow = false
      this.getSearchList(val)
    },
    // ^ --- 搜索框取消事件
    onCancel() {
      this.$router.push('/home/homeview')
    },
    // ^ --- 搜索框失焦事件
    clearInputWord() {
      if (this.sugWordShow) this.sugWord = []
    },
    // ^ --- 搜索关键字请求发送
    async getSearchList(val) {
      const data = {
        q: val
      }
      return await this.$store.dispatch('search/GET_SEARCH_RESULT_ACTION', data)
    }
  },
  async created() {
    await console.log(this.searchList)
  }
}
</script>

<style scoped lang="less">
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
  color: #3296fa;
}
</style>
