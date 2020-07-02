<template>
  <div class="register">
    <hm-header></hm-header>
    <hm-logo></hm-logo>
    <van-form @submit="onSubmit">
      <van-field
        v-model="user.username"
        label="用户名"
        placeholder="请输入用户名"
        :rules="rules.username"
      />
      <van-field
        v-model="user.nickname"
        label="昵称"
        placeholder="请输入昵称"
        :rules="rules.nickname"
      />
      <van-field
        v-model="user.password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        :rules="rules.password"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          注册
        </van-button>
      </div>
    </van-form>
    <p class="tips">已有账号？去<router-link to="/login">登录</router-link></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        nickname: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请填写用户名', trigger: 'onChange' },
          {
            pattern: /^\d{5,11}$/,
            message: '用户名是5-11位的数字',
            trigger: 'onChange'
          }
        ],
        nickname: [
          { required: true, message: '请填写昵称', trigger: 'onChange' },
          {
            pattern: /^[\u4e00-\u9fa5]{2,5}$/,
            message: '昵称是2-5位的汉字',
            trigger: 'onChange'
          }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'onChange' },
          {
            pattern: /^\w{3,5}$/,
            message: '密码是3-5位的数字',
            trigger: 'onChange'
          }
        ]
      }
    }
  },
  methods: {
    async onSubmit() {
      const res = await this.$axios.post('/register', this.user)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.$router.push({
          name: 'login',
          params: {
            username: this.user.username,
            password: this.user.password
          }
        })
      } else {
        this.$toast.fail(message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.register {
  .tips {
    font-size: 14px;
    text-align: right;
    margin-right: 20px;
    a {
      color: red;
    }
  }
}
</style>
