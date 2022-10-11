import Customer from "@/api/customer";
import Crypt from "@/util/crypt";
import Verify from "@/util/verify";

export default {
  // 登录事件
  login(context, data) {
    let { accountIdOrIdNumber, password } = data

    // 加密密码
    password = Crypt.hash(password)

    // 发送api请求
    return Verify.validIdNum(accountIdOrIdNumber) ?
        Customer.loginByIdNumber({
          idNumber: accountIdOrIdNumber,
          password
        }) :
        Customer.loginByAccount({
          accountId: accountIdOrIdNumber,
          password
        })
  },

  // 注册事件
  register(context, data) {
    // 加密密码
    data.password = Crypt.hash(data.password)

    // 发送注册请求
    return Customer.register(data)
  },

  // 获取客户信息事件
  async getInfo({ commit, state }) {
    // 如果Vuex有数据就直接返回
    if (state.name !== '') {
      const { name, applied, canApply } = state
      console.log('customer: get from cache!')
      return {
        code: 200,
        data: { name, applied, canApply }
      }
    }

    // 发送api请求
    let res = await Customer.getInfo()

    // 请求成功就填充数据到 Vuex
    if (res.code === 200) {
      const { name, applied, canApply } = res.data
      commit('setName', name)
      commit('setApplied', applied)
      commit('setCanApply', canApply)
    }

    return res
  }
}
