import { createRouter } from "vue-router"
import { createWebHashHistory } from "vue-router"

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            redirect: "/index"
        },
        {
            path: "/index",
            name: "主页",
            component: () => import("@/views/HomePage.vue")
        },
        {
            path: "/register",
            name: "注册",
            component: () => import("@/views/RegisterPage.vue")
        },
        {
            path: "/apply",
            name: "申请",
            component: () => import("@/views/ApplyPage.vue")
        },
        {
            path: "/seckill",
            name: "秒杀",
            component: () => import("@/views/SeckillPage.vue")
        }
    ]
})

// 设置页面标题
router.beforeEach((to) => {
    document.title = <string> to.name
    return true
});

export default router
