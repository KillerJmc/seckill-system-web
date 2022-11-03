import { defineStore } from "pinia"
import Customer from "@/api/customer"
import Crypt from "@/util/crypt"
import Verify from "@/util/verify"
import type { CustomerInfo, RegisterForm, RegisterResult } from "@/api/customer"
import type { LoginForm } from "@/api/customer"
import type { PromiseR } from "@/network/request"

export const useCustomerStore = defineStore("customer", {
    state: () => ({
        // 姓名
        name: "",
        // 是否可以申请活动
        canApply: false,
        // 是否申请过活动
        applied: false
    }),
    actions: {
        // 清空store
        clearAll() {
            this.name = ""
            this.canApply = false
            this.applied = false
            console.warn("customer: clear store!")
        },

        // 登录事件
        login(loginForm: LoginForm): PromiseR<void> {
            const { accountIdOrIdNumber } = loginForm

            // 加密密码
            loginForm.password = Crypt.hash(loginForm.password)

            // 发送api请求
            if (Verify.validIdNum(accountIdOrIdNumber!)) {
                loginForm.idNumber = accountIdOrIdNumber
                return Customer.loginByIdNumber(loginForm)
            } else {
                loginForm.accountId = accountIdOrIdNumber
                return Customer.loginByAccount(loginForm)
            }
        },

        // 注册事件
        register(registerForm: RegisterForm): PromiseR<RegisterResult> {
            // 加密密码
            registerForm.password = Crypt.hash(registerForm.password)

            // 发送注册请求
            return Customer.register(registerForm)
        },

        // 退出登录事件
        logout(): PromiseR<void> {
            return Customer.logout()
        },

        // 获取客户信息事件
        async getInfo(): PromiseR<CustomerInfo> {
            // 如果Vuex有数据就直接返回
            if (this.name !== "") {
                console.log("customer: get from cache!")
                return {
                    code: 200,
                    data: this.$state
                }
            }

            // 发送api请求
            const res = await Customer.getInfo()

            // 请求成功就填充数据到 Vuex
            if (res.code === 200) {
                this.$state = res.data
            }

            return res
        }
    }
})
