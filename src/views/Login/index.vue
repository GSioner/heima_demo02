<template>
  <div class="main">
    <div class="topBar">
      <div class="box">登录</div>
    </div>

    <div class="login">
      <!-- 登录验证 -->
      <van-form validate-first @failed="onFailed" @submit="login">
        <!-- 手机号验证 -->
        <van-field
          v-model="userData.mobile"
          left-icon="icon"
          name="pattern"
          placeholder="请输入手机号"
          :rules="[{ pattern, message: '请输入正确内容' }]"
        >
          <van-icon
            name="mobilephone"
            clearable
            size="large"
            class="iconfont icon-shouji"
            class-prefix="icon"
            slot="left-icon"
          />
        </van-field>

        <!-- 短信验证码验证 -->
        <van-field
          v-model="userData.code"
          name="validator"
          placeholder="请输入验证码"
          left-icon="icon"
          :rules="[{ validator, message: '请输入正确内容' }]"
        >
          <van-icon
            name="code"
            clearable
            size="large"
            class="iconfont icon-yanzhengma"
            class-prefix="icon"
            slot="left-icon"
          />
          <!-- 验证码按钮 -->
          <template #right-icon>
            <van-button
              round
              block
              type="info"
              size="small"
              class="btn"
              native-type="submit"
              @click.prevent="putAuthCode"
              >获取验证码</van-button
            >
          </template>
        </van-field>
        <!-- 登录按钮 -->
        <div class="loginBtn">
          <van-button
            square
            block
            type="info"
            native-type="submit"
            color="#6db4fb"
            :disabled="show"
            >登录</van-button
          >
        </div>
      </van-form>

      <div><a href="javascript:void(0)" class="txt">隐私条款</a></div>
    </div>
  </div>
</template>

<script>
import { setToken } from '@/utils/Token.js'
import { Notify } from 'vant'
import { userLoginAPI } from '@/api'
export default {
  data() {
    return {
      userData: {
        mobile: '',
        code: ''
      },
      show: false,
      pattern: /^1[3-9][0-9]{9}$/
    }
  },
  methods: {
    async login() {
      try {
        const res = await userLoginAPI({ data: this.userData })
        setToken(res.data.data.token)
        Notify({ type: 'success', message: '登录成功！' })
        this.userData = {}
      } catch (err) {
        console.log(err)
        Notify({ type: 'danger', message: '登录失败!' })
      }
    },
    validator(val) {
      return +val === 246810
    },
    onFailed(errorInfo) {
      console.log('failed', errorInfo)
    },
    putAuthCode() {
      if (!this.pattern.test(this.userData.mobile)) return
      this.userData.code = 246810
    }
  }
}
</script>

<style scoped lang="less">
.topBar {
  background-color: #3296fa;
  width: 100%;
  height: 96px;
  font-size: 31px;

  .box {
    color: white;
    line-height: 96px;
    text-align: center;
  }
}
.icon-yanzhengma {
  line-height: 44px;
}
.iconfont,
.icon-shouji {
  margin-right: 20px;
  vertical-align: bottom;
}
.btn {
  background-color: #ededed;
  color: #9f9f9f;
  border: 1px solid #ededed;
  height: 46px;
}
.main {
  height: 100vh;
  background-color: #f5f7f9;
}
.loginBtn {
  margin: 0 auto;
  margin-top: 53px;
  width: 700px;
}
/deep/ .van-button--square {
  border-radius: 10px;
  width: 700px;
  border: 0;
}

.txt{
  position: absolute;
  top: 95%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #666666;
  font-size: 24px;
}
</style>
