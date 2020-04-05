import * as packageInfo from './../../package.json'
import {navData,adminRoute} from './../router/routes.js'

export default {
    //  应用信息
    "name":packageInfo.name,
    "version":packageInfo.version,
    "author":packageInfo.author,
    "secName":"Mulander-J",
    "description":packageInfo.description.split(','),
    "keywords":packageInfo.keywords,
    "license":packageInfo.license,
    "homepage":packageInfo.homepage,
    "repository":packageInfo.repository.url.replace('git+',''),
    "createDate":"2020.03.12",
    "headImg":"https://cdn.jsdelivr.net/gh/Mulander-J/mdpic/img/20200403134530.gif",
    "contact":{
        "github":"https://github.com/Mulander-J",
        "segment":"https://segmentfault.com/u/mulander",
        "outlook":"mailto:mulander_j@outlook.com"
    },
    "adminHome":"/admin",
    "appHome":"/meteor/home",
    "appBaseUrl":'www.mulander_blog.com',
    //  导航信息
    "nav":{
        showHelp:true, //  是否显示帮助链接
        data:navData,    //  博客平台导航
        adminRou:adminRoute[0].children    // 管理平台导航
    },
    //  首页信息
    "homeLabel":{
        header:{
            front:'上 善 若 水',
            back:'鱼与熊掌兮,我欲皆得之'
        },
        left:{
            front:'呜呜呜 上下求索',
            back:'基于书签对知识点进行 整理，吸收，吐纳，归档。吾将上下而求索'
        },
        right:{
            front:'吨吨吨 左右横跳',
            back:'活着，是一件最能带来满足感的事。细细琢磨吧，人生啊，有意思的很'
        },
        pixelLoop:['METEOR','MULANDER','上善若水','新冠灭却']
    },
    //  用户信息
    "userInfo":{
        chName:'金志相',
        nickName:'Mulander',
        sex:'male',
        birth:'1996-07-06',
        location:'Shanghai,China',
        mail_1:'mulander_j@outlook.com',
        mail_2:'mulander@qq.com',
    },
    //  书签页信息
    "bookmark":{
        "lastUpdate":"2020/04/03"
    }
}