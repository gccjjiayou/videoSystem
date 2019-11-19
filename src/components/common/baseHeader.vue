<template>
  <h1 class="header">{{ title }}</h1>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>
<style lang="less" scoped>
.header {
  font-size: 40px;
  font-family: 楷体, 楷体_GB2312;
  line-height: 60px;
  text-align: center;
  color: #fff;
  background-color: #409EFF;
  margin: 0;
  box-shadow: 0 0 10px #888;
}

</style>