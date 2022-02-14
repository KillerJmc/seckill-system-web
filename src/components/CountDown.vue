<template>
  <span>{{hourString+':'+minuteString+':'+secondString}}</span>
</template>

<script>
export default {
  name: "CountDown",
  data () {
    return {
      hour: '',
      minute: '',
      second: '',
      timer: ''
    }
  },
  props: {
    // 倒计时间总秒数
    remainTime: {
      default: ''
    }
  },
  mounted () {
    if (this.remainTime > 0) {
      this.hour = Math.floor((this.remainTime / 3600) % 24)
      this.minute = Math.floor((this.remainTime / 60) % 60)
      this.second = Math.floor(this.remainTime % 60)
      this.countDown()
      return
    }
    // 发送结束信号
    this.$emit('count-down-end')
  },
  methods: {
    countDown () {
      let self = this
      clearInterval(this.timer)
      this.timer = setInterval(function () {
        if (self.hour === 0) {
          if (self.minute !== 0 && self.second === 0) {
            self.second = 59
            self.minute -= 1
          } else if (self.minute === 0 && self.second === 0) {
            self.second = 0
            // 发送结束信号
            self.$emit('count-down-end')
            clearInterval(self.timer)
          } else {
            self.second -= 1
          }
        } else {
          if (self.minute !== 0 && self.second === 0) {
            self.second = 59
            self.minute -= 1
          } else if (self.minute === 0 && self.second === 0) {
            self.hour -= 1
            self.minute = 59
            self.second = 59
          } else {
            self.second -= 1
          }
        }
      }, 1000)
    },
    formatNum (num) {
      return num < 10 ? '0' + num : '' + num
    }
  },
  computed: {
    hourString () {
      return this.formatNum(this.hour)
    },
    minuteString () {
      return this.formatNum(this.minute)
    },
    secondString () {
      return this.formatNum(this.second)
    }
  }
}
</script>

<style scoped>

</style>