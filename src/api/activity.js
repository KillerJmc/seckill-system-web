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

  // 获取倒计时接口
  static getCountDown() {
    return request.post('/getCurrentSeckillCountDown')
  }

  // 获取秒杀链接接口
  static getSeckillUrl() {
    return request.post('/getSeckillUrl')
  }

  // 秒杀接口
  static seckill(seckillUrl) {
    return request.post('seckill/' + seckillUrl)
  }
}
