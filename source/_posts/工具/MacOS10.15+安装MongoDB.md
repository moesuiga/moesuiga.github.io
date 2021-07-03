---
title: MacOS 10.15+安装MongoDB的方法
date: 2021-07-01 11:05:19
updated: 2021-7-3 23:08:47
keywords: Mac, MacOS 10.15+, Mac Catalina, Mac Big Sur, MongoDB, MongoDB安装
description: 记录下在 MacOS 10.15+ 版本以上的系统中，安装 MongoDB 的流程方法。
category:
  - 工具
tags:
  - Mac
photos:
  - /images/gallery/0123.jpg
---

方法来源于[MongoDB官方文档](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x-tarball/)

主要是MacOS Catalina之后，无法操作根目录，也就无法创建MongoDB的默认存储目录`/data/db`，因此需要创建一个其他的目录来存放。

1. 下载 MongoDB Community tgz压缩文件: [官方下载地址](https://www.mongodb.com/try/download/community)；然后解压到合适的位置
2. 软链或复制其中的 `bin` 目录下的内容到 `/usr/local/bin` 之下
```bash
# 复制
sudo cp /path/to/the/mongodb-directory/bin/* /usr/local/bin/
# 软链
sudo ln -s /path/to/the/mongodb-directory/bin/* /usr/local/bin/
```
3. 创建目录
```bash
# data目录
sudo mkdir -p /usr/local/var/mongodb
# log目录
sudo mkdir -p /usr/local/var/log/mongodb
# 如果不是当前管理员用户，还需要给对应用户添加读写权限
sudo chown my_mongodb_user /usr/local/var/mongodb
sudo chown my_mongodb_user /usr/local/var/log/mongodb
```

4. 启动MongoDB
```bash
# 通过命令行
mongod --dbpath /usr/local/var/mongodb --logpath /usr/local/var/log/mongodb/mongo.log --fork
# 通过配置文件，默认没有该文件，需要自己创建或者从别处下载或复制
mongod --config /usr/local/etc/mongod.conf
# 检查是否启动成功
ps aux | grep -v grep | grep mongod
# 启动成功之后即可开始使用了
mongo
```

## 后续

创建用户
```bash
use admin;
# 创建不受限的超级用户
db.createUser({user: 'root', pwd: '123456', roles: ['root']})
# 创建所有库的管理员
db.createUser({user: 'admin', pwd: '123456', roles: ['dbAdminAnyDatabase']});
# 创建某个库的管理员
db.createUser({user: 'admin', pwd: '123456', roles: [{role: 'dbAdmin', db: 'my_db'}]});
# 查看已有用户列表
db.system.users.find().pretty();
# 删除某个用户
db.dropUser('user');
```
