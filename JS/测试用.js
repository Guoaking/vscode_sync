let a = {
    "datas": [
      {
        "_id": "5ef080719e48cc0779fe2c29",
        "topic_title": "航天中心医院",
        "topic_img": "",
        "topic_type": "个人",
        "create_uid": "5ee46ac97f90cc2628f5f3b2",
        "create_uname": null,
        "removed": 0,
        "topic_info": "健康助理",
        "company_id": "5ee59a983ffd5c1ca43346d4",
        "hex_create_time": 1592819825880,
        "hex_update_time": 1592819825880
      }
    ],
  "count": [
    13
  ]
}
//今天做了游戏聊天记录实时显示在后台的功能   

function run() {
//1秒执行一次runing这个函数
    setInterval(runing,5000)
}
function runing(a,b) {
   for (let i = 0; i < a.length; i++) { 
     const element = a[i];
     const b2      = b[i];
    a[i].count = b[i]

   }
   return a 
}
//run();

console.log(runing(a.datas,a.count))
