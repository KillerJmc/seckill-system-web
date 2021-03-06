import Activity from "@/api/activity";
import MsgMapping from "@/const/msg-mapping";

export default {
  // 获取当前秒杀活动信息事件
  async getCurrent({ state, commit }) {
    // 如果Vuex中有数据就直接返回
    if (state.activity.startTime !== '') {
      console.log('activity: get from cache!')
      return {
        code: 200,
        data: state.activity
      }
    }

    // 发送api请求
    let res = await Activity.getCurrent()

    // 如果请求成功就放入Vuex缓存
    if (res.code === 200) {
      commit('setActivity', res.data)
    }
    return res
  },

  // 申请秒杀事件
  async apply({ commit }) {
    // 发送api请求
    let res = await Activity.apply()

    // 如果请求成功或者重复申请
    if (res.code === 200 || res.message === MsgMapping.APPLY_REPEAT) {
      // 更新Vuex缓存
      commit('customer/setApplied', true, { root: true })
      console.log('apply: update cache (customer.applied -> true)')
    }
    return res
  },

  // 获得活动倒计时事件
  async getCountDown() {
    return Activity.getCountDown()
  },

  // 获取秒杀链接事件
  async getSeckillUrl() {
    return Activity.getSeckillUrl()
  },

  // 秒杀事件
  async seckill(context, seckillUrl) {
    return Activity.seckill(seckillUrl)
  },

  // 获取订单事件
  async getOrder() {
    return Activity.getOrder()
  },

  // 付款事件
  async pay(context, data) {
    return Activity.pay(data)
  }
}
