// 警告对话框
export default class AlertUtils {
  // 暂时禁用，禁用过程中执行指定代码块
  static async disable(execFunc) {
    const alertFunc = window.alert
    window.alert = msg => console.warn('alert: ' + msg)
    let res = await execFunc()
    window.alert = alertFunc
    return res
  }
}
