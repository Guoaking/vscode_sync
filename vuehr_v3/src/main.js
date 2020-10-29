import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import 'font-awesome/css/font-awesome.min.css'
import { initMenu } from './utils/menus'


/*------------------封装方法 ---------------------*/
import {postKVRequest} from "./utils/api"
import {postRequest} from "./utils/api"
import {putRequest} from "./utils/api"
import {getRequest} from "./utils/api"
import {deleteRequest} from "./utils/api"


Vue.prototype.postKVRequest = postKVRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.deleteRequest = deleteRequest;
/*------------------封装方法 ---------------------*/


Vue.config.productionTip = false
Vue.use(ElementUI)

/**
 * 前置导航守卫
 */
router.beforeEach((to,from,next)=>{
  if(to.path!="/"){
    //加载菜单
    if(window.sessionStorage.getItem("user")){
      initMenu(router,store);
    }else{
    //判断session没有用户信息则跳转登录页
      console.log(to,"to===========");
      next("/?redirect="+to.path)
    }

  }
  next();
})

new Vue({
  router,store,
  render: h => h(App)
}).$mount('#app')



