/** 35. 搜索插入位置
 * https://leetcode-cn.com/problems/search-insert-position/
 *
 * 难度：简单
 *
 * 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。
 * 如果目标值不存在于数组中，返回它将会被按顺序插入的位置。
 *
 * 你可以假设数组中无重复元素。
 *
 * 示例1：
 * ```
 * 输入：[1,3,5,6], 5
 * 输出：2
 * ```
 *
 * 示例2：
 * ```
 * 输入：[1,3,5,6], 2
 * 输出：1
 * ```
 *
 * 示例3：
 * ```
 * 输入：[1,3,5,6], 7
 * 输出：4
 * ```
 *
 * 示例4：
 * ```
 * 输入：[1,3,5,6], 0
 * 输出：0
 * ```
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
  if (nums.length === 0) {
    return 0;
  }

  if (target < nums[0]) {
    return 0;
  }

  const len = nums.length;
  if (target > nums[len - 1]) {
    return len;
  }

  // let half = Math.floor(len / 2);
  // if (target === nums[half]) {
  //   return half;
  // }
  // if (target > nums[half]) {
  //   for (let i = half + 1; i < len; i++) {
  //     if (target <= nums[i]) return i;
  //   }
  //   return len;
  // }
  // for (let i = half - 1; i >= 0; i--) {
  //   if (target === nums[i]) return i;
  //   if (target > nums[i]) return i + 1;
  // }
  // return 0;

  let l = 0;
  let r = len - 1;
  let m = (l + r) >> 1; // 取中间值
  while (l <= r) {
    if (target === nums[m]) {
      return m;
    }
    if (target > nums[m]) {
      l = m + 1;
    } else {
      r = m - 1;
    }
    m = (l + r) >> 1;
  }
  return l;
};

console.log(searchInsert([1,3,5,6], 0));
