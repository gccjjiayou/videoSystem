<template>
<div class="nav-box">
  <el-row>
      <el-col :span="18">
        <h2>Teaching Assessment</h2>
      </el-col>
      <el-col :span="6">
        <el-row>
          <el-col :span="6">
            <el-dropdown>          
                <i class="el-icon-bell"></i>          
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>选项1</el-dropdown-item>
                <el-dropdown-item>选项2</el-dropdown-item>
                <el-dropdowm-item>选项3</el-dropdowm-item>
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

</style>
