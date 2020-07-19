/** 1. 两数之和
 * https://leetcode-cn.com/problems/two-sum/
 *
 * 难度：简单
 *
 * 给定一个整数数组 `nums` 和一个目标值 `target`，
 * 请你在该数组中找出和为目标值的那 **两个** 整数，
 * 并返回他们的数组下标。
 *
 * 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。
 *
 * **示例**：
 * ```
 * 给定 nums = [2, 7, 11, 15], target = 9
 *
 * 因为 nums[0] + nums[1] = 2 + 7 = 9
 * 所以返回 [0, 1]
 * ```
 */

/**
 * 两数之和
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  // 考虑使用 hash 缓存
  // key 为 target - num，value 为 num 的索引
  const l = nums.length;
  // 数组内不足两个数，就构不成 **两数** 之和
  if (l < 2) {
    return [];
  }
  const hash = new Map();
  for (let i = 0; i < l; i++) {
    if (hash.has(nums[i])) {
      return [hash.get(nums[i]), i];
    }
    hash.set(target - nums[i], i);
  }
  return [];
}
