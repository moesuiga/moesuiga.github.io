/** 20. 有效的括号
 * https://leetcode-cn.com/problems/valid-parentheses/
 *
 * 难度：简单
 *
 * 给定一个只包括 `(`,`)`,`{`,`}`,`[`,`]`的字符串，判断字符串是否有效。
 *
 * 有效字符串需满足：
 * 1. 左括号必须用相同类型的右括号闭合。
 * 2. 左括号必须以正确的顺序闭合。
 *
 * 示例1：
 * ```
 * 输入："()"
 * 输出：true
 * ```
 *
 * 示例2：
 * ```
 * 输入："()[]{}"
 * 输出：true
 * ```
 *
 * 示例3：
 * ```
 * 输入："(]"
 * 输出：false
 * ```
 *
 * 示例4：
 * ```
 * 输入："([)]"
 * 输出：false
 * ```
 *
 * 示例5：
 * ```
 * 输入："{[]}"
 * 输出：true
 * ```
 */

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  const len = s.length;
  // 长度为奇数，一定是false，无法成对
  if (len % 2 === 1) {
    return false;
  }

  if (len === 0) {
    return true;
  }

  const hash = {
    '(': ')',
    '[': ']',
    '{': '}'
  };
  const arr = new Array();
  for (let i = 0; i < len; i++) {
    // 左括号
    if (hash[s[i]]) {
      arr.push(s[i]);
      continue;
    }
    // 右括号，与之前最后一次有效左括号是否相同类型
    if (hash[arr.pop()] !== s[i]) {
      return false;
    }
  }
  // 还有左括号未匹配
  if (arr.length) {
    return false;
  }
  return true;
};
