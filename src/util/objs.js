export default class Objs {
  // 检查对象是否为null或非空
  static nullOrEmpty() {
    for (let obj of arguments) {
      if (obj === undefined) {
        return true
      }
      if (typeof(obj) === 'string' && obj === '') {
        return true
      }
    }
    return false
  }
}
