<template>
  <div class="main">
    <van-form>
      <!-- ↓顶部通道↓ -->
      <van-nav-bar
        title="个人信息"
        right-text="保存"
        left-arrow
        @click-left="backIcon"
        @click-right="onSubmit"
        class="topbar"
      />
      <!-- ↑顶部通道↑ -->

      <!-- ↓编辑资料区域↓ -->
      <div class="editModel">
        <van-cell-group class="top">
          <!-- 头像 -->
          <edit-user-img :userInfo="userInfo" @changeImg="photo = $event" />
          <!-- 昵称 -->
          <user-nickname
            :userInfo="userInfo"
            @changeNickname="userInfo.name = $event"
          />
          <!-- 介绍 -->
          <user-introduce
            :userInfo="userInfo"
            @changeIntroduce="userInfo.intro = $event"
          />
        </van-cell-group>

        <van-cell-group class="bottom">
          <!-- 性别 -->
          <user-gender
            :userInfo="userInfo"
            @changeGender="userInfo.gender = $event"
          />
          <!-- 生日 -->
          <user-birthday
            :userInfo="userInfo"
            @changeBirthday="userInfo.birthday = $event"
          />
        </van-cell-group>
      </div>
      <!-- ↑编辑资料区域↑ -->
    </van-form>
  </div>
</template>

<script>
import UserBirthday from '@/components/UserInfo/UserBirthday.vue'
import UserGender from '@/components/UserInfo/UserGender.vue'
import EditUserImg from '@/components/UserInfo/EditUserImg.vue'
import UserIntroduce from '@/components/UserInfo/UserIntroduce.vue'
import UserNickname from '@/components/UserInfo/UserNickname.vue'
import { getToken, setToken } from '@/utils/Token'
export default {
  name: 'EditInfomation',
  components: {
    UserBirthday,
    UserGender,
    EditUserImg,
    UserIntroduce,
    UserNickname
  },
  data() {
    return {
      userInfo: getToken('userInfo'),
      photo: ''
    }
  },
  methods: {
    async onSubmit() {
      this.userInfo.photo = this.photo
      const data = {
        name: this.userInfo.name,
        gender: this.userInfo.gender,
        birthday: this.userInfo.birthday,
        intro: this.userInfo.intro
      }
      await this.$store.dispatch('editMessage/UPDATE_USER_IMG', this.photo)
      await this.$store.dispatch('editMessage/UPDATE_USER_INFO', { ...data })
      await this.$store.dispatch('editMessage/GET_USER_INFOMATION_ACTION')
      setToken('userInfo', this.userInfo)
      this.$toast.success('修改成功')
    },
    backIcon() {
      if (this.$route.query.backpage) {
        this.$router.push(this.$route.query.backpage)
      } else {
        this.$router.back()
      }
    }
  },
  async created() {
    await this.$store.dispatch('editMessage/GET_USER_INFOMATION_ACTION')
    console.log('userInfo', this.userInfo)
  }
}
</script>

<style scoped lang="less">
.main {
  background-color: #f5f7f9;
  width: 100vw;
  height: 100vh;
}

// ^ --- 顶部蓝色盒子
.topbar {
  background-color: #3296fa;

  /deep/ .van-nav-bar__title {
    color: white;
  }

  /deep/ .van-nav-bar__text {
    color: white;
    font-size: 32px;
  }

  /deep/ .van-icon,
  .van-icon-arrow-left,
  .van-nav-bar__arrow {
    color: white;
  }
}

// ^ --- 编辑区域
.editModel {
  .bottom {
    margin-top: 15px;
  }
}
</style>
