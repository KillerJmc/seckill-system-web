import Vue from 'vue'
import Register from './Register.vue'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(Register),
})
