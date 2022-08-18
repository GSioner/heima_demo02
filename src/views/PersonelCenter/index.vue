<template>
  <div class="main" @load="checkToken">
    <!-- 顶部背景盒子/个人信息栏 -->
    <div class="topBar" v-if="show">
      <!-- 上层个人资料栏 -->
      <div class="userPhoto">
        <!-- 左侧用户头像名称 -->
        <div class="left">
          <van-image
            class="user_pic"
            round
            width="1.8rem"
            height="1.8rem"
            :src="userInfo.photo"
            ><template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
            <template v-slot:error>加载失败</template>
          </van-image>
          <div class="username">{{ userInfo.name }}</div>
        </div>
        <!-- 右侧编辑资料按钮 -->
        <div class="right">
          <van-button type="default" class="userBtn" round>编辑资料</van-button>
        </div>
      </div>

      <!-- 下层用户数据栏 -->
      <div class="userData">
        <p class="tag">
          <span>{{ userInfo.art_count }}</span>
          <span>头条</span>
        </p>
        <p class="tag">
          <span>{{ userInfo.follow_count }}</span>
          <span>关注</span>
        </p>
        <p class="tag">
          <span>{{ userInfo.fans_count }}</span>
          <span>粉丝</span>
        </p>
        <p class="tag">
          <span>{{ userInfo.like_count }}</span>
          <span>获赞</span>
        </p>
      </div>
    </div>
    <div class="topBarNotAllow" v-else>
      <div class="userImg">
        <van-icon
          class-prefix="iconfont icon-phone"
          name="extra"
          class="picture"
        />
      </div>
      <p @click="$router.push('/login')" class="loginBtn">登录 / 注册</p>
    </div>

    <!-- 收藏/历史栏 -->
    <van-grid column-num="2" class="collection" clickable>
      <van-grid-item class="tags">
        <van-icon name="star-o" color="#ef7a7b" size=".6667rem" />
        <span>收藏</span>
      </van-grid-item>
      <van-grid-item class="tags">
        <van-icon name="clock-o" color="#ffb75c" size=".6667rem" />
        <span>历史</span>
      </van-grid-item>
    </van-grid>

    <!-- 消息通知/小智同学 -->
    <div class="msgURL">
      <van-cell title="消息通知" is-link to="/" />
      <van-cell title="小智同学" is-link to="/robot" />
    </div>

    <!-- 登出按钮 -->
    <div class="logout" @click.prevent="Logout" v-show="logoutBtn">
      退出登录
    </div>
  </div>
</template>

<script>
import { removeToken, getToken } from '@/utils/Token.js'
export default {
  name: 'UserCenterModel',
  data() {
    return {
      show: false,
      logoutBtn: true
    }
  },
  computed: {
    // ^ --- 获取vuex的用户信息state属性
    userInfo() {
      return this.$store.state.userInfo.userMessage
    }
  },
  methods: {
    // ^ --- 封装登出函数
    logoutFn() {
      removeToken('heima_Token')
      this.show = false
      this.logoutBtn = false
    },
    // ^ --- 敲击登出按钮清除token并跳转登录页面
    Logout() {
      // * --- 调用Dialog组件执行退出登录选项卡.then()代表敲击确认的反馈动作.catch()代表取消退出
      this.$dialog
        .confirm({
          title: '退户确认',
          message: '退出当前头条账号，将不能同步收藏、发布评论和云端分享等',
          confirmButtonColor: '#3598ff'
        })
        .then(() => this.logoutFn())
        .catch(() => console.log('用户已取消退出登录操作！'))
    },
    checkToken() {
      this.show = !!getToken('heima_Token')
    }
  },
  async created() {
    // ^ --- 验证用户信息是否超时并调用用户信息
    this.checkToken()
    try {
      await this.$store.dispatch('userInfo/GET_USER_INOFMATION_ACTION')
    } catch (err) {
      if (err.response.status === 401) this.logoutFn()
    }
  }
}
</script>

<style scoped lang="less">
// (// ^ ---) 此为插件---切换不同注释颜色---插件名：Colorful Comments
// ^ -- 模块背景盒子
.main {
  width: 100%;
  height: 100vh;
  background-color: #f5f7f9;
}

// ^ --- 顶部用户资料栏(已登录)
.topBar {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 360px;
  width: 100%;
  background-image: url('@/assets/images/banner.png');
  background-size: contain;

  .userPhoto {
    box-sizing: border-box;
    padding: 0 30px;
    height: 150px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      display: flex;

      .user_pic {
        border: 1px solid white;
        margin: 7.5px 0;
        margin-right: 22px;
      }

      .username {
        line-height: 150px;
        height: 100%;
        color: white;
        font-size: 30px;
      }
    }

    .right {
      .userBtn {
        padding: 0 20px;
        height: 40px;
        font-size: 20px;
        color: #989898;
      }
    }
  }

  .userData {
    box-sizing: border-box;
    height: 135px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 100px;

    .tag {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: white;
      font-size: 26px;
    }
  }
}

// ^ --- 顶部用户资料栏(未登录)
.topBarNotAllow {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 360px;
  width: 100%;
  background-image: url('@/assets/images/banner.png');
  background-size: contain;
  display: flex;
  justify-content: center;
  align-items: center;

  .userImg {
    height: 130px;
    width: 130px;
    background-color: #fff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;

    .picture {
      font-size: 80px;
      color: #1e86fc;
    }
  }

  .loginBtn {
    letter-spacing: 5px;
    color: white;
    font-size: 28px;
  }
}

// ^ --- 收藏/历史栏
.collection {
  span {
    margin-top: 10px;
    font-size: 27px;
  }
}

// ^ --- 消息通知/小智同学
.msgURL {
  margin: 10px 0;
}

// ^ --- 退出登录
.logout {
  color: #d86262;
  height: 105px;
  width: 100%;
  background-color: #fff;
  text-align: center;
  line-height: 105px;
  font-size: 29px;
}
</style>
