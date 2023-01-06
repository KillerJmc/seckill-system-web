<template>
  <!-- UI作者：ChaconneLuo -->
  <div class="main">
    <div class="login-view">
      <p class="subtitle">欢迎</p>
      <p class="title">账户登陆</p>

      <form class="login-form">
        <p class="account-text">用户账号/身份证号</p>
        <input v-model="accountOrIdNumber" class="account-bar">
        <p class="password-text">密码</p>
        <input v-model="password" @keyup.enter="login" type="password" class="password-bar" autocomplete="on">
      </form>

      <button @click="login" class="login-button">登录</button>
      <router-link to="/register" class="register-button">没有账户？注册一个</router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MsgMapping from "@/const/msg-mapping"
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useCustomerStore } from "@/stores/customer"
import { useSettingsStore } from "@/stores/settings"
import { onBeforeMount } from "vue"
import Verify from "@/util/verify"

const router = useRouter()
const customerStore = useCustomerStore()
const settingsStore = useSettingsStore()

onBeforeMount(async () => {
    // 已登录就跳转申请页
    if (settingsStore.verifyLogin()) {
        await router.push("/apply")
    }
})

// 账号或身份证号
const accountOrIdNumber = ref("")

// 密码
const password = ref("")

// 登录按钮
const login = async() => {
    // 检查账号和密码是否非空
    if (!accountOrIdNumber.value || !password.value) {
        alert(MsgMapping.ACCOUNT_PWD_NULL_OR_EMPTY)
        return
    }

    // 检查账号是否合法
    if (!Verify.validAccount(accountOrIdNumber.value)) {
        alert(MsgMapping.INVALID_ACCOUNT)
        return
    }

    // 发送登录请求
    let res = await customerStore.login({
        accountOrIdNumber: accountOrIdNumber.value,
        password: password.value
    })

    // 登录不成功显示错误信息
    if (res.code === 500) {
        alert(res.message)
    }

    // 如果登录成功或者重复登录就到申请界面
    if (res.code === 200 || res.message === MsgMapping.LOGIN_REPEAT) {
        await router.push("/apply")
    }
}
</script>

<style src="../assets/css/index.css" scoped />
