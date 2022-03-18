import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: '主页',
      component: () => import('../views/Index')
    },
    {
      path: '/register',
      name: '注册',
      component: () => import('../views/Register')
    },
    {
      path: '/apply',
      name: '申请',
      component: () => import('../views/Apply')
    },
    {
      path: '/seckill',
      name: '秒杀',
      component: () => import('../views/Seckill')
    }
  ]
})

// 设置页面标题
router.beforeEach((to, from, next) => {
  document.title = to.name
  next()
});

export default router
