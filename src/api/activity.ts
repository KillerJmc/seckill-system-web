import request from "@/network/request"
import type { PromiseR } from "@/network/request"

export default class Activity {
    // 获取当前秒杀活动信息接口
    static getCurrent(): PromiseR<ActivityInfo> {
        return request.post("/seckillActivity/getCurrent")
    }

    // 申请秒杀接口
    static apply(): PromiseR<void> {
        return request.post("/seckillActivity/apply")
    }

    // 获取倒计时接口
    static getCountDown(): PromiseR<number> {
        return request.post("/seckillActivity/getCountDown")
    }

    // 获取秒杀链接接口
    static getSeckillUrl(): PromiseR<string> {
        return request.post("/seckillActivity/getSeckillUrl")
    }

    // 秒杀接口
    static seckill(seckillUrl: string): PromiseR<void> {
        return request.post("/seckillActivity/seckill/" + seckillUrl)
    }

    // 获取订单接口
    static getOrder(): PromiseR<Order> {
        return request.post("/seckillActivity/getOrder")
    }

    // 付款接口
    static pay(orderId: string): PromiseR<PaymentStatus> {
        return request.post("/seckillActivity/pay", "orderId=" + orderId)
    }
}

// 活动信息
export interface ActivityInfo {
    // 活动开始时间
    startTime: string,
    // 商品信息
    product: {
        // 商品名称
        name: string,
        // 商品介绍
        info: string
    },
    // 库存总量
    amount: number,
    // 活动信息
    activityInfo: string,
    // 活动规则
    rule: {
        "workStatus": boolean,
        "inCreditBlacklist": boolean,
        "minAge": number,
        "maxAge": number,
        "maxOverdueTimes": number,
        "maxOverdueDays": number,
        "maxOverdueMoney": number,
    }
}

// 订单
export interface Order {
     // 秒杀id
     seckillId: number,
     // 账号id
     accountId: number,
     // 订单id
     orderId: string,
     // 订单金额
     money: number,
     // 是否下订单成功
     putOrderSuccess: boolean;
}

// 支付状态
export interface PaymentStatus {
    // 订单id
    orderId: string,
    // 是否支付成功
    paymentSuccess: boolean
}
