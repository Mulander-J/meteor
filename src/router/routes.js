export const navData = [
    {name:'Home'},
    {name:'Blog'},
    {name:'Record'},
    {
        name:'BookMark',
        children:[
            {name:'Daily',},
            {name:'Devil'}
        ]
    }
];
export const recMenu = [
    {
        //  开发日志
        path: 'recLog',
        name: 'RecLog',
        meta:{title:'开发日志'},
        component: () => import('../views/front/record/RecLog.vue')
    },
    {
        //  多媒体
        path: 'media',
        name: 'Media',
        meta:{title:'多媒体'},
        redirect:'/meteor/record/media/book',
        component: () => import('@/components/layout/Blank.vue'),
        children:[
            {
                //  书籍
                path: 'book',
                name: 'Book',
                meta:{title:'书籍'},
                component: () => import('../views/front/record/RecMedia.vue')
            },
            {
                //  动漫
                path: 'animate',
                name: 'Animate',
                meta:{title:'动漫'},
                component: () => import('../views/front/record/RecMedia.vue')
            },
            {
                //  影视剧
                path: 'movie',
                name: 'Movie',
                meta:{title:'影视剧'},
                component: () => import('../views/front/record/RecMedia.vue')
            }
        ]
    },
    {
        //  旅行
        path: 'recMap',
        name: 'RecMap',
        meta:{title:'旅行'},
        component: () => import('../views/front/record/RecMap.vue')
    },
    {
        //  票据
        path: 'recTicket',
        name: 'RecTicket',
        meta:{title:'票剧'},
        component: () => import('../views/front/record/RecTicket.vue')
    },
];
//  博客平台
export const meteorRoute = [
    //  博客站点
    {
        name:'Meteor',
        path:'/meteor',
        redirect:'/meteor/home',
        component: () => import('@/components/layout/Page.vue'),
        children:[
            {
                //  主页
                path: 'home',
                name: 'Home',
                component: () => import('../views/front/home/Home.vue')
            },
            {
                //  博客页
                path: 'blog',
                name: 'Blog',
                component: () => import('../views/front/blog/Blog.vue')
            },
            {
                //  书签页
                path: 'bookmark',
                name: 'BookMark',
                component: () => import('@/components/layout/Blank.vue'),
                redirect:'/meteor/bookmark/daily',
                children:[
                    {
                        //  常用书签
                        path: 'daily',
                        name: 'Daily',
                        component: () => import('../views/front/bookmark/BookMark.vue')
                    },
                    {
                        //  开发书签
                        path: 'devil',
                        name: 'Devil',
                        component: () => import('../views/front/bookmark/BookMark.vue')
                    }
                ]
            },
            {
                //  记录页
                path: 'record',
                name: 'Record',
                redirect:'/meteor/record/recLog',
                component: () => import('../views/front/record/Record.vue'),
                children:recMenu
            }
        ]
    },
    //  分享页
    {
        //  分享页
        path: '/share',
        name: 'Share',
        component: () => import('../views/share/share.vue')
    },
];
//  管理平台
export const adminRoute = [
    {
        //  管理页
        path: '/admin',
        name: 'Admin',
        component: () => import('../views/admin/Admin.vue')
    },
    //  开始页-管理登录
    {
        //  开始页
        path: '/start',
        name: 'Start',
        component: () => import('../views/start/Start.vue')
    },
];

export const routes = [
    //  根路径
    {
        path: '/',
        name: 'zero',
        redirect:'/meteor/home'
    },
    ...meteorRoute,
    //  管理平台
    ...adminRoute
];