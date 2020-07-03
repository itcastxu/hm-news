<template>
  <div class="navbar" @click="$emit('click')">
    <div class="nav">
      <div class="title">
        <slot></slot>
      </div>
      <div class="content">
        <slot name="content"></slot>
      </div>
      <div class="arrow">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.navbar {
  font-size: 16px;
  height: 60px;
  line-height: 60px;
  padding-left: 20px;
  .nav {
    display: flex;
    border-bottom: 1px solid #e4e4e4;
    .content {
      flex: 1;
      text-align: right;
      color: #a1a1a1;
    }
    .arrow {
      color: #a1a1a1;
      //   margin-left: 20px;
      padding: 0 10px;
    }
  }
}
</style>
