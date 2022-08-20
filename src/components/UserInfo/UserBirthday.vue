<template>
  <div>
    <van-cell title="生日" is-link class="cellContent" @click="show = true">
      <span class="blue" slot="default">{{
        userInfo.birthday ? '' : '待完善'
      }}</span>
      <van-popup
        v-model="show"
        position="bottom"
        :style="{ height: '50%' }"
        get-container="body"
      >
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          title="选择生日"
          :min-date="minDate"
          :max-date="maxDate"
          @cancel="show = false"
          @confirm="onConfirm"
        />
      </van-popup>
    </van-cell>
  </div>
</template>

<script>
import dayjs from 'dayjs'
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
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2022, 8, 23),
      currentDate: new Date(this.userInfo.birthday)
    }
  },
  methods: {
    onConfirm(value) {
      const time = dayjs(value).format('YYYY-MM-DD')
      this.show = false
      this.$emit('changeBirthday', time)
      this.$toast.success('已成功修改生日')
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

.blue {
  color: #3296fa;
}
</style>
