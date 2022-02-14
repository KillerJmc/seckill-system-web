import Const from "../const/const"

// 原地跳转另一个页面
export function goto(url) {
  console.log('正在跳转页面：' + url)
  window.location.href = Const.SELF_URL + url;
}