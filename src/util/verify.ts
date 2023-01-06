export default class Verify {
    // 判断账号是否合法
    static validAccount(numStr: string): boolean {
        return Verify.isNum(numStr) || Verify.validIdNum(numStr);
    }

    // 检查身份证号是否合法
    static validIdNum(idNum: string): boolean {
        return (idNum?.length === 18 && Verify.isNum(idNum)) ||
            (/^\d+$/.test(idNum?.substring(0, 17)) && /^[A-Za-z]+$/.test(idNum?.charAt(17)))
    }

    // 判断是否为纯数字
    static isNum(numStr: string): boolean {
        return /^\d+$/.test(numStr);
    }
}
