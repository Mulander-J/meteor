const routes = [
    {
        path: '/',
        name: 'meteor',
        redirect:'/start'
    },
    {
        //  开始页
        path: '/start',
        name: 'Start',
        component: () => import('../views/start/Start.vue')
    },
    {
        //  主页
        path: '/home',
        name: 'Home',
        component: () => import('../views/page/home/Home.vue')
    },
    {
        //  博客页
        path: '/blog',
        name: 'Blog',
        component: () => import('../views/page/blog/Blog.vue')
    },
    {
        //  书签页
        path: '/bookmark',
        name: 'BookMark',
        component: () => import('@/components/Blank.vue'),
        redirect:'/bookmark/daily',
        children:[
            {
                //  常用书签
                path: 'daily',
                name: 'Daily',
                component: () => import('../views/page/bookmark/BookMark.vue')
            },
            {
                //  开发书签
                path: 'devil',
                name: 'Devil',
                component: () => import('../views/page/bookmark/BookMark.vue')
            }
        ]
    },
    {
        //  工具页
        path: '/tool',
        name: 'Tool',
        component: () => import('../views/page/tool/Tool.vue')
    }
];
export default routes