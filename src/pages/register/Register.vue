<template>
  <div class="main">
    <div class="login_view">
      <p class="title">账户注册</p>

      <form action="" method="post">
        <div class="login_form">
          <p class="account_text">用户姓名</p>
          <input type="text" class="account_bar" placeholder="请输入您的真实姓名">
          <p class="id_number_text">身份证号码</p>
          <input type="text" class="id_number_bar" placeholder="请输入您的身份证号码">
          <p class="password_text">密码</p>
          <input type="password" class="password_bar" placeholder="请设置您的密码">
          <p class="password_text2">确认密码</p>
          <input type="password" class="password_bar2" placeholder="请再次确认您的密码">
        </div>
        <input type="button" class="login_button" value="提交">
      </form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Register'
}
</script>

<style scoped>
  @import "../../assets/css/register.css";
</style>
