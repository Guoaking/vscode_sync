/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]} 
 *  适用场景：差值计算  数组内求和
 * 实现思路:  求和 先求一个差值
 */
// var twoSum = function(nums, target) {
    
// };
// @lc code=end

/**
 * 思路两层for   计算差值  数组
 */
function twoSum (ar,target){

    let arr = ar;
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        let diff = target-element
        for (let j = 0; j < arr.length; j++) {
            const ele = arr[j];
            if(diff==ele){
                return [i,j]
            }
        }
    }
    return "null"
}

let nums = [2,7,11,15]
let target = 17;
console.log(twoSum(nums,17))