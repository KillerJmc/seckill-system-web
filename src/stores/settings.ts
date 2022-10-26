import { defineStore } from "pinia"
import { Token } from "@/auth/token"
import { useActivityStore } from "@/stores/activity"
import { useCustomerStore } from "@/stores/customer"

const activityStore = useActivityStore()
const customerStore = useCustomerStore()

export const useSettingsStore = defineStore("settings", {
    actions: {
        // 退出登录
        logout() {
            activityStore.clearAll()
            customerStore.clearAll()
            Token.delete()
        }
    }
})

