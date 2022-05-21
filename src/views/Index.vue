<template>
  <!-- UI作者：ChaconneLuo -->
  <div class="main">
    <div class="login-view">
      <p class="subtitle">欢迎</p>
      <p class="title">账户登陆</p>

      <form class="login-form">
        <p class="account-text">用户账号/身份证号</p>
        <input v-model="accountIdOrIdNumber" type="text" class="account-bar">
        <p class="password-text">密码</p>
        <input v-model="password" @keyup.enter="login" type="password" class="password-bar" autocomplete="on">
      </form>

      <button @click="login" class="login-button">登录</button>
      <router-link to="/register" class="register-button">没有账户？注册一个</router-link>
    </div>
  </div>
</template>

<script>
import MsgMapping from "@/const/msg-mapping";
import Objs from "@/util/objs";

export default {
  name: 'Index',
  data: () => {
    return {
      // 账号或身份证号
      accountIdOrIdNumber: '',
      // 密码
      password: ''
    }
  },
  methods: {
    // 登录按钮
    async login() {
      const { accountIdOrIdNumber, password } = this

      // 检查账号和密码是否非空
      if (Objs.nullOrEmpty(accountIdOrIdNumber, password)) {
        alert(MsgMapping.ACCOUNT_PWD_NULL_OR_EMPTY)
        return
      }

      // 检查账号是否为纯数字
      if (isNaN(accountIdOrIdNumber)) {
        alert(MsgMapping.ACCOUNT_MUST_BE_DIGITS)
        return
      }

      // 发送登录请求
      let res = await this.$store.dispatch('customer/login', {
        accountIdOrIdNumber,
        password
      })

      // 如果登录成功或者重复登录就到申请界面
      if (res.code === 200 || res.message === MsgMapping.LOGIN_REPEAT) {
        await this.$router.push('/apply')
      }
    }
  }
}
</script>

<style src="../assets/css/index.css" scoped />
