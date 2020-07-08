<template>
  <div class="comment">
    <div class="comment-box">
      <hm-header>跟帖</hm-header>
      <div class="list">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check="false"
          :offset="10"
        >
          <div class="item" v-for="item in list" :key="item.id">
            <p class="time">{{ item.create_date }}</p>
            <div class="content" v-if="item.parent">
              <p>回复：{{ item.parent.user.nickname }}</p>
              <p>{{ item.parent.content }}</p>
            </div>
            <div class="review">
              <p>{{ item.content }}</p>
            </div>
            <div class="link">
              <span class="one-txt-cut">原文：{{ item.post.title }}</span>
              <span class="iconfont iconjiantou1"></span>
            </div>
          </div>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageIndex: 1,
      pageSize: 5,
      list: [],
      // 是否正在加载，load事件中会自动设置true，需要手动设置false
      loading: false,
      // 是否还有更多数据，true表示没有更多数据了
      finished: false
    }
  },
  created() {
    this.getCommentList()
  },
  methods: {
    onLoad() {
      // console.log('加载事件触发了')
      setTimeout(() => {
        this.pageIndex++
        this.getCommentList()
      }, 2000)
    },
    async getCommentList() {
      const res = await this.$axios.get('/user_comments', {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = [...this.list, ...data]
        // console.log(data)
      }
      this.loading = false
      if (data.length < this.pageSize) {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.comment-box {
  padding-top: 40px;
}
.comment {
  .hmheader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
  font-size: 14px;
  .list {
    .item {
      padding: 10px;

      border-bottom: 1px solid #ccc;
      .time {
        margin-top: 20px;
        line-height: 40px;
        color: #999;
      }
      .content {
        background-color: #ddd;
        color: #999;
        // border: 1px solid transparent;
        // overflow: hidden;
        padding: 10px 0;
        line-height: 25px;
      }
      .review {
        line-height: 40px;
      }
      .link {
        color: #999;
        display: flex;
        justify-content: space-between;
        span:first-child {
          width: 70%;
        }
      }
    }
  }
}
</style>
