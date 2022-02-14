<template>
  <div class="main">
    <div class="container">
      <div class="gradient-box"></div>
      <div class="bg"></div>

      <p class="logo">Lingyuango</p>

      <div class="customer-pic"></div>
      <div class="customer-name">{{customerName}}</div>
    </div>

    <div class="product-info-box">
      <div class="seckill-time">秒杀开始时间：<span class="seckill-time-str">{{startTime}}</span></div>
      <p class="product-name">{{productName}}</p>
      <p class="product-desc">{{productInfo}}</p>
      <button @click="apply" :class="{'apply-button': true, 'disabled': !canApply }">申请购买</button>
    </div>

    <div class="seckill-desc-box">
      <p class="title">描述</p>
      <p class="desc">{{activityInfo}}</p>
    </div>

    <div class="seckill-rule-box">
      <p class="title">规则</p>
      <p class="rule">
      是否需要有工作：&emsp;&emsp;&emsp; {{activityRule.workStatus ? "是" : "否"}} <br>
      不能处于失信名单中：&emsp; {{!activityRule.inCreditBlacklist ? "是" : "否"}} <br>
      年龄限制：&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; {{activityRule.minAge}}岁到{{activityRule.maxAge}}岁 <br>
      三年内最多逾期次数：&emsp; {{activityRule.maxOverdueTimes}}次 <br>
      三年内最多逾期天数：&emsp; {{activityRule.maxOverdueDays}}天 <br>
      三年内最多逾期金额：&emsp; {{activityRule.maxOverdueMoney}}元 <br>
      </p>
    </div>
  </div>
</template>

<script>

import request from "../../network/request";
import {goto} from "../../util/goto";
import Cookies from "js-cookie"
import MsgMapping from "../../const/msg-mapping";

export default {
  name: 'Apply',
  data: () => {
    return {
      customerName: '',
      canApply: true,
      startTime: '',
      productName: '',
      productInfo: '',
      activityInfo: '',
      activityRule: {
        "workStatus": true,
        "inCreditBlacklist": false,
        "minAge": 0,
        "maxAge": 0,
        "maxOverdueTimes": 0,
        "maxOverdueDays": 0,
        "maxOverdueMoney": 0,
      }
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
    this.canApply = customerInfo.data.canApply

    let activityData = await request.post('/getCurrentSeckillActivity')

    if (activityData.code !== 200) {
      await alert(activityData.message)
      goto('/');
    }

    let activity = activityData.data.seckillActivity
    this.startTime = activity.startTime
    this.productName = activity.product.name
    this.productInfo = activity.product.info
    this.activityInfo = activity.activityInfo
    this.activityRule = activity.activityRule
  },
  methods: {
    async apply() {
      if (!this.canApply) {
        await alert(MsgMapping.APPLY_FAILED)
        return
      }

      let data = await request.post('/applyForSeckill')

      await alert(data.message)

      if (data.code === 500) {
        goto(data.message === MsgMapping.APPLY_REPEAT ? '/seckill' : '/')
        return
      }

      goto('/seckill')
    }
  }
}
</script>

<style scoped>
  @import "../../assets/css/apply.css";
</style>
