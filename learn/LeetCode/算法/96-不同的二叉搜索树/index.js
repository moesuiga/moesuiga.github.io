/** 96. 不同的二叉搜索树
 * https://leetcode-cn.com/problems/unique-binary-search-trees/
 *
 * 难度：中等
 *
 * 给定一个整数 n，求以 1 …… n 为节点组成的二叉搜索树有多少种
 *
 * **示例**：
 * ```
 * 输入：3
 * 输出：5
 * 解释：
 *   给定 n = 3，一共有 5 种不同结构的二叉搜索树：
 *     1   1       2       2    3      3
 *      \   \     / \     /    /      /
 *      3    2   1   3   1    1      2
 *     /      \           \    \    /
 *    2        3           3    2  1
 * ```
 */

/**
 * @param {number} n
 * @return {number}
 */
var numTrees = function(n) {
  // 分析：
  // 1. n === 1 时，只有 1 种
  // 2. n === 2 时，有 2 种
  // 3. n > 2 时
  //    3-1. 以 1 为根节点，有 sum[n - 1]个
  //    3-2. 以 n 为根节点，有 sum[n - 1]个
  //    3-3. 以 i(1<i<n) 为根节点，左侧有 sum[i - 1] 个，右侧有 sum[n - i] 个，总数为 sum[i - 1] * sum[n - i]
  // if (n <= 1) return 1;
  // if (n === 2) return 2;

  // const sum = new Array(n + 1);
  // sum[0] = 1;
  // sum[1] = 1;
  // sum[2] = 2;
  // for (let i = 3; i <= n; i++) {
  //   let si = sum[i - 1] * 2;
  //   for (let j = 2; j < i; j++) {
  //     si += sum[j - 1] * sum[i - j]
  //   }
  //   sum[i] = si;
  // }
  // return sum[n];

  // 解法2. 该结果数列符合 数学上的 卡塔兰数
  // https://baike.baidu.com/item/catalan/7605685?fr=aladdin
  // 性质：
  //   令 h(0) = 1, h(1) = 1; 卡塔兰数满足递归式： h(n) = h(0)*h(n-1)+h(1)*h(n-2)+...+h(n-1)*h(0); (n >= 2)
  //   简化后的一阶递推公式为：h(n) = (4n - 2)/(n + 1) * h(n - 1); (n >= 1); h(0) = 1;
  if (n <= 1) return 1;
  const h = new Array(n + 1);
  h[0] = 1;
  for (let i = 1; i <= n; i++) {
    h[i] = h[i - 1] * (4 * i - 2) / (i + 1);
  }
  return h[n];
};
