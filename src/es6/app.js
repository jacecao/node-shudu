import 'babel-polyfill';
import Render from "./lib/render.js";
import data from './lib/data.js';

const view = new Render({
	container: '#container',
	data: data.makeMatrix()
});

// 初始化主视图
view.init();

// 窗口重置监听
window.addEventListener('resize', () => {
	// 执行视图尺寸重置，保证为一个正方形结构
	view.resize()
}, false);