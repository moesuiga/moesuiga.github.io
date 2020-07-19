/** 7. 整数反转
 * https://leetcode-cn.com/problems/reverse-integer/
 *
 * 难度：简单
 *
 * 给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。
 *
 * **示例1**：
 * ```
 * 输入：123
 * 输出：321
 * ```
 *
 * **示例2**：
 * ```
 * 输入：-123
 * 输出：-321
 * ```
 *
 * **示例3**：
 * ```
 * 输入：120
 * 输出：21
 * ```
 *
 * **注意**：
 * 假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [-2^31, 2^31 - 1]。
 * 请根据这个假设，如果反转后整数溢出那么就返回 0.
 */

/**
 * 整数反转
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
  // 简单粗暴的方式
  // const isNegative = x < 0;
  // const n = Math.abs(x).toString().split('').reverse().join('');
  // const m = isNegative ? -n : +n;
  // if (m > 2 ** 31 -1 || m < -(2 ** 31)) {
  //   return 0;
  // }
  // return m;

  // 个位数，可以直接返回
  if (x < 10 && x > -10) return x;
  // -2^31，反转之后超出 [-2^31, 2^31 - 1] 的范围
  // 单独处理是因为其绝对值也会超出范围
  // 虽然实际环境处理没问题，但是在假设环境只能存储下 32 位有符号整数的情况下
  // 绝对值超出范围后，数值就不再是期望的 2147483648 了
  if (x === -2147483648) return 0;
  const max = '2147483647'; // 2 ^ 31 - 1
  const isNegative = x < 0;
  const y = Math.abs(x).toString();
  const len = y.length;
  let str = '';
  // 32 位有符号整数，最多 10 位
  let isPossibleOverflow = len === 10;
  let isIndeedOverflow = false;
  // 反向遍历
  for (let i = len - 1; i >= 0; i--) {
    if (isPossibleOverflow) {
      const yi = +y[i];
      const mi = +max[len - 1 - i];
      // 比较反转后是否溢出
      isPossibleOverflow = yi >= mi;
      if (i > 0) {
        isIndeedOverflow = yi > mi;
      } else {
        // 最后一位
        // 负数的最大范围比正数的范围大1
        isIndeedOverflow = yi > (isNegative ? mi + 1 : mi);
      }
      // 如果溢出，返回 0
      if (isIndeedOverflow) {
        return 0;
      }
    }

    str += y[i];
  }
  // JavaScript 转为数字后会自动去除掉前置的 0
  return isNegative ? -str : +str;
}

console.log(reverse(123))
console.log(reverse(-123))
console.log(reverse(1200))
