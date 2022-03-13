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
        <div class="account-name">{{customer.name}}</div>
      </div>
    </div>

    <div class="content">
      <div class="seckill-form" v-if="!gotoOrderPage">
        <div class="information">
          {{product.name}} <br><br>
          库存总量：{{product.amount}}份
        </div>
        <div class="time">
          活动倒计时:
          <count-down v-if="countDown.display" :remain-time="countDown.remainSeconds" @count-down-end="countDownEnd" />
        </div>
        <div class="button-view">
          <button @click="seckillButton" :class="{'enter-button': true, 'disabled': !enableSeckillButton}">秒杀</button>
        </div>
      </div>

      <div class="seckill-success-form" v-if="gotoOrderPage">
        <div class="order-info-title">订单信息</div>
        <div class="order-info">
          订单编号：{{order.id}}<br>
          订单金额：{{order.price}}元
        </div>
        <div class="button-view">
          <button @click="payOrderButton" class="enter-button">付款</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Cookies from "js-cookie";
import MsgMapping from "@/const/msg-mapping";

import request from "@/network/request";
import CountDown from "@/components/CountDown";

export default {
  name: "Seckill",
  components: {
    CountDown
  },
  data: () => {
    return {
      customer: {
        name: '',
        applied: false,
      },

      countDown: {
        display: false,
        remainSeconds: 0,
        end: false
      },

      seckill: {
        startTime: '',
        url: ''
      },

      product: {
        name: '',
        amount: 0,
      },

      order: {
        id: '',
        price: 0
      },

      gotoOrderPage: false,
    }
  },
  async mounted() {
    let token = Cookies.get('token')
    console.log('token: ' + token)

    // 检查token
    if (token === undefined) {
      await alert(MsgMapping.NOT_LOGGED_ON)
      await this.$router.push('/');
    }

    // 获取客户信息
    let customerInfo = await request.post('/getCustomerInfo')
    if (customerInfo.code !== 200) {
      await alert(customerInfo.message)
      await this.$router.push('/');
    }

    // 检查客户是否已经申请该秒杀活动
    if (!customerInfo.data.applied) {
      await alert(MsgMapping.DOES_NOT_APPLY)
      await this.$router.push('/apply')
      return
    }

    // 展示客户信息
    this.customer.name = customerInfo.data.customerName
    this.customer.applied = customerInfo.data.applied

    // 获取秒杀活动信息
    let activityData = await request.post('/getCurrentSeckillActivity')
    if (activityData.code !== 200) {
      await alert(activityData.message)
      await this.$router.push('/');
      return
    }

    // 展示活动信息
    let activity = activityData.data.activity
    this.seckill.startTime = activity.startTime
    this.product.name = activity.product.name
    this.product.amount = activity.amount

    // 获取倒计时秒数
    let countDownData = await request.post('/getCurrentSeckillCountDown')
    // 初始化倒计时
    this.countDown.remainSeconds = countDownData.data.countDown
    // 展示倒计时
    this.countDown.display = true

    // 每秒获取一次秒杀链接，获取到之后使按钮亮起开启秒杀
    let self = this
    let enableSeckillButtonLoop = setInterval(async () => {
      let seckillUrlData = await request.post('/getSeckillUrl')
      if (seckillUrlData.code === 200) {
        self.seckill.url = seckillUrlData.data.seckillUrl
        console.log('获取到秒杀链接：' + self.seckill.url)
        clearInterval(enableSeckillButtonLoop)
      }
    }, 1000)

  },
  methods: {
    async seckillButton() {
      // 检查秒杀按钮是否开启
      if (!this.enableSeckillButton) {
        await alert("秒杀还没开始！")
        return
      }

      // 尝试秒杀并获取订单
      let orderData = await request.post("/seckill/" + this.seckill.url)
      if (orderData.code !== 200) {
        await alert(orderData.message)
        return
      }

      // 展示订单信息
      let order = orderData.data.order
      this.order.id = order.orderId
      this.order.price = order.orderPrice

      // 展示秒杀成功对话框
      await alert(MsgMapping.SECKILL_SUCCESS)

      // 前往订单页面
      this.gotoOrderPage = true
    },
    payOrderButton() {
      alert("已从您绑定的默认本行卡中扣取款项，支付成功！")
    },
    countDownEnd() {
      this.countDown.end = true
    }
  },
  computed: {
    // 开启秒杀按钮的条件是得到秒杀id并且倒计时结束
    enableSeckillButton() {
      return this.seckill.url !== '' && this.countDown.end
    }
  }
}
</script>

<style src="../assets/css/seckill.css" scoped />

