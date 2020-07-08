<template>
  <div class="follows">
    <hm-header>我的关注</hm-header>
    <div class="user">
      <div class="item" v-for="item in list" :key="item.id">
        <div class="avator">
          <img :src="$axios.defaults.baseURL + item.head_img" alt="" />
        </div>
        <div class="content">
          <p class="name">{{ item.nickname }}</p>
          <p class="time">{{ item.create_date | time }}</p>
        </div>
        <van-button round type="info" size="small" @click="unFollow(item.id)"
          >取消关注</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    }
  },
  created() {
    this.render()
  },
  methods: {
    async render() {
      const res = await this.$axios.get('/user_follows')
      //   console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
      }
    },
    async unFollow(id) {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '您确认要取关该用户吗'
        })
        const res = await this.$axios.get(`/user_unfollow/${id}`)
        const { statusCode, message } = res.data
        if (statusCode === 200) {
          this.$toast.success(message)
          this.render()
        }
      } catch {
        this.$toast.fail('取消成功')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.follows {
  .user {
    .item {
      display: flex;
      height: 100px;
      align-items: center;
      padding: 0 20px;
      .avator {
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }
      .content {
        margin-left: 20px;
        font-size: 14px;
        flex: 1;
        .time {
          margin-top: 5px;
        }
      }
      .van-button {
        font-size: 12px;
      }
    }
  }
}
</style>
