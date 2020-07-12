<template>
  <div class="post">
    <div class="header">
      <div class="arrow" @click="$router.push('/')">
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="new">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="follow">
        <span v-if="info.has_follow" @click="unFollow">已关注</span>
        <span v-else @click="follow">关注</span>
      </div>
    </div>
    <div class="detail">
      <div class="title">{{ info.title }}</div>
      <div class="user">
        <span class="name">{{ info.user.nickname }}</span>
        <span>{{ info.create_date | time }}</span>
      </div>
      <div class="content" v-if="info.type === 1" v-html="info.content"></div>
      <video v-else :src="info.content" controls></video>
    </div>
    <div class="evaluate">
      <div class="good" @click="like">
        <span class="iconfont icondianzan" :class="{red:this.info.has_like}"></span>
        {{this.info.like_length}}
      </div>
      <div class="weixin">
        <span class="iconfont iconweixin"></span>微信
      </div>
    </div>
    <div class="content">
      精彩跟帖
      <hm-comment v-for="item in comment" :key="item.id" :item="item"></hm-comment>
    </div>

    <div class="footer">
      <input type="text" placeholder="写跟帖" />

      <div class="counts">
        <span class="iconfont iconpinglun-"></span>
        <span>{{this.info.comment_length}}</span>
      </div>
      <span class="iconfont iconshoucang" :class="{red:this.info.has_star}" @click="star"></span>
      <span class="iconfont iconfenxiang"></span>
    </div>
  </div>
</template>

<script>
// 文章详情页面的逻辑
// 通过params拿到id，然后发送ajax请求，渲染文章
// 1.关注按钮逻辑
// 点击关注按钮，判断是否登录（token）如果没有就先去登录，成功后回跳到该页面，
// 再点击关注，就发送请求
// 没有账号，注册账号登录后，回跳到文章详情页，往localStorage中存路径,注册成功后，跳转到登录页面，判断是否有baseurl，如果有就跳转到文章详情页，否则跳转到user页面
// 2.点赞按钮逻辑
//

export default {
  data() {
    return {
      info: {
        user: {}
      },
      comment: {}
    }
  },
  created() {
    this.getDetail()
    this.getComment()
  },
  methods: {
    async getDetail() {
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post/${id}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.info = data
        // console.log(data)
      }
    },
    async follow() {
      // 点击关注按钮 ，先判断是否登录，没有登录，去登录，
      // 登录了 回跳到该页面，
      // 再点击关注按钮，才会发送请求

      const token = localStorage.getItem('token')
      if (!token) {
        try {
          await this.$dialog.confirm({
            title: '温馨提示',
            message: '只有登录的用户才能登录，是否去登录？'
          })
          // this.$router.push({
          //   path: '/login',
          //   query: {
          //     back: true
          //   }
          // })
          localStorage.setItem('baseUrl', this.$route.path)
          this.$router.push('/login')
        } catch {
          this.$toast('取消成功')
        }
        return
      }
      const res = await this.$axios.get(`/user_follows/${this.info.user.id}`)
      // console.log(res)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getDetail()
      }
    },
    async unFollow() {
      const res = await this.$axios.get(`/user_unfollow/${this.info.user.id}`)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getDetail()
      }
    },
    async like() {
      const res = await this.$axios.get(`/post_like/${this.info.id}`)
      // console.log(res)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getDetail()
      }
    },
    async star() {
      const res = await this.$axios.get(`/post_star/${this.info.id}`)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getDetail()
      }
    },
    // 获取评论数据
    async getComment() {
      const res = await this.$axios.get(
        `/post_comment/${this.$route.params.id}`
      )
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.comment = data
        console.log(this.comment)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.red {
  color: red;
}
.post {
  .header {
    display: flex;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    padding: 0 10px;
    // border-bottom: 1px solid #ccc;
    .arrow {
      font-size: 14px;
    }
    .new {
      flex: 1;
      margin-left: 10px;
      span {
        font-size: 60px;
      }
    }
    .follow {
      margin: 10px 0;
      span:first-child {
        display: block;
        background-color: red;
        height: 24px;
        line-height: 24px;
        border-radius: 12px;
        padding: 0 10px;
      }
    }
  }
  .detail {
    padding: 10px;
    .title {
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 10px;
    }
    .user {
      font-size: 14px;
      color: #999;
      .name {
        margin-right: 10px;
      }
    }
    .content {
      font-size: 14px;
      line-height: 30px;
      padding: 20px 0;
      /deep/ img {
        width: 100%;
      }
    }
    video {
      margin-top: 20px;
      width: 100%;
    }
  }
  .evaluate {
    display: flex;
    justify-content: space-around;
    font-size: 14px;
    padding-bottom: 30px;
    border-bottom: 3px solid #ccc;
    // padding-bottom: 60px;
    .good,
    .weixin {
      width: 80px;
      height: 30px;
      line-height: 30px;
      border: 1px solid #ccc;
      border-radius: 15px;
      text-align: center;
      span {
        margin-right: 5px;
      }
    }
    .weixin {
      span {
        color: green;
      }
    }
  }
  .content {
    padding: 10px;
    font-size: 16px;
    text-align: center;
    padding-bottom: 70px;
  }
  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    // background-color: #f3f3f3;
    height: 50px;
    line-height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    padding: 10px;
    background-color: #fff;
    input {
      display: block;
      width: 180px;
      height: 30px;
      border-radius: 15px;
      border: 1px solid #eee;
      padding-left: 10px;
      background-color: #ccc;
    }
    .iconfont {
      font-size: 24px;
    }
    .counts {
      position: relative;

      span:last-child {
        position: absolute;
        top: 0px;
        right: -16px;
        background-color: red;
        height: 20px;
        line-height: 20px;
        padding: 0 5px;
        border-radius: 10px;
      }
    }
  }
}
</style>
