<template>
  <div class="main">
    <van-cell-group>
      <van-cell class="border">
        <template #title>
          <div class="rightIcon" v-if="bool">
            <span class="contentTitle">{{ dataList.title }}</span>
            <van-image
              :src="dataList.cover.images[0]"
              class="contentImg"
              v-if="dataList.cover.images"
            />
          </div>
          <div class="bottomIcon" v-else>
            <span class="contentTitle">{{ dataList.title }}</span>
            <div class="imgList">
              <van-image
                v-for="(k, i) in dataList.cover.images"
                :key="i"
                :src="k"
                class="contentImg"
              />
            </div>
          </div>
        </template>
        <template #label>
          <div class="content">
            <p class="left">
              <span class="red tag">置顶</span>
              <span class="tag">{{ dataList.aut_name }}</span>
              <span class="tag">{{ dataList.comm_count }}评论数</span>
              <span class="tag">{{ time }}年之前</span>
            </p>
            <!-- 组件 --- 不感兴趣按钮 -->
            <UnlikeBtn />
            <!-- 组件 --- 不感兴趣按钮 -->
          </div>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs.js'
import UnlikeBtn from '@/components/UnlikeBtn.vue'

export default {
  components: {
    UnlikeBtn
  },
  props: ['dataList'],
  data() {
    return {
      time: '',
      bool: this.dataList.cover.type <= 1
    }
  },
  created() {
    const artTime = this.dataList.pubdate
    this.time = dayjs(new Date()).from(dayjs(artTime), true).slice(0, 1)
  }
}
</script>

<style scoped lang="less">
// ^ --- 通用样式
.red {
  color: #ef7a7a;
}
// ^ --- 边框内边距
.border {
  padding: 30px 0;
}
// ^ --- 左右边距
.main {
  padding: 0 20px;
}
// ^ --- 图片数量为1时
.rightIcon {
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;

  .content {
    flex: 1;
  }

  .contentImg {
    width: 230px;
    height: 150px;
  }
}

// ^ --- 图片数量为3时
.bottomIcon {
  display: flex;
  flex-direction: column;

  .content {
    flex: 1;
  }

  .imgList {
    display: flex;
    justify-content: space-between;

    .contentImg {
      margin-top: 20px;
      width: 235px;
      height: 150px;
    }
  }
}

// ^ --- label作者信息栏
.content {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  font-size: 23px;

  .tag {
    margin-right: 32px;
  }
}
.contentTitle {
  font-size: 32px;
}
</style>
