import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex)
// vuex 状态管理
export default new Vuex.Store({
    state:{
        routes:[]
    },
    mutations:{
        initRoutes(state,data){
            state.routes = data
        }
    },
    actions:{

    },

})