/*
 * @lc app=leetcode.cn id=53 lang=javascript
 *
 * [53] 最大子序和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {

};
// @lc code=end

function() {
    let arr = #data#
    let arrz = #dat#


    if (arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
            switch (arr[i].break_law_level) {
                case "CD002":
                    arr[i].break_law_level = "违法程度-中"
                    break;
                case "CD001":
                    arr[i].break_law_level = "违法程度-低"
                    break;
                case "CD003":
                    arr[i].break_law_level = "违法程度-高"
                    break;
            }

            var a = arr[i].date_collect_time;
            var b = a.substr(0, a.indexOf(" "))
            arr[i].date_collect_time = b

            /*================================*/
            if (arrz.length > 0) {
                for (let j = 0; j < arrz.length; j++) {
                    if (arrz[j].uuid == arr[i].uuid) {
                        arr[i].views_num = arrz[j].views_num
                        arr[i].tagging_num = arrz[j].tagging_num
                        break;
                    } else {
                        arr[i].views_num = 0
                        arr[i].tagging_num = 0
                    }
                }
            } else {
                arr[i].views_num = 0
                arr[i].tagging_num = 0

            }

 var a 
 if(arr[i].break_law_level!=null){ a =a+"|" +arr[i].break_law_level}
 if(arr[i].break_law_label!=null) {a =a+"|"+ arr[i].break_law_label}
 arr[i]['label'] = a
        }


    }

}