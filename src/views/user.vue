<template>
  <div class="user">
    <div class="header" @click="$router.push('/userEdit')">
      <div class="avator">
        <img :src="this.$axios.defaults.baseURL + info.head_img" alt />
      </div>
      <div class="content">
        <p class="name">
          <span class="iconfont iconxingbienv" v-if="info.gender === 0"></span>
          <span class="iconfont iconxingbienan" v-else></span>
          {{ info.nickname }}
        </p>
        <p class="time">{{ info.create_date | time }}</p>
      </div>
      <div class="arrow">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <hm-navbar @click="$router.push('/userFollows')">
      <template>我的关注</template>
      <template #content>关注的用户</template>
    </hm-navbar>
    <hm-navbar @click="$router.push('/userComments')">
      <template>我的跟帖</template>
      <template #content>跟帖/回复</template>
    </hm-navbar>
    <hm-navbar @click="$router.push('/userStar')">
      <template>我的收藏</template>
      <template #content>文章/收藏</template>
    </hm-navbar>
    <hm-navbar @click="$router.push('/userEdit')">
      <template>设置</template>
    </hm-navbar>
    <hm-navbar @click="logout">
      <template>退出</template>
    </hm-navbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {}
    }
  },
  async created() {
    const userId = localStorage.getItem('userId')
    const res = await this.$axios.get(`/user/${userId}`)
    // console.log(res)
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.info = data
    }
  },
  methods: {
    async logout() {
      // this.$dialog
      //   .confirm({
      //     title: '退出',
      //     message: '亲，您确认要退出该系统吗?'
      //   })
      //   .then(() => {
      //     // on confirm
      //     localStorage.removeItem('token')
      //     localStorage.removeItem('userId')
      //     this.$router.push('/login')
      //   })
      //   .catch(() => {
      //     // on cancel
      //   })
      try {
        await this.$dialog.confirm({
          title: '退出',
          message: '亲，您确认要退出该系统吗?'
        })
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        this.$router.push('/login')
      } catch {}
    }
  }
}
</script>

<style lang="less" scoped>
.user {
  .header {
    display: flex;
    height: 120px;
    align-items: center;
    font-size: 16px;
    padding: 0 20px;
    border-bottom: 5px solid #e4e4e4;
    .avator {
      img {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        margin-right: 20px;
      }
    }
    .content {
      flex: 1;
      .name {
        padding-bottom: 5px;
        .iconxingbienv {
          color: #f53bbe;
        }
        .iconxingbienan {
          color: #71b3e4;
        }
      }
      .time {
        margin-top: 5px;
        color: #a1abc3;
      }
    }
  }
}
</style>
