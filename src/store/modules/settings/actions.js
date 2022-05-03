import { Token } from "@/auth/token";

export default {
  // 退出登录
  logout({ commit }) {
    commit("activity/clearAll", true, { root: true })
    commit("customer/clearAll", true, { root: true })
    Token.delete()
  }
}
