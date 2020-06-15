

let a = [
    {
      "_id": "5ee48608d9eb3c468d8f2b75",
      "topic_id": "",
      "msg": "fffff",
      "send_uid": "1",
      "send_name": "系统消息",
      "send_img": "",
      "removed": 0,
      "msg_type": "全局",
      "hex_create_time": 1592034824476,
      "hex_update_time": 1592034824476
    },
    {
      "_id": "5ee4874982c89947498fd1fa",
      "topic_id": "",
      "msg": "fffff",
      "send_uid": "1",
      "send_name": "系统消息",
      "send_img": "",
      "removed": 0,
      "msg_type": "全局",
      "hex_create_time": 1592035145884,
      "hex_update_time": 1592035145884
    },
    {
      "_id": "5ee4874a82c89947498fd1fb",
      "topic_id": "",
      "msg": "fffff",
      "send_uid": "1",
      "send_name": "系统消息",
      "send_img": "",
      "removed": 0,
      "msg_type": "全局",
      "hex_create_time": 1592035146674,
      "hex_update_time": 1592035146674
    },
    {
      "_id": "5ee4874c82c89947498fd1fc",
      "topic_id": "",
      "msg": "fffff",
      "send_uid": "1",
      "send_name": "系统消息",
      "send_img": "",
      "removed": 0,
      "msg_type": "全局",
      "hex_create_time": 1592035148126,
      "hex_update_time": 1592035148126
    }
  ]

  function timestampToTime(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    return Y + M + D + h + m + s;
}


// 通过时间戳获取正常的时间显示
function getTime(data,type){
    var _data = data;
    //如果是13位正常，如果是10位则需要转化为毫秒
    if (String(data).length == 13) {
      _data = data
    } else {
      _data = data*1000
    }
    const time = new Date(_data);    
    const Y = time.getFullYear();
    const Mon = time.getMonth() + 1;
    const Day = time.getDate();
    const H = time.getHours();
    const Min = time.getMinutes();
    const S = time.getSeconds();
    H.length = 1
    //自定义选择想要返回的类型
    if(type=="Y"){
      return `${Y}-${Mon}-${Day}`
    }else if(type=="H"){
      return `${H}:${Min}:${S}`
    }else{
      return `${Y}-${Mon}-${Day} ${H}:${Min}:${S}`
    }
  }

function sortmy (arr, key) {
    return arr.sort(function (a, b) {
      return b[key] - a[key];
    });
  };




a.forEach(item=>{
    item.type = "接收";
    item.info = item.msg;
    item.hex_create_time = getTime(item.hex_create_time);
    item.hex_update_time = getTime(item.hex_update_time,"Y");
})
console.log(a)

let t = '2020-06-13 15:53:44'
console.log("t", t)
let tt = t.slice(t.lastIndexOf(" ")+1)
console.log("tt", tt)
console.log("t", t)


function getDate(date){ 
    var t = new Date(date).toString()
    return t; 
}

let a =  [
    {
        name:"血压",
        num:"3",
        icon:""
    },{
        name:"尿常规",
        num:"11",
        icon:""
    },{
        name:"身高体重",
        num:"2",
        icon:""
    }
]

let b = [
    {
        name:"体检阳性结果",
        num:"2",
        child:[
            {
                name:"体重指数",
                text:"33.46"
            },{
                name:"尿隐血",
                text:"1+mg/L"
            }
        ]
    }

]