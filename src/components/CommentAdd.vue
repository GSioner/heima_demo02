<template>
  <van-form>
    <van-popup
      v-model="popShow"
      position="bottom"
      :style="{ height: '30%' }"
      closeable
      round
      get-container="body"
    >
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="200"
        placeholder="请输入评论内容"
        show-word-limit
      />
      <van-button type="default" class="addComment" @click="addComment"
        >点击发送</van-button
      >
    </van-popup>
  </van-form>
</template>

<script>
export default {
  name: 'CommentAdd',
  props: ['show', 'comID', 'articleId'],
  data() {
    return {
      message: '',
      popShow: false
    }
  },
  created() {
    console.log(this.comID)
    console.log(this.articleId)
  },
  methods: {
    addComment() {
      this.$store.dispatch('comment/ADD_COMMENT', {
        content: this.message,
        target: this.comID,
        art_id: this.articleId
      })
      console.log(this.message)
    }
  },
  watch: {
    show: {
      handler(bool) {
        this.popShow = bool
      },
      deep: true,
      immediate: true
    },
    popShow: {
      handler(bool) {
        if (bool === false) {
          this.$emit('changeShow', bool)
        }
      },
      immediate: true
    }
  }
}
</script>

<style scoped lang="less">
.addComment {
  position: absolute;
  right: 10px;
  bottom: 10px;
  letter-spacing: 5px;
}
// ^ --- 评论添加模块
/deep/ .van-popup--bottom,
.van-popup--round {
  display: flex;
  align-items: center;
}
</style>
