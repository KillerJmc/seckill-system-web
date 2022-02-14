<template>
  <div>
    <div class="header">
      <div class="left-block"></div>
      <div class="title">
        <div class="title-logo"></div>
      </div>
      <div class="right-block"></div>
      <div class="account-bar">
        <div class="account-info">
        </div>
        <div class="account-name">
          <span>Linyuangou</span>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="form">
        <div class="information">
          <p>
            订单信息
          </p>
        </div>
        <div class="time">订单编号：1234567890
          <br>订单金额：1234元
        </div>
        <div class="pay-form">
          <input type="radio" name="pay" value="alipay" >支付宝 &nbsp;
          <input type="radio" name="pay" value="wechat">微信 &nbsp;
          <input type="radio" name="pay" value="yun" >云闪付 &nbsp;
        </div>
        <div class="enter-button">
          <p>付款</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SeckillSuccess'
}
</script>

<style scoped>
  @import "../../assets/css/seckill-success.css";
</style>
