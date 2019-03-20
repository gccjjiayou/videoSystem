<template>
  <el-container v-if="hasLogin">
    <el-container v-if="videoPlay">
      <router-view/>
    </el-container>
    <el-container v-else>
      <el-header height="50px">
        <index-nav/>
      </el-header>
      <el-container class="content-wrap">
        <el-aside width="200px">
          <index-sidebar/>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
  <div v-else>
    <login></login>
  </div>
</template>

<script>
import login from "@/components/login/login";
import indexNav from "@/components/index/indexNav";
import indexSidebar from "@/components/index/indexSidebar";
import indexFooter from "@/components/index/indexFooter";

export default {
  components: {
    login: login,
    "index-nav": indexNav,
    "index-sidebar": indexSidebar,
    "index-footer": indexFooter
  },
  name: "App",
  data() {
    return {};
  },
  updated: function() {},
  computed: {
    hasLogin() {
      return this.$store.state.user.hasLogin;
    },
    videoPlay() {
      return (
        this.$route.name === "videoDetail" || this.$route.name === "videoLive"
      );
    }
  },
  mounted() {

  }
};
</script>

<style lang="less">
@import url("./assets/less/common.less");
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
  top: 50px;
  left: 0;
  bottom: 0;
  // z-index: 2;
}
.el-main {
  background: #eee;
  padding: 0px !important;
  position: absolute;
  left: 200px;
  top: 50px;
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
