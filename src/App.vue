<template>
  <el-container v-if="this.$store.state.user.isLogin === true">     
    <el-header height="80px"><index-nav /></el-header>
    <el-container class="content-wrap">
      <el-aside width="200px"><index-sidebar /></el-aside>
      <el-main><router-view /></el-main>
    </el-container>
    <!-- <el-footer>Footer</el-footer> -->
  </el-container> 
  <div v-else>
    <login></login>
  </div>  
</template>

<script>
import login from "@/views/login"
import indexNav from '@/components/index/indexNav'
import indexSidebar from '@/components/index/indexSidebar'
import indexFooter from '@/components/index/indexFooter'
export default {
  components: {
     login: login,
    'index-nav': indexNav,
    'index-sidebar': indexSidebar,
    'index-footer': indexFooter
  },
  name: 'App',
  data() {
    return {
      // isLogin: this.$store.state.user.isLogin,    
    }
  },
  // updated() {
  //   this.isLogin = sessionStorage.getItem('isLogin') === 'true'
  // }
}
</script>

<style lang="less">
@import url('./assets/less/common.less');
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
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
  position: fixed !important;
  top: 80px;
  left: 0;
  bottom: 0;
  // z-index: 2;
}
.el-main {
  background: #eee;
  padding: 0px !important;
  position: absolute;
  left: 200px;
  top: 80px;
  right: 0;
  bottom: 0;
  z-index: 1;
}
.el-footer {
  background: linear-gradient(to left, #7b4397, #2196f3);
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
}


</style>
