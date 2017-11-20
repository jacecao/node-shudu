async function index (ctx) {
	await ctx.render('index', {
		name: 'koa2'
	});
}

module.exports = index;