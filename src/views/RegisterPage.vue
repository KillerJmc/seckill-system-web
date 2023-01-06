<template>
  <!-- UI作者：ChaconneLuo -->
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
        <input v-model="checkPassword" @keyup.enter="registerButton" type="password" class="password-bar2"
               placeholder="请再次确认您的密码" autocomplete="off">
      </form>
      <button @click="registerButton" class="register-button">注册</button>
      <p class="back-text">
        已有账户，<router-link to="/">直接登录</router-link>
      </p>
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

// 姓名
const name = ref("")
// 身份证号
const idNumber = ref("")
// 密码
const password = ref("")
// 确认密码
const checkPassword = ref("")

// 注册按钮
const registerButton = async () => {
    // 检查输入是否非空
    if (!name.value || !idNumber.value || !password.value || !checkPassword.value) {
        await alert(MsgMapping.NAME_ID_NUM_PWD_NULL_OR_EMPTY)
        return
    }

    // 检查身份证号是否合法
    if (!Verify.validIdNum(idNumber.value)) {
        alert(MsgMapping.ID_NUM_FORMAT_ERROR)
        return
    }

    // 检查密码是否匹配
    if (password.value !== checkPassword.value) {
        await alert(MsgMapping.ENTER_TWICE_PWD_MISMATCH)
        return
    }

    // 发送注册请求
    let res = await customerStore.register({
        name: name.value,
        idNumber: idNumber.value,
        password: password.value
    })

    // 如果注册成功就显示给用户注册账号信息并跳转登录界面
    if (res.code === 200) {
        await alert("注册成功，您的账号为：" + res.data.account + "，正在为您跳转到登录界面...")
        await router.push("/")
    } else {
        await alert(res.message)
    }
}
</script>

<style src="../assets/css/register.css" scoped />
