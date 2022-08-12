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
          name="pattern"
          placeholder="请输入手机号"
          type="number"
          maxlength="11"
          :rules="inputFormat.phone"
        >
          <van-icon
            class="iconfont icon-shouji"
            slot="left-icon"
            size="0.5333rem"
          />
        </van-field>

        <!-- 短信验证码验证 -->
        <van-field
          v-model="userData.code"
          name="authCode"
          placeholder="请输入验证码"
          type="number"
          maxlength="6"
          :rules="inputFormat.authCode"
        >
          <van-icon
            class="iconfont icon-yanzhengma"
            slot="left-icon"
            size="0.5333rem"
          />
          <!-- 验证码按钮 -->
          <van-button
            slot="right-icon"
            round
            block
            type="info"
            size="small"
            class="btn"
            native-type="submit"
            @click.prevent="putAuthCode"
            >
            <span v-if="countDown">获取验证码</span>
            <van-count-down :time="1000*5" format="ss s" v-else @finish="finish" :style="{color: '#9f9f9f'}"/>
            </van-button
          >
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

      <!-- 底部数据栏 -->
      <div><a href="javascript:void(0)" class="txt">隐私条款</a></div>
    </div>
  </div>
</template>

<script>
import { setToken } from '@/utils/Token.js'
import { userLoginAPI } from '@/api'
export default {
  // (// ^ ---) 此为插件---切换不同注释颜色---插件名：Colorful Comments
  name: 'LoginModel',
  data() {
    return {
      userData: {
        mobile: '',
        code: ''
      },
      inputFormat: {
        phone: [
          {
            required: true,
            message: '手机号不能为空!'
          },
          {
            pattern: /^1[3-9][0-9]{9}$/,
            message: '手机号格式错误!'
          }
        ],
        authCode: [
          {
            required: true,
            message: '验证码不能为空!'
          },
          {
            pattern: /^[0-9]{6}$/,
            message: '验证码格式错误!'
          }
        ]
      },
      show: false,
      countDown: true
    }
  },
  methods: {
    // ^ --- 验证个人信息是否可用
    async login() {
      // ^ --- 给予用户操作反馈
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true
      })
      try {
        // ^ --- 提取数据
        const res = await userLoginAPI({ data: this.userData })
        // ^ --- 存储Token密钥至本地
        setToken('heima_Token', res.data.data.token)
        // ^ --- 登录成功提示出现后延迟跳转其他页面（目前暂时跳转个人中心）
        const time = setTimeout(() => {
          this.$toast.success('登录成功！')
          // ^ --- 清空输入框
          this.userData = {}
          this.$router.push('/home/personelcenter')
          clearTimeout(time)
        }, 1000)
      } catch (err) {
        // ^ --- 验证错误信息类型
        if (err.response && err.response.status === 400) {
          return this.$toast.fail('手机号或验证码错误!')
        }
        this.$toast.fail('登录失败，请稍后重试！')
      }
    },
    onFailed(errorInfo) {
      console.log('failed', errorInfo)
    },

    // ^ --- 验证验证码正确性并填充验证码输入框
    putAuthCode() {
      if (!/^1[3-9][0-9]{9}$/.test(this.userData.mobile)) {
        return this.$toast.fail('请输入手机号!')
      }
      this.$toast.success('验证码已发送!')
      this.countDown = false
    },
    finish() {
      this.$toast.success('验证码已收到!')
      this.countDown = true
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
.icon-yanzhengma,
.icon-shouji {
  margin-right: 20px;
  vertical-align: bottom;
}
.icon-shouji::before,
.icon-yanzhengma::before {
  width: 35px;
  height: 35px;
  background-size: cover;
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

.txt {
  position: absolute;
  top: 95%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #666666;
  font-size: 25px;
}
</style>
