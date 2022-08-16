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
        >{{ openBtn ? '取消' : '编辑' }}</van-button
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
        :class="{ active: k.id === activeName }"
      >
        <van-icon
          name="close"
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
  name: 'MoreIconTags',
  props: ['activeName'],
  data() {
    return {
      show: true,
      openBtn: false
    }
  },
  // ^ --- 获取用户频道数据和所有频道数据
  computed: {
    userChannelTags() {
      return this.$store.state.channel.userChannel
    },
    allChannelTags() {
      return this.$store.state.channel.allChannel
    }
  },
  methods: {
    // ^ --- 封装重复代码函数
    async SameFn() {
      await this.$store.dispatch('channel/GET_ALL_CHANNEL_ACTION')
    },
    // ^ --- 退出频道筛选按钮
    outMaskCover() {
      this.$emit('outMaskCover', false)
    },
    // ^ --- 编辑删除频道按钮
    openCross() {
      this.openBtn = !this.openBtn
    },
    // ^ --- 删除频道按钮
    async modifiTag(id) {
      await this.$store.commit('channel/DELETE_CHANNEL', id)
      await this.SameFn()
    },
    // ^ --- 点击切换至主页按钮
    changeTags(id) {
      this.$emit('outMaskCover', false)
      this.$emit('changeTags', id)
    },
    // ^ --- 添加频道按钮
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
    top: -40px;
    right: -90px;
    font-size: 30px;
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
