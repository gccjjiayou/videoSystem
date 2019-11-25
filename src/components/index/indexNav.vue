<template>
  <div class="nav-outerbox">
    <img src="@/assets/img/HustLogo_small.png" height="50px" alt="">
    <span style="font-size: 30px; font-weight: bolder; font-family: 楷体,楷体_GB2312;">在线学习的评教管理系统</span>
    
    <el-menu 
      class="nav-menu"
      mode="horizontal"
      background-color="transparent"
      :default-active="$route.path"
      router>
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/video">视频</el-menu-item>
      <el-menu-item index="/rank">排行榜</el-menu-item>
      <el-menu-item index="/assessment">评教</el-menu-item>
      <el-menu-item index="/videoLive">直播</el-menu-item>
      <el-menu-item index="/personal">个人中心</el-menu-item>
    </el-menu>
    <div class="wrapper pb10">
      <p>欢迎您，{{ workerCode}}</p>
      <i class="iconfont icon-tuichu2" @click="logout">退出</i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    workerCode() {
      
      return this.$store.state.user.workerCode;
    }
  },
  methods: {
    logout() {
      this.$confirm('确定退出吗？',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$store.dispatch('Logout', this.$store.state.user.workerCode).then(() => {
          sessionStorage.setItem('hasLogin', false);
          sessionStorage.setItem('workerCode', '');
        })
        this.$message({
          type: 'success',
          message: '退出成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  },
  mounted() {
  }
  
}
</script>

<style lang="less" scoped>
.nav-outerbox {
  display: flex;
  align-items: center;
}
.el-menu.el-menu--horizontal {
  border-bottom-color: transparent;
  position: absolute;
  right: 0;
}
.el-menu--horizontal > .el-menu-item {
  font-size: 18px;
}
.el-menu--horizontal > .el-menu-item:hover {
  background-color: black;
}
.el-menu.el-menu--horizontal {
  right: 200px;
}
.wrapper {
  position: absolute;
  right: 30px;
  font-size: 14px;
  color: #909399;
}
.icon-tuichu2 {
  font-size: 14px;
}
.icon-tuichu2:hover {
  color: #409EFF;
}
</style>
