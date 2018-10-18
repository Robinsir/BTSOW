<template>
<div>
    <el-card class="login-boarder" shadow="hover">

        <!-- 头部 -->
        <template slot="header" class="clearfix">
            <span>登录</span>
         </template>

        <el-input prefix-icon="fa fa-user-o" class="input-size" placeholder="请输入用户名"></el-input>
        <el-input prefix-icon="fa fa-key" class="input-span" placeholder="请输入密码"></el-input>

        <!-- 复选框 -->
        <div class="selector">
            <el-checkbox class="checkbox" label="记住帐号密码"></el-checkbox>
            <el-checkbox class="checkbox" label="记住不登录使用"></el-checkbox>
        </div>

        <!-- 登录按钮 -->
        <el-button class="input-span login-button" type="primary">登录</el-button>
        <el-button class="input-span login-button">不登录使用</el-button>

    </el-card>
</div>

</template>
<script>
export default {
  name: 'LoginInput'
}
</script>

<style lang="scss" scoped>
.login-boarder{
    position: absolute;
    width: 400px;
    top: 50%;
    left: 50%;
    -webkit-transform:translate(-50%, -50%);
}
.input-span{
    margin-top: 20px;
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
         margin-left: none;
         margin-top: 5px;
     }
 }
 .el-card__body{
     padding: 30px
 }
</style>
