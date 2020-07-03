<template>
  <div class="user">
    <div class="header" @click="clickFn">
      <div class="avator">
        <img :src="$axios.defaults.baseURL + info.head_img" alt />
      </div>
      <div class="content">
        <p class="name">
          <span v-if="info.gender === 0" class="iconfont iconxingbienv"></span>
          <span class="iconfont iconxingbienan" v-else></span>
          {{ info.nickname }}
        </p>
        <p class="time">{{ info.create_date | time }}</p>
      </div>
      <div class="arrow">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <hm-navbar @click="clickFn">
      <template>我的关注</template>
      <template v-slot:content>关注的用户</template>
    </hm-navbar>
    <hm-navbar>
      <template>我的跟帖</template>
      <template v-slot:content>跟帖/回复</template>
    </hm-navbar>
    <hm-navbar>
      <template>我的收藏</template>
      <template v-slot:content>文章/收藏</template>
    </hm-navbar>
    <hm-navbar>
      <template>设置</template>
      <template v-slot:content></template>
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
  methods: {
    clickFn() {
      this.$router.push('/userEdit')
    }
  },
  async created() {
    const userId = localStorage.getItem('userId')

    const res = await this.$axios.get(`/user/${userId}`)
    console.log(res)
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.info = data
      console.log(data)
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  height: 120px;
  padding: 0 20px;
  align-items: center;
  border-bottom: 5px solid #e4e4e4;
  .avator {
    img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
    }
  }
  .content {
    font-size: 14px;
    color: #333;
    flex: 1;
    margin-left: 20px;
    .name {
      padding-bottom: 5px;
      .iconxingbienv {
        color: #f43fbc;
        padding-right: 5px;
      }
      .iconxingbienan {
        color: #73b1da;
      }
    }
    .time {
      color: #a1a1a1;
      margin-top: 5px;
    }
  }
}
</style>
