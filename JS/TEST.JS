function a () {

    let arr = [{"product_name":"青菜","list":[{"_id":"5ece8b7333fe0c46ce107170","warehousing_num":"200.00","stock_num":"104.00","time":"2020-05-27 23:46","supplier_name":"","supplier_id":"5eccf1b87c393a51455e9bdd","reference":"222","number":"200.00","product_id":"青菜","product_name":"青菜","warehousing_bacth":"222","unit":"个","warehouse_id":"5eccf15e14e96450d03c7fd7","hex_create_time":1590594419998,"hex_update_time":1590594616721}],"count":1,"index":0,"sum":"104.00"},{"product_name":"青菜(种子)","list":[{"_id":"5ece929f56184e52a00226de","product_name":"青菜","product_type":"苗期","type":"基地","user_name":null,"user_id":null,"warehouse_id":"5eccf15e14e96450d03c7fd7","warehouse_name":"寿光基地—禹泽农业仓库","time":"2020-05-28 00:17","supplier_name":null,"supplier_id":null,"reference":"qc666","number":8000,"base_id":"5eccf15e14e96450d03c7fd6","base_name":null,"company_id":null,"company_name":null,"unit":"孔","hex_create_time":1590596255514,"hex_update_time":1590596255514},{"_id":"5ece92799d928e524d32aa93","warehousing_num":"222.00","stock_num":"326.00","time":"2020-05-28 00:16","supplier_name":"","supplier_id":"5eccf1b87c393a51455e9bdd","reference":"222","number":"222.00","product_id":"5eccf63bf0598d52cdb04761","product_name":"青菜","warehousing_bacth":"222232","unit":"米","warehouse_id":"5eccf15e14e96450d03c7fd7","base_id":"5eccf15e14e96450d03c7fd6","company_id":"5eccf090b2c1ee50b9c234b2","product_type":"种子","hex_create_time":1590596217992,"hex_update_time":1590596217992}],"count":2,"index":0},{"product_name":"磷酸二氢钾","list":[{"_id":"5ece8314bcb8a541b3bba96b","warehousing_num":"200.00","stock_num":"40.00","time":"2020-05-27 23:10","supplier_name":"","supplier_id":"5eccf1b87c393a51455e9bdd","reference":"2","number":"200.00","product_id":"磷酸二氢钾","product_name":"磷酸二氢钾","warehousing_bacth":"2222","unit":"个","hex_create_time":1590592276422,"hex_update_time":1590593885084}],"count":1,"index":0,"sum":"40.00"},{"product_name":"黄瓜","list":[{"_id":"5ece81723dcd2e4102e9427b","warehousing_bacth":"12320200527","product_name":"黄瓜","warehousing_num":1,"stock_num":1,"product_type":"苗期","type":"基地","user_name":null,"user_id":null,"warehouse_id":"5eccf15e14e96450d03c7fd7","warehouse_name":"寿光基地—禹泽农业仓库","time":"2020-05-27 23:38","supplier_name":null,"supplier_id":null,"reference":"hg777","number":8000,"base_id":"5eccf15e14e96450d03c7fd6","base_name":null,"company_id":null,"company_name":null,"unit":"孔","hex_create_time":1590591858786,"hex_update_time":1590593903453}],"count":1,"index":0,"sum":1},{"product_name":"碳化稻壳","list":[{"_id":"5ece7fb94e487e3f20b22dd4","warehousing_num":"200.00","stock_num":"-88.00","time":"2020-05-27 22:56","supplier_name":"","supplier_id":"5eccf181c8a0225138ece90a","reference":"22","number":"200.00","product_id":"碳化稻壳","product_name":"碳化稻壳","warehousing_bacth":"2","unit":"袋","hex_create_time":1590591417639,"hex_update_time":1590594616708}],"count":1,"index":0,"sum":"-88.00"}]
    var maps = new Map();
  
    for (var item of arr) {
        // 判断map里有没有这个名称 
        if (maps.has(item.product_name)&&item.product_type) {
            
            var arr1 = new Array();
            //把同一个名称的数据放到一个数组里
            arr1 = maps.get(item.product_name);
            arr1.push(item);
            // 再继续存到map
            maps.set(item.product_name+"("+item.product_type+")", arr1);
            
        } else {      
            //其他情况直接存  
            var arr1 = new Array();
            arr1.push(item);
            maps.set(item.product_name, arr1);
        }
    }
  
  

    var newarr = Array(); // 二维数组
  // 处理map 到new arr

    for (var m of maps) {
      console.log("m[1][0]"+m[1][0])
      console.log(m[1][0])
        var obj = new Object();

        obj.product_name = m[0];
        obj.list = m[1]; 
        obj.count = m[1].length;
        obj.index = 0;
        obj.sum = 0
        
        for (const val of m[1]) {
            //console.log(val)
            obj.sum += val.list.number
        }

        newarr.push(obj);
    }
    
    //console.log(JSON.stringify(newarr,null,2))
    return newarr;

    module.define([
        'require',
        'dependency'
    ], function(require, factory) {
        'use strict';
        
    });
}



a();