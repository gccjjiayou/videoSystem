<template>
<div class="nav-box">
  <el-row class="wrap-items" type="flex">
      <el-col :span="18">
        <h1>教评系统</h1>
      </el-col>
      <el-col :span="6">
        <el-row class="wrap-items" type="flex">
          <el-col :span="6">
            <el-dropdown>  
              <img src="@/assets/img/nav-bell.jpg" alt="">          
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>选项1</el-dropdown-item>
                <el-dropdown-item>选项2</el-dropdown-item>
                <el-dropdown-item>选项3</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
          <el-col :span="6">
            <el-dropdown>
              <img src="@/assets/img/nav-message.jpg" alt="">
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>选项1</el-dropdown-item>
                <el-dropdown-item>选项2</el-dropdown-item>
                <el-dropdown-item>选项3</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
          <el-col :span="6">            
            <el-dropdown>
              <img src="@/assets/img/nav-list.jpg" alt="">
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>选项1</el-dropdown-item>
                <el-dropdown-item>选项2</el-dropdown-item>
                <el-dropdown-item>选项3</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
          <el-col :span="6">
            <el-button type="text" @click="logout">退出</el-button>
          </el-col>
        </el-row>
      </el-col>
  </el-row>

</div>
</template>

<script>
export default {
  data() {
    return {

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
          sessionStorage.setItem('isLogin', false)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
      
    }
  }
  
}
</script>

<style lang="less" scoped>
h1 {
  color: #fff;
  letter-spacing: 2px;
}
.wrap-items {
  align-items: center;
}
.user-avatar {
  border-radius: 50%;
}

</style>
