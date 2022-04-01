import request from "@/network/request";
import Const from "@/const/const";
import AlertUtils from "@/util/alert";

export default class Activity {
  // 获取当前秒杀活动信息接口
  static getCurrent() {
    return request.post(Const.ACTIVITY_URL + '/getCurrent')
  }

  // 申请秒杀接口
  static apply() {
    // 报错不显示警告对话框
    return AlertUtils.disable(() => request.post(Const.ACTIVITY_URL + '/apply'))
  }

  // 获取倒计时接口
  static getCountDown() {
    return request.post(Const.ACTIVITY_URL + '/getCountDown')
  }

  // 获取秒杀链接接口
  static getSeckillUrl() {
    return request.post(Const.ACTIVITY_URL + '/getSeckillUrl')
  }

  // 秒杀接口
  static seckill(seckillUrl) {
    return request.post(Const.ACTIVITY_URL + '/seckill/' + seckillUrl)
  }

  // 获取订单接口
  static getOrder() {
    return request.post(Const.ACTIVITY_URL + "/getOrder")
  }

  // 付款接口
  static pay(data) {
    const { orderId } = data
    return request.post(Const.ACTIVITY_URL + "/pay", { orderId })
  }
}
