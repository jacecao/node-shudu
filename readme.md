## HTML数独游戏

* #### 文档结构   

1. app 服务端代码
2. src   前端代码
3. task   gulp任务模块

##

这是一个通过Koa框架搭建的数独游戏，力求使用最少的插件来运行此应用。

* #### 开发环境  

1. node >= v.6.x
2. gulp+webpack 自动化任务部署
3. ES6
4. 服务端默认模板为nunjucks模板，模板位于views文件夹内，数据植入方式请参考app/lib/route下的index.js文件

本应用将前后端代码进行了剥离，只需要专注于前端代码的编写。
`本应用采用Bulma CSS框架开发`
[Bulma](https://bulma.io/)


* #### 启动应用 

1. npm install
2. npm start

自动刷新插件默认启动4000端口，服务启动3000端口

更改服务端口
```
1. app/app.js
2. tasks/server.js  --> 更改browserSync.init中proxy的值   
```

更改自动刷新端口
```
1. tasks/server.js  --> 更改browserSync.init中port的值   
```
