<template>
  <div class="main">
    <!-- ↓展示评论↓ -->
    <div class="box">
      <ReplyCommentArticle
        v-for="(k, i) in replyCommentList.results"
        :key="i"
        :articleId="articleId"
        :commendList="k"
      ></ReplyCommentArticle>
    </div>
    <!-- ↑展示评论↑ -->

    <!-- ↓展示添加评论↓ -->
    <div class="addComment">
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="200"
        placeholder="请输入评论内容"
        show-word-limit
      />
      <van-button type="default" class="addCommentBtn" @click="addComment"
        >点击发送</van-button
      >
    </div>
    <!-- ↑展示添加评论↑ -->
  </div>
</template>

<script>
import { getCommentAPI } from '@/api'
import ReplyCommentArticle from '@/components/ReplyCommentArticle.vue'
export default {
  name: 'ReplyComment',
  props: ['commentList', 'articleId'],
  components: {
    ReplyCommentArticle
  },
  data() {
    return {
      message: '',
      replyCommentList: []
    }
  },
  methods: {
    addComment() {
      this.$store.dispatch('comment/ADD_COMMENT', {
        content: this.message,
        target: this.commentList.com_id,
        art_id: this.articleId
      })
    }
  },
  async created() {
    const res = await getCommentAPI({
      type: 'c',
      source: this.commentList.com_id
    })
    this.replyCommentList = res.data.data
    console.log('replyCommentList: ', this.replyCommentList.results)
  }
}
</script>

<style scoped lang="less">
.main {
  position: relative;
  padding-top: 50px;
  display: flex;
  flex-direction: column;
}
.addComment {
  position: absolute;
  height: 150px;
  width: 100%;
  bottom: -190px;
  left: 0;
  display: flex;

  .addCommentBtn {
    height: 100%;
  }
}

.box{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
</style>
