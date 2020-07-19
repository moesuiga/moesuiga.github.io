/** 315. 计算右侧小于当前元素的个数
 * https://leetcode-cn.com/problems/count-of-smaller-numbers-after-self/
 *
 * 难度：困难
 *
 * 给定一个整数数组 nums，按要求返回一个新数组 counts。数组 counts 有该性质： counts[i] 的值是  nums[i] 右侧小于 nums[i] 的元素的数量。
 *
 * 示例：
 * ```
 * 输入：[5,2,6,1]
 * 输出：[2,1,1,0]
 * 解释：
 * 5 的右侧有 2 个更小的元素 (2 和 1)
 * 2 的右侧仅有 1 个更小的元素 (1)
 * 6 的右侧有 1 个更小的元素 (1)
 * 1 的右侧有 0 个更小的元素
 * ```
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var countSmaller = function(nums) {
  const len = nums.length;
  if (len === 0) return [];
  if (len === 1) return [0];

  const counts = new Array(len).fill(0);
  // 最后一位 counts[len - 1] 一定是0
  // for (let i = len - 2; i >= 0; i--) {
  //   for (let j = i; j < len; j++) {
  //     if (nums[i] > nums[j]) {
  //       counts[i]++;
  //     }
  //   }
  // }
  // ↑↑↑ 耗时较长

  const cache = {
    max: nums[len - 1],
  };
  for (let i = len - 1; i >= 0; i--) {
    const n = nums[i];
    // 当前为遍历过程中遇到的最大数字
    if (n > cache.max) {
      counts[i] = len - i - 1;
      cache.max = n;
      cache[n] = {
        index: i,
        count: counts[i],
      };
      continue;
    }

    let last = len;
    // 之前遍历存在相同数字
    if (cache[n]) {
      last = cache[n].index;
      counts[i] += cache[n].count;
    }
    for (let j = i; j < last; j++) {
      if (nums[i] > nums[j]) {
        counts[i]++;
      }
    }
    cache[n] = {
      index: i,
      count: counts[i],
    }
  }
  return counts;
};
