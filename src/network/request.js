import axios from "axios";


// 默认配置
let instance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 5000
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
  // 让用户不需要调用.data
  return config.data
}, e => {
  // 打印错误
  alert(e)
})

export default instance