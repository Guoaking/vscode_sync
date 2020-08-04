/*
 * @lc app=leetcode.cn id=35 lang=javascript
 *
 * [35] 搜索插入位置
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 * 应用场景：
 * 解题思路：
 * 
 * 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

你可以假设数组中无重复元素。

示例 1:

输入: [1,3,5,6], 5
输出: 2
示例 2:

输入: [1,3,5,6], 2
输出: 1
示例 3:

输入: [1,3,5,6], 7
输出: 4
示例 4:

输入: [1,3,5,6], 0
输出: 0
 */
var searchInsert = function(nums, target) {

    const index = nums.indexOf(target)
    if( ~index ) return index;
    for(var i=0; i<nums.length; i++){
        if(target < nums[i]) return i
    }
    return i

};
// @lc code=end

let arr = [1,3,5,6]
console.log(searchInsert(arr,"4"));
console.log(~1);


