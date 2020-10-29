import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ajavaboy from '@/components/javaboy'
// 路由表
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/ajavaboy',
      name: 'ajavaboy',
      component: ajavaboy
    }
  ]
})
