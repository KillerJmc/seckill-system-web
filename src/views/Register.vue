<template>
  <div class="main">
    <div class="register-view">
      <p class="title">账户注册</p>
      <form class="register-form">
        <p class="account-text">用户姓名</p>
        <input v-model="name" type="text" class="account-bar" placeholder="请输入您的真实姓名">
        <p class="id-number-text">身份证号码</p>
        <input v-model="idNumber" type="text" class="id-number-bar" placeholder="请输入您的身份证号码">
        <p class="password-text">密码</p>
        <input v-model="password" type="password" class="password-bar" placeholder="请设置您的密码" autocomplete="off">
        <p class="password-text2">确认密码</p>
        <input v-model="checkPassword" @keyup.enter="register" type="password" class="password-bar2"
               placeholder="请再次确认您的密码" autocomplete="off">
      </form>
      <button @click="register" class="register-button">注册</button>
      <p class="back-text">
        已有账户，<router-link to="/">直接登录</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import MsgMapping from "@/const/msg-mapping";
import Objs from "@/util/objs";

export default {
  name: 'Register',
  data: () => {
    return {
      // 姓名
      name: '',
      // 身份证号
      idNumber: '',
      // 密码
      password: '',
      // 确认密码
      checkPassword: ''
    }
  },
  methods: {
    // 注册按钮
    async register() {
      const { name, idNumber, password, checkPassword } = this

      // 检查输入是否非空
      if (Objs.nullOrEmpty(name, idNumber, password, checkPassword)) {
        await alert(MsgMapping.NAME_ID_NUM_PWD_NULL_OR_EMPTY)
        return
      }

      // 检查密码是否匹配
      if (password !== checkPassword) {
        await alert(MsgMapping.ENTER_TWICE_PWD_MISMATCH)
        return
      }

      // 发送注册请求
      let res = await this.$store.dispatch('customer/register', {
        name,
        idNumber,
        password
      })

      // 如果注册成功就显示给用户注册账号信息并跳转登录界面
      if (res.code !== 500) {
        await alert("注册成功，您的账号为：" + res.data.accountId + "，正在为您跳转到登录界面...")
        await this.$router.push('/')
      }
    }
  }
}
</script>

<style src="../assets/css/register.css" scoped />
