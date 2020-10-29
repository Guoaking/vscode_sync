import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import FriendChat from './views/chat/FriendChat.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/home',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Home.vue'),
      children:[
        {
          path: '/chat',
          name: 'FriendChat',
          component: FriendChat,
        },
      ]
    },
    

  ]
})
