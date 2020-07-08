<template>
  <div class="userEdit">
    <hm-header>编辑</hm-header>
    <div class="avator">
      <van-uploader :after-read="afterRead" />
      <img :src="$axios.defaults.baseURL + info.head_img" alt />
    </div>
    <hm-navbar @click="clickfn">
      <template>昵称</template>
      <template #content>{{ info.nickname }}</template>
    </hm-navbar>
    <hm-navbar @click="clickPwd">
      <template>密码</template>
      <template #content>******</template>
    </hm-navbar>
    <hm-navbar @click="clickGd">
      <template>性别</template>
      <template #content>{{ info.gender === 0 ? '女' : '男' }}</template>
    </hm-navbar>

    <van-dialog v-model="showNn" title="修改昵称" show-cancel-button @confirm="editNickname">
      <van-field v-model="nickname" />
    </van-dialog>
    <van-dialog v-model="showPwd" title="修改密码" show-cancel-button @confirm="editPassword">
      <van-field v-model="password" />
    </van-dialog>
    <van-dialog v-model="showGd" title="修改性别" show-cancel-button @confirm="editGender">
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="radio = '1'">
            <template #right-icon>
              <van-radio :name="1" />
            </template>
          </van-cell>
          <van-cell title="女" clickable @click="radio = '0'">
            <template #right-icon>
              <van-radio :name="0" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>

    <div class="mask" v-show="showMask">
      <van-button type="primary" size="small" @click="crops">裁剪</van-button>
      <van-button type="primary" size="small" @click="cancel">取消</van-button>
      <vueCropper
        ref="cropper"
        :img="img"
        :autoCrop="true"
        autoCropWidth="150"
        autoCropHeight="150"
        :fixed="true"
        :fixedNumber="[1, 1]"
      ></vueCropper>
    </div>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    VueCropper
  },
  data() {
    return {
      info: {},
      showNn: false,
      nickname: '',
      showPwd: false,
      password: '',
      showGd: false,
      gender: '',
      img: '',
      showMask: false
    }
  },
  created() {
    this.render()
  },
  methods: {
    // 请求数据，渲染页面
    async render() {
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.get(`/user/${userId}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.info = data
      }
    },
    // 封装修改数据
    async editUser(data) {
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.post(`/user_update/${userId}`, data)
      const { statusCode } = res.data
      if (statusCode === 200) {
        this.render()
      }
    },
    // 修改头像
    // 选择文件之后
    async afterRead(file) {
      this.img = file.content
      this.showMask = true
      // 上传头像之前校验图片大小和图片的格式
      if (file.file.size / 1024 >= 20) {
        this.$toast.fail('上传的图片大小不能超过20kb哟！')
        this.showMask = false
        return
      }
      // 校验图片的格式
      const isJpeg = file.file.type === 'image/gif'
      const isGif = file.file.type === 'image/jpeg'
      const isPng = file.file.type === 'image/png'
      if (!(isJpeg || isGif || isPng)) {
        this.$toast.fail('上传的图片格式不正确')
        this.showMask = false
      }
      // 错误  当||两边不是布尔值就会进行短路运算。第一个数转布尔值为真，就返回第一个数
      // if (!(file.file.type === ('image/jpeg' || 'image/png' || 'image/gif'))) {
      //   this.showMask = false
      //   this.$toast.fail('上传的图片格式不正确')
      //   return
      // }
      // const fl = new FormData()
      // fl.append('file', file.file)
      // const res = await this.$axios.post('/upload', fl)
      // // console.log(res)
      // const { statusCode, data } = res.data
      // if (statusCode === 200) {
      //   this.editUser({ head_img: data.url })
      // }
    },
    cancel() {
      this.showMask = false
    },
    crops() {
      this.$refs.cropper.getCropBlob(async blob => {
        const fl = new FormData()
        fl.append('file', blob)
        const res = await this.$axios.post('/upload', fl)
        // console.log(res)
        const { statusCode, data } = res.data
        if (statusCode === 200) {
          this.editUser({
            head_img: data.url
          })
        }
        this.showMask = false
      })
    },

    // 修改昵称
    clickfn() {
      this.showNn = true
      this.nickname = this.info.nickname
    },
    editNickname() {
      this.editUser({ nickname: this.nickname })
    },
    // 修改密码
    clickPwd() {
      this.showPwd = true
      this.password = this.info.password
    },
    editPassword() {
      this.editUser({ password: this.password })
    },
    // 修改性别
    clickGd() {
      this.showGd = true
      this.gender = this.info.gender
    },
    editGender() {
      this.editUser({ gender: this.gender })
    }
  }
}
</script>

<style lang="less" scoped>
.userEdit {
  .avator {
    position: relative;
    height: 120px;
    text-align: center;
    padding: 25px 0;
    img {
      height: 70px;
      width: 70px;
      border-radius: 50%;
    }
    .van-uploader {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      opacity: 0;
    }
  }
  .mask {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    .van-button {
      position: absolute;
      z-index: 999;
      top: 0;
    }
    .van-button:first-child {
      left: 0;
    }
    .van-button:nth-child(2) {
      right: 0;
    }
  }
}
</style>
