import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
//  全局引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
//  markdown编辑器，样式需单独引入
import mavonEditor from 'mavon-editor'
Vue.use(mavonEditor)
//  初始化浏览器样式
import "./assets/style/reset.less"
//  全局基本样式
import "./assets/style/common.less"
// 布局组件相关样式
import "./assets/style/layout.less"
import "mavon-editor/dist/css/index.css";
//  跨域请求
import VueJsonp from 'vue-jsonp'
Vue.use(VueJsonp)
//  util工具
import util from './util'
Vue.prototype.$util = util
//  api接口
import api from './api'
Vue.prototype.$api = api
//  配置信息
import conf from './config'
Vue.prototype.$conf = conf


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#meteor')
