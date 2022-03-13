import Cookies from "js-cookie";
import Const from "@/const/const";
import MsgMapping from "@/const/msg-mapping";

export class Token {
  static get() {
    return Cookies.get(Const.TOKEN_NAME)
  }

  static verify() {
    if (this.get() === undefined) {
      alert(MsgMapping.NOT_LOGGED_ON)
      return false
    }
    return true
  }
}
