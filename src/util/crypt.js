import {sha256} from "js-sha256";

export default class crypt {
  // 对字符串进行sha256 hash
  static hash(src) {
    return sha256(src)
  }
}
