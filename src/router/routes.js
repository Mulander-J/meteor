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
        //  分享页
        path: '/sharePage',
        name: 'SharePage',
        component: () => import('../views/share/SharePage.vue')
    },
    {
        name:'Page',
        path:'/page',
        redirect:'/page/home',
        component: () => import('@/components/layout/Page.vue'),
        children:[
            {
                //  主页
                path: 'home',
                name: 'Home',
                component: () => import('../views/page/home/Home.vue')
            },
            {
                //  博客页
                path: 'blog',
                name: 'Blog',
                component: () => import('../views/page/blog/Blog.vue')
            },
            {
                //  书签页
                path: 'bookmark',
                name: 'BookMark',
                component: () => import('@/components/layout/Blank.vue'),
                redirect:'/page/bookmark/daily',
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
                //  记录页
                path: 'record',
                name: 'Record',
                redirect:'/page/record/recLog',
                component: () => import('../views/page/record/Record.vue'),
                children:[
                    {
                        //  开发日志
                        path: 'recLog',
                        name: 'RecLog',
                        component: () => import('../views/page/record/RecLog.vue')
                    },
                    {
                        //  动漫
                        path: 'animate',
                        name: 'Animate',
                        component: () => import('../views/page/record/RecMedia.vue')
                    },
                    {
                        //  书籍
                        path: 'book',
                        name: 'Book',
                        component: () => import('../views/page/record/RecMedia.vue')
                    },
                    {
                        //  影视剧
                        path: 'movie',
                        name: 'Movie',
                        component: () => import('../views/page/record/RecMedia.vue')
                    },
                    {
                        //  旅行
                        path: 'recMap',
                        name: 'RecMap',
                        component: () => import('../views/page/record/RecMap.vue')
                    },
                    {
                        //  票据
                        path: 'recTicket',
                        name: 'RecTicket',
                        component: () => import('../views/page/record/RecTicket.vue')
                    },
                ]
            }
        ]
    }
];
export const navData = [
    {name:'Home'},
    {name:'Blog'},
    {
        name:'Record'
    },
    {
        name:'BookMark',
        children:[
            {name:'Daily',},
            {name:'Devil'}
        ]
    }
];
export const recMenu = [
    {name:'RecLog',label:'开发日志',children:null},
    {
        name:'RecMedia',
        label:'多媒体',
        children:[
            {name:'Animate',label:'动漫',children:null},
            {name:'Book',label:'书籍',children:null},
            {name:'Movie',label:'影视剧',children:null},
        ]
    },
    {name:'RecMap',label:'旅行',children:null},
    {name:'RecTicket',label:'票据',children:null},
];