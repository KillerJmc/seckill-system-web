<template>
  <!-- UI作者：Bilipear -->
  <div class="main">
    <div class="header">
      <div class="left-block"></div>
      <div class="title">
        <p>Lingyuangou</p>
      </div>
      <div class="right-block"></div>
      <div class="account-bar">
        <div class="account-info"></div>
        <div class="account-name">
          <span>{{ customer.name }}</span>
        </div>
        <div class="log-out" @click="logOut">退出登录</div>
      </div>
    </div>

    <div class="bg">
      <div class="main-box">
        <p class="seckill-title">{{ activity.product.name }}</p>
        <p class="seckill-time">秒杀开始时间：{{ activity.startTime }}</p>
        <button class="button" @click="applyDialogShow = true">申请购买</button>
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
    <ConfirmDialog title="申请须知" confirmText="确定申请" v-model:show="applyDialogShow" @confirm="apply">
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
    </ConfirmDialog>

    <!-- 申请结果对话框 -->
    <ConfirmDialog title="申请结果"
             type="alert"
             :content="applyResultDialogContent"
             v-model:show="applyResultDialogShow"
             @confirm="goToSeckill" />
  </div>
</template>

<script lang="ts" setup>
import MsgMapping from "@/const/msg-mapping"
import ConfirmDialog from "@/components/ConfirmDialog.vue"
import { Token } from "@/auth/token"
import { useRouter } from "vue-router"
import { useCustomerStore } from "@/stores/customer"
import { useActivityStore } from "@/stores/activity"
import type { CustomerInfo } from "@/api/customer"
import type { R } from "@/network/request"
import { useSettingsStore } from "@/stores/settings"
import type { ActivityInfo } from "@/api/activity"
import { ref, onBeforeMount } from "vue"

const router = useRouter()
const customerStore = useCustomerStore()
const activityStore = useActivityStore()
const settingsStore = useSettingsStore()

// 确认申请对话框是否显示
const applyDialogShow = ref(false)

// 确认申请结果对话框是否显示
const applyResultDialogShow = ref(false)
// 确认申请结果对话框内容
const applyResultDialogContent = ref("")

// 申请结果
let applyResult = {} as R<void>

// 客户信息
const customer = ref({} as CustomerInfo)

// 活动信息
const activity = ref({ product: {}, rule: {} } as ActivityInfo)

onBeforeMount(async() => {
    // 没有token就回到登录界面
    if (!Token.verify()) {
        await router.push("/")
    }

    // 获取客户信息
    let customerInfo = await customerStore.getInfo()

    // 请求当前秒杀活动信息
    let activityInfo = await activityStore.getCurrent()

    // 请求失败就返回登录界面
    if (customerInfo.code === 500 || activityInfo.code === 500) {
        await router.push("/")
    }

    // 填充客户信息
    customer.value = customerInfo.data

    // 填充秒杀活动信息
    activity.value = activityInfo.data
})

// 确认申请按钮
const apply = async () => {
    // 如果不符合条件就显示失败申请结果
    if (!customer.value.canApply) {
        // 对话框内容为申请失败
        applyResultDialogContent.value = MsgMapping.APPLY_FAILED
        // 显示申请结果对话框
        applyResultDialogShow.value = true
        return
    }

    // 获取申请结果
    applyResult = await activityStore.apply()

    // 对话框内容为申请结果
    applyResultDialogContent.value = applyResult.code === 200 ? MsgMapping.APPLY_SUCCESS : MsgMapping.APPLY_FAILED
    // 显示申请结果对话框
    applyResultDialogShow.value = true
}

// 前往秒杀页面
const goToSeckill = async() => {
    // 申请成功或重复申请 就跳转到秒杀页面
    if (applyResult.code === 200 || applyResult.message === MsgMapping.APPLY_REPEAT) {
        await router.push("/seckill")
    }
}

// 退出登录
const logOut = () => {
    settingsStore.logout()
    router.push("/")
}
</script>

<style src="../assets/css/apply.css" scoped />
