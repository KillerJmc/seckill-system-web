export default class Const {
  // 目标基础路径
  static TARGET_BASE_URL = 'http://localhost'

  // 账号后端路径
  static ACCOUNT_URL = Const.TARGET_BASE_URL + ':9010/customer'

  // 秒杀活动后端路径
  static ACTIVITY_URL = Const.TARGET_BASE_URL + ':9030/seckillActivity'

  // Token名称
  static TOKEN_NAME = 'token'
}
