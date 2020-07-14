---
title: 在Mac的终端添加命令别名的方法
keywords: Mac, bash, zsh, alias, .zshrc, .bash_profile, .bashrc
description: 在 Mac 里使用 `zsh` 时，添加自定义命令的方法。1. 临时使用，在命令行通过 `alias <cmd>="<command>"` 进行设置。 2. 永久添加，在 `~/.zshrc` 文件中写入配置。 3. 永久添加，在 `~/.zshrc` 文件中加载 `~/.bash_profile` 文件，然后在 `~/.bash_profile` 文件中写入配置。
category:
  - Command
tags:
  - Mac
date: 2020-7-14 01:24:33
updated: 2020-07-14 12:42:33
photos:
  - /images/pcr1.jpg
---

第一次使用 Mac 电脑，在配置一些自定义的命令时遇到了问题。

在网上搜索好些都是说直接在 `~/.bashrc` 或者 `~/.bash_profile` 文件中写入配置就行，可是这样并不能解决问题。

```bash
# ~/.bash_profile
alias ll="ls -alFG"

# command line
source ~/.bash_profile
```

上面这种做法和直接在终端上输入 `alias ll="ls -alFG"` 的结果一样，都是只能在当前进程起效果，结束进程，再启动一个终端进程，就没有 `ll` 这个别名了。

后来终于找到了一篇记录博客，提到使用的 `zsh`，我才恍然。

最开始打开 Mac 上的终端时，title 里是有显示 `zsh` 的，只是我以前没听过 `zsh`，不清楚这是什么意思。原来它就类似 `bash` 这样是一个命令行程序，也就是说 Mac 默认使用的命令行程序不是 `bash` 而是 `zsh`。也因此并不会在启动时运行 `~/.bash_profile` 文件，运行的是 `~/.zshrc`。

如此只需在 `~/.zshrc` 文件中引入 `~/.bash_profile` 文件运行一次就能解决了。

```bash
# ~/.zshrc
# 当有 ~/.bash_profile 文件时，才加载这个文件
test -f ~/.bash_profile && source ~/.bash_profile
```

之后在 `~/.bash_profile` 文件中添加的别名就可以安心使用了。

参考资料：

- [CSDN-fool宋-Mac下配置alias，zsh终端命令别名](https://blog.csdn.net/u011980994/article/details/77940379)
