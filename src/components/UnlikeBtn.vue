<template>
  <div>
    <van-icon name="cross" @click="dislike" />
    <van-action-sheet
      v-model="show"
      :actions="actions"
      :cancel-text="cancel"
      close-on-click-action
      get-container="body"
      @cancel="onCancel"
      class="btn"
      @select="clickBtn"
    />
    <van-dialog
      get-container="body"
      v-model="dialogShow"
      title="标题"
      show-cancel-button
      @cancel="dialogCancel"
      @confirm="onConfirm"
    >
      <van-field
        v-model="report"
        rows="2"
        clearable
        placeholder="请输入反馈内容"
        show-word-limit
        maxlength="50"
      />
    </van-dialog>
  </div>
</template>

<script>
import { feedBackAPI, reportArticleAPI } from '@/api'
import { SecondList, FirstList } from '@/assets/FeedBack.js'
export default {
  name: 'DislikeButton-Model',
  props: ['id'],
  data() {
    return {
      show: false,
      actions: FirstList,
      cancel: '取消',
      report: '',
      dialogShow: false
    }
  },
  methods: {
    async sameFn(val) {
      try {
        await reportArticleAPI({
          target: this.id,
          type: val,
          remark: this.report
        })
        return this.$toast.success('反馈成功！')
      } catch (err) {
        if (err.response.status === 401) this.$notify.warning('请先登录')
      }
    },
    onCancel() {
      if (this.actions === SecondList) {
        this.show = true
        this.cancel = '取消'
        return (this.actions = FirstList)
      }
      this.$toast('已取消操作')
    },
    dislike() {
      this.show = true
      this.actions = FirstList
      this.cancel = '取消'
    },
    async clickBtn(e) {
      console.log(e)
      // ^ --- 不感兴趣按钮反馈
      if (e.name === '不感兴趣') {
        try {
          await feedBackAPI({ target: this.id })
          return this.$toast.success('反馈成功！')
        } catch (err) {
          if (err.response.status === 401) this.$notify.warning('请先登录')
        }
      }
      // ^ --- 垃圾内容反馈
      if (e.name === '反馈垃圾内容') {
        this.actions = SecondList
        this.cancel = '返回'
        return (this.show = true)
      }
      if (e.value > 1) {
        this.sameFn(e.value)
      }
      // ^ --- 其他问题反馈
      if (e.value === 0) {
        this.dialogShow = true
      }
    },
    dialogCancel() {
      this.$toast('已取消操作')
    },
    async onConfirm() {
      this.sameFn(0)
    }
  }
}
</script>

<style scoped lang="less">
// ^ --- 提升按钮定位优先级至最高（防止频道导航栏右侧More按钮优先级过高）
.btn {
  z-index: 9999;
}
</style>
