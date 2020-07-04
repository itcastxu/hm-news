<template>
  <div class="login">
    <hm-header></hm-header>
    <hm-logo></hm-logo>
    <van-form @submit="onSubmit">
      <van-field v-model="username" label="用户名" placeholder="请输入用户名/手机号" :rules="rules.username" />
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        :rules="rules.password"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
    <p class="tips">
      没有账号？去
      <router-link to="/register">注册</router-link>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'onChange' },
          {
            pattern: /^\d{5,11}$/,
            message: '用户名是5-11位的数字',
            trigger: 'onChange'
          }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'onChange' },
          {
            pattern: /^\w{3,5}$/,
            message: '密码是3-5位的字母或数字',
            trigger: 'onChange'
          }
        ]
      }
    }
  },
  created() {
    this.username = this.$route.params.username
    this.password = this.$route.params.password
  },
  methods: {
    async onSubmit() {
      const res = await this.$axios.post('/login', {
        username: this.username,
        password: this.password
      })
      // console.log(res)
      const { statusCode, message, data } = res.data
      if (statusCode === 200) {
        // console.log(res)

        this.$toast.success(message)
        localStorage.setItem('userId', data.user.id)
        localStorage.setItem('token', data.token)
        this.$router.push('/user')
      } else {
        this.$toast.fail(message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login {
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
