/** 17.13 恢复空格
 * https://leetcode-cn.com/problems/re-space-lcci/
 *
 * 难度：中等
 *
 * 哦，不！你不小心把一个长篇文章中的空格、标点都删掉了，并且大写也弄成了小写。像句子`"I reset the computer. It still didn’t boot!"`已经变成了`"iresetthecomputeritstilldidntboot"`。在处理标点符号和大小写之前，你得先把它断成词语。当然了，你有一本厚厚的词典`dictionary`，不过，有些词没在词典里。假设文章用`sentence`表示，设计一个算法，把文章断开，要求未识别的字符最少，返回未识别的字符数。
 *
 * **注意**：本题相对原题稍作改动，只需返回未识别的字符数
 *
 * 示例：
 * ```
输入：
dictionary = ["looked","just","like","her","brother"]
sentence = "jesslookedjustliketimherbrother"
输出： 7
解释： 断句后为"jess looked just like tim her brother"，共7个未识别字符。
```
 *
 * 提示：
 * - 0 <= len(sentence) <= 1000
 * - dictionary中总字符数不超过 150000。
 * - 你可以认为dictionary和sentence中只包含小写字母。
 */

/**
 * @param {string[]} dictionary
 * @param {string} sentence
 * @return {number}
 */
var respace = function(dictionary, sentence) {
  const len = sentence.length;
  const dp = new Array(len + 1);
  // 双指针
  // i 从 0 到 len，最大未识别字符数为 i
  // j 从 i - 1 到 0，从 j 到 i 如果查找到有对应单词，则从最大数 i 减去单词长度得到剩余未识别字符数
  dp[0] = 0;
  for (let i = 1; i <= len; i++) {
    dp[i] = dp[i - 1] + 1;
    // 遍历单词表
    for (const word of dictionary) {
      const wl = word.length;
      // 当能够容纳单词时，截取单词的长度，看是否是对应的单词
      if (i - wl >= 0 && sentence.substr(i - wl, wl) === word) {
        // 如果有单词，当前子串的最少未识别字符数取 MIN(dp[i], dp[i - wl])
        dp[i] = Math.min(dp[i], dp[i - wl]);
      }
    }
  }
  return dp[len];
};

console.log(respace(["looked","just","like","her","brother"], "jesslookedjustliketimherbrother"))
console.log(respace(["wccm","wiw","uwwiwcmiiiwmmwicuwu","mw"],"iwiwwwmuiccwwwwwmumwwwmcciwwuiwcicwwuwicuiwciwmiwicwuwwmuimccwucuuim"));
