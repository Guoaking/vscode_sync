let proxyObj = {};

proxyObj["/ws"]={
    ws:true,
    target:"ws://localhost:8081",//转发地址
};
proxyObj["/"]={
    ws:false,//关闭websocket
    target:"http://localhost:8081",//转发地址
    changeOrigin:true,
    pathRewrite:{
        "^/":""  
    }
};



module.exports={
    devServer:{
        host:"localhost",
        port:8080,
        proxy:proxyObj
    }
}