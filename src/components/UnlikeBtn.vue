<template>
  <div>
    <van-icon name="cross" @click="dislick" />
    <van-action-sheet
      v-model="show"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
      get-container="body"
      @cancel="onCancel"
    />
  </div>
</template>

<script>
import { SecondList, FirstList } from '@/assets/FeedBack.js'
export default {
  data() {
    return {
      show: false,
      actions: FirstList || SecondList
    }
  },
  methods: {
    onCancel() {
      this.$toast('已取消操作')
    },
    dislick() {
      this.show = true
    }
  }
}
</script>

<style scoped></style>
