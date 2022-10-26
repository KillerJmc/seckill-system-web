import Const from "@/const/const"
import request from "@/network/request"
import type { PromiseR } from "@/network/request"

export default class Customer {
    // 账号登录接口
    static async loginByAccount(loginForm: LoginForm): PromiseR<void> {
        // 发送登录请求
        return await request.post(Const.ACCOUNT_URL + "/login", {
            accountId: loginForm.accountId,
            password: loginForm.password
        })
    }

    // 身份证登录接口
    static async loginByIdNumber(loginForm: LoginForm): PromiseR<void> {
        // 发送登录请求
        return await request.post(Const.ACCOUNT_URL + "/login", {
            idNumber: loginForm.idNumber,
            password: loginForm.password
        })
    }

    // 注册接口
    static async register(registerForm: RegisterForm): PromiseR<RegisterResult> {
        // 发送注册请求
        return await request.post(Const.ACCOUNT_URL + "/register", registerForm)
    }

    // 获取客户信息接口
    static async getInfo(): PromiseR<CustomerInfo> {
        return await request.post(Const.ACCOUNT_URL + "/getInfo")
    }
}

// 登录表单
export interface LoginForm {
    accountIdOrIdNumber?: string,
    accountId?: string,
    idNumber?: string,
    password: string
}

// 注册表单
export interface RegisterForm {
    name: string,
    idNumber: string,
    password: string
}

// 注册结果
export interface RegisterResult {
    accountId: string
}

// 客户信息
export interface CustomerInfo {
    name: string,
    applied: boolean,
    canApply: boolean
}

