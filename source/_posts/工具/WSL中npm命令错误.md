---
title: WSL中npm命令错误
date: 2021-7-3 11:56:46
updated: 2021-7-3 13:23:59
keywords: WSL, node, npm, npx, not foundram Files/nodejs/npm, Syntax error word unexpected, Cannot find module 'xxx/nodejs/node_modules/npm/bin/npm-cli.js'
description: Windows 系统的 cmd 工具饱受开发人员的非议，后来 Windows 内置了 Linux 子系统 <b>WSL</b> (<em>Windows subsystem for Linux</em>)，并推出了 Windows Terminal 工具，其中可打开 Ubuntu bash 终端，并且可访问 Windows 系统的文件，虽然我以前已经习惯了使用 Cmder 终端提供的 bash，但还是想试试 WSL。<br>但是在使用时发现，在这个 bash 终端中使用 node/npm/npx 命令会出现错误，无法使用。搜索发现不少人遇到这个问题，在 microsoft/WSL 的仓库中提了 issue。查看下来发现多数人的解决方法是在子系统中重新安装 node，但我不想把同一样工具安装两个，之后终于找到了解决方法，并在这里记录下整个过程。
category:
  - 工具
tags:
  - WSL
photos:
  - /images/gallery/0027.jpeg
---

在 Windows 的 WSL 终端下，运行 npm 命令提示错误

```bash
$ npm -v
: not foundram Files/nodejs/npm: 3: /mnt/c/Program Files/nodejs/npm:
: not foundram Files/nodejs/npm: 5: /mnt/c/Program Files/nodejs/npm:
/mnt/c/Program Files/nodejs/npm: 6: /mnt/c/Program Files/nodejs/npm: Syntax error: word unexpected (expecting "in")
```

原因是回车符号，使用 `vim -b npm` 打开 npm 文件，可以看到每行后面多了个 `^M` 的符号；这个符号代表的是 Windows 系统下的回车符 `\r`。
一般地，Unix 类系统的换行采用的是 `LF`，即 `\n`；
而 Windows 系统的换行则是 `CRLF`，即 `\r\n`；
这多出来的 `\r` 就是上述错误的罪魁祸首。

通过命令 `dos2unix npm` 把文件转换为 Unix 系的文件格式即可解决这个问题。

但是转换之后再次运行，又出现了错误：

```bash
$ npm -v
module.js:472
    throw err;
    ^

Error: Cannot find module 'C:\mnt\c\Program Files\nodejs\node_modules\npm\bin\npm-cli.js'
    at Function.Module._resolveFilename (module.js:470:15)
    at Function.Module._load (module.js:418:25)
    at Module.runMain (module.js:605:10)
    at run (bootstrap_node.js:420:7)
    at startup (bootstrap_node.js:139:9)
    at bootstrap_node.js:535:3
```

具体原因不清楚，猜测大概是在 Windows 系统中 `/mnt/c/...` 不被认为是绝对路径，然后在前面加了个盘符，结果导致路径查找错误。

最后使用 [WSL issues/1512 felipemanga 提供的方法](https://github.com/microsoft/WSL/issues/1512#issuecomment-305944476-permalink) 解决了这个问题。

思路就是修改 npm 文件中的 NODE_EXE 文件路径，然后新建一个 node 文件，并在其中把路径改为 Windows 路径。

```diff
# npm 文件
# 修改 NODE_EXE 文件路径
- NODE_EXE="$basedir/node.exe"
+ NODE_EXE="$basedir/node"
```

```bash
# 创建新的文件 node，写入内容
vim node

#!/bin/bash
# 遍历参数
for var in "$@"
do
  # 如果参数是一个存在的文件路径
  if [ -e "$var" ]
  then
    # 修改文件路径 /mnt/c/path/to/file => c:\path\to\file
    var=$(echo "$var" | sed -e 's,^/mnt/\([a-z]\)/,\1:/,' | sed -e 's,/,\\,g')
  fi
  # 收集参数
  Args=("${Args[@]}" "$var")
done

# 把收集的修改过的路径参数传递给 node.exe
node.exe "${Args[@]}"
```

因为我之前用惯了 Cmder 的 bash，而上面这种方式修改之后的路径在 Cmder 中运行反而会出现错误，因此我在此基础上进行了些微修改，使其仅在 WSL 终端生效。

```diff
# node 文件
+ # 是否在 WSL 中运行
+ inWSL="$(uname -a | grep Linux | grep Microsoft)"
  for var in "$@"
  do
-   if [ -e "$var" ]
    # 仅在 WSL 中时，修改文件路径格式
+   if [[ $inWSL && -e "$var" ]]
    then
      var=$(echo "$var" | sed -e 's,^/mnt/\([a-z]\)/,\1:/,' | sed -e 's,/,\\,g')
```

对 npm 文件的操作，再对 npx 文件来一遍，也可以使用 npx 了。

---

## 参考链接

- [Issue running npm command · Issue #1512 · microsoft/WSL](https://github.com/microsoft/WSL/issues/1512)
- [告诉我们是否在WSL中运行linux吗？-问答-阿里云开发者社区-阿里云](https://developer.aliyun.com/ask/271107)
- [Shell 基本运算符 | 菜鸟教程](https://www.runoob.com/linux/linux-shell-basic-operators.html)
