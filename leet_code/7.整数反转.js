/*
 * @lc app=leetcode.cn id=7 lang=javascript
 *
 * [7] 整数反转
 */

// @lc code=start
/**
 * @param {number} x
 * @return {number}
 * 适用场景 倒序排列  逆处理
 * 实现思路：reverse 或者取余法
 * 给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。

示例 1:

输入: 123
输出: 321
 示例 2:

输入: -123
输出: -321
示例 3:

输入: 120
输出: 21
注意:

假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [−231,  231 − 1]。请根据这个假设，如果反转后整数溢出那么就返回 0。




 */
var reverse = function(x) {
    let abs = Math.abs(x=-12345)
    let now = 0;
    while(abs>0){
        now = now *10+abs%10;
       
        abs = Math.floor(abs/10);
        console.log(now,abs)
    }
    if(x<0){
        return now <=Math.pow(2,31)?-now:0;
    }else{
        return now < Math.pow(2,31)?now:0;
    }
};
// @lc code=end

console.log(reverse())
var my  = function(x=-12345){
    let abs = Math.abs(x)
    let now = 0;
    while(abs>0){
        now = now*10+abs%10;
        abs = Math.floor(abs/10)
    }
    if(x<0){
        return now<=Math.pow(2,31)?-now:0;
    }else{
        return now <Math.pow(2,31)?now:0
    }
}