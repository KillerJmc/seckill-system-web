import request from "@/network/request";

export default class Activity {
  // 获取当前秒杀活动信息接口
  static getCurrent() {
    return request.post('/getCurrentSeckillActivity')
  }

  // 申请秒杀接口
  static apply() {
    return request.post('/applyForSeckill')
  }
}
