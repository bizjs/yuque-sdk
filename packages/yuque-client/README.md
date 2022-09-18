# yuque-client

[![NPM version](https://img.shields.io/npm/v/yuque-client.svg?style=flat)](https://npmjs.org/package/yuque-client)
[![NPM downloads](http://img.shields.io/npm/dm/yuque-client.svg?style=flat)](https://npmjs.org/package/yuque-client)

## 用法

```ts
import { YuqueClient } from 'yuque-client';

const client = new YuqueClient({
  appName: 'demo',
  accessToken: 'xxx',
});

async function start() {
  const user = await client.user.getCurrentUser();
  console.log(user);
}
```

## 可用 API

### 用户

> https://www.yuque.com/yuque/developer/user

- [x] 获取单个用户信息
- [x] 获取认证的用户的个人信息

### 知识库

> https://www.yuque.com/yuque/developer/repo

- [x] 获取某个用户的知识库列表
- [x] 获取某个团队的知识库列表
- [x] 创建知识库
- [x] 获取知识库详情
- [x] 更新知识库信息
- [x] 删除知识库

### 文档

> https://www.yuque.com/yuque/developer/doc

- [x] 获取一个仓库的文档列表
- [x] 获取单篇文档的详细信息
- [x] 创建文档
- [x] 更新文档
- [x] 删除文档
