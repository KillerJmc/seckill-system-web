export default class Const {
  // 目标基础路径
  static TARGET_BASE_URL = getBaseUrl()

  // 账号后端路径
  static ACCOUNT_URL = Const.TARGET_BASE_URL + ':9010/customer'

  // 秒杀活动后端路径
  static ACTIVITY_URL = Const.TARGET_BASE_URL + ':9030/seckillActivity'

  // Token名称
  static TOKEN_NAME = 'token'
}

// 根据不同环境获取axios基础地址
function getBaseUrl() {
  // node的全局变量，用于判断环境
  switch (process.env.NODE_ENV) {
    // npm serve
    case 'development':
      return "http://localhost"

    // npm build
    case 'production':
      return "http://192.168.137.10"
  }
}
