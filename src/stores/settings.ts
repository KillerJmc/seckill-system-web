import { defineStore } from "pinia"
import { Token } from "@/auth/token"
import { useActivityStore } from "@/stores/activity"
import { useCustomerStore } from "@/stores/customer"

const activityStore = useActivityStore()
const customerStore = useCustomerStore()

export const useSettingsStore = defineStore("settings", {
    actions: {
        // 退出登录
        async logout() {
            // 调用退出登录接口
            await customerStore.logout()

            // 清除token
            Token.delete()

            // 清除stores
            activityStore.clearAll()
            customerStore.clearAll()
        },

        // 验证是否登录
        verifyLogin(): boolean {
            // 没有token并且store不含有客户名就是未登录状态
            return !(customerStore.name === "" && !Token.get());
        }
    }
})

