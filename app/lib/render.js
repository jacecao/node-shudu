// 添加HTML模板渲染
const views = require('koa-views');
const path = require('path');

// koa-views支持多种模板引擎
// views(path, config)
// map 指定HTML文件由nunjucks模板引擎渲染
// 所以这里我们还需要安装nunjucks模板引擎
module.exports = views(path.join(__dirname, '/../views'), {
	// 设置加载文件的后缀名
	// ctx.render('index', {..}]); index > index.html
	extension: 'html',
	// 对文件名后缀为HTML的文件使用nunjucks模板引擎
	map: {html: 'nunjucks'}
});