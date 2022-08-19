<template>
  <div class="main">
    <van-form>
      <!-- ↓顶部通道↓ -->
      <TopBar>
        <template #title>
          <span slot="title" class="txt">个人信息</span>
        </template>
        <template #right-icon>
          <span slot="right" class="txt" @click="onSubmit">保存</span>
        </template>
      </TopBar>
      <!-- ↑顶部通道↑ -->

      <!-- ↓编辑资料区域↓ -->
      <div class="editModel">
        <van-cell-group class="top">
          <van-cell title="头像" is-link class="cellContent">
            <van-image
              slot="default"
              round
              width=".8rem"
              height=".8rem"
              :src="userImg"
            />
          </van-cell>
          <van-cell title="昵称" is-link class="cellContent">
            <span slot="default" class="nickname">{{ name }}</span>
            <van-popup v-model="ncikNameShow" position="top" :style="{ width: '100%' }" get-container="body" />
          </van-cell>
          <van-cell title="介绍" is-link class="cellContent" />
        </van-cell-group>
        <van-cell-group class="bottom">
          <van-cell title="性别" is-link class="cellContent">
            <span slot="default">{{ gender }}</span>
          </van-cell>
          <van-cell title="生日" is-link class="cellContent">
            <span class="blue" slot="default">待完善</span>
          </van-cell>
        </van-cell-group>
      </div>
      <!-- ↑编辑资料区域↑ -->
    </van-form>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar.vue'
import { getToken } from '@/utils/Token'
export default {
  name: 'EditInfomation',
  components: {
    TopBar
  },
  data() {
    return {
      userInfo: getToken('userInfo'),
      gender: this.userInfo === 0 ? '男' : '女',
      name: this.userInfo.name,
      userImg: this.userInfo.photo,
      userMsg: this.userInfo.intro ? this.userInfo.intro : '待输入',
      userBirthday: this.userInfo.birthday,
      ncikNameShow: false
    }
  },
  methods: {
    onSubmit() {
      console.log('数据提交')
    }
  },
  async created() {
    await this.$store.dispatch('editMessage/GET_USER_INFOMATION_ACTION')
  }
}
</script>

<style scoped lang="less">
.main {
  background-color: #f5f7f9;
  width: 100vw;
  height: 100vh;
}
// ^ --- 顶部默认组件
.txt {
  display: block;
  text-align: right;
  font-size: 36px;
  line-height: 60px;
  color: white;
}

// ^ --- 编辑区域
.editModel {
  .bottom {
    margin-top: 15px;
  }

  .cellContent {
    height: 100px;
    font-size: 30px;
    margin-top: -1px;
  }
}

// ^ --- 定制样式区
.blue {
  color: #3296fa;
}
</style>
