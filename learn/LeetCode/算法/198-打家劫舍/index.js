/** 198 打家劫舍
 * https://leetcode-cn.com/problems/house-robber/
 *
 * 难度：简单
 *
 * 你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，**如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警**。
 *
 * 给定一个代表每个房屋存放金额的非负整数数组，计算你 **不触动警报装置的情况下** ，一夜之内能够偷窃到的最高金额。
 *
 * 提示：
 * - `0 <= nums.length <= 100`
 * - `0 <= nums[i] <= 400`
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
  const len = nums.length;
  if (len === 0) {
    return 0;
  }

  if (len === 1) {
    return nums[0];
  }

  if (len === 2) {
    return Math.max(nums[0], nums[1]);
  }

  // const dp = new Array(len);
  // dp[0] = nums[0];
  // dp[1] = Math.max(nums[0], nums[1]);

  // for (let i = 2; i < len; i++) {
  //   dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1]);
  // }
  // return dp[len - 1];

  // 优化空间复杂度
  let pre2 = nums[0];
  let pre1 = Math.max(nums[0], nums[1]);
  for (let i = 2; i < len; i++) {
    const temp = Math.max(pre2 + nums[i], pre1);
    pre2 = pre1;
    pre1 = temp;
  }
  return pre1;
};
