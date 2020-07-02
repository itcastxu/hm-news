<template>
  <div class="hmheader">
    <div class="back"><span class="iconfont iconjiantou2"></span></div>
    <div class="title"><slot></slot></div>
    <div class="extra"></div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.hmheader {
  background-color: #ccc;
  height: 40px;
  line-height: 40px;
  display: flex;
  font-size: 16px;
}
.back,
.extra {
  width: 40px;
  line-height: 40px;
  text-align: center;
}
.title {
  text-align: center;
  flex: 1;
}
</style>
