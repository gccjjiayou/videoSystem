<template>
<div class="nav-box">
  <el-row class="wrap-items" type="flex">
      <el-col :span="18">
        <h2>Teaching Assessment</h2>
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
              <img class="user-avatar" src="@/assets/img/avatar-1-mini.jpg" alt="">
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
        </el-row>
      </el-col>
  </el-row>

</div>
</template>

<script>
export default {
  
}
</script>

<style lang="less" scoped>
h2 {
    color: #fff;
}
.wrap-items {
  align-items: center;
}
.user-avatar {
  border-radius: 50%;
}

</style>
