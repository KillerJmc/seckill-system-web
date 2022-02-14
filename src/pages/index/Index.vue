<template>
  <div class="main">
    <div class="login-view">
      <p class="subtitle">欢迎</p>
      <p class="title">账户登陆</p>

      <div class="login-form">
        <p class="account_text">用户账号/身份证号</p>
        <input v-model="accountIdOrIdNumber" type="text" class="account-bar">
        <p class="password_text">密码</p>
        <input v-model="password" type="password" class="password-bar">
      </div>

      <button @click="login" class="login-button">登录</button>
      <button @click="gotoRegister" class="register-button">没有账户？注册一个</button>
    </div>
  </div>
</template>

<script>
import crypt from "../../util/crypt.js";
import request from "../../network/request.js"
import {goto} from "../../util/goto.js";
import MsgMapping from "../../const/msg-mapping";
import Verify from "../../util/verify";

export default {
  name: 'Index',
  data: () => {
    return {
      accountIdOrIdNumber: '',
      password: ''
    }
  },
  methods: {
    async login() {
      if (this.accountId === '' || this.password === '') {
        await alert(MsgMapping.ACCOUNT_PWD_NULL_OR_EMPTY)
        return
      }

      let hashedPassword = crypt.hash(this.password)
      let customer = Verify.validIdNum(this.accountIdOrIdNumber) ?
        {
          idNumber: this.accountIdOrIdNumber,
          password: hashedPassword
        }
      :
        {
          accountId: this.accountIdOrIdNumber,
          password: hashedPassword
        }

      let res = await request.post('/login', customer)

      if (res.code === 500) {
        await alert(res.message)
        if (res.message !== MsgMapping.LOGIN_REPEAT) {
          return
        }
      }

      goto('/apply')
    },
    gotoRegister() {
      goto('/register')
    }
  }
}
</script>

<style scoped>
  @import "../../assets/css/index.css";
</style>
