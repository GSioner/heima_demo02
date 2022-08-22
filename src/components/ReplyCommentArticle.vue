<template>
  <div class="comment">
    <!-- 👇↓左侧评论者头像↓ -->
    <div class="left">
      <van-image
        round
        width="1rem"
        height="1rem"
        :src="commendList.aut_photo"
        @click="watchPic"
      />
    </div>
    <!-- 👆↑左侧评论者头像↑ -->

    <!-- ↓右侧详细信息↓👇 -->
    <div class="right">
      <!-- ↓顶部评论者名称 + 点赞模块↓ -->
      <van-cell :border="false" class="aut">
        <span slot="title" class="autTitle">{{ commendList.aut_name }}</span>
        <div slot="default" class="likeIcon">
          <van-icon
            name="good-job-o"
            class="goodJob"
            @click="getCommentLike"
            :class="{ red: commendList.is_liking }"
          />
          <span>{{ commendList.like_count }}</span>
        </div>
      </van-cell>
      <!-- ↑顶部评论者名称 + 点赞模块↑ -->

      <!-- ↓发布时间 + 回复模块↓ -->
      <van-cell :border="false">
        <span>{{ commendList.content }}</span>
        <div class="timeAndComment">
          <span class="time">{{ time + ' ·' }}</span>
          <van-button type="default" class="btn" @click="toComment">{{
            commendList.reply_count + '回复'
          }}</van-button>
        </div>
        <CommentAdd
          :show="popShow"
          @changeShow="changeShow"
          :comID="commendList.com_id"
          :articleId="articleId"
        ></CommentAdd>
      </van-cell>
      <!-- ↑发布时间 + 回复模块↑ -->
    </div>
    <!-- ↑右侧详细信息↑👆 -->
  </div>
</template>

<script>
import CommentAdd from '@/components/CommentAdd.vue'
import { getCommentAPI } from '@/api'
import { ImagePreview } from 'vant'
import dayjs from 'dayjs'
export default {
  name: 'ReplyCommentArticle',
  props: ['commendList', 'articleId'],
  components: {
    CommentAdd
  },
  data() {
    return {
      txt: '',
      message: false,
      popShow: false,
      newComentList: []
    }
  },
  watch: {
    commendList: {
      handler() {},
      deep: true,
      immediate: true
    }
  },
  computed: {
    time() {
      return dayjs(this.commendList.pubdate).format('MM-DD HH:mm')
    },
    articleList() {
      if (!this.$store.state.articleInfo.articleInfomation) return
      return this.$store.state.articleInfo.articleInfomation
    }
  },
  methods: {
    // ^ --- 点赞
    async getCommentLike() {
      try {
        if (!this.commendList.is_liking) {
          await this.$store.dispatch('comment/GET_COMMENT_LIKE', {
            target: this.commendList.com_id
          })
        } else {
          await this.$store.dispatch(
            'comment/GET_COMMENT_DISLIKE',
            this.commendList.com_id
          )
        }
      } catch (err) {
        if (err.response.status === 401) {
          this.$router.push('/login')
          return this.$toast('请先登录!')
        }
        this.$toast('点赞失败，请稍后再试')
      }
    },
    toComment() {
      this.popShow = true
    },
    watchPic() {
      ImagePreview([this.commendList.aut_photo])
    },
    changeShow(bool) {
      this.popShow = bool
    }
  },
  async created() {
    const res = await getCommentAPI({
      type: 'c',
      source: this.commendList.com_id
    })
    this.newComentList = res.data.data
  }
}
</script>

<style scoped lang="less">
.comment {
  display: flex;
  width: 100%;
  height: 100%;

  // ^ --- 左侧评论者头像
  .left {
    padding-top: 30px;
  }

  // ^ --- 右侧评论者评论详细信息
  .right {
    flex: 1;

    // ^ --- 顶部评论者名称 + 点赞
    .aut {
      padding-bottom: 0;
      font-size: 30px;

      .goodJob {
        font-size: 40px;
        margin-right: 5px;
      }

      .autTitle {
        color: #6985ae;
      }

      .likeIcon {
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
    }

    // ^ --- 评论发布时间 + 回复
    .timeAndComment {
      height: 100%;
      width: 100%;
      display: flex;
      margin-top: 20px;

      .time {
        color: black;
        line-height: 50px;
      }

      .btn {
        white-space: nowrap;
        width: 135px;
        height: 50px;
        font-size: 22px;
        border-radius: 25px;
        background-color: #f4f5f6;
        border: 0;
        padding: 0 30px;
        margin-left: 40px;
      }
    }
  }
}

// ^ --- 定制样式
.red {
  color: #c83434;
}
</style>
