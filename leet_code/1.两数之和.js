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
 */
var twoSum = function(nums, target) {
    
};
// @lc code=end

/**
 * 计算差值
 */
let nums = [2,7,11,15]
let target = 9;
function twoSum(arr,target){
    
    for (let i = 0; i < arr.length; i++) {
        const ele = arr[i];
        let diff = target-ele
        for (let j = i+1; j < arr.length; j++) {
            const element = arr[j];
            if(element==diff){
                
            }
        }
    }
}