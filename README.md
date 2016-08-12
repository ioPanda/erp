ERP 沙盘虚拟运营平台
====================

使用 Marionette.js 开发的应用，gulp + browserify 构建。

## 开始
[Clone](https://github.com/ioPanda/erp.git) or [Download](https://github.com/ioPanda/erp/archive/master.zip) this repo.

```sh
git clone git@github.com:ioPanda/erp.git && cd erp
```

确认 [Node.js](http://nodejs.org/) & [npm](https://www.npmjs.org/) 已经
[installed](http://nodejs.org/download/).
建议使用 [nvm](https://github.com/creationix/nvm) || [nvm-windows](https://github.com/coreybutler/nvm-windows).

```sh
npm install 
npm install gulp -g
gulp watch
```

等待 2/3 秒完成编译, 浏览器会自动打开 http://localhost:3000.

## 指引

- 目录结构

| Directories | Purpose |
| ---:|:--- |
| [api](./api) | Mock api routes |
| [dist](./dist) | Built assets |
| [src](./src) | Source files |
| [test](./test) | Test files |

## 重构点

开发前确保你熟悉了 erp 这个游戏的玩法, 还不熟悉的[看过来](http://172.22.1.124:8080/erpx).

### 修改
- 代码可维护性, 重视代码的质量.
  风格遵循eslint规则, 代码逻辑主动让学姐学长看一下.
  插件可以直接用, 但是需要在可掌控的范围内, 即兼容IE8+.
  (楼下实验室下面还有 firefox 2x 版本落后的吓人)
- 主动推送的策略.
  上一版是使用"反向Ajax"的 DWR 库实现的. 这一点需要改进.
- 静态资源需要做优化处理上线

### 新增
- 能够查看自己的信息. 需要有个能够移动到某个点能够加载用户的信息. 这个可能是后端需要加接口就完成的事情. 
- 加入间谍功能.
- 加入原料贱卖的功能.

===

&copy; 2014-2016 重邮信管工作室. 
Distributed under [ISC license](LICENSE.md).
