<template>
  <div class="outer-box">
    <div class="overlay"></div>
    <el-card class="login-card" shadow="hover">
      <div slot="header" class="my-header">
        <span>教评系统</span>
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="form" label-width="80px">
        <el-form-item label="工号" prop="workerCode">
          <el-input v-model="ruleForm.workerCode" prefix-icon="iconfont icon-yonghuming"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" prefix-icon="iconfont icon-mima" @keyup.enter.native="login('form')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-row type="flex" align="middle">
            <el-col><el-checkbox v-model="checked">记住我</el-checkbox></el-col>
            <el-col> 
              <el-button @click="resetForm()">取消</el-button>
              <el-button type="primary" @click="login()">登录</el-button>
            </el-col>
          </el-row>
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
      checked: true,
    }
  },
  methods: {
    login() {
      this.$refs.form.validate(valid => {
        if(valid) {
          this.$store.dispatch("Login", this.ruleForm).then((res) => {
            this.$message({
              type: 'success',
              message: '登录成功!',            
            })
            sessionStorage.setItem('hasLogin', true);
            sessionStorage.setItem('workerCode', this.ruleForm.workerCode);
            this.checked ? this.setCookie(this.ruleForm.workerCode, this.ruleForm.password, 7) : this.clearCookie();
          })  
        }
      })
    },
    resetForm() {
      this.$refs.form.resetFields()
    },
    setCookie(workerCode, password, exdays) {
      let exdate = new Date();
      exdate.setTime(exdate.getTime() + exdays * 24 * 60 * 60 * 1000); //cookie有效时间
      window.document.cookie = `workerCode=${workerCode};path=/;expires=${exdate.toGMTString()}`;
      window.document.cookie = `password=${password};path=/;expires=${exdate.toGMTString()}`;
    },
    getCookie() {
      let str = document.cookie;
      if(str.length) {
        let arr = str.split(" ").join('').split(";")
        for(let i = 0; i < arr.length; i++) {
          let keyPair = arr[i].split('=');
          if(keyPair[0] === 'workerCode') {
            this.ruleForm.workerCode = keyPair[1];
          }
          if(keyPair[0] === 'password') {
            this.ruleForm.password = keyPair[1];
          }
        }
      }
    },
    clearCookie() {
      this.setCookie('', '', -1);
    }
  },
  mounted() {
    this.getCookie();
  }
}
</script>

<style lang="less" scoped>
.outer-box {
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
