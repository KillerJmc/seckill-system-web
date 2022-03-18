module.exports = {
  devServer: {
    port: 80
  },
  // 设置的是相对路径
  publicPath: './',
  // 配置外部模块
  configureWebpack: {
    externals: {
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex',
      'axios': 'axios',
      'js-cookie': 'Cookies',
      'js-sha256': 'sha256'
    }
  }
}
