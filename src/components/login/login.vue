<template>
  <div class="my-login">
    <div class="overlay"></div>
    <el-card class="login-card" shadow="hover">
      <div slot="header" class="my-header">
        <span>教评系统</span>
      </div>
      <el-form ref="form" :model="ruleForm" :rules="rules" label-width="80px">
        <el-form-item label="工号" prop="workerCode">
          <el-input v-model="ruleForm.workerCode" prefix-icon="iconfont icon-yonghuming"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" prefix-icon="iconfont icon-mima" @keyup.enter.native="login('form')"></el-input>
        </el-form-item>
        <el-row>
          <el-checkbox v-model="checked">记住我</el-checkbox>
          <div style="float: right">
            <el-button @click="resetForm('ruleForm')">取消</el-button>
            <el-button type="primary" @click="login('ruleForm')">登录</el-button>
          </div>
        </el-row>
      </el-form>
    </el-card>    
  </div>
</template>

<script>
import { loginByWorkerCode } from '@/api/user'
export default {
  data() {
    return {
      ruleForm: {
        workerCode: '',
        password: '',
      },
      rules: {
        workerCode: [
          { required: true, message: '请输入工号', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ]
      },
      checked: false,
    }
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate(valid => {
        if(valid) {
          // this.checked ? this.setLocalStorage(this.ruleForm.workerCode, this.ruleForm.password) : this.clearLocalStorage()      
          this.$store.dispatch("Login", this.ruleForm).then(() => {
            this.$message({
              type: 'success',
              message: 'login success!',            
            })
            sessionStorage.setItem('hasLogin', true)
          })         
        }
      })   
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // setLocalStorage(workerCode, password) {
    //   localStorage.siteName = workerCode
    //   localStorage.sitePassword = password
    // },
    // getLocalStorage() {
    //   this.ruleForm.workerCode = localStorage.getItem(localStorage.key(1))
    //   this.ruleForm.password = localStorage.getItem(localStorage.key(2))
    // },
    // clearLocalStorage() {
    //   this.setLocalStorage('', '')
    // }
  },
  mounted() {
    // this.getLocalStorage()
  }
  
}
</script>

<style lang="less" scoped>
.my-login {
  background-image: url('../../assets/img/login-background.jpg'); 
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  background-attachment: scroll;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.overlay {
  background: linear-gradient(to bottom, rgba(123, 67, 151, 0.35), rgba(33, 150, 243, 0.55));
  height: 100vh;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.login-card {
  position: relative;
  background-color: #fff;
  width: 500px;
  margin: 0 auto;
  border-bottom: 4px solid #2196f3;
}
.my-header {
  color: #2196f3;
  text-align: center;
  font: bold 25px sans-serif;
  letter-spacing: 2px;
}

</style>
