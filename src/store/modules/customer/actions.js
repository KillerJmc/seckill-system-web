import Customer from "@/api/customer";

export default {
  // 登录事件
  login({ commit }, data) {
    // 发送api请求
    return Customer.login(data);
  },

  // 注册事件
  register(context, data) {
    // 发送api请求
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
