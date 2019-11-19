<template>
  <div v-if="hasLogin">
    <div class="head"><index-nav /></div>
    <div class="body">
      <!-- <div class="aside"><index-sidebar /></div> -->
      <div class="main"><router-view /></div>
    </div>
  </div>
  <div v-else>
    <login />
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
      return this.$route.name === "videoDetail";
    }
  },
  mounted() {}
};
</script>

<style lang="less">
@import url("./assets/less/common.less");
@import url("./assets/less/icon.less");
#app {
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.head {
  // background: linear-gradient(to left, #436597, #2164f3);
  background-color: #fff;
  padding: 0 30px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  display: flex;
  align-items: center;
}
.body > .main {
  position: absolute;
  top: 60px;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
