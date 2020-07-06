/*
 * @lc app=leetcode.cn id=14 lang=javascript
 *
 * [14] 最长公共前缀
 */

// @lc code=start
/**
 * @param {string[]} strs
 * @return {string}
 * 编写一个函数来查找字符串数组中的最长公共前缀。
 * 适用场景：找一个数组内的不同或者相同？
 * 实现思路：2层for循环 脑子没转过来
 * ===字符串 可以直接遍历 数字不行===

如果不存在公共前缀，返回空字符串 ""。

示例 1:

输入: ["flower","flow","flight"]
输出: "fl"
示例 2:

输入: ["dog","racecar","car"]
输出: ""
解释: 输入不存在公共前缀。
说明:

所有输入只包含小写字母 a-z 。
 */
var longestCommonPrefix = function(strs) {
    //遍历这个数组
    if(strs.length ==0){ 
        return "";
    } 
    let ans = strs[0]
    for (let i = 1; i < strs.length; i++) {
        let j=0;
        
        for (; j < ans.length&&j<strs[i].length; j++) {
            console.log(typeof(strs[i]),strs[i][j])
            if(ans[j]!=strs[i][j])
            break;
        }
        ans = ans.substr(0,j)
        if(ans === "") return ans
    }
    return ans;
};
// @lc code=end
let a = ["flower","flow","flight"]
console.log(longestCommonPrefix(a));


