import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

//  初始化浏览器样式
import "./assets/style/reset.css";
//  全局基本样式
import "./assets/style/common.less"

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
