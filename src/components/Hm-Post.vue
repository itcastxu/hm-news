<template>
  <div class="hmpost">
    <div class="post" v-for="item in lis" :key="item.id">
      <div class="vedio" v-if="item.content.startsWith('https')">
        <div class="left">
          <div class="title">{{ item.title }}</div>
        </div>
        <div class="center">
          <div class="shipin">
            <span class="iconfont iconshipin"></span>
          </div>
          <img :src="$url(item.cover[0].url)" alt />
        </div>
        <div class="right">
          <div class="user">
            <span class="name">{{ item.user.nickname }}</span>
            <span class="review">跟帖{{ item.comment_length }}</span>
          </div>
        </div>
      </div>
      <div class="single" v-else-if="item.cover.length < 3">
        <div class="left">
          <div class="title">{{ item.title }}</div>
          <div class="user">
            <span class="name">{{ item.user.nickname }}</span>
            <span class="review">跟帖{{ item.comment_length }}</span>
          </div>
        </div>
        <div class="right">
          <img :src="$url(item.cover[0].url)" alt />
        </div>
      </div>
      <div class="multiple" v-else>
        <div class="up">
          <div class="title">{{ item.title }}</div>
        </div>
        <div class="center">
          <div class="imgs">
            <img :src="$url(item.cover[0].url)" alt />
            <img :src="$url(item.cover[1].url)" alt />
            <img :src="$url(item.cover[2].url)" alt />
          </div>
        </div>
        <div class="down">
          <div class="user">
            <span class="name">{{ item.user.nickname }}</span>
            <span class="review">跟帖{{ item.comment_length }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  async created() {
    console.log(this.lis)
  },
  methods: {},
  props: ['lis']
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
  .vedio {
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .center {
      position: relative;
      img {
        width: 340px;
        height: 170px;
        object-fit: cover;
      }
      .shipin {
        width: 58px;
        height: 58px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background: rgba(95, 99, 104, 0.5);
        border-radius: 50%;
        text-align: center;
        // display: flex;
        // justify-content: center;
        span {
          font-size: 50px;
          color: white;
        }
      }
    }
  }
}
</style>
