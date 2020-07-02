/*
 * @lc app=leetcode.cn id=9 lang=javascript
 *
 * [9] 回文数
 */

// @lc code=start
/**
 * @param {number} x
 * @mark 
 * @return {boolean}
 * 判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。
 * 适用场景 ：一组数据是否重复？ 头尾是否一致？
 * 实现思路：翻转 == || 
示例 1:

输入: 121
输出: true
示例 2:

输入: -121
输出: false
解释: 从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。
示例 3:

输入: 10
输出: false
解释: 从右向左读, 为 01 。因此它不是一个回文数。
进阶:

你能不将整数转为字符串来解决这个问题吗？
 */
var isPalindrome = function(x=13231) {

   // 
  //  console.log(x.toString()==x.toString().split("").reverse().join(""))
  if(x<0) return false;
  if(x<10) return true;
  let right = 1;
  let left = 0;
  let sum = x;
  //计算总位数
  while(sum>=1){
      sum = sum /10
      left ++
  }
  //获得第n位的数
  let getNum = (_x,n)=>{
      console.log("this");
      return Math.floor(_x%Math.pow(10,n)/Math.pow(10,n-1));
  }
  while (left>right){
      if(getNum(x,left)!=getNum(x,right)) return false;
      left--;
      right++;
  }
  console.log('this2');
  
  return true;
};
// @lc code=end



console.log( isPalindrome());


