<template>
  <div v-if="refresh">
    <van-cell title="头像" is-link class="cellContent" @click="show = true">
      <van-image
        slot="default"
        round
        width=".8rem"
        height=".8rem"
        :src="userImg"
      />
      <input
        type="file"
        ref="img"
        hidden
        capture
        @change="onChange($event)"
        :value="imgVal"
      />
      <van-action-sheet
        v-model="show"
        :actions="actions"
        cancel-text="取消"
        :close-on-click-action="true"
        @cancel="onCancel"
        @select="onSelect"
        get-container="body"
      />
      <van-popup
        v-model="popShow"
        position="bottom"
        :style="{ height: '100%' }"
        get-container="body"
        class="popup"
      >
        <div class="black">
          <img
            v-if="viewImg"
            :src="viewImg"
            alt=""
            class="viewImg"
            ref="myImg"
            @load="loadCropper"
          />
          <div class="footer">
            <span @click="popShow = false">取消</span>
            <span @click="onConfirm">确认</span>
          </div>
        </div>
      </van-popup>
    </van-cell>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
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
        { value: 0, name: '拍照' },
        { value: 1, name: '本地选择' }
      ],
      userImg: this.userInfo.photo,
      popShow: false,
      viewImg: '',
      imgVal: '',
      cropper: null,
      refresh: true
    }
  },
  methods: {
    onCancel() {
      this.show = false
    },
    onSelect() {
      this.$refs.img.click()
      this.show = false
    },
    onChange(e) {
      this.popShow = true
      const file = e.target.files[0]
      const data = window.URL.createObjectURL(file)
      this.viewImg = data
      this.refresh = false
      this.$nextTick(() => {
        this.refresh = true
      })
    },
    async onConfirm() {
      this.userImg = this.viewImg
      this.popShow = false
      this.cropper.getCroppedCanvas().toBlob(async (blob) => {
        const format = new FormData()
        format.append('photo', blob)
        this.$emit('changeImg', format)
      })
    },
    loadCropper() {
      const image = this.$refs.myImg
      this.cropper = new Cropper(image, {
        img: this.viewImg,
        aspectRatio: 1,
        viewMode: 1,
        dragMode: 'move',
        autoCropArea: 1,
        cropBoxMovable: false,
        background: false,
        cropBoxResizable: false
      })
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

.popup {
  .viewImg {
    width: 100vw;
    height: 30%;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    display: block;
  }

  /deep/ .footer {
    color: white;
    box-sizing: border-box;
    font-size: 30px;
    padding: 0 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100px;
    width: 100%;
    line-height: 100px;
    text-align: center;
    position: absolute;
    bottom: 0;
    left: 0;
  }
}

.black {
  background-color: black;
  width: 100vw;
  height: 100vh;
}
</style>
