<template>
  <div>
    <div class="header">
      <div class="left-block"></div>
      <div class="title">
        <div class="title-logo"></div>
      </div>
      <div class="right-block"></div>
      <div class="account-bar">
        <div class="account-info">
        </div>
        <div class="account-name">{{customerName}}</div>
      </div>
    </div>
    <div class="content">
      <div class="form">
        <div class="information">
          <p>
            {{productName}} <br><br>
            库存总量：{{productAmount}}份
          </p>
        </div>
        <div class="time">活动倒计时: <count-down v-if="displayCountDown" :remain-time="countDown" v-on:count-down-end="enableSeckill"></count-down></div>
        <button @click="seckill" :class="{'enter-button': true, 'disabled': !start}">秒杀</button>
      </div>
    </div>
  </div>
</template>

<script>

import Cookies from "js-cookie";
import MsgMapping from "../../const/msg-mapping";
import {goto} from "../../util/goto";
import request from "../../network/request";
import CountDown from "../../components/CountDown";

export default {
  name: "Seckill",
  components: {
    CountDown
  },
  data: () => {
    return {
      customerName: '',
      applied: false,
      startTime: '',
      productName: '',
      productAmount: 0,

      displayCountDown: false,
      countDown: 0,
      start: false
    }
  },
  async mounted() {
    let token = Cookies.get('token')
    console.log('token: ' + token)

    if (token === undefined) {
      await alert(MsgMapping.NOT_LOGGED_ON)
      goto('/');
    }

    let customerInfo = await request.post('/getCustomerInfo')
    if (customerInfo.code !== 200) {
      await alert(customerInfo.message)
      goto('/');
    }

    this.customerName = customerInfo.data.customerName
    this.applied = customerInfo.data.applied

    if (!this.applied) {
      await alert(MsgMapping.DOES_NOT_APPLY)
      goto('/apply')
      return
    }

    let activityData = await request.post('/getCurrentSeckillActivity')

    if (activityData.code !== 200) {
      await alert(activityData.message)
      goto('/');
      return
    }

    let activity = activityData.data.seckillActivity
    this.startTime = activity.startTime
    this.productName = activity.product.name
    this.productAmount = activity.amount

    let countDownData = await request.post('/getCurrentSeckillCountDown')
    this.countDown = countDownData.data.countDown
    // 显示倒计时
    this.displayCountDown = true

  },
  methods: {
    // 子组件结束后发信号让秒杀按钮亮起
    enableSeckill() {
      this.start = true
    },

    async seckill() {
      if (!this.start) {
        await alert("秒杀还没开始！")
        return
      }


    }
  }
}
</script>

<style scoped>
  @import "../../assets/css/seckill.css";
</style>
