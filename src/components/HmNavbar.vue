<template>
  <div class="hmnavbar">
    <div class="navbar" @click="$emit('click')">
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
.hmnavbar {
  padding-left: 20px;
  .navbar {
    height: 60px;
    display: flex;
    line-height: 60px;
    font-size: 16px;
    border-bottom: 1px solid #e4e4e4;
    .content {
      flex: 1;
      text-align: right;
      color: #a1abc3;
    }
    .arrow {
      margin: 0 10px;
    }
  }
}
</style>
