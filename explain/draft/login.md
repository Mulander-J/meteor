# login

## 需求拆解

- 1.SAO背景
- 2.btn(click to start)
- 3.点击btn唤出弹窗，用户输入git地址
- 4.点击弹窗内确认按钮，开始拉取配置文件
- 5.link start动画

## 实现思路

- 弹窗组件
- 按钮组件
- 输入框组件
- click事件
- confirm事件
- 比对版本号
- 有差异则重新拉取
- 无差异则不做处理
- 硬更新
- push前自动更新版本号

```javascript
export const config = {
    //  版本号
    version:'v0.0.1',   
    //  强制刷新  
    forceRefresh:false,   
    //  用户信息
    userInfo:{},
    //  页首链接
    navBar:[],
    //  博客路由
    router:[]
}
```