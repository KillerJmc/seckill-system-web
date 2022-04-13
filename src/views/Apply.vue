<template>
  <div class="main">
    <div class="header">
      <div class="left-block"></div>
      <div class="title">
        <p>Lingyuangou</p>
      </div>
      <div class="right-block"></div>
      <div class="account-bar">
        <div class="account-info">
        </div>
        <div class="account-name">
          <span>{{ customer.name }}</span>
        </div>
      </div>
    </div>

    <div class="bg">
      <div class="main-box">
        <p class="seckill-title">{{ activity.product.name }}</p>
        <p class="seckill-time">秒杀开始时间：{{ activity.startTime }}</p>
        <button class="button" @click="applyButton">申请购买</button>
      </div>

      <div class="desc-box">
        <p class="title">产品简介</p>
        <p class="desc">{{ activity.product.info }}</p>
      </div>

      <div class="rule-box">
        <p class="title">秒杀规则</p>
        <p class="rule">
          是否需要有工作：&emsp;&emsp;&emsp; {{ activity.rule.workStatus ? "是" : "否" }} <br>
          不能处于失信名单中：&emsp; {{ !activity.rule.inCreditBlacklist ? "是" : "否" }} <br>
          年龄限制：&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; {{ activity.rule.minAge }}~{{ activity.rule.maxAge }}岁 <br>
          三年内最多逾期次数：&emsp; {{ activity.rule.maxOverdueTimes }}次 <br>
          三年内最多逾期天数：&emsp; {{ activity.rule.maxOverdueDays }}天 <br>
          三年内最多逾期金额：&emsp; {{ activity.rule.maxOverdueMoney }}元 <br>
        </p>
      </div>
    </div>

    <!-- 确定申请对话框 -->
    <confirm ref="confirmApply" @confirm="apply">
      <template v-slot:content>
        <div style="text-align: left; padding-left: 70px">
          <p>申请人必须满足以下条件</p>
          <br/>
          <p>是否需要有工作：{{ activity.rule.workStatus ? "是" : "否" }}</p>
          <p>不能处于失信名单中：{{ !activity.rule.inCreditBlacklist ? "是" : "否" }}</p>
          <p>年龄限制：{{ activity.rule.minAge }}~{{ activity.rule.maxAge }}岁</p>
          <p>三年内最多逾期次数：{{ activity.rule.maxOverdueTimes }}次</p>
          <p>三年内最多逾期天数：{{ activity.rule.maxOverdueDays }}天</p>
          <p>三年内最多逾期金额：{{ activity.rule.maxOverdueMoney }}元</p>
        </div>
      </template>
    </confirm>

    <!-- 确定申请的结果 -->
    <confirm ref="confirmApplyResult" @confirm="applyResult"/>
  </div>
</template>

<script>
import MsgMapping from "@/const/msg-mapping";
import { Token } from "@/auth/token";
import Confirm from "@/components/Confirm"

export default {
  name: 'Apply',
  components: {
    // 确认框组件
    Confirm
  },
  data: () => {
    return {
      // 客户信息
      customer: {
        // 客户姓名
        name: '',
        // 是否可以申请活动
        canApply: false,
      },
      // 活动
      activity: {
        // 开始时间
        startTime: '',
        // 商品信息
        product: {
          // 商品名称
          name: '',
          // 商品介绍
          info: ''
        },
        // 活动信息
        activityInfo: '',
        // 活动规则
        rule: {
          "workStatus": true,
          "inCreditBlacklist": false,
          "minAge": 0,
          "maxAge": 0,
          "maxOverdueTimes": 0,
          "maxOverdueDays": 0,
          "maxOverdueMoney": 0,
        }
      }
    }
  },
  async mounted() {
    await this.init()
  },
  methods: {
    // 初始化页面函数
    async init() {
      // 没有token就回到登录界面
      if (!Token.verify()) {
        await this.$router.push('/');
      }

      // 获取客户信息
      let customerInfo = await this.$store.dispatch('customer/getInfo')

      // 请求当前秒杀活动信息
      let activityInfo = await this.$store.dispatch('activity/getCurrent')

      // 请求失败就返回登录界面
      if (customerInfo.code === 500 || activityInfo.code === 500) {
        await this.$router.push('/');
      }

      // 填充客户信息
      this.customer = customerInfo.data

      // 填充秒杀活动信息
      this.activity = activityInfo.data
    },

    // 申请按钮
    applyButton() {
      // 显示确认对话框
      this.$refs.confirmApply.show({
        title: '申请须知',
        confirmText: '确定申请'
      })
    },

    // 申请
    async apply() {
      // 如果不符合条件就显示失败信息
      if (!this.customer.canApply) {
        this.$refs.confirmApplyResult.show({
          title: '申请结果',
          type: 'alert',
          // 内容为申请失败
          content: MsgMapping.APPLY_FAILED
        })
        return
      }

      // 发送申请请求
      let res = await this.$store.dispatch('activity/apply')

      // 显示确认申请的结果对话框
      await this.$refs.confirmApplyResult.show({
        title: '申请结果',
        type: 'alert',
        // 内容为申请结果信息
        content: res.message,
        // 传入数据为申请结果
        data: res
      })
    },

    applyResult() {
      // 申请结果数据
      let res = this.$refs.confirmApplyResult.data;
      // 申请成功或重复申请 就跳转到秒杀页面
      if (res.code === 200 || res.message === MsgMapping.APPLY_REPEAT) {
        this.$router.push('/seckill')
      }
    }
  }
}
</script>

<style src="../assets/css/apply.css" scoped />
