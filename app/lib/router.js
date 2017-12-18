// 全局路由设置

const Router = require('koa-router');

const router = new Router();

//  指定路径对应的模板信息
router.get('/', require('./route/index.js'));

module.exports = router;