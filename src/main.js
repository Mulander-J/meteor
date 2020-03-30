import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
//  全局引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
//  初始化浏览器样式
import "./assets/style/reset.css"
//  全局基本样式
import "./assets/style/common.less"
// 布局组件相关样式
import "./assets/style/layout.less"
//  跨域请求
import VueJsonp from 'vue-jsonp'
Vue.use(VueJsonp)
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
