# meteor
>记博客工程从设计到落地

## 0.Script

### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

## 1.分析

### 1.1问题
原先用`vuepress`构建静态博客工程之后，在个性化主题改造上花费的时间远远比博客文章的攥写要多，实为**本末倒置**。

而且静态类博客在更新后总是需要本地跑一次命令以得到新的静态页面，**操作繁琐**稍感不便。

而且博客搭建或者主题开发本身也有一定的**技术门槛**。

总的来说，静态博客不太契合我的需求。

### 1.2解析
首先个人博客主要是个人使用，作为个人展示和资料归档。

而我的真实需求则更偏向于个人应用：在思否等平台上写文章做分享，在个人博客里归档整理和以及满足个性化需求。

因为本职属于前端，所以对于应用的挑剔会比较怪异和容易钻牛角尖。

同时也因为开发经验的问题，在实际落地中总会有各种问题产生而连带影响写博客的坚持度。

### 1.3期望
- 免费白嫖最好
- 数据存储更安全可信
- 文章攥写与发布能更快捷
- 高度个性化的同时有明确的优先级

### 1.4宗旨
- foolish design
- focus on doc
- free blog

### 1.5方案
#### 方案一
Plan1(纯前端):在git上开辟仓库存储博客文章，然后创建一个静态页面站点动态地利用GitHub-api从github上拉取博客文章并展示。
静态页面站点的前端开发计划由博客数驱动，每20个增量启动一批开发计划，循序渐进，由博客数驱动前端开发。

- 利
    - 白嫖数据库和服务器
- 弊
    - 数据存储相对而言不太安全
    - 且博客地址与路由文件的同步处理不太智能

#### 方案二
Plan2(全栈):博客文章本地攥写本地保存，另构建相应数据库存储博客站点的各类数据，后端提供各类服务调用，
前端分别实现个人博客站点和博客管理平台，最后内网穿透暴露到外网访问。开发进度还是同方案一由博客数驱动。
- 利
    - 数据存储安全可靠，文章发布更便捷智能
- 弊
    - 开发周期大大增加
    - 有必要考虑后端安全
    - 高并发（不考虑）

**最终确认选择`方案二`。**

## 2.细化

### 2.1思路设计

确认目标
- 本地数据库
- 博客前后端

确认需求
- 博客可视化管理
- 博客展示带类目、标签
- 提供书签收集功能
- 提供事件记录功能

流程简述

- 本地前后端服务常驻
- 博客管理平台新建与管理文章并同步更新数据库
- 博客前端调用后端渲染

开发模式
- 优雅降级（优先针对Chrome-pc）
- 博客数驱动设计，设计驱动前端，前端驱动后端

技术方案
- 前端 vue+element+front-matter（vue-cli4.2）
- 后端 node+express/koa
- 数据库 MongoDB
- 自动化 python
- 网络 内网穿透

### 2.2要素拆解

物理空间
- 文章目录
- 程序目录
- 数据库目录

数据库
- 博客-用于存储博客实体
- 类目-用于存储博客类型目实体，与博客关联
- 标签-用于存储博客标签实体，与博客关联
- 书签-用于存储书签实体
- 记录-用于存储各维度的记录实体

后端
- 文章crud
- 类目crud
- 标签crud
- 书签crud
- 记录crud
- 日志埋点

前端
- 开始页-用于初始化配置
- 个人首页-博客说明
- 文章页-分类目展示博客
- 临时博客页-分享时指定文章使用
- 书签页-综合书签集
- 记录页-个人数据记录
- 页首-导航与检索
- 页尾-应用信息与版权
- 日志埋点

### 2.3 代码与截图

#### 前端路由
```javascript
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
```

#### 截图

- 开始页-白天

![start_day](https://github.com/Mulander-J/meteor/blob/master/explain/img/start_day.jpg)

- 开始页-黑夜

![start_night](https://github.com/Mulander-J/meteor/blob/master/explain/img/start_night.jpg)

- 首页

![home](https://github.com/Mulander-J/meteor/blob/master/explain/img/home.jpg)

- 页脚

![footer](https://github.com/Mulander-J/meteor/blob/master/explain/img/footer.jpg)

- 博客页

![blog](https://github.com/Mulander-J/meteor/blob/master/explain/img/blog.jpg)

- 书签页

![bookmark](https://github.com/Mulander-J/meteor/blob/master/explain/img/bookmark.jpg)


## 3.开发计划_最后更新：`2020/03/22`
> [开发日志](https://github.com/Mulander-J/meteor/blob/master/explain/log.md)  

C1_一世纪元

- 数据库构建
- 后端部分逻辑开发
- 前端管理平台开发

C0_零纪元 `2020/03/17-2020/03/31`

- 相关技术点回顾与深入
- 博客设计
- 前端部分场景
---
全量计划
```markdown
排序不分先后
- 前端
    - 页首 √
        - 页首搜索功能
    - 页脚 √
    - 开始页 √
    - 首页 √
    - 博客页 √
        - blog分享页开发
        - blog查看窗口开发
        - 评论功能
    - 书签页 √
        - bookmark页快速检索
    - 加载页
    - 记录页
        - log-开发日志 √
        - record-media 开发
        - record-ticket 开发
    - 个人信息页
    - 管理平台 √
        - 页首 √
            - 每日一诗 √
        - 页脚 √
            - 音乐播放器
        - 博客管理
        - 用户管理 √
            - 密码强度检测
            - 随机生成头像
        - 标签管理 √
        - 书签管理 √
        - 类目管理 √
    - 其他
        - 多端适配（@media）
        - 浏览器兼容（主要适配safari）
        - 引入 element-scroll 滚动条 √
        - 侧边进度条
        - 回到顶部 √
        - 背景粒子动画particles √
        - 地理位置获取 √
        - 当地日出日落时间获取 √
        - 天气获取
    - ...
- 后端
    - user-CRUD √
    - cats-CRUD √
    - tag-CRUD √
    - blog-CRUD
    - bookmark-CRUD √
    - record/media-CRUD
    - record/ticket-CRUD
    - record/log √
    - 成功/异常日志输出 √
- 数据库
    - conf_user √
    - conf_tag √
    - conf_cats √
    - conf_blog
    - conf_bookmark √
    - conf_ticket
    - conf_media
```
