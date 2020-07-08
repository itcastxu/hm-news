<template>
  <div class="home">
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search">
        <span class="iconfont iconsearch"></span>
        <span>搜索新闻</span>
      </div>
      <div class="user">
        <span class="iconfont iconwode"></span>
      </div>
    </div>
    <div class="tabs">
      <van-tabs v-model="active" sticky animated swipeable>
        <van-tab v-for="item in list" :key="item.id" :title="item.name">
          <hm-post :lis="lis"></hm-post>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 2,
      list: [],
      pageIndex: 1,
      pageSize: 5,
      lis: []
    }
  },
  async created() {
    const res = await this.$axios.get('/category')
    // console.log(res)
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.list = data
      this.getPostList(this.list[this.active].id)
    }
  },
  methods: {
    async getPostList(id) {
      const res = await this.$axios.get('/post', {
        params: {
          category: id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.lis = data
      }
    }
  },
  watch: {
    active(value) {
      this.getPostList(value)
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  .header {
    display: flex;
    height: 54px;
    background-color: #ff0000;
    line-height: 54px;
    padding: 0 10px;
    .logo,
    .user {
      height: 54px;
      width: 54px;
    }
    .logo {
      span {
        font-size: 60px;
        color: #fff;
      }
    }
    .search {
      flex: 1;
      text-align: center;
      background: rgba(255, 255, 255, 0.5);
      margin: 10px 10px;
      line-height: 34px;
      border-radius: 17px;
      text-align: center;
      span {
        font-size: 16px;
        color: #fff;
      }
      span:first-child {
        margin-right: 5px;
      }
    }
    .user {
      text-align: center;
      span {
        font-size: 25px;
        color: #ffffff;
      }
    }
  }
}
</style>
