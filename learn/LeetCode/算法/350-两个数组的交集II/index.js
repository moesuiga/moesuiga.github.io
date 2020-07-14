/** 350. 两个数组的交集 II
 * https://leetcode-cn.com/problems/intersection-of-two-arrays-ii/
 *
 * 难度：简单
 *
 * 给定两个数组，编写一个函数来计算它们的交集。
 *
 * 示例 1：
 * ```
 * 输入：nums1 = [1,2,2,1], nums2 = [2,2]
 * 输出：[2,2]
 * ```
 *
 * 示例 2:
 * ```
 * 输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
 * 输出：[4,9]
 * ```
 *
 * 说明：
 * 输出结果中每个元素出现的次数，应与元素在两个数组中出现次数的最小值一致。
我们可以不考虑输出结果的顺序。
 */
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function (nums1, nums2) {
  const hash = new Map();
  const result = [];
  for (let i = 0; i < nums1.length; i++) {
    const n = nums1[i];
    hash.set(n, (hash.get(n) || 0) + 1);
  }

  for (let i = 0; i < nums2.length; i++) {
    const m = nums2[i];
    const count = hash.get(m);
    if (count > 0) {
      result.push(m);
      hash.set(m, count - 1);
    }
  }
  return result;
};
