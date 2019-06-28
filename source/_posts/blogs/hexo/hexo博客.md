---
en_title: build personal blog to use hexo and github
title: hexo + github 快速创建个人博客
keywords: github, hexo, 博客
description: github搭配hexo快速创建个人博客
category:
  - Hexo
tags:
  - Hexo
date: 2017-07-04 21:23:25
photos:
  - https://miao.su/images/2019/02/23/91cd756.jpg
---

使用 hexo + github 快速创建个人博客方法记录。

## 环境配置

- 安装 Node
- 安装 Git
- 申请 GitHub 帐号

## 安装 Hexo

Node和Git都安装好后,首先创建一个文件夹,如blog,用户存放hexo的配置文件,然后进入blog里安装Hexo。

执行如下命令安装 Hexo :

```bash
$ npm install -g hexo
```

### 初始化

完成 hexo 的安装后，在创建的文件夹下执行如下命令初始化:

```bash
$ hexo init
```

执行下面的命令，生成静态页面:

```bash
$ hexo generate (或者简写成 hexo g)
```

这样会在 blog 根目录下生成一个 public 的目录，里面就存放着结构目录及静态页面。

### 本地预览调试

做完了上面的操作后，一个博客站点基本上就算是完成了，可以启动本地服务，进行预览调试，命令如下:

```bash
$ hexo server (或者简写成 hexo s)
```

如果命令窗口有下面的输出就说明成功了

```bash
INFO  Start processing
INFO  Hexo is running at http://localhost:4000/. Press Ctrl+C to stop.
```

这时你可以打开浏览器，在地址栏输入 localhost:4000 查看原始的博客了。

## 配置 GitHub

但是这样也只是本地能够查看，换一台电脑就看不到了，如何才能在任意的电脑上都可以通过网络访问呢？这时就需要 GitHub 来配合了。

登录 github ，建立一个仓库，仓库名必须是 `<your_username>.github.io`

> 这里建议用户名最好是全部由字母与数字构成，不要使用连字符或下划线等非字母、数字的字符，那样可能会导致浏览 Linux 的用户在访问该站点时将收到服务器错误。 [Git Help 用户,组织和项目页面 Warning](https://help.github.com/articles/user-organization-and-project-pages/#project-pages)

打开 blog 根目录下的 _config.yml 文件，翻到最下面更改配置

```yml
deploy:
  type: git
  repo: git@github.com:moesuiga/moesuiga.github.io.git
  branch: master
```

更改的 repo 属性是你建立的 github 仓库的地址，
可以是 HTTPS 地址，如:
`https://github.com/moesuiga/moesuiga.github.io.git`

或者是 SSH 地址，如:
`git@github.com:moesuiga/moesuiga.github.io.git`

执行命令:

```bash
$ npm install hexo-deployer-git --save
```

然后执行部署命令:

```bash
$ hexo deploy
```

将本地代码部署到 github 仓库中。

现在你可以在浏览器中输入 `https://moesuiga.github.io` 进行访问了，记得把 `moesuiga` 修改为你的 github 用户名。

## 部署步骤及常用命令
每次部署，可以按以下三步进行。

```bash
$ hexo clean (清除缓存，会清除掉本地的 public 目录)
$ hexo generate (生成静态页面)
$ hexo deploy (部署代码到 github 仓库)
```

以下是一些 hexo 的常用命令:

```bash
$ hexo new "postName" (新建文章)
$ hexo new page "pageName" (新建页面)
$ hexo generate (生成静态页面至 public 目录)
$ hexo server (开启预览访问端口，默认端口号4000，'ctrl + c' 关闭 server)
$ hexo deploy (将 .deploy 目录部署到 github)
$ hexo help (查看帮助)
$ hexo version (查看 hexo 的版本)
```

## 报错总结

```bash
ERROR Deployer not found: git 或者 ERROR Deployer not found: github
```

解决方法： `npm install hexo-deployer-git --save`

如发生报错： ERROR Process failed: layout/.DS_Store , 那么进入主题里面layout和_partial目录下，使用删除命令：

```bash
rm-rf.DS_Store
ERROR Plugin load failed: hexo-server
```

如果运行`hexo server`后提示可以在4000端口访问，但是访问`http://localhost:4000`却无法正常打开，有可能是端口被占用或其他什么情况，可以通过添加`-p`参数更换端口。

```bash
$ hexo server -p 8888
```
