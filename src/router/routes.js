export const routes = [
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
        component: () => import('../views/home/Home.vue')
    },
    {
        //  博客页
        path: '/blog',
        name: 'Blog',
        component: () => import('../views/blog/Blog.vue')
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
                component: () => import('../views/bookmark/BookMark.vue')
            },
            {
                //  开发书签
                path: 'devil',
                name: 'Devil',
                component: () => import('../views/bookmark/BookMark.vue')
            }
        ]
    },
    {
        //  记录页
        path: '/record',
        name: 'Record',
        redirect:'/record/log',
        component: () => import('@/components/Blank.vue'),
        children:[
            {
                //  开发日志
                path: 'log',
                name: 'Log',
                component: () => import('../views/record/Record.vue')
            },
            {
                //  动漫
                path: 'animate',
                name: 'Animate',
                component: () => import('../views/record/Record.vue')
            },
            {
                //  动漫
                path: 'book',
                name: 'Book',
                component: () => import('../views/record/Record.vue')
            },
            {
                //  动漫
                path: 'movie',
                name: 'Movie',
                component: () => import('../views/record/Record.vue')
            },
            {
                //  动漫
                path: 'music',
                name: 'Music',
                component: () => import('../views/record/Record.vue')
            },
            {
                //  动漫
                path: 'sport',
                name: 'Sport',
                component: () => import('../views/record/Record.vue')
            },
            {
                //  动漫
                path: 'travel',
                name: 'Travel',
                component: () => import('../views/record/Record.vue')
            },
        ]
    }
];
export const navData = [
    {name:'Home'},
    {name:'Blog'},
    {
        name:'BookMark',
        children:[
            {name:'Daily',},
            {name:'Devil'}
        ]
    },
    {
        name:'Record',
        children:[
            {name:'Log'},
            {name:'Animate'},
            {name:'Book'},
            {name:'Movie'},
            {name:'Music'},
            {name:'Sport'},
            {name:'Travel'}
        ]
    }
];