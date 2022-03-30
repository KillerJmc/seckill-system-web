<template>
  <transition name="confirm-fade">
    <div v-if="isShowConfirm" class="my-confirm">
      <div class="confirm-content-wrap">
        <h3 class="my-confirm-title">{{ title }}</h3>
        <p class="my-confirm-content">
          <slot name="content">
            {{ this.content }}
          </slot>
        </p>
        <div class="my-operation">
          <div class="confirm-btn" @click="confirm">
            <p class="my-btn-text">{{ confirmText }}</p>
          </div>
          <div v-if="type==='confirm'" class="my-cancel-btn" @click="cancel">
            <p class="my-btn-text my-border-right">{{ cancelText }}</p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Confirm',
  data() {
    return {
      isShowConfirm: false, // 用于控制整个窗口的显示/隐藏
      title: '', // 提示框标题
      content: '', // 提示框的内容
      cancelText: '', // 取消按钮的文字
      confirmText: '', // 确认按钮的文字
      type: '', // 表明弹框的类型：confirm - 确认弹窗（有取消按钮）；alert - 通知弹框（没有取消按钮）
      data: {} // 传入的数据
    }
  },
  methods: {
    show(config) {
      // 确保用户传递的是一个对象
      if (Object.prototype.toString.call(config) === '[object Object]') {
        this.title = config.title || '操作提示'
        this.content = config.content || this.content || '确认吗？'

        this.confirmText = config.confirmText || '确认'
        this.cancelText = config.cancelText || '取消'

        this.type = config.type || 'confirm'
        this.data = config.data || this.data;
      }

      this.isShowConfirm = true
    },
    hidden() {
      this.isShowConfirm = false
      this.titleText = '操作提示'
      this.cancelText = '取消'
      this.confirmText = '确认'
      this.type = 'confirm'
    },
    confirm() {
      this.$emit('confirm')
      this.hidden()
    },
    cancel() {
      this.$emit('cancel')
      this.hidden()
    }
  }
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
