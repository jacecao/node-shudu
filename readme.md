## Koa-node-数独游戏

* #### 文档结构   

1. app 服务端代码
2. src   前端代码
3. task   gulp任务模块

##

这是一个通过Koa框架搭建的数独游戏，力求使用最少的插件来运行此应用。主要通过一个数独游戏来实际运用ES6，该项目将数独游戏作为前端模块开发（非后端模块），该项目遵循模块开发理念，尽量将模块功能单一化可扩展化，另外在代码中对于比较难以理解的部分做了较为详细的注释，以便更好了解数独游戏的核心和一些巧妙算法的理解。

* #### 开发环境  

1. node >= v.6.x
2. gulp+webpack 自动化任务部署
3. ES6
4. 服务端默认模板为nunjucks模板，模板位于views文件夹内，数据植入方式请参考app/lib/route下的index.js文件

本应用将前后端代码进行了剥离，只需要专注于前端代码的编写。
`本应用采用Bulma CSS框架开发`
[Bulma](https://bulma.io/)


* #### 特色之处

首先该项目中的数独游戏，非本人原创，[此处为原创](https://www.imooc.com/learn/899)，我在原创基础上，优化了UI模块的结构、M/V之间数据交换的优化、在数据检查上做了优化（仅对隐藏数据进行检查）、采用了promise对象来实现M/V之间的数据交换、添加了symbol类型作为类的私有属性。

这里也非常感谢‘边城’无私（免费）的提供了数独游戏的核心算法，让我获益匪浅。

1. 这是一个功能比较完整的HTML数独游戏
2. 各个功能模块可扩展性强，MVC思维方式来编写对象模块
3. 对ES6技术运用较多，其中包括模板字符串、解构赋值、symbol实现类的私有属性、数组填充、promise等
4. 整个HTML的布局都采用bulmaCSS框架的flex布局。同时在标记棋盘和数字填充上面，都是使用了css原生动画实现，在test的文件夹中有我对这些css动画的编写和测试。
5. 非常适合用于ES6技术实践

* #### 测试模块

1. 编辑src/test.js 
2. gulp test
3. 打开test/index.html 查看运行结果


* #### 启动应用 

1. npm install
2. npm start

自动刷新插件默认启动4000端口，服务启动3000端口，注意自动刷新插件默认设置的是打开chrome浏览器，可以在tasks目录下的server.js中的第30行来修改此设置

更改服务端口
```
1. app/app.js
2. tasks/server.js  --> 更改browserSync.init中proxy的值   
```

更改自动刷新端口
```
1. tasks/server.js  --> 更改browserSync.init中port的值   
```


关于项目中的box_position.png，为了让大家能更好明白数独游戏中坐标关系，
该图是@边城__在数独游戏教程中的图片。

[数独游戏演示地址](https://jacecao.github.io/node-shudu/)