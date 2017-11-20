const Koa = require('koa');

const render = require('./lib/render.js');
const router = require('./lib/router.js');

const app = new Koa();


// 将render中间件挂载到koa中
app.use(render);
// 插入路由中间件
app.use(router.routes());


app.listen(3000, function () {
	console.log('server @ 3000 port');
});