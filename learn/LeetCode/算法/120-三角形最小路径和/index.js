/** 120. 三角形最小路径和
 * https://leetcode-cn.com/problems/triangle/
 *
 * 难度：中等
 *
 * 给定一个三角形，找出自顶向下的最小路径和。每一步只能移动到下一行中相邻的结点上。
 *
 * **相邻的结点** 在这里指的是 `下标` 与 `上一层结点下标` 相同或者等于 `上一层结点下标 + 1` 的两个结点。
 *
 * 例如，给定三角形：
 * ```
 * [
 *      [2],
 *     [3,4],
 *    [6,5,7],
 *   [4,1,8,3]
 * ]
 * ```
 *
 * 自顶向下的最小路径和为 `11` (即，2 + 3 + 5 + 1 = 11)
 *
 * **说明**：
 *
 * 如果你可以只使用 O(n) 的额外空间 (n 为三角形的总行数) 来解决这个问题，那么你的算法会很加分。
 */

/**
 *
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function(triangle) {
  // 分析：
  // 1. 临界点：(1) 空数组 返回 0 (2) 只有一个顶点 返回顶点的值 p[0][0] = t[0][0]
  const len = triangle.length;
  if (len === 0) return 0;
  if (len === 1) return triangle[0][0];
  // 2. i === 1 两个数字 与顶点组成一个小三角
  //     p[1][0] = p[0][0] + t[1][0]
  //     p[1][1] = p[0][0] + t[1][1]
  // 3. i > 1
  //     p[i][0] = p[i - 1][0] + t[i][0]
  //     ...
  //     p[i][j] = Min(p[i - 1][j - 1], p[i - 1][j]) + t[i][j] (0<i<len, 0<j<t[i].length - 1)
  //     p[i][iLen - 1] = p[i - 1][iLen - 2] + t[i][iLen - 1]
  // return Min(...p[len - 1])
  const p = new Array(len);
  p[0] = triangle[0];
  for (let i = 1; i < len; i++) {
    const n = triangle[i].length;
    if (!p[i]) {
      p[i] = new Array(n);
    }
    // 最左侧路径
    p[i][0] = p[i - 1][0] + triangle[i][0];
    // 最右侧路径
    p[i][n - 1] = p[i - 1][n - 2] + triangle[i][n - 1];
    for (let j = 1; j < n - 1; j++) {
      p[i][j] = Math.min(p[i - 1][j - 1], p[i - 1][j]) + triangle[i][j];
    }
  }
  // console.log(p);
  return Math.min(...p[len - 1]);
}

console.log(minimumTotal([[2],[3,4],[6,5,7],[4,1,8,3]]));
console.log(minimumTotal([[-1],[2,3],[1,-1,-3]]));
console.log(minimumTotal([[-1],[3,2],[-3,1,-1]]));
