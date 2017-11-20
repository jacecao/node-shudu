const Router = require('koa-router');

const router = new Router();

router.get('/', require('./route/index.js'));

module.exports = router;