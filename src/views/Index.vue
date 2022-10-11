<template>
  <!-- UI作者：ChaconneLuo -->
  <div class="main">
    <div class="login-view">
      <p class="subtitle">欢迎</p>
      <p class="title">账户登陆</p>

      <form class="login-form">
        <p class="account-text">用户账号/身份证号</p>
        <input v-model="accountIdOrIdNumber" type="number" class="account-bar">
        <p class="password-text">密码</p>
        <input v-model="password" @keyup.enter="login" type="password" class="password-bar" autocomplete="on">
      </form>

      <button @click="login" class="login-button">登录</button>
      <router-link to="/register" class="register-button">没有账户？注册一个</router-link>
    </div>
  </div>
</template>

<script setup>
import MsgMapping from "@/const/msg-mapping";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

// 账号或身份证号
const accountIdOrIdNumber = ref('')

// 密码
const password = ref('')

// 登录按钮
const login = async() => {
    // 检查账号和密码是否非空
    if (!accountIdOrIdNumber.value || !password.value) {
        alert(MsgMapping.ACCOUNT_PWD_NULL_OR_EMPTY)
        return
    }

    // 发送登录请求
    let res = await store.dispatch('customer/login', {
        accountIdOrIdNumber: accountIdOrIdNumber.value,
        password: password.value
    })

    // 如果登录成功或者重复登录就到申请界面
    if (res.code === 200 || res.message === MsgMapping.LOGIN_REPEAT) {
        await router.push('/apply')
    }
}
</script>

<style src="../assets/css/index.css" scoped />
