import axios from "axios";
import Const from "../const/const.js"

// 默认配置
let instance = axios.create({
  baseURL: Const.TARGET_URL,
  timeout: 10000,
  withCredentials: true
})

// 请求拦截器
instance.interceptors.request.use(config => {
  // 打印发送的url
  console.log("request " + JSON.stringify({
    url: config.url,
    data: config.data
  }, null, 4))
  return config
})

// 回复拦截器
instance.interceptors.response.use(config => {
  console.log("response " + JSON.stringify(config.data, null, 4))
  // 如果访问出现错误就打印错误信息
  if (config.data.code === 500) {
    alert(config.data.message)
  }

  // 让用户不需要调用.data
  return config.data
}, e => {
  // 打印错误
  alert(e)
})

export default instance
