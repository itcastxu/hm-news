<template>
  <div class="hmcomment">
    <div class="box">
      <div class="left">
        <img :src="$axios.defaults.baseURL + item.user.head_img" alt />
      </div>
      <div class="center">
        <p class="name">{{ item.user.nickname }}</p>
        <p class="time">{{ item.create_date | fromnow }}</p>
      </div>
      <div class="right">回复</div>
    </div>
    <!-- 渲染楼层组件 -->
    <hm-floor
      v-if="item.parent"
      :comment="item.parent"
      :num="getFloor(0, item)"
    ></hm-floor>
    <div class="comments">{{ item.content }}</div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    getFloor(num, item) {
      if (item.parent) {
        return this.getFloor(num + 1, item.parent)
      } else {
        return num
      }
    }
  }
}
</script>

<style lang="less" scoped>
.hmcomment {
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
  font-size: 14px;
  .box {
    display: flex;
    .left {
      margin-right: 10px;
      img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
      }
    }
    .center {
      flex: 1;
      text-align: left;
      .time {
        color: #999;
      }
    }
    .right {
      color: #999;
    }
  }
  .comments {
    text-align: left;
    padding: 10px 0;
  }
}
</style>
