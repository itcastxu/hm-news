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
      <div class="user" @click="$router.push('/user')">
        <span class="iconfont iconwode"></span>
      </div>
    </div>
    <div class="tabs">
      <van-tabs v-model="active" sticky animated swipeable>
        <van-tab v-for="item in list" :key="item.id" :title="item.name">
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
              :immediate-check="false"
              :offset="10"
            >
              <hm-post :lis="lis"></hm-post>
            </van-list>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  // 首页逻辑：
  // 发请求，请求数据tablist，用tab组件渲染tab
  // list组件，上拉加载，
  // 1.请求文章数据，分页加载，（封装post组件，渲染文章）
  // 2。使用list组件，
  // 3，解决一个bug：切换栏目，（监视active的变化中）数据要清空，并且只加载一页数据,不能触发load事件
  // pullrefresh组件下拉刷新
  // 1，下拉释放，（触发refresh事件时）数据要重新加载。相当于重新加载页面
  // 解决一个bug： 快速切换栏目，会报错。因为发送请求是异步的，快速切换时，监视到active的变化，会先执
  // 行两次清空文章列表，等跳转到最终页面时，再发送两次请求，发送请求是带id的，v-for循环里，key值重复了，所以会报这个错

  data() {
    return {
      active: 0,
      list: [],
      pageIndex: 1,
      pageSize: 5,
      lis: [],
      // 是否正在加载中，false表示不在加载中，可以触发load事件
      loading: false,
      // 是否没有更多数据了
      finished: false,
      refreshing: false
    }
  },
  // 请求tab栏数据
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
    // 请求文章数据
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
        if (this.pageIndex > 1) {
          this.lis = [...this.lis, ...data]
          // console.log(this.lis)
        } else {
          this.lis = data
        }
      }
      this.loading = false
      // refreshing 为false相当于隐藏加载中
      this.refreshing = false
      // 判断如果没有数据，显示没有更多数据了
      if (data.length < this.pageSize) {
        this.finished = true
      }
    },
    // 当offset为10时，自动触发load事件，此时自动将loading改为true，
    // 需要我们手动将loading改为false
    onLoad() {
      // console.log('加载')

      ++this.pageIndex
      setTimeout(() => {
        this.getPostList(this.list[this.active].id)
      }, 1000)
    },
    onRefresh() {
      // 相当于重新加载页面 重新加载第一页的数据
      this.lis = []
      this.pageIndex = 1
      this.finished = false
      this.loading = true
      // 发送请求加载第一页数据
      setTimeout(() => {
        this.getPostList(this.list[this.active].id)
      }, 1000)
    }
  },
  watch: {
    active(value) {
      // 当切换tab栏时重置数据
      this.lis = []
      this.pageIndex = 1
      this.finished = false
      // 此时将loading设置为true，之前当滚动快触底时，就会触发load事件
      // 将loading设置为false，切换tab栏时，会自动加载数据，
      // 将loading改为true，不会触发load事件，进入页面时，就不会直接加载数据，而是等触底时再加载
      this.loading = true
      setTimeout(() => {
        const id = this.list[value].id // 栏目的id
        this.getPostList(id)
      }, 1000)
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
