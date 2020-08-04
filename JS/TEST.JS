//初始化数组
function x(date, format) {
  date = new Date(date);
  var y = date.getFullYear()
  var M = date.getMonth() + 1
  var d = date.getDate()
  var h = date.getHours()
  var m = date.getMinutes()
  var s = date.getSeconds()
  console.log(y, M, d, h, m, s);

  function mat(val) {
    return val > 9 ? val : '0' + val
  }
  return format.replace('yyyy', y).replace('MM', mat(M)).replace('dd', mat(d)).replace('hh', mat(h)).replace('mm', mat(m)).replace('ss', mat(s));
}



var i = [
  [
    { id: 1, name: '员工编号', label: 'name', width: '340' },
    { id: 2, name: '姓名', label: 'leader', width: '200' },
    { id: 3, name: '应付创值金额', label: 'phones', width: '300' },
    { id: 4, name: '生产服务比例', label: 'phone', width: '300' },
    { id: 5, name: '生产服务金额', label: '1', width: '350' },
    { id: 5, name: '知识创值金额', label: '2', width: '350' },
    { id: 5, name: '文档总数', label: '3', width: '350' },
    { id: 5, name: '操作', label: 'hanlder', width: '350' }
  ]
]

var i = [
  [
    {
      id: 1,
      name: '项目名称',
      label: 'name',
      width: '340'
    }, {
      id: 1,
      name: '测试1',
      label: 'er',
      width: '340'
    }, {
      id: 2,
      name: '项目负责人',
      label: 'leader',
      width: '102'
    }, {
      id: 3,
      name: '联系方式',
      label: 'phone',
      width: '122'
    }, {
      id: 4,
      name: '处理状态',
      label: 'status',
      width: '108'
    }, {
      id: 5,
      name: '公开',
      label: 'isPublic',
      width: '92'
    }, {
      id: 6,
      name: '操作',
      label: 'handle',
      width: '324'
    }
  ]
]

let time = new Date("2023-07-22T23:26:00.000Z")
time = time.valueOf()
//console.log(x(time, "yyyy213MM123dd hh123mm:ss"))


var map = {
  '姓名':'nick_name',
  '性别':'sex',
  '年龄':'age',
  '身份证号':'id_card',
  '部门':'department_name',
  '岗位':'post',
  '联系方式':'phone',
  '婚姻状态':'marry_status',
  '生日':'birth',
  '工种':'work_type',
  '接害毒物':'jh_du',
  '接害工龄':'jh_age',
  '住院体检支付方式':'tj_pay_type',
  '体检时间':'tj_time',
  '体检类别':'tj_type',
  '家庭地址':'home_address',
  '岗位类别':'job_cate'
  }


  [{
    department_name:'部门',
    nick_name:'姓名',
    sex:'性别',
    birth:"出生日期",
    age:'年龄',
    marry_status:"婚姻状况",
    phone:'手提电话',
    id_card:'身份证号',
    post:'岗位',
    work_type:'工种',
    jh_du:'接害毒物',
    jh_age:'接害工龄',
    tj_pay_type:'住院体检支付方式',
    tj_time:'体检时间',
    tj_type:'体检类别',
    home_address:'家庭地址',
    job_cate:'岗位类别'
  }]