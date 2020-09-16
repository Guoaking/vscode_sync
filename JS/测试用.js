var bea= [

  {
    "self_id": "CT0001002",
    "parent_id": "CT0001",
    "name": "文明办",
    "level": 1,
    "tag_name": "文明办",
    "_id": "CT0001002"
  },
  
  {
    "self_id": "CT0001001",
    "parent_id": "CT0001",
    "name": "市场监督管理局",
    "level": 1,
    "tag_name": "市场监督管理局",
    "_id": "CT0001001"
  },
  {
    "self_id": "CT0002006",
    "parent_id": "CT0002",
    "name": "农药",
    "level": 1,
    "tag_name": "农药",
    "_id": "CT0002006"
  },
  {
    "self_id": "CT0002001",
    "parent_id": "CT0002",
    "name": "药品",
    "level": 1,
    "tag_name": "药品",
    "_id": "CT0002001"
  },
  {
    "self_id": "CT0003001",
    "parent_id": "CT0003",
    "name": "市容环境管理",
    "level": 1,
    "tag_name": "市容环境管理",
    "_id": "CT0003001"
  },
  {
    "self_id": "CT0002011",
    "parent_id": "CT0002",
    "name": "房地产",
    "level": 1,
    "tag_name": "房地产",
    "_id": "CT0002011"
  },
  {
    "self_id": "CT0002010",
    "parent_id": "CT0002",
    "name": "化妆品",
    "level": 1,
    "tag_name": "化妆品",
    "_id": "CT0002010"
  },
  {
    "self_id": "CT0003007",
    "parent_id": "CT0003",
    "name": "交通管理类",
    "tag_name": "交通管理类",
    "_id": "CT0003007"
  },
  {
    "self_id": "CT0003005",
    "parent_id": "CT0003",
    "name": "教育管理类",
    "tag_name": "教育管理类",
    "_id": "CT0003005"
  },
  {
    "self_id": "CT0003003",
    "parent_id": "CT0003",
    "name": "市场管理类",
    "tag_name": "市场管理类",
    "_id": "CT0003003"
  },
  {
    "self_id": "CT0002009",
    "parent_id": "CT0002",
    "name": "酒类",
    "level": 1,
    "tag_name": "酒类",
    "_id": "CT0002009"
  },
  {
    "self_id": "CT0002008",
    "parent_id": "CT0002",
    "name": "烟草",
    "level": 1,
    "tag_name": "烟草",
    "_id": "CT0002008"
  },
  {
    "self_id": "CT0003010",
    "parent_id": "CT0003",
    "name": "园林绿化类",
    "tag_name": "园林绿化类",
    "_id": "CT0003010"
  },
  {
    "self_id": "CT0003006",
    "parent_id": "CT0003",
    "name": "社会服务类",
    "tag_name": "社会服务类",
    "_id": "CT0003006"
  },
  {
    "self_id": "CT0003002",
    "parent_id": "CT0003",
    "name": "建设管理类",
    "tag_name": "建设管理类",
    "_id": "CT0003002"
  }

]

var afa = [



  {
    "self_id": "CT0001002",
    "parent_id": "CT0001",
    "name": "文明办",
    "level": 1,
    "tag_name": "文明办",
    "_id": "CT0001002"
  },
  {
    "self_id": "CT0001001",
    "parent_id": "CT0001",
    "name": "市场监督管理局",
    "level": 1,
    "tag_name": "市场监督管理局",
    "_id": "CT0001001"
  },  {
    "self_id": "CT000309902",
    "parent_id": "CT0003",
    "name": "建设管理类",
    "tag_name": "建设管理类",
    "_id": "CT0003002"
  }

]

function a (data1,data2){
  
    for(var i = 0;i < data1.length; i++){
      for(var j = 0;j < data2.length; j++){
        if(data1.length>0){
         if(data1[i].self_id == data2[j].self_id){
            data1.splice(i,1);
        }
      }
    }
  }

  return data1;
}

console.log(a(afa,bea))