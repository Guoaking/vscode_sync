/*
 * @lc app=leetcode.cn id=27 lang=javascript
 *
 * [27] 移除元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 * 
 * 应用场景: 数据去重？对象不行
 * 显示思路: 比较重复的删除，||双指针？
 */


var removeElement = function(nums, val) {
    let index = 0, last = nums.length - 1
    while (index <= last) {
      if (nums[index] === val) {
        nums[index] = nums[last]
        last--
      } else {
        index++
      }
    }
    return nums
};


// @lc code=end
let arr = [0,1,2,2,3,0,4,2]
console.log(removeElement(arr,2))