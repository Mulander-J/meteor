import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
//  初始化浏览器样式
import "./assets/style/reset.css"
//  全局基本样式
import "./assets/style/common.less"
//  跨域请求
import VueJsonp from 'vue-jsonp'
Vue.use(VueJsonp)
//  api接口
import service from './service'
Vue.prototype.$api = service
//  配置信息
import conf from './config'
Vue.prototype.$conf = conf
//  注册全局组件——Dialog
import saoDialog from './components/dialog'
Vue.use(saoDialog)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#meteor')
