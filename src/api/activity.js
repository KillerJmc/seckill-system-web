import request from "@/network/request";
import Const from "@/const/const";

export default class Activity {
  // 获取当前秒杀活动信息接口
  static getCurrent() {
    return request.post(Const.ACTIVITY_URL + '/getCurrent')
  }

  // 申请秒杀接口
  static apply() {
    return request.post(Const.ACTIVITY_URL + '/apply')
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
}
