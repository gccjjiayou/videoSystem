<template>
  <div id="app">
    <el-container>
      <el-header height="80px"><index-nav /></el-header>
      <el-container class="content-wrap">
        <el-aside width="200px"><index-sidebar /></el-aside>
        <el-container>
          <el-main>Main</el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>

    <!-- <div class="my-nav"><index-nav /></div>
    <div class="main-content">
      <div class="my-sidebar"><index-sidebar /></div>
      <div class="content-wrap">
        <div class="my-content"></div>
        <div class="my-footer"></div>
      </div>
    </div> -->
  </div>
</template>

<script>
import indexNav from '@/components/index/indexNav'
import indexSidebar from '@/components/index/indexSidebar'
import indexFooter from '@/components/index/indexFooter'

export default {
  name: 'App',
  components: {
    'index-nav': indexNav,
    'index-sidebar': indexSidebar,
    'index-footer': indexFooter

  }
}
</script>


<style lang="less">

#app {
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.el-header {
  background: linear-gradient(to left, #7b4397, #2196f3);
  position: fixed !important;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
}
.el-aside {
  background: #fff;
  width: 200px;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
  position: fixed !important;
  top: 80px;
  left: 0;
  bottom: 0;
  z-index: 2;
}
.el-main {
  background: #EEF5F9;
  position: absolute;
  left: 200px;
  top: 80px;
  right: 0;
  bottom: 60px;
  z-index: 1;
}
.el-footer {
  background: linear-gradient(to left, #7b4397, #2196f3);
  position: absolute;
  bottom: 0;
  left: 200px;
  right: 0;
  z-index: 2;
}
</style>
