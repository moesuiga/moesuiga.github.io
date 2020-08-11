/** 309. 最佳买卖股票时机含冷冻期
 * https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/
 *
 * 难度：中等
 *
 * 给定一个整数数组，其中第 i 个元素代表了第 i 天的股票价格。
 *
 * 设计一个算法计算出最大利润。在满足以下约束条件下，你可以尽可能地完成更多的交易（多次买卖一支股票）：
 *
 * - 你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
 * - 卖出股票后，你无法在第二天买入股票（即冷冻期为 1 天）。
 *
 * 示例：
 * ```
 输入：[1,2,3,0,2]
 输出：3
 解释：对应的交易状态为：[买入，卖出，冷冻期，买入，卖出]
 */

/**
 *
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  const n = prices.length;
  if (n <= 1) return 0;
  const f = new Array(n);
  // f[i][0]: 手上持有股票的最大收益
  // f[i][1]: 手上不持有股票，并且处于冷冻期中的累计最大收益
  // f[i][2]: 手上不持有股票，并且不在冷冻期中的累计最大收益
  f[0] = [-prices[0], 0, 0];
  for (let i = 1; i < n; i++) {
    f[i] = [];
    // 第 i 天结束持有股票，说明
    // 要么在第 i - 1 天就持有，(f[i - 1][0])
    // 要么在第 i - 1 天前已卖出，并在第 i 天买入 (f[i - 1][2] - price[i])
    f[i][0] = Math.max(f[i - 1][0], f[i - 1][2] - prices[i]);

    // 第 i 天结束未持有股票，且处于冷冻期，说明在第 i 天售出
    f[i][1] = f[i - 1][0] + prices[i];

    // 第 i 天结束未持有，且不在冷冻期，说明在第 i - 1 天结束之前已售出
    f[i][2] = Math.max(f[i - 1][1], f[i - 1][2]);
  }

  // return Math.max.apply(null, f[n - 1]);
  // 最后一天结束，手上仍然持有股票是无意义的，所以实际只需要比较未持有股票的两种状态
  return Math.max(f[n - 1][1], f[n - 1][2]);
}
