<!-- 这个组件基于网上的魔改而来 -->
<template>
  <span>{{ hourString+':'+minuteString+':'+secondString }}</span>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";

const hour = ref(0)
const minute = ref(0)
const second = ref(0)
const timer = ref(0)

const props = defineProps({
    // 倒计时间总秒数
    remainTime: { type: Number, default: 0 }
})

const emit = defineEmits(["count-down-end"])

onMounted(() => {
    if (props.remainTime > 0) {
        hour.value = Math.floor(props.remainTime / 3600)
        minute.value = Math.floor((props.remainTime / 60) % 60)
        second.value = Math.floor(props.remainTime % 60)
        countDown()
        return
    }
    // 发送倒计时结束信号
    emit("count-down-end")
})

const countDown = () => {
    clearInterval(timer.value)
    timer.value = setInterval(() => {
        if (hour.value === 0) {
            if (minute.value !== 0 && second.value === 0) {
                second.value = 59
                minute.value -= 1
            } else if (minute.value === 0 && second.value === 0) {
                second.value = 0
                // 发送倒计时结束信号
                emit("count-down-end")
                clearInterval(timer)
            } else {
                second.value -= 1
            }
        } else {
            if (minute.value !== 0 && second.value === 0) {
                second.value = 59
                minute.value -= 1
            } else if (minute.value === 0 && second.value === 0) {
                hour.value -= 1
                minute.value = 59
                second.value = 59
            } else {
                second.value -= 1
            }
        }
    }, 1000)
}

const formatNum = (num) => {
    return num < 10 ? '0' + num : '' + num
}

const hourString = computed(() => {
    return formatNum(hour.value)
})

const minuteString = computed(() => {
    return formatNum(minute.value)
})

const secondString = computed(() => {
    return formatNum(second.value)
})
</script>

<style scoped>

</style>
