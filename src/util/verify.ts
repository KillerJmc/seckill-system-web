export default class Verify {
    // 检查身份证号是否合法
    static validIdNum(idNum: string) {
        return idNum?.length === 18 &&
            /^\d+$/.test(idNum) || (/^\d+$/.test(idNum?.substring(0, 17)) && /^[A-Za-z]+$/.test(idNum?.charAt(17)))
    }
}
