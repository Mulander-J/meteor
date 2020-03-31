# meteor
>疫情离职宅家，记博客工程从设计到落地

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
- 本末倒置
- 更新繁琐
- 开发门槛

### 1.2解析
- 前端被动
- 造轮子和用轮子之辩

### 1.3期望
- 高度个性化
- 鱼与熊掌欲也

### 1.4方案
前端主题开发计划由博客数驱动，2020年每20一个纪元，2021年每21一个纪元，类推。

### 1.5宗旨
**foolish design,focus on doc,free blog**

## 2.细化

### 2.1思路设计

终极目标
- 本地数据库
- 博客前后端

开发模式
- 优雅降级（优先针对Chrome-pc）
- 设计驱动前端，前端驱动后端

技术方案
- 前端 vue+element（vue-cli4.2）
- 后端 node+express/koa
- 数据库 MongoDB
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

前端
- 开始页-用于初始化配置
- 个人首页-博客说明
- 文章页-分类目展示博客
- 临时博客页-分享时使用
- 书签页-综合书签集
- 记录页-个人数据记录
- 页首-导航与检索
- 页尾-应用信息与版权
- 日志埋点

后端
- 文章crud
- 类目crud
- 标签crud
- 书签crud
- 记录crud
- 日志埋点

## 3.开发计划_最后更新：`2020/03/22`
> [开发日志](http://sad/log.md)  

零纪元 `2020/03/12-2020/03/31`

- 相关技术点回顾与深入
- 博客架构
- 前端部分场景
---
未来纪元
> [issue-开发全量表]()
```markdown
- 前端
    - 多端适配（@media）
    - 浏览器兼容（主要适配safari）
    - 评论功能（valinet）
    - 个人展示
    - 搜索功能
    - 天气获取
    - bookmark页快速检索
    - record页开发 
    - 加载页
- 后端
    - all
- 数据库
    - all
```
