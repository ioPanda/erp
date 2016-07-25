ERP 沙盘虚拟运营平台
====================

An applicaiton built with Marionette.js.

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

- 开发前确保你熟悉了 erp 这个游戏的玩法, 还不熟悉的[看过来](172.22.1.124:8080/erpx).

| Directories | Purpose |
| ---:|:--- |
| [api](./api) | Mock api routes |
| [dist](./dist) | Built assets |
| [src](./src) | Source files |
| [test](./test) | Test files |


===

&copy; 2014-2016 重邮信管工作室. 
Distributed under [ISC license](LICENSE.md).
