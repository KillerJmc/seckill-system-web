import request from "@/network/request";
import Crypt from "@/util/crypt";
import Verify from "@/util/verify";

export default class Customer {
  // 登录接口
  static async login(data) {
    const { accountIdOrIdNumber, password } = data

    // 加密密码
    let hashedPassword = Crypt.hash(password)

    // 创建登录表单
    let loginForm = Verify.validIdNum(accountIdOrIdNumber) ?
      { idNumber: accountIdOrIdNumber, password: hashedPassword } :
      { accountId: accountIdOrIdNumber, password: hashedPassword }

    // 发送登录请求
    return await request.post('/login', loginForm)
  }

  // 注册接口
  static async register(data) {
    const { name, idNumber, password } = data

    // 加密密码
    let hashedPassword = Crypt.hash(password)

    // 发送注册请求
    return await request.post('/register', {
      name,
      idNumber,
      password: hashedPassword
    })
  }

  // 获取客户信息接口
  static async getInfo() {
    return await request.post('/getCustomerInfo')
  }
}




