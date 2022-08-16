<template>
  <div class="main">
    <!-- 顶部盒子 -->
    <div>
      <van-cell-group>
        <van-cell class="topBar">
          <span slot="title" class="topTitle">文章详情</span>
          <van-icon name="arrow-left" slot="icon" @click="backIcon" />
          <van-icon name="ellipsis" slot="right-icon" />
        </van-cell>
      </van-cell-group>
    </div>

    <!-- 文章详情内容区 -->
    <div class="container">
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
        />
        <div class="center">
          <p>{{ articleList.aut_name }}</p>
          <span>{{ $dayFrom(articleList.pubdate) }}</span>
        </div>
        <van-button
          round
          type="info"
          class="right"
          :disabled="articleList.is_followed"
          @click="changeFollowed"
          >{{ articleList.is_followed ? '已关注' : '+关注' }}</van-button
        >
      </div>
      <div class="content" v-html="articleList.content"></div>
    </div>

    <!-- 底部评论按钮 -->
    <van-tabbar class="tabBar">
      <van-tabbar-item class="comment">
        <van-button type="default" round>
          <span slot="default" class="commentBtn">写评论</span>
        </van-button>
      </van-tabbar-item>
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
        @click="collection = !collection"
      ></van-tabbar-item>
      <van-tabbar-item icon="share-o"></van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  props: ['articleId'],
  data() {
    return {
      collection: false
    }
  },
  computed: {
    articleList() {
      return this.$store.state.articleInfo.articleInfomation
    }
  },
  methods: {
    // ^ --- 回退按钮(<形状按钮)
    backIcon() {
      if (this.$route.query.backpage) {
        this.$router.push(this.$route.query.backpage)
      } else {
        this.$router.back()
      }
    },
    // ^ --- 切换关注
    changeFollowed() {
      if (!this.articleList.is_followed) {
        this.$store.dispatch('articleInfo/GET_FOLLOWING', { target: this.articleId })
      } else {
        this.$store.dispatch('articleInfo/DELETE_FOLLOWING', this.articleId)
      }
      console.log(this.articleList.is_followed)
    },
    // ^ --- 切换点赞
    changeGoodJob() {
      if (this.articleList.attitude < 1) {
        this.$store.dispatch('articleInfo/GET_LIKE', { target: this.articleId })
      } else {
        this.$store.dispatch('articleInfo/DELETE_LIKE', this.articleId)
      }
      console.log(this.articleList.attitude)
    }
  },
  //   ^ --- 发送获取文章详情请求
  async created() {
    try {
      await this.$store.dispatch(
        'articleInfo/GET_ARTICLE_INFO_ACTION',
        this.articleId
      )
    } catch (err) {
      this.$toast('数据获取失败')
    }
    console.log(this.articleList)
  }
}
</script>

<style scoped lang="less">
.main {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
// ^ --- 顶部蓝色盒子
.topBar {
  height: 100px;
  width: 100vw;
  background-color: #3296fa;
  font-size: 50px;
  color: white;
  justify-content: space-between;

  .topTitle {
    display: block;
    width: 100%;
    height: 100%;
    text-align: center;
    font-size: 36px;
    line-height: 60px;
  }
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

    .right {
      width: 170px;
      height: 60px;
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
</style>
