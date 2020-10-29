import axios from 'axios';
import {Message} from 'element-ui';
import router from '../router';
// 响应的拦截器resp
axios.interceptors.response.use(success=>{
    if(success.status&&success.status==200&&success.data.status==500){
        // 业务上的错误
        Message.error({
            message:success.data.msg
        })
        return ;
    }
    //有msg就提示一下
    if(success.data.msg){
        Message.success({
            message:success.data.msg
        })
    }

    return success.data;
},error=>{
    if(error.response.status==504||error.response.status==404){
        Message.error({
            message:"服务器被吃了"
        })
    }else if(error.response.status==403){
        Message.error({
            message:"尚无权限，请联系管理员"
        })
    }else if(error.response.status==401){
        Message.error({
            message:"尚未登录，请登录后再试",
        })
        router.replace("/")
    }else {
        if(error.response.data.msg){
            Message.error({
                message:error.response.data.msg
            })
        }else{
            Message.error({
                message:"未知错误！"
            })
        }
    }
    return;
})

let base="";

//请求封装  k_v 不支持JSON
export const postKVRequest=(url,params)=>{
    return axios({
        method:'POST',
        url:`${base}${url}`,
        data:params,
        transformRequest:[function(data){
            // 转换参数
            let ret = "";
            console.log(JSON.stringify(data),"data");
            for (let i in data) {
                ret+=encodeURIComponent([i])+"="+encodeURIComponent(data[i])+"&"
            }
            return ret;
        }],
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'
        }
    })
}

//请求封装  支持JSON
export const postRequest=(url,params)=>{
    return axios({
        method:'POST',
        url:`${base}${url}`,
        data:params,
    })
}

export const putRequest=(url,params)=>{
    return axios({
        method:'put',
        url:`${base}${url}`,
        data:params,
    })
}

export const getRequest=(url,params)=>{
    return axios({
        method:'get',
        url:`${base}${url}`,
        data:params,
    })
}

export const deleteRequest=(url,params)=>{
    return axios({
        method:'delete',
        url:`${base}${url}`,
        data:params,
    })
}




