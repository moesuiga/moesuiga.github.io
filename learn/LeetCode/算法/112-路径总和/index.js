/** 112.路径总和 https://leetcode-cn.com/problems/path-sum/
 * 难度：简单
 *
 * 给定一个二叉树和一个目标和，判断该树中是否存在根节点到叶子节点的路径，这条路径上所有节点值相加等于目标和。
 *
 * **说明**：叶子节点是指没有子节点的节点。
 *
 * **示例**：给定如下二叉树，以及目标和 `sum = 22`
 * ```
 *              5
 *             / \
 *            4   8
 *           /   / \
 *          11  13  4
 *         / \       \
 *        7   2       1
 * ```
 * 返回 `true`，因为存在目标和为 `22` 的根节点到叶子节点的路径 `5 -> 4 -> 11 -> 2`。
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *   this.val = val;
 *   this.left = this.right = null;
 * }
 * @typedef {{val: number; left: null | TreeNode; right: null | TreeNode}} TreeNode
 */
/**
 *
 * @param {TreeNode} root
 * @param {number} sum
 * @return {boolean}
 */
var hasPathSum = function(root, sum) {
  // // 根节点为空，直接返回 false
  // if (!root) return false;

  // // 当前节点为叶子节点，比较节点的值与给定的值是否相同
  // if (!root.left && !root.right) {
  //   return root.val === sum;
  // }

  // // 题目可转换为 总和减去根节点到叶子节点的值，最后是否为 0
  // // 记录 sum - val
  // const n = sum - root.val;

  // // 如果有左节点，递归查看是否有满足情况的叶子节点
  // if (root.left) {
  //   const lResult = hasPathSum(root.left, n);
  //   if (lResult) {
  //     return true;
  //   }
  // }
  // // 如果左节点没有符合条件的，查看是否有右节点，并递归
  // if (root.right) {
  //   const rResult = hasPathSum(root.right, n);
  //   if (rResult) {
  //     return true;
  //   }
  // }
  // // 如果左右节点都无满足条件的节点，返回 false
  // return false;


  // 解2：
  // 节点为空，返回 false
  if (!root) return false;

  // 叶子节点，比较数值
  if (!root.left && !root.right) {
    return root.val === sum;
  }

  // 非叶子节点，递归左右节点，有一侧为真，就为真
  const residue = sum - root.val;
  return hasPathSum(root.left, residue) || hasPathSum(root.right, residue);
};
