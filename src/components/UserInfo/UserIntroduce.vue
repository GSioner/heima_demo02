<template>
  <div>
    <van-cell
      title="个人简介"
      is-link
      class="cellContent"
      @click="introduceShow = true"
    >
      <span class="blue" slot="default">{{
        userInfo.intro ? '' : '待输入'
      }}</span>
      <van-popup
        v-model="introduceShow"
        position="right"
        :style="{ height: '100%', width: '100%' }"
        get-container="body"
      >
        <!-- ↓顶部通道↓ -->
        <van-nav-bar
          title="编辑简介"
          right-text="提交"
          left-arrow
          @click-left="backIcon"
          @click-right="onSave"
          class="topbar"
        />
        <!-- ↑顶部通道↑ -->
        <van-field
          v-model="value"
          placeholder="请填入简介"
          maxlength="100"
          show-word-limit
          rows="5"
          type="textarea"
          autosize
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
      introduceShow: false,
      value: ''
    }
  },
  methods: {
    backIcon() {
      this.introduceShow = false
      this.value = ''
    },
    onSave() {
      this.$toast.success('修改成功')
      this.$emit('changeIntroduce', this.value)
      this.introduceShow = false
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

.cellContent {
  height: 100px;
  font-size: 30px;
  margin-top: -1px;
}

.blue {
  color: #3296fa;
}

/deep/ .topBar {
  background-color: #fff;
  color: black;
}

/deep/ .van-field__control {
  background-color: #f7f8fa;
  height: 180px;
  border-radius: 10px;
  text-indent: 1rem;
}
</style>
