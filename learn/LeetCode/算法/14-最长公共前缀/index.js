/** 14. 最长公共前缀
 * https://leetcode-cn.com/problems/longest-common-prefix/
 *
 * 难度：简单
 *
 * 编写一个函数来查找字符串数组中的最长公共前缀。
 * 如果不存在公共前缀，返回空字符串 ""。
 *
 * 示例 1:
 * ```
 * 输入: ["flower","flow","flight"]
 * 输出: "fl"
 * ```
 *
 * 示例 2:
 * ```
 * 输入: ["dog","racecar","car"]
 * 输出: ""
 * 解释: 输入不存在公共前缀。
 * ```
 *
 * 说明:
 * 所有输入只包含小写字母 a-z 。
 */

/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
  if (strs.length === 0) return '';

  // 只有一个字符串时，最长公共前缀就是它
  // let pre = strs[0];
  // for (let i = 1; i < strs.length; i++) {
  //   const s = strs[i];
  //   // 当前前缀比字符串更长，切掉多余字符
  //   if (pre.length > s.length) {
  //     pre = pre.slice(0, s.length);
  //   }
  //   // 逐个字符对比
  //   for (let j = 0; j < pre.length; j++) {
  //     // 当两者某个索引的字符不同时，终止对比，进入下一个字符串的比较
  //     if (pre[j] !== s[j]) {
  //       pre = pre.slice(0, j);
  //       break;
  //     }
  //   }

  //   // 如果前缀长度为 0，即为 ""，则没有继续比较的意义
  //   if (pre.length === 0) {
  //     return pre;
  //   }
  // }

  // 不做嵌套循环
  let max = strs[0];
  let min = strs[0];
  let pre = '';
  for (let i = 1; i < strs.length; i++) {
    // 通过字符code大小进行排序，得出最大字符串和最小字符串
    // 这里的最大最小，不是指长度，而是指 a-z 的排序
    if (strs[i] > max) {
      max = strs[i];
      continue;
    }
    if (strs[i] < min) min = strs[i];
  }
  // 得到最大字符串和最小字符串之后，只需得出 max 和 min 的公共前缀即可
  const len = Math.min(min.length, max.length);
  for (let i = 0; i < len; i++) {
    if (min[i] !== max[i]) {
      return pre;
    }
    pre += min[i];
  }

  return pre;
};
