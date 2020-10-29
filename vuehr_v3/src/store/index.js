import Vue from 'vue';
import Vuex from 'vuex';
import {Notification} from 'element-ui';
import {getRequest} from '../utils/api';
import  '../utils/stomp';
import  '../utils/sockjs';
import { Message } from 'element-ui';

Vue.use(Vuex)
// vuex 状态管理

const now = new Date();

const store = new Vuex.Store({
    state:{
        // 用户信息
        routes:[],
        // chat
        sessions:{},
        hrs:[],
        currentSession: null,
        currentHr:JSON.parse(window.sessionStorage.getItem("user")),
        filterKey:'',
        //ws 需要的对象
        stomp:null,
        //小红点
        isDot:{}
    },
    mutations:{
        INIT_CURRENTHR(state,hr){
            state.currentHr = hr;
        },
        initRoutes(state,data){
            state.routes = data
        },
        // chat
        changeCurrentSession(state, currentSession) {
            state.currentSession = currentSession;
            // 取消小红点
            Vue.set(state.isDot,state.currentHr.username+"#"+currentSession.username,false);
        },
        // 消息的发送
		addMessage(state, msg) {
            console.log(msg,"storemsgaaaaaaaaaaaaaaaaaaaaa");
            
            let mss = state.sessions[state.currentHr.username +"#"+msg.to];
            if(!mss){
                // state.sessions[state.currentHr.username +"#"+msg.to] = [];
                Vue.set(state.sessions,state.currentHr.username +"#"+msg.to,[]);
            }
            
            state.sessions[state.currentHr.username +"#"+msg.to].push({
				content: msg.content,
				date: new Date(),
				self: !msg.notSelf
			})
		},
		INIT_DATA(state) {
            // 浏览本地的历史记录在这里完成
			let data = localStorage.getItem('vue-chat-session');
			if (data) {
				state.sessions = JSON.parse(data);
			}
        },
        INIT_HR(state,data){
            state.hrs = data;
        }
    },
	actions: {
        connect(context){
            console.log("connent");
            context.state.stomp = Stomp.over(new SockJS('/ws/ep'));
            context.state.stomp.connect({},success=>{
                context.state.stomp.subscribe('/user/queue/chat',msg=>{
                    // 消息的接收
                    let receiveMsg = JSON.parse(msg.body);
                    if(!context.state.currentSession ||receiveMsg.from!=context.state.currentSession.username){
                        //其他消息通知
                        Notification.info({
                            title:receiveMsg.fromNickname+"有新消息！",
                            message:receiveMsg.content.length>10?receiveMsg.content.substr(0,10):receiveMsg.content,
                            posititon:'bottom-right'
                        })
                        Vue.set(context.state.isDot,context.state.currentHr.username+"#"+receiveMsg.from,true);
                    }
                    receiveMsg.notSelf = true;
                    receiveMsg.to = receiveMsg.from;
                    context.commit('addMessage',receiveMsg);
                    console.log(msg.body,"msg to0000000000000from -------------");
                    
                })
            },error=>{
                console.error("链接失败",error);
                
            })
        },
        // 异步操作来这里
		initData(context) {
            context.commit('INIT_DATA')
            getRequest("/chat/hrs").then(data=>{
                if(data){
                    context.commit('INIT_HR',data)
                }
            })
		}
	}

})

store.watch(function (state) {
	return state.sessions
}, function (val) {
	console.log('变化session 聊天记录: ', val);
	localStorage.setItem('vue-chat-session', JSON.stringify(val));
}, {
	deep: true/*这个貌似是开启watch监测的判断,官方说明也比较模糊*/
})

export default store;