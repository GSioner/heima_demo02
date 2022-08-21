<template>
  <van-button
    round
    type="info"
    class="yes"
    @click="changeFollowed"
    v-if="isFollowed"
    >已关注
  </van-button>
  <van-button round type="info" class="no" @click="changeFollowed" v-else
    >＋关注
  </van-button>
</template>

<script>
export default {
  model: {
    prop: 'isFollowed',
    event: 'changeFollowed'
  },
  props: {
    isFollowed: {
      type: Boolean
    },
    articleId: {
      type: [Number, String, Object]
    }
  },
  methods: {
    // ^ --- 切换关注
    changeFollowed() {
      if (!this.isFollowed) {
        this.$store.dispatch('articleInfo/GET_FOLLOWING', {
          target: this.articleId
        })
      } else {
        this.$store.dispatch('articleInfo/DELETE_FOLLOWING', this.articleId)
      }
      !this.isFollowed ? this.$toast('已关注') : this.$toast('取关成功')
      this.$emit('changeFollowed', !this.isFollowed)
    }
  }
}
</script>

<style scoped lang="less">
.yes, .no{
    width: 170px !important;
    height: 60px !important;
}

.no {
    background-color: #e2e2e29d;
    border: 0;
    color: #82c0ff;
}
</style>
