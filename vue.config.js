module.exports = {
  devServer: {
    port: 80,
  },
  pages: {
    index: {
      entry: 'src/pages/index/main.js',
      template: 'public/index.html',
      // 在dist输出的文件名
      filename: 'index.html'
    },
    register: {
      entry: 'src/pages/register/main.js',
      template: 'public/register.html',
      filename: 'register.html'
    },
    apply: {
      entry: 'src/pages/apply/main.js',
      template: 'public/apply.html',
      filename: 'apply.html'
    },
    seckill: {
      entry: 'src/pages/seckill/main.js',
      template: 'public/seckill.html',
      filename: 'seckill.html'
    }
  }
}