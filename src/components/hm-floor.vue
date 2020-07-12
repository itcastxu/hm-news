<template>
  <div>
    <hm-floor
      v-if="comment.parent"
      :comment="comment.parent"
      :num="num - 1"
    ></hm-floor>
    <div class="floor">
      <div class="title">
        <div class="left">
          <span>{{ num }}楼</span>
          <span>{{ comment.user.nickname }}</span>
        </div>
        <div class="center">{{ comment.create_date | fromnow }}</div>
        <div class="right">回复</div>
      </div>
      <div class="content">
        <span>{{ comment.content }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'hm-floor',
  props: {
    comment: {
      type: Object,
      required: true
    },
    num: Number
  }
}
</script>

<style lang="less" scoped>
.floor {
  margin-top: -1px;
  font-size: 14px;
  height: 90px;
  padding: 10px;
  border: 1px solid #ccc;
  .title {
    display: flex;
    .left {
      margin-right: 10px;
      span:first-child {
        color: #999;
        margin-right: 5px;
      }
    }
    .center {
      flex: 1;
      text-align: left;
      font-size: 12px;
      color: #999;
    }
    .right {
      color: #999;
    }
  }
  .content {
    text-align: left;
    margin-top: 20px;
  }
}
</style>
