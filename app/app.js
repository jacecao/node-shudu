const Koa = require('koa');
// 对服务端进程的监听
const logger = require('koa-logger');
// 设置静态资源
const static = require('koa-static');

const render = require('./lib/render.js');
const router = require('./lib/router.js');

const app = new Koa();

// 加入静态文件中间件
app.use(static(__dirname + '/src/'));

// 监听日志服务必须置于所有中间件之前
app.use(logger());

// 将render中间件挂载到koa中
app.use(render);

// 插入路由中间件
app.use(router.routes());


app.listen(3000, function () {
	console.log('node server running at 3000 port');
});