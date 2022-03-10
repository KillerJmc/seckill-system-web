import Customer from "@/api/customer";

export default {
  async login({ commit }, data) {
    // 发送api请求
    let res = await Customer.login(data);

    // 请求失败直接返回
    if (res.code === 500) {
      return res
    }

    // 设置token
    commit('setToken')

    return res
  },

  async register(context, data) {
    // 发送api请求
    return await Customer.register(data)
  }
}
