<template>
  <div class="main">
    <!-- 顶部盒子 -->
    <TopBar>
      <span slot="title">文章标题</span>
    </TopBar>

    <!-- 页面获取情况显示 -->
    <!-- 页面刷新中 -->
    <div v-if="loading" class="loading">
      <van-loading type="spinner" color="#1989fa" />
    </div>

    <!-- 页面错误404 -->
    <van-empty
      image="error"
      description="页面找不到或已被删除!"
      v-else-if="status === 404"
    />

    <!-- 网络错误请重试 -->
    <van-empty
      description="网络错误请重试"
      image="network"
      v-else-if="status !== 0 && status !== 404"
    >
      <van-button round type="danger" class="bottom-button" @click="getMsg"
        >点击重试</van-button
      >
    </van-empty>

    <!-- 文章详情内容区 -->
    <div class="container" v-else-if="articleList.title">
      <h1 class="title">{{ articleList.title }}</h1>
      <!-- 顶部用户头像名称 -->
      <div class="userInfo">
        <!-- 左侧头像+发布者名称+发布时间 -->
        <van-image
          width=".9333rem"
          height=".9333rem"
          :src="articleList.aut_photo"
          round
          class="left"
          @click="watchPic"
        />
        <div class="center">
          <p>{{ articleList.aut_name }}</p>
          <span>{{ $dayFrom(articleList.pubdate) }}</span>
        </div>
        <FollowBtn v-model="articleList.is_followed" :articleId="articleId" />
      </div>
      <!-- 文章内容 -->
      <div
        class="content markdown-body"
        ref="articleContent"
        v-html="articleList.content"
      ></div>
      <div class="footer">
        <hr />
        <span>正文结束</span>
      </div>

      <!-- 评论区 -->
      <div v-if="commendList.total_count">
        <ArticleComment
          :commendList="k"
          v-for="(k, i) in commendList.results"
          :key="i"
          :articleId="articleId"
        ></ArticleComment>
      </div>
      <!-- 评论展示完毕 -->
      <van-empty description="全部评论已展示完毕" v-else />
    </div>

    <!-- 底部评论按钮 -->
    <van-tabbar class="tabBar" v-if="goodJobRefresh">
      <van-tabbar-item class="comment">
        <van-button type="default" round @click="popShow = true">
          <span slot="default" class="commentBtn">写评论</span>
        </van-button>
      </van-tabbar-item>

      <!-- 评论发送模块 -->
      <CommentAdd
        v-if="articleList"
        :show="popShow"
        @changeShow="changeShow"
        :articleId="''"
        :comID="articleId"
      ></CommentAdd>
      <!-- /评论发送模块 -->

      <van-tabbar-item
        icon="good-job-o"
        :class="{ red: articleList.attitude !== -1 }"
        @click="changeGoodJob"
      ></van-tabbar-item>
      <van-tabbar-item
        icon="comment-o"
        :badge="articleList.comm_count"
      ></van-tabbar-item>
      <van-tabbar-item
        icon="star-o"
        :class="{ red: collection }"
        @click="changeCollection"
      ></van-tabbar-item>
      <van-tabbar-item icon="share-o"></van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import FollowBtn from '@/components/FollowBtn.vue'
import CommentAdd from '@/components/CommentAdd.vue'
import { ImagePreview } from 'vant'
import { getCommentAPI } from '@/api'
import TopBar from '@/components/TopBar.vue'
import ArticleComment from '@/components/ArticleComment.vue'
export default {
  name: 'Comment',
  props: ['articleId'],
  components: {
    TopBar,
    ArticleComment,
    CommentAdd,
    FollowBtn
  },
  data() {
    return {
      collection: false,
      commendList: [],
      customComment: [],
      popShow: false,
      loading: true,
      status: 0,
      goodJobRefresh: true
    }
  },
  computed: {
    articleList() {
      if (!this.$store.state.articleInfo.articleInfomation) return
      return this.$store.state.articleInfo.articleInfomation
    }
  },
  methods: {
    // ^ --- 切换点赞
    async changeGoodJob() {
      this.articleList.attitude !== 1
        ? this.$toast('点赞成功!')
        : this.$toast('取消点赞')
      try {
        if (this.articleList.attitude !== 1) {
          this.$store.dispatch('articleInfo/GET_LIKE', {
            target: this.articleId
          })
          this.articleList.attitude = 1
        } else {
          this.$store.dispatch('articleInfo/DELETE_LIKE', this.articleId)
          this.articleList.attitude = -1
        }
      } catch (err) {
        if (err.response.status === 401) {
          this.$toast('请先登录!')
        }
      }
    },
    // ^ --- 切换收藏
    changeCollection() {
      this.collection = !this.collection
      this.collection ? this.$toast('已收藏') : this.$toast('取消收藏')
    },
    // ^ --- 获取评论数据
    async getCommend() {
      try {
        const res = await getCommentAPI({
          type: 'a',
          source: this.articleId,
          offset: '',
          limit: ''
        })
        this.commendList = res.data.data
      } catch (err) {
        console.log(err)
        this.$toast('数据请求失败')
      }
    },
    watchPic() {
      ImagePreview([this.articleList.aut_photo])
    },
    changeShow(bool) {
      this.popShow = bool
    },
    // ^ --- 验证文章数据
    async getMsg() {
      try {
        await this.$store.dispatch(
          'articleInfo/GET_ARTICLE_INFO_ACTION',
          this.articleId
        )
        await this.getCommend()
      } catch (err) {
        if (err.response.status === 404) {
          this.status = 404
        } else {
          this.status = err.response.status
        }
        this.$toast('数据获取失败')
      } finally {
        this.loading = false
      }
    },
    viewImg() {
      const content = this.$refs.articleContent
      const imgs = content.querySelectorAll('img')
      const images = []
      imgs.forEach((item, i) => {
        images.push(item.src)
        item.onclick = () => {
          ImagePreview({
            images: images,
            startPosition: i
          })
        }
      })
    }
  },
  //   ^ --- 发送获取文章详情请求
  async created() {
    await this.getMsg()
    setTimeout(() => {
      this.viewImg()
    }, 0)
    console.log(this.articleList)
  },
  watch: {
    articleList: {
      handler() {},
      deep: true,
      immediate: true
    }
  }
}
</script>

<style scoped lang="less">
.main {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

// ^ --- 内容区块
.container {
  position: fixed;
  top: 100px;
  left: 50px;
  right: 0;
  bottom: 85px;
  width: 87vw;
  height: 86vh;
  box-sizing: border-box;
  overflow-y: auto;

  .content {
    height: 63vh;
    width: 87vw;
    font-size: 30px;
    padding-bottom: 50px;
    display: inline-block;
  }

  .title {
    margin-top: 48px;
    font-size: 40px;
    font-weight: 900;
    margin-bottom: 60px;
  }

  // ^ --- 发布者信息
  .userInfo {
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 50px;

    .center {
      flex: 1;
      font-size: 24px;
      margin-left: 20px;
      letter-spacing: 4px;

      span {
        font-size: 20px;
        color: #b7b7b7;
      }
    }
  }

  // ^ --- 底部-正文结束-内容
  .footer {
    margin-top: 50px;
    font-size: 30px;
    color: #a7a7a7;
    position: relative;
    margin-bottom: 200px;

    span {
      display: inline-block;
      position: absolute;
      padding: 10px;
      top: -32px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #fff;
    }
  }
}

// ^ --- 底部按钮
.tabBar {
  border-top: 1px solid #e5e5e5;
  height: 85px;

  .comment {
    flex-basis: 280px;

    .commentBtn {
      font-size: 28px;
      color: #a7a7a7;
      text-align: left;
      width: 100%;
      float: left;
      padding-left: 20px;
      line-height: 25px;
      position: relative;
    }

    /deep/ .van-cell {
      margin-top: 150px;
    }
  }
}

// ^ --- 定制样式
// * --- 底部按钮图标
/deep/ .van-tabbar-item__icon .van-icon {
  line-height: 50px;
  font-size: 50px;
}
/deep/ .van-button--normal {
  width: 285px;
  height: 50px;
}
/deep/ .van-button__content,
.van-button__text,
.van-tabbar-item__icon {
  width: 100%;
}

.red {
  color: red;
}

/deep/ .cnblogs_code,
pre {
  display: inline-block;
  width: 100%;
  overflow: auto;
}

/deep/ .bottom-button {
  width: 200px;
  height: 40px;
}

.loading {
  position: fixed;
  width: 100px;
  height: 100px;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
</style>
