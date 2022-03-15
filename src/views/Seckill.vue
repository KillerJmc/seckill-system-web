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
        <div class="account-name">{{ customer.name }}</div>
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
          <count-down v-if="countDown.display" :remain-time="countDown.remainSeconds" @count-down-end="countDownEnd"/>
        </div>
        <div class="button-view">
          <button @click="seckillButton" :class="{'enter-button': true, 'disabled': !enableSeckillButton}">秒杀</button>
        </div>
      </div>

      <div class="seckill-success-form" v-if="gotoOrderPage">
        <div class="order-info-title">订单信息</div>
        <div class="order-info">
          订单编号：{{ order.orderId }}<br>
          订单金额：{{ order.orderPrice }}元
        </div>
        <div class="button-view">
          <button @click="payOrderButton" class="enter-button">付款</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import MsgMapping from "@/const/msg-mapping";

import CountDown from "@/components/CountDown";
import { Token } from "@/auth/token";

export default {
  name: "Seckill",
  components: {
    // 倒计时组件
    CountDown
  },
  data: () => {
    return {
      // 客户信息
      customer: {
        // 客户姓名
        name: '',
        // 是否申请过活动
        applied: false,
      },

      // 活动信息
      activity: {
        // 开始时间
        startTime: '',
        // 商品信息
        product: {
          // 商品名称
          name: '',
          // 商品介绍
          info: '',
        },
        // 库存总量
        amount: 0
      },

      // 秒杀倒计时
      countDown: {
        // 是否显示
        display: false,
        // 剩余时间（秒）
        remainSeconds: 0,
        // 是否结束
        end: false
      },

      // 秒杀链接
      seckillUrl: '',

      // 是否前往订单页面
      gotoOrderPage: false,

      // 订单信息
      order: {
        // 订单id
        orderId: '',
        // 订单价格
        orderPrice: 0
      }
    }
  },
  async mounted() {
    // 如果没有token就跳转登录
    if (!Token.verify()) {
      await this.$router.push('/');
    }

    // 请求客户信息
    let customerInfo = await this.$store.dispatch('customer/getInfo')

    // 请求当前秒杀活动信息
    let activityInfo = await this.$store.dispatch('activity/getCurrent')

    // 如果请求失败就返回主页
    if (customerInfo.code !== 200 || activityInfo.code !== 200) {
      await this.$router.push('/');
    }

    // 填充客户信息
    this.customer = customerInfo.data

    // 填充秒杀活动信息
    this.activity = activityInfo.data.activity

    // 如果没有申请活动就返回申请页面
    if (!this.customer.applied) {
      alert(MsgMapping.DOES_NOT_APPLY)
      await this.$router.push('/apply')
      return
    }

    // 获取倒计时秒数
    let countDownData = await this.$store.dispatch('activity/getCountDown')
    // 初始化倒计时
    this.countDown.remainSeconds = countDownData.data.countDown
    // 展示倒计时
    this.countDown.display = true

    // 每秒获取一次秒杀链接，获取到之后使按钮亮起开启秒杀
    let self = this
    let enableSeckillButtonLoop = setInterval(async () => {
      let res = await this.$store.dispatch('activity/getSeckillUrl')
      if (res.code === 200) {
        self.seckillUrl = res.data.seckillUrl
        console.log('获取到秒杀链接：' + self.seckillUrl)
        clearInterval(enableSeckillButtonLoop)
      }
    }, 1000)
  },
  methods: {
    async seckillButton() {
      // 秒杀按钮未开启就提示信息
      if (!this.enableSeckillButton) {
        await alert(MsgMapping.SECKILL_NOT_STARTED)
        return
      }

      // 尝试秒杀并获取订单
      let orderData = await this.$store.dispatch('activity/seckill', this.seckillUrl)

      // 请求失败就结束
      if (orderData.code === 500) {
        return
      }

      // 展示订单信息
      this.order = orderData.data.order

      // 展示秒杀成功对话框
      await alert(MsgMapping.SECKILL_SUCCESS)

      // 前往订单页面
      this.gotoOrderPage = true
    },
    // 支付订单按钮
    payOrderButton() {
      alert("已从您绑定的默认本行卡中扣取款项，支付成功！")
    },
    // 倒计时结束
    countDownEnd() {
      this.countDown.end = true
    }
  },
  computed: {
    // 是否开启秒杀按钮
    enableSeckillButton() {
      // 开启秒杀按钮的条件是客户已经得到秒杀id且倒计时结束
      return this.seckillUrl !== '' && this.countDown.end
    }
  }
}
</script>

<style src="../assets/css/seckill.css" scoped/>

