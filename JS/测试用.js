let  a= {
    "type_name": "种子",
    "list": [
      {
        "_id": "5eccf63bf0598d52cdb04761",
        "name": "青菜",
        "text": "青菜",
        "value": "5eccf63bf0598d52cdb04761"
      },
      {
        "_id": "5eccf65ff0598d52cdb04762",
        "name": "黄瓜",
        "text": "黄瓜",
        "value": "5eccf65ff0598d52cdb04762"
      },
      {
        "_id": "5eccf681f0598d52cdb04763",
        "name": "西红柿",
        "text": "西红柿",
        "value": "5eccf681f0598d52cdb04763"
      },
      {
        "_id": "5ed78fd41d890c0e431b656b",
        "name": "测试规格5",
        "text": "测试规格5",
        "value": "5ed78fd41d890c0e431b656b"
      }
    ],
    "type_wuliao": "",
    "number": "",
    "xiaohao_num": 0,
    "baoliu_num": 0,
    "proportion": "5公斤/袋",
    "sindex": 0,
    "product_id": "5eccf63bf0598d52cdb04761",
    "product_name": "青菜",
    "company": "只",
    "purchase_price": "120",
    "price": "12312.00"
  }


  function aa (arr, key, val) {
    // 如果字段key == val 则删除这条数据
    let aa = Object.keys(arr)>="list"
    console.log("aa -> aa", aa)
    delete arr['list']
    
    return arr;
  };
console.log(aa(a,"list","list"))