/** 9. 回文数
 * https://leetcode-cn.com/problems/palindrome-number/
 *
 * 难度：简单
 *
 * 判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。
 *
 * **示例1**：
 * ```
 * 输入：121
 * 输出：true
 * ```
 *
 * **示例2**：
 * ```
 * 输入：-121
 * 输出：false
 * 解释：从左向右读，为 -121.从右向左读，为 121-。因此它不是一个回文数。
 * ```
 *
 * **示例3**：
 * ```
 * 输入：10
 * 输出：false
 * 解释：从右向左读，为 01.因此它不是一个回文数。
 * ```
 *
 * **进阶**：
 * 你能不将整数转为字符串来解决这个问题吗？
 */

/**
 * 回文数
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
  // 负数因为符号的原因，直接返回false即可
  if (x < 0) return false;
  // 0 - 9 的整数，肯定是回文数
  if (x < 10) return true;
  // 1. 转为字符串的思路，逐个遍历比对
  // const str = x.toString();
  // const len = str.length;
  // // 两头遍历一直对照到中间
  // const half = Math.ceil(len / 2);
  // for (let i = 0; i < half; i++) {
  //   if (str[i] !== str[len - 1 - i]) {
  //     return false;
  //   }
  // }
  // return true;

  // 2. 不转为字符串的思路
  // 对 10 取模
  let n = 0;
  let m = x;
  while (m >= 10) {
    n = n * 10 + m % 10;
    m = Math.floor(m / 10);
  }
  return n * 10 + m === x;
}
