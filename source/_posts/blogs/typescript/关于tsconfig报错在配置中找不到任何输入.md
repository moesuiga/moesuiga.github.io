---
en_title: tsconfig.json Error no inputs in vscode
title: 在 tsconfig.json 配置中找不到任何输入
date: 2019-3-12 08:59:18
keywords: typescript, ts, tslint, tsconfig, vscode, no inputs, 找不到输入
description: 记录一下关于 vscode 中，tsconfig.json 报错 “在配置文件 tsconfig.json 中找不到任何输入” 的情况
category:
  - TypeScript
tags:
  - tsconfig
photos:
  - https://miao.su/images/2019/03/03/5163278b6.jpg
---

`tsconfig.json` 文件内容如下，这种情况下很可能就会出现错误

> 在配置文件 /path/to/program/tsconfig.json 中找不到任何输入

``` json
{
  "compilerOptions": {
    "baseUrl": ".",
    "outDir": "dist",
    "module": "esnext",
    "target": "es2016",
    "noImplicitAny": true,
    "moduleResolution": "node",
    "sourceMap": true,
    "paths": {
      "*": [
        "node_modules/*",
        "src/types/*"
      ]
    },
    "typeRoots": ["typings", "node_modules/@types"]
  },
  "exclude": [
    "node_modules"
  ]
}
```

只需要添加一个 *include* 数组指定包含的目录即可，或者也可以添加一个 *files* 数组指定包含的文件列表。

比如：

``` json
{
  "include": [
    "src/**/*"
  ],
  // Or/And files
  "files": [
    "src/app.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

但是不能设置为一个空数组，`"include": []` 这样还是会找不到任何输入的，同样的，如果设置的路径不对，依然有这个错误。


附带一提，`tslint.json` 文件可以用 `tslint.js` 替代，使用 `module.exports` 导出。
这样可以根据环境配置来设置不同的 lint 规则。
