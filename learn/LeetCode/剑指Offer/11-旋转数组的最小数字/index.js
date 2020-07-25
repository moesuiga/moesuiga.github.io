/** 11. 旋转数组的最小数字
 *
 */

/**
 * @param {number[]} numbers
 * @return {number}
 */
var minArray = function(numbers) {
  if (numbers.length === 1) return numbers[0];
  // 1. 最简单的暴力法
  // return Math.min(...numbers);

  // 2. 从两侧到中间比较的二分查找法
  let left = 0;
  let right = numbers.length - 1;
  while (left < right) {
    if (numbers[left] === numbers[right]) {
      // 两边相等，如果右边不是最后一位，并且右边索引再右移一位的数字比当前右边的数字小
      // 它即是最小值 e.g. [2,2,1,2](原数组[1,2,2,2])
      if (right !== numbers.length - 1 && numbers[right] > numbers[right + 1]) {
        return numbers[right + 1];
      }
      // 只有左侧右移之后不必原来小，才继续右移，否则说明右移之后的即是最小值
      if (numbers[left] > numbers[left + 1]) {
        return numbers[left + 1];
      }
      // 右侧左移也是一样
      if (numbers[right] < numbers[right - 1]) {
        return numbers[right];
      }
      left++;
      right--;
    }
    // 左边比右边小，说明
    // 1. 如果右边是最后一位，则整个数组被旋转，还是原来的增序数组，最小的是最左侧值
    // 2. 如果右边不是最后一位，则这一位的右边一个是旋转前的索引 0，即最小值
    if (numbers[left] < numbers[right]) {
      if (right === numbers.length - 1) {
        return numbers[left];
      }
      return numbers[right + 1];
    }

    // 因为是增序数组，前 n 项被放到了后面，所以左侧大于右侧，说明
    if (numbers[left] > numbers[right]) {
      right--;
    }
  }
  // 能出来的有两种情况，
  //   1. 数组中全是相同的数字，返回哪一个都一样
  //   2. left === right - 1 && numbers[left] >= numbers[right]，应返回 numbers[right]，
  //     但考虑到right已经在循环中自减过一次，所以应该返回 numbers[right + 1];
  return numbers[right + 1];
};
