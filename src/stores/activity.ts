import { defineStore } from "pinia"
import { useCustomerStore } from "@/stores/customer"
import Activity from "@/api/activity"
import MsgMapping from "@/const/msg-mapping"
import type { PromiseR } from "@/network/request"
import type { Order } from "@/api/activity"
import type { ActivityInfo } from "@/api/activity"
import type { PaymentStatus } from "@/api/activity"

const customerStore = useCustomerStore()

export const useActivityStore = defineStore("activity", {
    state: () => ({
        activity: {} as ActivityInfo
    }),
    actions: {
        // 清空store
        clearAll() {
            this.activity = {} as ActivityInfo
            console.warn("apply: clear store!")
        },

        // 获取当前秒杀活动信息事件
        async getCurrent(): PromiseR<ActivityInfo> {
            // 如果Vuex中有数据就直接返回
            if (Object.keys(this.activity).length) {
                console.log("activity: get from cache!")
                return {
                    code: 200,
                    data: this.activity,
                }
            }

            // 发送api请求
            const res = await Activity.getCurrent()

            // 如果请求成功就放入Vuex缓存
            if (res.code === 200) {
                this.activity = res.data
            }
            return res
        },

        // 申请秒杀事件
        async apply(): PromiseR<void> {
            // 发送api请求
            const res = await Activity.apply()

            // 如果请求成功或者重复申请
            if (res.code === 200 || res.message === MsgMapping.APPLY_REPEAT) {
                // 更新Vuex缓存
                customerStore.applied = true
                console.log("apply: update cache (customer.applied -> true)")
            }
            return res
        },

        // 获得活动倒计时事件
        async getCountDown(): PromiseR<number> {
            return Activity.getCountDown()
        },

        // 获取秒杀链接事件
        async getSeckillUrl(): PromiseR<string> {
            return Activity.getSeckillUrl()
        },

        // 秒杀事件
        async seckill(seckillUrl: string): PromiseR<void> {
            return Activity.seckill(seckillUrl)
        },

        // 获取订单事件
        async getOrder(): PromiseR<Order> {
            return Activity.getOrder()
        },

        // 付款事件
        async pay(orderId: string): PromiseR<PaymentStatus> {
            return Activity.pay(orderId)
        }
    }
})
