<template>
  <div class="main">
    <!-- 关闭按钮 -->
    <p class="closeIcon" @click="outMaskCover">
      <van-icon name="cross" size="25px" />
    </p>
    <!-- 我的频道栏 -->
    <van-cell title="我的频道" class="fontSize" :border="false">
      <van-button
        plain
        type="info"
        slot="right-icon"
        round
        class="customBtn"
        color="#f85959"
        @click="openCross"
        >{{openBtn ? '取消' : '编辑'}}</van-button
      >
    </van-cell>
    <!-- 我的频道区块Tags -->
    <van-grid :gutter="10" :column-num="4" :border="false">
      <van-grid-item
        v-for="k in userChannelTags"
        :key="k.id"
        :text="k.name"
        class="relative"
        @click="changeTags(k.id)"
      >
        <van-icon
          name="cross"
          slot="icon"
          class="deleteIcon"
          @click="modifiTag(k.id)"
          v-show="openBtn"
        />
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐栏 -->
    <van-cell title="频道推荐" class="fontSize" :border="false" />
    <!-- 频道推荐栏区块Tags -->
    <van-grid :gutter="10" :column-num="4" :border="false">
      <van-grid-item
        v-for="k in allChannelTags"
        :key="k.id"
        :text="k.name"
        @click="addChannel(k.id)"
      />
    </van-grid>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
      openBtn: false
    }
  },
  computed: {
    userChannelTags() {
      return this.$store.state.channel.userChannel
    },
    allChannelTags() {
      return this.$store.state.channel.allChannel
    }
  },
  methods: {
    async SameFn() {
      await this.$store.dispatch('channel/GET_ALL_CHANNEL_ACTION')
    },
    outMaskCover() {
      this.$emit('outMaskCover', false)
    },
    openCross() {
      this.openBtn = !this.openBtn
    },
    async modifiTag(id) {
      await this.$store.commit('channel/DELETE_CHANNEL', id)
      await this.SameFn()
    },
    changeTags(id) {
      this.$emit('outMaskCover', false)
      this.$emit('changeTags', id)
    },
    async addChannel(id) {
      if (this.openBtn === false) return
      await this.$store.commit('channel/ADD_NEW_USER_CHANNEL', id)
      await this.SameFn()
    }
  },
  async created() {
    await this.SameFn()
  }
}
</script>

<style scoped lang="less">
.main {
  display: block;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
}

// ^ --- 关闭按钮
.closeIcon {
  height: 40px;
  width: 100vw;
  padding: 30px;
  padding-right: 0;
}

// ^ --- 我的频道栏
.customBtn {
  width: 110px;
  height: 50px;
}

// ^ --- 频道Tag删除图标
.relative {
  position: relative;

  .deleteIcon {
    position: absolute;
    top: -20px;
    right: -70px;
    font-size: 10px;
  }
}

// ^ --- 定制样式
// * --- 我的频道栏 --- 编辑按钮
/deep/ .van-button--normal {
  padding: 0;
}

.fontSize {
  font-size: 32px;
}

// * --- Tags背景颜色
/deep/ .van-grid-item__content--center {
  background-color: #f4f5f6;
}
</style>
