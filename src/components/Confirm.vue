<!-- 这个组件基于网上的魔改而来 -->
<template>
  <!-- 动画标签 -->
  <transition name="confirm-fade">
    <!-- 对话框主体 -->
    <div v-if="show" class="my-confirm">
      <div class="confirm-content-wrap">
        <!-- 标题 -->
        <h3 class="my-confirm-title">{{ title }}</h3>
        <!-- 内容 -->
        <p class="my-confirm-content">
          <slot name="content">{{ content }}</slot>
        </p>
        <!-- 按钮 -->
        <div class="my-operation">
          <!-- 确认按钮 -->
          <div class="confirm-btn" @click="confirm">
            <p class="my-btn-text">{{ confirmText }}</p>
          </div>
          <!-- 取消按钮（只有在类型为confirm才会出现） -->
          <div v-if="type==='confirm'" class="my-cancel-btn" @click="hidden">
            <p class="my-btn-text my-border-right">{{ cancelText }}</p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
    // 表明弹框的类型：
    // confirm - 确认弹窗（有取消按钮）
    // alert - 通知弹框（没有取消按钮）
    type: { type: String, default: 'confirm' },
    // 对话框标题
    title: { type: String, default: '操作提示' },
    // 对话框内容
    content: { type: String, default: '确定吗？'},
    // 取消按钮的文字
    cancelText: { type: String, default: '取消' },
    // 确认按钮的文字
    confirmText: { type: String, default: '确认' },
    // 是否显示对话框
    show: { type: Boolean, default: false }
})

const emit = defineEmits(["confirm", "update:show"])

// 确认按钮
const confirm = () => {
    // 回调父组件的确定钩子
    emit("confirm")
    hidden()
}

// 隐藏对话框
const hidden = () => {
    emit("update:show", false)
}
</script>

<style scoped>
.my-confirm {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
  /* 这里防止当用户长按屏幕，出现的黑色背景色块，以及 iPhone 横平时字体的缩放问题 */
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

/* 进入和出去的动画 */
.confirm-fade-enter-active {
  animation: opacity 0.3s;
}
.confirm-fade-enter-active .confirm-content-wrap {
  animation: scale 0.3s;
}
.confirm-fade-leave-active {
  animation: outOpacity 0.2s;
}

/* 包裹层容器样式 */
.confirm-content-wrap {
  position: absolute;
  top: 28%;
  left: 0;
  right: 0;
  width: 350px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 5px;
  z-index: 999;
  user-select: none;
}

/* 顶部标题部分 */
.my-confirm-title {
  padding-top: 20px;
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  color: #333;
}

/* 中间内容部分 */
.my-confirm-content {
  padding: 20px 15px 0;
  margin-bottom: 32px;
  text-align: center;
  font-size: 16px;
  color: #666;
  line-height: 1.5;
}

/* 底部按钮样式 */
.my-operation {
  display: flex;
  border-top: 1px solid #eee;
}
.my-operation .my-cancel-btn, .confirm-btn {
  flex: 1;
}
.my-operation .confirm-btn {
  color: deepskyblue;
}
.my-operation .my-btn-text {
  text-align: center;
  font-size: 16px;
  margin: 14px 0;
  padding: 6px 0;
}

/* 其他修饰样式 */
.my-border-right {
  border-right: 1px solid #eee;
}

/* 进来的动画 */
@keyframes opacity {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes scale {
  0% {
    transform: scale(0);
  }
  60% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

/* 出去的动画 */
@keyframes outOpacity {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
