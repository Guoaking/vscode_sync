let a = [
  {
    "_id": "5efd94f0601cc0613beb07b5",
    "company_id": "5ef9a65f3fc4232422bce5dc",
    "company_name": "航天中心医院",
    "date": 1594857600000,
    "quotas": "3",
    "count": "3",
    "data_before": "3",
    "partment": "",
    "cuser_id": "5ef9a65f3fc4232422bce606",
    "cuser_name": "院长",
    "s_quotas": "3",
    "time": "2020-7-16",
    "color": "green",
    "type": "normal",
    "text": "剩余3"
  },
  {
    "_id": "5efd94f0601cc0613beb07b6",
    "company_id": "5ef9a65f3fc4232422bce5dc",
    "company_name": "航天中心医院",
    "date": 1594944000000,
    "quotas": "3",
    "count": "3",
    "data_before": "3",
    "partment": "",
    "cuser_id": "5ef9a65f3fc4232422bce606",
    "cuser_name": "院长",
    "s_quotas": "3",
    "time": "2020-7-17",
    "color": "green",
    "type": "normal",
    "text": "剩余3"
  },
  {
    "_id": "5efd94f0601cc0613beb07b7",
    "company_id": "5ef9a65f3fc4232422bce5dc",
    "company_name": "航天中心医院",
    "date": 1595030400000,
    "quotas": "3",
    "count": "3",
    "data_before": "3",
    "partment": "",
    "cuser_id": "5ef9a65f3fc4232422bce606",
    "cuser_name": "院长",
    "s_quotas": "3",
    "time": "2020-7-18",
    "color": "red",
    "type": "disabled",
    "text": "已过期"
  },
  {
    "_id": "5efdb55d8db50602cc58543c",
    "company_id": "5ef9a65f3fc4232422bce5dc",
    "company_name": "航天中心医院",
    "date": 1593734400000,
    "quotas": "1",
    "count": "1",
    "data_before": "1",
    "partment": "",
    "cuser_id": "5ef9a65f3fc4232422bce606",
    "cuser_name": "院长",
    "s_quotas": "1",
    "time": "2020-7-3",
    "color": "red",
    "type": "disabled",
    "text": "已过期"
  },
  {
    "_id": "5efdb55d8db50602cc58543d",
    "company_id": "5ef9a65f3fc4232422bce5dc",
    "company_name": "航天中心医院",
    "date": 1593820800000,
    "quotas": "1",
    "count": "1",
    "data_before": "1",
    "partment": "",
    "cuser_id": "5ef9a65f3fc4232422bce606",
    "cuser_name": "院长",
    "s_quotas": "1",
    "time": "2020-7-4",
    "color": "red",
    "type": "disabled",
    "text": "已过期"
  },
  {
    "_id": "5efdb55d8db50602cc58543e",
    "company_id": "5ef9a65f3fc4232422bce5dc",
    "company_name": "航天中心医院",
    "date": 1593907200000,
    "quotas": "3",
    "count": "3",
    "data_before": "3",
    "partment": "",
    "cuser_id": "5ef9a65f3fc4232422bce606",
    "cuser_name": "院长",
    "s_quotas": "3",
    "time": "2020-7-5",
    "color": "red",
    "type": "disabled",
    "text": "已过期"
  },
  {
    "_id": "5efdb5d78db50602cc58543f",
    "company_id": "5ef9a65f3fc4232422bce5dc",
    "company_name": "航天中心医院",
    "date": 1593561600000,
    "quotas": "1",
    "count": "1",
    "data_before": "1",
    "partment": "",
    "cuser_id": "5ef9a65f3fc4232422bce606",
    "cuser_name": "院长",
    "s_quotas": "1",
    "time": "2020-7-1",
    "color": "red",
    "type": "disabled",
    "text": "已过期"
  },
  {
    "_id": "5efdb5d78db50602cc585440",
    "company_id": "5ef9a65f3fc4232422bce5dc",
    "company_name": "航天中心医院",
    "date": 1593648000000,
    "quotas": "1",
    "count": "1",
    "data_before": "1",
    "partment": "",
    "cuser_id": "5ef9a65f3fc4232422bce606",
    "cuser_name": "院长",
    "s_quotas": "1",
    "time": "2020-7-2",
    "color": "red",
    "type": "disabled",
    "text": "已过期"
  }
]

var aa = function (date, now) {
  /*数据处理*/

  
  let a = date
  let b = now
  let da = new Date()

  for (let i = 0; i < a.length; i++) {
    let count = 24 * 60 * 60 * 1000;
    /**一天 */
    if(a[i].count>0){
      count = count * a[i].count
    }{
      count =  count*0
    }
    
    let ba = da.setTime(a[i].date)
    let temp = timestampToTime(ba)
    if (temp.charAt(5) == "0") {

      temp = temp.split("")
      temp.splice(5, 1)
      temp = temp.join("")
      a[i].time = temp;
    } else {
      a[i].time = timestampToTime(ba)
    }
    a[i].nice = parseInt(ba) - parseInt(count)
    if (parseInt(b) < (parseInt(ba) - parseInt(count))) {
      if (a[i].s_quotas > 0) {
        a[i].color = "green"
        a[i].type = "normal"
        a[i].text = `剩余${a[i].s_quotas}`
      } else {
        a[i].color = "red"
        a[i].type = "disabled"
        a[i].text = "无名额"
      }
    } else {
      a[i].color = "red"
      a[i].type = "disabled"
      a[i].text = "已失效"
    }
  }
  return a

}
/**7-2  */
let count = 24 * 60 * 60 * 1000;
console.log(parseInt(1595030400000) - parseInt(count*3))
// console.log(aa(a, "1593686633015"))
let da = new Date()
let ba = da.setTime(1595088000000)
function timestampToTime(timestamp) {
  var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  Y = date.getFullYear() + '-';
  M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  D = date.getDate();
  return Y + M + D;
}


let b  = 17835706945
let bb = b.toString()
console.log(typeof(b));
