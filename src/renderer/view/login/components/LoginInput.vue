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
            <el-checkbox class="checkbox" label="记住帐号密码" @change="saveInLocalStorage('account')" v-model="isRememberAccount">
            </el-checkbox>

            <el-checkbox class="checkbox" label="记住不登录使用" @change="saveInLocalStorage('unlogin')" v-model="isWithoutLogin">
            </el-checkbox>
        </div>

        <!-- 登录按钮 -->
        <el-button class="input-span login-button" type="primary" @click="handleLogin('ruleForm')">登录</el-button>
        <el-button class="input-span login-button" @click="handleUnlogin">不登录使用</el-button>

    </el-card>
</div>

</template>
<script>
import {ipcRenderer} from 'electron'
import {LOGIN_WITH_PHONE} from '@/../message.js'
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
      },
      isRememberAccount: false,
      isWithoutLogin: false
    }
  },
  mounted () {
    this.isRememberAccount = localStorage.isRememberAccount === 'true'
    this.isWithoutLogin = localStorage.isWithoutLogin === 'true'
    this.ruleForm.usrName = localStorage.usrName
    this.ruleForm.passWord = localStorage.passWord
    this.setIpcRenderer()
  },
  methods: {
    handleLogin (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // TODO:区分手机和邮箱
          this.getLoginInfo(this.ruleForm)
        }
      })
    },
    handleUnlogin () {
      this.$router.push('musiclist')
    },
    getLoginInfo (ruleForm) {
      // ruleForm.usrName
      ipcRenderer.send(LOGIN_WITH_PHONE, ruleForm)
    },
    setIpcRenderer () {
      ipcRenderer.on(LOGIN_WITH_PHONE, (event, arg) => {
        if (arg.startsWith('error')) {
          this.$notify.error({
            title: '错误',
            message: arg,
            offset: 20,
            duration: 2000
          })
        } else if (arg.startsWith('success')) {
          this.$message.success('登录成功！')
        }
        console.log(event, arg)
      })
    },
    saveInLocalStorage (selector) {
      if (selector === 'account') {
        localStorage.isRememberAccount = this.isRememberAccount
        localStorage.usrName = this.ruleForm.usrName
        localStorage.passWord = this.ruleForm.passWord
      } else if (selector === 'unlogin') {
        localStorage.isWithoutLogin = this.isWithoutLogin
      }
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
