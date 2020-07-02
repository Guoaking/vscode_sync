let res2_0 = [
  {
    "_id": "5ef1552974ba9e3e9979bd03",
    "creat_name": null,
    "shift_name": "1",
    "time": "9:30-12:00",
    "shift_duration": "3小时",
    "is_night": "是",
    "color": "12",
    "content": "12",
    "hex_create_time": 1592874281093,
    "hex_update_time": 1593163034631,
    "__visible": false,
    "sort": "1"
  },
  {
    "_id": "5ef3312933ee876d0db3b88e",
    "creat_name": null,
    "shift_name": "2",
    "time": "13:00-19:00",
    "shift_duration": "6小时",
    "is_night": "否",
    "color": "12",
    "content": "12",
    "hex_create_time": 1592996137099,
    "hex_update_time": 1593163008925,
    "__visible": false,
    "sort": "2"
  },
  {
    "_id": "5ef5bc65641e56260906d800",
    "creat_name": "",
    "shift_name": "3",
    "time": "19:00-20:00",
    "shift_duration": "3小时",
    "is_night": "是",
    "color": "12",
    "content": "12",
    "sort": "3",
    "hex_create_time": 1593162853260,
    "hex_update_time": 1593162971846,
    "__visible": false
  }
]



let work_list = [
  {
    "_id": "5ef9cde351b2c0791857a9e7",
    "w_name": "大头",
    "w_pname": "凯医生",
    "w_date": 1,
    "shift_name": "1",
    "w_others": "",
    "enterprise_id": "5ef9a65f3fc4232422bce5dc",
    "date": 1593429475575,
    "w_pname_id": "5ef9a713a64a293792626aa3",
    "w_name_id": "5ef9ba21df504257693f83b2",
    "removed": 0,
    "hex_create_time": 1593429475613,
    "hex_update_time": 1593429475613
  },
  {
    "_id": "5ef9cde351b2c0791857a9e8",
    "w_name": "大头",
    "w_pname": "陈医生",
    "w_date": 1,
    "shift_name": "1",
    "w_others": "",
    "enterprise_id": "5ef9a65f3fc4232422bce5dc",
    "date": 1593429475575,
    "w_pname_id": "5ef9ab15a64a293792626ad1",
    "w_name_id": "5ef9ba21df504257693f83b2",
    "removed": 0,
    "hex_create_time": 1593429475619,
    "hex_update_time": 1593429475619
  },
  {
    "_id": "5ef9cdc751b2c0791857a9e6",
    "w_name": "大头",
    "w_pname": "陈医生",
    "w_date": 1,
    "shift_name": "4",
    "w_others": "",
    "enterprise_id": "5ef9a65f3fc4232422bce5dc",
    "date": 1593429447581,
    "w_pname_id": "5ef9ab15a64a293792626ad1",
    "w_name_id": "5ef9ba21df504257693f83b2",
    "removed": 0,
    "hex_create_time": 1593429447618,
    "hex_update_time": 1593429447618
  }
]

function a(list1,list2) {
  var arr = []

  for (var j = 0; j < list1.length; j++) {
    var obj = {}
    var item = list1[j];
    var wuList = [];
    for (var i = 0; i < 7; i++) {
      wuList.push({
        w_pname: '无',
        w_date: i + 1,
        shift_name: item.shift_name,
        user_list: []
      })
    }

    obj['time'] = item.time
    obj['list'] = wuList


    for (var i = 0; i < list2.length; i++) {
      var item2 = list2[i];
      item2.user_list = [item2.w_pname_id]
      var index = item2.w_date - 1;
      console.log("来了来了2")
     // console.log(item2)
      if(item2.shift_name==item.shift_name){
        console.log("来了来了4")
        if (obj['list'][index].w_pname == '无') {
          obj['list'][index] = item2;
        } else {
          obj['list'][index].w_pname = obj['list'][index].w_pname + ',' + item2.w_pname;
          obj['list'][index].user_list.push(item2.w_pname_id)
        }
      }

    }
    arr.push(obj)
  }




  return arr


}
let b = a(res2_0,work_list)
console.log(JSON.stringify(b,null,2))