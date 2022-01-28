<template>
  <div class="main">
    <div class="login_view">
      <p class="subtitle">欢迎</p>
      <p class="title">账户登陆</p>

      <div class="login_form">
        <p class="account_text">用户账号</p>
        <input v-model="accountId" type="text" class="account_bar">
        <p class="password_text">密码</p>
        <input v-model="password" type="password" class="password_bar">
      </div>

      <input @click="login" type="button" class="login_button" value="登录">
      <a href="register.html"><input type="button" class="register_button" value="没有账户？注册一个"></a>
    </div>
  </div>
</template>

<script>
import crypt from "../../util/crypt.js";
import request from "../../network/request.js"

export default {
  name: 'Index',
  data: () => {
    return {
      accountId: '',
      password: ''
    }
  },
  methods: {
    async login() {
      let hashedPassword = crypt.hash(this.password)
      let res = await request.post('/login', {
        accountId: this.accountId,
        password: hashedPassword
      })

      alert(JSON.stringify(res, null, 4))
    }
  }
}
</script>

<style scoped>
  @import "../../assets/css/index.css";
</style>
