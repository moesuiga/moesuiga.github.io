/** 16.11 跳水板
 * https://leetcode-cn.com/problems/diving-board-lcci/
 *
 * 难度：简单
 *
 * 你正在使用一堆木板建造跳水板。有两种类型的木板，其中长度较短的木板长度为 `shorter`，长度较长的木板长度为 `longer`。你必须正好使用 `k` 块木板。编写一个方法，生成跳水板所有可能的长度。
 * 返回的长度需要从小到大排列。
 *
 * 提示：
 * - 0 < shorter <= longer
 * - 0 <= k <= 100000
 */

/**
 *
 * @param {number} shorter
 * @param {number} longer
 * @param {number} k
 * @return {number[]}
 */
var divingBoard = function (shorter, longer, k) {
  if (!k) {
    return [];
  }

  // 两条木板相同时，结果唯一
  if (shorter === longer) {
    return [longer * k];
  }

  // 最短的是全部使用 shorter 木板
  // 每次把一个 shorter 替换为 longer 木板长度就增加一部分
  // 最长的是全部使用 longer 木板
  const result = [];
  for (let i = k; i >= 0; i--) {
    result.push(shorter * i + longer * (k - i));
  }
  return result;
}

console.log(divingBoard(1, 1, 2));
console.log(divingBoard(11, 22, 12));
