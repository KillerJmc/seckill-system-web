import Vue from 'vue'
import Index from './Index.vue'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(Index)
})
