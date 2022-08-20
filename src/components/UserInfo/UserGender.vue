<template>
  <div>
    <van-cell title="性别" is-link class="cellContent" @click="show = true">
      <span slot="default">{{ userInfo.gender === 0 ? '男' : '女' }}</span>
      <van-action-sheet
        v-model="show"
        :actions="actions"
        @select="onSelect"
        close-on-click-action
        get-container="body"
      />
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
      show: false,
      actions: [
        { value: 0, name: '男' },
        { value: 1, name: '女' }
      ]
    }
  },
  methods: {
    onSelect(item) {
      this.show = false
      this.$emit('changeGender', item.value)
      this.$toast.success('已成功修改性别')
    }
  }
}
</script>
<style scoped lang="less">
.cellContent {
  height: 100px;
  font-size: 30px;
  margin-top: -1px;
}
</style>
