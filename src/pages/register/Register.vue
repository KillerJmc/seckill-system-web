<template>
  <div class="main">
    <div class="login-view">
      <p class="title">账户注册</p>
      <div class="login-form">
        <p class="account-text">用户姓名</p>
        <input v-model="name" type="text" class="account-bar" placeholder="请输入您的真实姓名">
        <p class="id-number-text">身份证号码</p>
        <input v-model="idNumber" type="text" class="id-number-bar" placeholder="请输入您的身份证号码">
        <p class="password-text">密码</p>
        <input v-model="password" type="password" class="password-bar" placeholder="请设置您的密码">
        <p class="password-text2">确认密码</p>
        <input v-model="checkPassword" type="password" class="password-bar2" placeholder="请再次确认您的密码">
      </div>
      <button @click="register" class="login-button">注册</button>
      <p class="back-text">
        已有账户，<a href="/" class="back-link">直接登录</a>
      </p>
    </div>
  </div>
</template>

<script>
import crypt from "../../util/crypt.js";
import request from "../../network/request.js";
import "../../util/goto.js"
import {goto} from "../../util/goto";
import MsgMapping from "../../const/msg-mapping";

export default {
  name: 'Register',
  data: () => {
    return {
      name: '',
      idNumber: '',
      password: '',
      checkPassword: ''
    }
  },
  methods: {
    async register() {
      if (this.name === '' || this.idNumber === '' || this.password === '' || this.checkPassword === '') {
        await alert(MsgMapping.NAME_ID_NUM_PWD_NULL_OR_EMPTY)
        return
      }

      if (this.password !== this.checkPassword) {
        await alert("两次输入的密码不匹配！")
        return
      }

      let hashedPassword = crypt.hash(this.password)
      let res = await request.post('/register', {
        name: this.name,
        idNumber: this.idNumber,
        password: hashedPassword
      })

      if (res.code === 500) {
        alert(res.message)
        return
      }

      let accountId = res.data.accountId
      await alert("注册成功，您的账号为：" + accountId + "，正在为您跳转到登录界面...")
      goto("/login")
    }
  }
}
</script>

<style scoped>
  @import "../../assets/css/register.css";
</style>
