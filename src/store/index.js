import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'; // vuex调试工具

import global from './modules/global'
import user from './modules/user'

Vue.use(Vuex);

// 开发环境下开启严格模式
const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  strict: debug,
  plugins: debug ? [createLogger()] : [],
  state:{},
  mutations:{},
  actions:{},
  getters:{},
  modules: {
    global,
    user
  }
})
