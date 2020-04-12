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
        redirect:'/admin/adBlog',
        component: () => import('../views/admin/Admin.vue'),
        children:[
            {
                path: 'adBlog',
                name: 'AdBlog',
                meta:{title:'博客管理',icon:'el-icon-notebook-2'},
                component: () => import('../views/admin/model/AdBlog.vue'),
            },
            {
                path: 'adTag',
                name: 'AdTag',
                meta:{title:'标签管理',icon:'el-icon-discount'},
                component: () => import('../views/admin/model/AdTag.vue'),
            },
            {
                path: 'adCats',
                name: 'AdCats',
                meta:{title:'类目管理',icon:'el-icon-coin'},
                component: () => import('../views/admin/model/AdCats.vue'),
            },
            {
                path: 'adBookmark',
                name: 'AdBookmark',
                meta:{title:'书签管理',icon:'el-icon-collection'},
                component: () => import('../views/admin/model/AdBookmark.vue'),
            },
            {
                path: 'adUser',
                name: 'AdUser',
                meta:{title:'用户管理',icon:'el-icon-user'},
                component: () => import('../views/admin/model/AdUser.vue'),
            },
            {
                path: 'adRecord',
                name: 'AdRecord',
                meta:{title:'记录管理',icon:'el-icon-receiving'},
                component: () => import('../views/admin/model/AdRecord.vue'),
            }
        ]
    }
];

export const routes = [
    //  根路径
    {
        path: '/',
        name: 'zero',
        redirect:'/meteor/home'
    },
    //  开始页-管理登录
    {
        //  开始页
        path: '/start',
        name: 'Start',
        component: () => import('../views/start/Start.vue')
    },
    //  博客平台
    ...meteorRoute,
    //  管理平台
    ...adminRoute
];