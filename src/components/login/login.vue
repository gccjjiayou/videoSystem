<template>
  <div class="my-login">
    <div class="overlay"></div>
    <el-card class="login-card" shadow="hover">
      <div slot="header" class="my-header">
        <span>教评系统</span>
      </div>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="工号" prop="workerCode">
          <el-input v-model="form.workerCode"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item style="float: right">
          <el-button @click="resetForm('form')">取消</el-button>
          <el-button type="primary" @click="login('form')">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>    
  </div>
</template>

<script>
import { loginByWorkerCode } from '@/api/user'
export default {
  data() {
    return {
      form: {
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
      }
    }
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate(valid => {
        if(valid) {
          this.$store.dispatch("Login", this.form).then(() => {
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
    }
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
