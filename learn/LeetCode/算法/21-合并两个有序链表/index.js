/** 21. 合并两个有序链表
 * https://leetcode-cn.com/problems/merge-two-sorted-lists/
 *
 * 难度：简单
 *
 * 将两个升序链表合并为一个新的 *升序* 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。
 *
 * 示例：
 * ```
 * 输入：1 -> 2 -> 4, 1 -> 3 -> 4
 * 输出：1 -> 1 -> 2 -> 3 -> 4 -> 4
 * ```
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @typedef {{val: number; next: null | ListNode}} ListNode
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
  if (l1 === null) return l2;
  if (l2 === null) return l1;

  /** @type {ListNode} */
  const head = {
    val: 0,
    next: null,
  };
  /** @type {ListNode} */
  let current = head;
  while (l1 && l2) {
    // l1 的当前节点小，加入 l1 的节点
    if (l1.val < l2.val) {
      current.next = l1;
      l1 = l1.next;
    } else {
      // 否则加入 l2
      current.next = l2;
      l2 = l2.next;
    }
    // 当前指针向下一位
    current = current.next;
  }
  // 剩下哪个就把剩余的都加进去
  current.next = l1 ? l1 : l2;
  return head.next;
};
