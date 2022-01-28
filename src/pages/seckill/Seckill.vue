<template>
  <div class="main">
    <p class="title">银行秒杀活动</p>

    <div class="customer-pic"></div>
    <div class="customer-name">lingyuangou</div>

    <div class="product-desc-title">产品介绍</div>
    <p class="product-desc">一个需要你手速够快的活动，一个东西几乎从不参加售卖的抢购活动，如此划来，如此难得，你还不参加吗？</p>
    <p class="tiger-pic"></p>

    <div class="activity-desc-title">活动介绍</div>
    <div class="activity-desc">2021我们携手攻克时艰，感谢有你，对本行的支持，才有了我们今天的成功，为回馈广大客户，我们现决定将一件产品进行售卖，因为产品较为难得，所以采取抢购的方法.</div>

    <div class="product-name">限量一万元定期存款</div>

    <div class="left-time-msg">距离秒杀活动开始仅剩</div>

    <!-- 计时器 -->
    <p class="hour timer-style">00</p>
    <div class="seperator seperator-sub">:</div>
    <p class="min timer-style">00</p>
    <div class="seperator seperator-sub2">:</div>
    <p class="sec timer-style">00</p>

    <button class="seckill-button disabled-status">参与秒杀</button>
  </div>
</template>

<script>

export default {
  name: "Seckill"
}
</script>

<style scoped>
  @import "../../assets/css/seckill.css";
</style>
