import Cookies from "js-cookie"
import Const from "@/const/const"

export class Token {
    static get(): string | undefined {
        return Cookies.get(Const.TOKEN_NAME)
    }
}
