import { sha256 } from "js-sha256"

export default class Crypt {
    // 对字符串进行sha256 hash
    static hash(src: string) {
        return sha256(src)
    }
}
