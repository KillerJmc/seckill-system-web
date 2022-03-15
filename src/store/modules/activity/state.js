export default {
  // 活动
  activity: {
    // 活动开始时间
    startTime: '',
    // 商品信息
    product: {
      // 商品名称
      name: '',
      // 商品介绍
      info: ''
    },
    // 库存总量
    amount: 0,
    // 活动信息
    activityInfo: '',
    // 活动规则
    rule: {
      "workStatus": true,
      "inCreditBlacklist": false,
      "minAge": 0,
      "maxAge": 0,
      "maxOverdueTimes": 0,
      "maxOverdueDays": 0,
      "maxOverdueMoney": 0,
    }
  }
}
