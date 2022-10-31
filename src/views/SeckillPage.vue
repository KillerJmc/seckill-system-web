<template>
  <!-- UI作者：ChaconneLuo -->
  <div>
    <div class="header">
      <div class="left-block"></div>
      <div class="title">
        <p>Lingyuangou</p>
      </div>
      <div class="right-block"></div>
      <div class="account-bar">
        <div class="account-info">
        </div>
        <div class="account-name">{{ customer.name }}</div>
        <div class="log-out" @click="logOut">退出登录</div>
      </div>
    </div>

    <div class="content">
      <div class="seckill-form" v-if="!gotoOrderPage">
        <div class="information">
          {{ activity.product.name }} <br><br>
          库存总量：{{ activity.amount }}份
        </div>
        <div class="time">
          活动倒计时:
          <CountDown v-if="countDown.display" :remain-time="countDown.remainSeconds" @count-down-end="countDownEnd"/>
        </div>
        <div class="button-view">
          <button @click="seckillButton" :class="{'enter-button': true, 'disabled': !enableSeckillButton}">秒杀</button>
        </div>
      </div>

      <div class="seckill-success-form" v-if="gotoOrderPage">
        <div class="order-info-title">订单信息</div>
        <div class="order-info">
          订单编号：{{ order.orderId }}<br>
          订单金额：{{ order.money }}元
        </div>
        <div class="button-view">
          <button @click="payOrderButton" class="enter-button">付款</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MsgMapping from "@/const/msg-mapping"
import CountDown from "@/components/CountDown.vue"
import { Token } from "@/auth/token"
import { computed, onBeforeMount, ref } from "vue"
import { useRouter } from "vue-router"
import { useCustomerStore } from "@/stores/customer"
import { useActivityStore } from "@/stores/activity"
import { useSettingsStore } from "@/stores/settings"
import type { CustomerInfo } from "@/api/customer"
import type { ActivityInfo, Order } from "@/api/activity"
import { reactive } from "vue"

const router = useRouter()
const customerStore = useCustomerStore()
const activityStore = useActivityStore()
const settingsStore = useSettingsStore()

// 客户信息
const customer = ref({} as CustomerInfo)

// 活动信息
const activity = ref({ product: {}, rule: {} } as ActivityInfo)

// 秒杀链接
const seckillUrl = ref("")

// 是否前往订单页面
const gotoOrderPage = ref(false)

// 订单信息
const order = ref({} as Order)

// 秒杀倒计时
const countDown = reactive({
    remainSeconds: 0,
    display: false,
    end: true
})

// 是否开启秒杀按钮
const enableSeckillButton = computed(() => {
    // 开启秒杀按钮的条件是客户已经得到秒杀id且倒计时结束
    return seckillUrl.value !== "" && countDown.end
})

onBeforeMount(async () => {
    // 如果没有token就跳转登录
    if (!Token.verify()) {
        await router.push("/")
    }

    // 请求客户信息
    let customerInfo = await customerStore.getInfo()

    // 请求当前秒杀活动信息
    let activityInfo = await activityStore.getCurrent()

    // 如果请求失败就返回主页
    if (customerInfo.code !== 200 || activityInfo.code !== 200) {
        await router.push("/")
    }

    // 填充客户信息
    customer.value = customerInfo.data

    // 填充秒杀活动信息
    activity.value = activityInfo.data

    // 如果没有申请活动就返回申请页面
    if (!customer.value.applied) {
        console.warn("用户未申请活动！")
        await router.push("/apply")
        return
    }

    // 获得倒计时秒数并初始化倒计时组件
    countDown.remainSeconds = (await activityStore.getCountDown()).data
    // 展示倒计时
    countDown.display = true

    // 倒计时结束后每秒获取一次秒杀链接，获取到之后使按钮亮起开启秒杀
    let enableSeckillButtonLoop = setInterval(async () => {
        if (countDown.end) {
            let res = await activityStore.getSeckillUrl()
            if (res.code === 200) {
                seckillUrl.value = res.data
                console.log("获取到秒杀链接：" + seckillUrl.value)
                clearInterval(enableSeckillButtonLoop)
            }
        }
    }, 1000)
})

const seckillButton = async () => {
    // 秒杀按钮未开启就提示信息
    if (!enableSeckillButton.value) {
        await alert(MsgMapping.SECKILL_NOT_STARTED)
        return
    }

    // 尝试秒杀
    let seckillRes = await activityStore.seckill(seckillUrl.value)

    // 如果请求失败且不是重复购买的错误就返回
    if (seckillRes.code === 500) {
        alert(seckillRes.message)
        if (seckillRes.message !== MsgMapping.PURCHASE_REPEAT) {
            return
        }
    }

    // 如果请求成功就打印成功信息
    if (seckillRes.code === 200) {
        await alert(MsgMapping.SECKILL_SUCCESS)
    }

    // 获取订单
    let orderData = await activityStore.getOrder()

    // 获取失败就结束
    if (orderData.code === 500) {
        return
    }

    // 检查是否下订单失败
    const { putOrderSuccess } = orderData.data
    if (!putOrderSuccess) {
        await alert(MsgMapping.PUT_ORDER_FAILED)
        return
    }

    // 展示订单信息
    order.value = orderData.data

    // 前往订单页面
    gotoOrderPage.value = true
}

// 支付订单按钮
const payOrderButton = async () => {
    // 发送支付请求
    let paymentStatusData = await activityStore.pay(order.value.orderId)

    // 判断支付失败
    if (paymentStatusData.code === 500) {
        await alert(paymentStatusData.message)
        return
    }

    // 支付成功
    await alert(MsgMapping.PURCHASE_SUCCESS)
}

// 倒计时结束
const countDownEnd = () => {
    countDown.end = true
}

// 退出登录
const logOut = () => {
    settingsStore.logout()
    router.push("/")
}
</script>

<style src="../assets/css/seckill.css" scoped/>

