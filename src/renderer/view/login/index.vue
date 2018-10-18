<template>
<div>
<div class="background">
</div>
<login-input class="center"></login-input>
</div>
</template>
<script>
import LoginInput from './components/LoginInput'
export default {
  components: {
    LoginInput
  }
}
</script>

<style lang="scss" scoped>
.background{
    background: url('../../../../static/images/bg_login.jpg') no-repeat center center;
    width: 100%;
    height: 100vh;
    -webkit-filter: blur(5px); 

}
</style>
