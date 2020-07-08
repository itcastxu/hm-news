<template>
  <div class="mystar">
    <hm-header>我的收藏</hm-header>
    <div class="post" v-for="item in list" :key="item.id">
      <div class="single" v-if="item.cover.length < 3">
        <div class="left">
          <div class="title">{{ item.title }}</div>
          <div class="user">
            <span class="name">{{ item.user.nickname }}</span>
            <span class="review">跟帖{{ item.comments.length }}</span>
          </div>
        </div>
        <div class="right">
          <img :src="$url(item.cover[0].url)" alt="" />
        </div>
      </div>
      <div class="multiple" v-else-if="item.cover.length >= 3">
        <div class="up">
          <div class="title">{{ item.title }}</div>
        </div>
        <div class="center">
          <div class="imgs">
            <img :src="$url(item.cover[0].url)" alt="" />
            <img :src="$url(item.cover[1].url)" alt="" />
            <img :src="$url(item.cover[2].url)" alt="" />
          </div>
        </div>
        <div class="down">
          <div class="user">
            <span class="name">{{ item.user.nickname }}</span>
            <span class="review">跟帖{{ item.comments.length }}</span>
          </div>
        </div>
      </div>
      <div class="vedio" v-else></div>
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
    this.getStarList()
  },
  methods: {
    async getStarList() {
      const res = await this.$axios.get('/user_star')
      //   console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
        console.log(this.list)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.user {
  font-size: 14px;
  color: #868686;
  .name {
    margin-right: 10px;
  }
}
.post {
  font-size: 16px;
  .single {
    display: flex;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    justify-content: space-between;
    .left {
      line-height: 30px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .right {
      img {
        width: 121px;
        height: 75px;
        object-fit: cover;
      }
    }
  }
  .multiple {
    padding: 10px;
    border-bottom: 1px solid #ccc;
    .center {
      padding: 10px 0;
      .imgs {
        display: flex;
        justify-content: space-between;
        img {
          width: 112px;
          height: 74px;
        }
      }
    }
  }
}
</style>
