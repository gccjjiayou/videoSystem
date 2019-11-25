<template>
  <div v-if="hasLogin">
    <div class="head"><index-nav /></div>
    <div class="body">
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

export default {
  components: {
    login: login,
    "index-nav": indexNav
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
  }
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
  background-color: #fff;
  padding: 0 30px;
  height: 60px;
  display: flex;
  align-items: center;
}
</style>
