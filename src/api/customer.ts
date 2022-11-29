import request from "@/network/request"
import type { PromiseR } from "@/network/request"

export default class Customer {
    // 账号登录接口
    static loginByAccount(loginForm: LoginForm): PromiseR<void> {
        // 发送登录请求
        return request.post("/customer/login", {
            account: loginForm.account,
            password: loginForm.password
        })
    }

    // 身份证登录接口
    static loginByIdNumber(loginForm: LoginForm): PromiseR<void> {
        // 发送登录请求
        return request.post("/customer/login", {
            idNumber: loginForm.idNumber,
            password: loginForm.password
        })
    }

    // 注册接口
    static register(registerForm: RegisterForm): PromiseR<RegisterResult> {
        // 发送注册请求
        return request.post("/customer/register", registerForm)
    }

    // 退出登录接口
    static logout(): PromiseR<void> {
        return request.post("/customer/logout")
    }

    // 获取客户信息接口
    static getInfo(): PromiseR<CustomerInfo> {
        return request.get("/customer/getInfo")
    }
}

// 登录表单
export interface LoginForm {
    accountOrIdNumber?: string,
    account?: string,
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
    account: string
}

// 客户信息
export interface CustomerInfo {
    name: string,
    applied: boolean,
    canApply: boolean
}

