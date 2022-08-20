<template>
  <div>
    <van-cell
      title="昵称"
      is-link
      class="cellContent nicknameCell"
      @click="ncikNameShow = true"
    >
      <span slot="default" class="nickname">{{ userInfo.name }}</span>
      <van-popup
        v-model="ncikNameShow"
        position="right"
        :style="{ height: '100%', width: '100%' }"
        get-container="body"
      >
        <!-- ↓顶部通道↓ -->
        <van-nav-bar
          title="编辑昵称"
          right-text="提交"
          left-arrow
          @click-left="backIcon"
          @click-right="onSave"
          class="topbar"
        />
        <!-- ↑顶部通道↑ -->
        <van-field
          v-model="value"
          placeholder="请输入昵称"
          maxlength="20"
          show-word-limit
        />
      </van-popup>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    userInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      ncikNameShow: false,
      value: ''
    }
  },
  methods: {
    backIcon() {
      this.ncikNameShow = false
      this.value = ''
    },
    onSave() {
      this.$toast.success('昵称修改成功')
      this.$emit('changeNickname', this.value)
      this.ncikNameShow = false
    }
  }
}
</script>
<style scoped lang="less">
// ^ --- 顶部盒子
.topbar {
  /deep/ .van-nav-bar__text {
    color: #f86565;
    font-size: 32px;
  }
}

// ^ --- 定制样式
.cellContent {
  height: 100px;
  font-size: 30px;
  margin-top: -1px;
}

/deep/ .topBar {
  background-color: #fff;
  color: black;
}

/deep/ .van-field__control{
  background-color: #f7f8fa;
  height: 80px;
  text-indent: 2em;
  border-radius: 10px;
}
</style>
