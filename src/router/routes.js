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
        component: () => import('../views/Home.vue')
    },
    {
        //  博客页
        path: '/blog',
        name: 'Blog',
        component: () => import('../views/Blog.vue')
    },
    {
        //  书签页
        path: '/link',
        name: 'Link',
        component: () => import('../views/Link.vue')
    },
    {
        //  工具页
        path: '/tool',
        name: 'Tool',
        component: () => import('../views/Tool.vue')
    }
];
export default routes