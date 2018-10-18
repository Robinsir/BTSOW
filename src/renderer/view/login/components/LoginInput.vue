<template>
<div>
    <el-card class="login-boarder" shadow="hover">

        <!-- 头部 -->
        <template slot="header" class="clearfix test">
            <span>登录</span>
         </template>

        <!-- 内容输入 -->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" >
            <el-form-item prop="usrName">
               <el-input v-model="ruleForm.usrName" type="text" prefix-icon="fa fa-user-o" class="input-size" placeholder="请输入用户名">
               </el-input>
            </el-form-item>
            <el-form-item prop="passWord">
               <el-input v-model="ruleForm.passWord" type="password" prefix-icon="fa fa-key" class="input-span" placeholder="请输入密码">
               </el-input>
            </el-form-item>
        </el-form>

        <!-- 复选框 -->
        <div class="selector">
            <el-checkbox class="checkbox" label="记住帐号密码"></el-checkbox>
            <el-checkbox class="checkbox" label="记住不登录使用"></el-checkbox>
        </div>

        <!-- 登录按钮 -->
        <el-button class="input-span login-button" type="primary" @click="handleLogin('ruleForm')">登录</el-button>
        <el-button class="input-span login-button">不登录使用</el-button>

    </el-card>
</div>

</template>
<script>
const {ipcRenderer} = require('electron')
export default {
  data () {
    return {
      ruleForm: {
        usrName: '',
        passWord: ''
      },
      rules: {
        usrName: [
          { required: true, message: '请输入信息', trigger: 'blur' },
          { pattern: /(^1[0-9]{10}$)|(^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$)/, message: '请输入手机号或E-mail', trigger: 'blur' }
        ],
        passWord: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度不正确', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleLogin (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('验证成功')
        }
      })
    },
    getLoginInfo (ruleForm) {
      // ruleForm.usrName
      let sendTitle = 'loginWithPhone'
      ipcRenderer.send(sendTitle, JSON.stringify(ruleForm))
      ipcRenderer.on(sendTitle, (event, arg) => {

      })
    }

  },
  name: 'LoginInput'
}
</script>

<style lang="scss" scoped>
.login-boarder{
    position: absolute;
    width: 400px;
    height: 285px;
    top: 50%;
    left: 50%;
    -webkit-transform:translate(-50%, -50%);
}
.input-span{
    margin-top: 15px;
}
 .login-button{
     float: right;
     margin-bottom: 20px;
     margin-left: 20px;
 }
 .selector{
     float: left;
     margin-top: 10px;
     .checkbox{
         display: block;
         margin-left: 0;
         margin-top: 5px;
     }
 }

 //hack element ui
 .el-card /deep/.el-card__header{
     padding: 8px 20px;
 }
 .el-card__body{
     padding: 30px
 }

</style>
