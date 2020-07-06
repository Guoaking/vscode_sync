/*
 * @lc app=leetcode.cn id=20 lang=javascript
 *
 * [20] 有效的括号
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 * 适用场景：
 * 实现思路：
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。

有效字符串需满足：

左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。
注意空字符串可被认为是有效字符串。

示例 1:

输入: "()"
输出: true
示例 2:

输入: "()[]{}"
输出: true
示例 3:

输入: "(]"
输出: false
示例 4:

输入: "([)]"
输出: false
示例 5:

输入: "{[]}"
输出: true
 */
var isValid = function (s) {
    let arr = []
    console.log(s.length)
    let len = s.length
    if (len % 2) return false;
    console.log("hello")
    for (let i = 0; i < len.length; i++) {
        const element = len[i];
        console.log(element)
        switch (element) {
            case "(":
                arr.push(element)
                break;
            case "[":
                arr.push(element);
                break;
            case "{":
                arr.push(element)
                break;
            case ")":
                console.log('hello');
                
                if (arr.pop() !== "(") return false;
                break;
            case "]":
                if (arr.pop() !== "[") return false;
                break;
            case "}":
                if (arr.pop() !== "{") return false;
                break;
        }
    }
    return !arr.length
};
// @lc code=end

console.log(isValid("([)]"));

