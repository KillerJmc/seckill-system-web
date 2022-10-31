import axios from "axios"

// 返回值类型
export interface R<T> {
    // 返回码
    code: 200 | 404 | 500,
    // 返回数据
    data: T,
    // 返回信息
    message?: string
}

// Promise包装的返回值类型
export type PromiseR<T> = Promise<R<T>>

// 默认配置
const instance = axios.create({
    timeout: 10000,
    withCredentials: true,
    baseURL: import.meta.env.VITE_BACKEND_BASE_URL
})

// 请求拦截器
instance.interceptors.request.use(config => {
    // 如果是开发环境就打印发送的url
    if (import.meta.env.DEV) {
        console.log("request " + JSON.stringify({
            url: config.url,
            data: config.data
        }, null, 4))
    }

    return config
})

// 回复拦截器
instance.interceptors.response.use(config => {
    // 获取返回值
    const res = config.data

    // 如果是开发环境就打印返回值内容
    if (import.meta.env.DEV) {
        console.log("response " + JSON.stringify(res, null, 4))
    }

    // 检查返回值类型
    if (!("code" in res && "data" in res && "message" in res)) {
        console.error("请求返回值类型错误！")
        return null
    }

    // 如果访问出现错误就打印错误信息
    if (res.code === 500) {
        console.error(res.message)
    }

    // 让用户不需要调用.data，直接返回R
    return res
}, e => {
    // 打印错误
    console.error(e)
})

export default instance
