module.exports = {
  // 服务器启动端口
  devServer: {
    port: 80
  },
  // 相对路径加载资源文件
  publicPath: './',
  // 配置不加入trunk的外部模块（用于CDN加速）
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
