import Activity from "@/api/activity";

export default {
  // 获取当前秒杀活动信息事件
  async getCurrent({ state, commit }) {
    // 如果Vuex中有数据就直接返回
    if (state.activity.startTime !== '') {
      console.log('activity: get from cache!')
      return {
        code: 200,
        data: {
          activity: state.activity
        }
      }
    }

    // 发送api请求
    let res = await Activity.getCurrent()

    // 如果请求成功就放入Vuex缓存
    if (res.code === 200) {
      commit('setActivity', res.data.activity)
    }
    return res
  },

  // 申请秒杀事件
  async apply({ commit }) {
    // 发送api请求
    let res = await Activity.apply()

    // 如果请求成功
    if (res.code === 200) {
      // 提示用户申请成功
      await alert(res.message)
      // 更新Vuex缓存
      console.log('apply: update cache (customer.canApply -> true)')
      commit('customer/setCanApply', true, { root: true })
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
  }
}
