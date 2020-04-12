import Vue from 'vue'
import VueRouter from 'vue-router'

import {routes} from './routes'

Vue.use(VueRouter)

/**

 * 重写路由的push方法

 */

const routerPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location){

  return routerPush.call(this, location).catch(error=> error)

}


const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
});
// 路由钩子管理

/* 路由跳转前 */
router.beforeEach( (to, from, next) => {
  //  跳转时判断是否登录
  let session_status = router.app.$util._checkSession('meteor_user',['_id','name']);
  if(to.path.indexOf('admin')>-1&&!session_status){
    next({name:'Start'});
  }else {
    next()
  }
});
/* 路由跳转后 */
router.afterEach(() => {
// router.afterEach((to) => {
  /* 全局加载进度条完成进度 */
  // LoadingBar.finish();
  // console.log('afterEach',to);
  /* 界面初始化定位 0,0 */
  window.scrollTo(0, 0);
});

export default router
