export const navData = [
    {name:'Home'},
    {name:'Blog'},
    {
        name:'Record',
        children:[
            {name:'Log',},
            {name:'Media'},
            {name:'Ticket'}
        ]
    },
    {
        name:'BookMark',
        children:[
            {name:'Daily',},
            {name:'Devil'},
            {name:'Digest'}
        ]
    }
];
//  博客平台
export const meteorRoute = [
    //  开始页-管理登录
    {
        //  开始页
        path: '/start',
        name: 'Start',
        component: () => import('../views/start/Start.vue')
    },
    //  分享页
    {
        //  分享页
        path: '/share',
        name: 'Share',
        component: () => import('../views/share/share.vue')
    },
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
                        component: () => import('../views/front/bookmark/Daily.vue')
                    },
                    {
                        //  开发书签
                        path: 'devil',
                        name: 'Devil',
                        component: () => import('../views/front/bookmark/Devil.vue')
                    },
                    {
                        //  开发书签
                        path: 'digest',
                        name: 'Digest',
                        component: () => import('../views/front/bookmark/Digest.vue')
                    }
                ]
            },
            {
                //  记录页
                path: 'record',
                name: 'Record',
                redirect:'/meteor/record/recLog',
                component: () => import('@/components/layout/Blank.vue'),
                children:[
                    {
                        //  开发日志
                        path: 'recLog',
                        name: 'Log',
                        meta:{title:'开发日志'},
                        component: () => import('../views/front/record/RecLog.vue')
                    },
                    {
                        //  多媒体
                        path: 'media',
                        name: 'Media',
                        meta:{title:'多媒体'},
                        component: () => import('../views/front/record/RecMedia.vue')
                    },
                    {
                        //  票据
                        path: 'recTicket',
                        name: 'Ticket',
                        meta:{title:'票剧'},
                        component: () => import('../views/front/record/RecTicket.vue')
                    }
                ]
            }
        ]
    },
];
//  管理平台
export const adminRoute = [
    {
        //  管理页
        path: '/admin',
        name: 'Admin',
        component: () => import('../views/admin/Admin.vue')
    }
];

export const routes = [
    //  根路径
    {
        path: '/',
        name: 'zero',
        redirect:'/meteor/start'
    },
    //  博客平台
    ...meteorRoute,
    //  管理平台
    ...adminRoute
];