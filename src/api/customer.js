import request from "@/network/request";
import Const from "@/const/const"

export default class Customer {
  // 账号登录接口
  static async loginByAccount(data) {
    const { accountId, password } = data

    // 发送登录请求
    return await request.post(Const.ACCOUNT_URL + '/login', {
      accountId,
      password
    })
  }

  // 身份证登录接口
  static async loginByIdNumber(data) {
    const { idNumber, password } = data

    // 发送登录请求
    return await request.post(Const.ACCOUNT_URL + '/login', {
      idNumber,
      password
    })
  }

  // 注册接口
  static async register(data) {
    const { name, idNumber, password } = data

    // 发送注册请求
    return await request.post(Const.ACCOUNT_URL + '/register', {
      name,
      idNumber,
      password
    })
  }

  // 获取客户信息接口
  static async getInfo() {
    return await request.post(Const.ACCOUNT_URL + '/getInfo')
  }
}




